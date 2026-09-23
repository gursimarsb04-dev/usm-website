import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getCatalogEvent, formatPrice, resolveTier, resolveDiscount, applyDiscount } from '@/lib/events-catalog';
import { CONTACT_EMAIL } from '@/lib/site';
import { supabaseAdmin } from '@/lib/supabase-admin';

// POST /api/register
// Body: { slug, name, email, phone?, quantity, registration? }
// - Price is looked up SERVER-SIDE from the catalog — for a tiered event
//   (event.tiers set), resolveTier() picks Early Bird/Regular/Late/etc. from
//   today's date, never from anything the client sends.
// - Every submission inserts a `registrations` row (best source of truth for
//   attendee data — an alumni database and roommate matching both need real,
//   queryable storage, not Stripe metadata). Paid tickets insert as 'pending'
//   and the Stripe webhook (see /api/stripe/webhook) flips them to 'paid'
//   once payment actually clears.
// - `registration` carries the richer General-Event-Registration fields
//   (school, major, dietary, emergency contact, housing/roommates, consents).
//   Optional — older/simpler forms (e.g. the retreat) can omit it and this
//   behaves exactly as it always has, just with a row now inserted alongside.
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { slug, name, email, phone, returnPath, extra, registration, promoCode } = body ?? {};
  // Only allow same-site relative paths, never a full URL, to avoid an open redirect.
  const cancelPath =
    typeof returnPath === 'string' && returnPath.startsWith('/') && !returnPath.startsWith('//')
      ? returnPath
      : `/events/${slug}/register`;
  const quantity = Math.max(1, Math.min(10, parseInt(body?.quantity, 10) || 1));

  if (!slug || !name || !email) {
    return NextResponse.json({ error: 'Name, email, and event are required.' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }

  const event = getCatalogEvent(slug);
  if (!event) {
    return NextResponse.json({ error: 'Unknown event.' }, { status: 404 });
  }
  if (event.soldOut) {
    return NextResponse.json({ error: 'This event is sold out.' }, { status: 409 });
  }

  // Resolve price. Tiered events (WCC-style) compute from today's date /
  // housing choice; everything else keeps the flat priceCents behavior.
  let priceCents = event.priceCents;
  let tierId: string | null = null;
  let tierLabel: string | null = null;
  if (event.tiers?.length) {
    const tier = resolveTier(event, { noHousing: registration?.needsHousing === false });
    if (!tier) {
      return NextResponse.json(
        { error: 'Registration for this event is not currently open. Please check back or contact us.' },
        { status: 409 }
      );
    }
    priceCents = tier.priceCents;
    tierId = tier.id;
    tierLabel = tier.label;
  }

  // Discount code, if any — resolved server-side against the event's own
  // code list, never trusted as a percentage/amount from the client. A
  // non-blank code that doesn't match is rejected outright rather than
  // silently ignored, so a typo doesn't quietly charge full price.
  const discount = resolveDiscount(event, promoCode);
  if (typeof promoCode === 'string' && promoCode.trim() && !discount) {
    return NextResponse.json({ error: 'That discount code isn\'t valid for this event.' }, { status: 400 });
  }
  if (discount) {
    priceCents = applyDiscount(priceCents, discount);
    tierLabel = tierLabel ? `${tierLabel} — ${discount.label} code` : `${discount.label} code`;
  }

  // Optional extra metadata (e.g. per-event custom fields). Sanitized to
  // Stripe's metadata limits: string values only, capped length, capped key
  // count — never trusted to affect price or line items. This is separate
  // from the `registrations` DB row below, which has no such size limits.
  const extraMetadata: Record<string, string> = {};
  if (extra && typeof extra === 'object') {
    for (const [key, value] of Object.entries(extra).slice(0, 20)) {
      if (typeof value === 'string' && value.trim()) {
        extraMetadata[key.slice(0, 40)] = value.slice(0, 500);
      }
    }
  }

  const stripe = getStripe();
  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    new URL(req.url).origin;

  const isFree = priceCents === 0;

  // Fail with a clear, actionable message if Supabase isn't configured, rather
  // than letting supabaseAdmin() throw an uncaught "supabaseUrl is required"
  // deep in the Supabase client — which would surface as an opaque 500 with no
  // body, on every single registration, including free ones that used to work
  // fine with no Supabase involved at all.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Registration attempted but Supabase env vars are not configured.');
    return NextResponse.json(
      { error: `Registration isn't available right now. Please email ${CONTACT_EMAIL} to reserve your spot.` },
      { status: 503 }
    );
  }

  // Insert the registration row up front — before payment, not after — so we
  // capture the attendee's data even if they abandon checkout. Required, not
  // best-effort: losing this silently defeats the entire point of the table.
  // Wrapped defensively: a DB hiccup here must return clean JSON, never crash
  // the route (Stripe would otherwise never even be reached).
  let regRow: { id: string } | null = null;
  try {
    const { data, error: regError } = await supabaseAdmin()
      .from('registrations')
      .insert({
        event_slug: event.slug,
        full_name: name,
        email,
        phone: phone || null,
        gender: registration?.gender || null,
        birthday: registration?.birthday || null,
        home_address: registration?.homeAddress || null,
        student_status: registration?.studentStatus || null,
        school: registration?.school || null,
        major_profession: registration?.majorProfession || null,
        linkedin_url: registration?.linkedinUrl || null,
        attended_before: typeof registration?.attendedBefore === 'boolean' ? registration.attendedBefore : null,
        dietary: Array.isArray(registration?.dietary) ? registration.dietary : [],
        dietary_other: registration?.dietaryOther || null,
        emergency_contact_name: registration?.emergencyContactName || null,
        emergency_contact_relation: registration?.emergencyContactRelation || null,
        emergency_contact_phone: registration?.emergencyContactPhone || null,
        needs_housing: registration?.needsHousing ?? false,
        roommate_requests: Array.isArray(registration?.roommateRequests) ? registration.roommateRequests : [],
        resume_url: registration?.resumeUrl || null,
        media_consent: !!registration?.mediaConsent,
        photo_consent: !!registration?.photoConsent,
        liability_accepted: !!registration?.liabilityAccepted,
        ticket_tier: tierId,
        discount_code: discount?.code ?? null,
        price_cents: priceCents,
        currency: event.currency,
        payment_status: isFree ? 'free' : 'pending',
        extra: extra && typeof extra === 'object' ? extra : null,
      })
      .select('id')
      .single();
    if (regError) throw regError;
    regRow = data;
  } catch (err) {
    console.error('Registration insert error:', err);
    return NextResponse.json({ error: 'Could not save your registration. Please try again.' }, { status: 500 });
  }

  if (!regRow) {
    return NextResponse.json({ error: 'Could not save your registration. Please try again.' }, { status: 500 });
  }

  // Free event → free RSVP path.
  if (isFree) {
    return NextResponse.json({
      free: true,
      message: `You're registered for ${event.title}. See you there!`,
    });
  }

  // Paid ticket but Stripe isn't configured → do NOT silently register for free.
  // Without this guard a paid ticket would fall through and let anyone
  // reserve a paid spot for nothing. Surface a clear, actionable message instead.
  // Goes live for real the moment STRIPE_SECRET_KEY is added — no code change.
  if (!stripe) {
    return NextResponse.json(
      {
        error: `Online registration for ${event.title} isn't available just yet. Please email ${CONTACT_EMAIL} to reserve your spot.`,
      },
      { status: 503 }
    );
  }

  // Paid ticket → Stripe Checkout. registration_id lets the webhook find this
  // exact row and flip it to 'paid' once Stripe confirms the payment.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity,
          price_data: {
            currency: event.currency,
            unit_amount: priceCents,
            product_data: {
              name: tierLabel ? `${event.title} — ${tierLabel}` : `${event.title} — Registration`,
              description: `${event.date} · ${event.location}`,
            },
          },
        },
      ],
      metadata: {
        slug: event.slug,
        registration_id: regRow.id,
        attendee_name: name,
        attendee_phone: phone || '',
        quantity: String(quantity),
        ...(tierId ? { tier: tierId } : {}),
        ...(discount ? { discount_code: discount.code } : {}),
        ...extraMetadata,
      },
      success_url: `${origin}/events/register/success?event=${encodeURIComponent(event.slug)}`,
      cancel_url: `${origin}${cancelPath}?canceled=1`,
    });

    // Store the session id now so the webhook can also match on it as a
    // fallback, and so an abandoned/duplicate checkout is easy to spot later.
    // Best-effort on purpose: the checkout session already exists and works
    // (registration_id in its metadata is enough for the webhook to succeed),
    // so a failure to save this backfill must never block returning a working
    // payment URL to the attendee.
    try {
      await supabaseAdmin()
        .from('registrations')
        .update({ stripe_session_id: session.id })
        .eq('id', regRow.id);
    } catch (err) {
      console.error('Failed to backfill stripe_session_id (non-fatal):', err);
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: `Payment couldn't be started (${formatPrice(priceCents, event.currency)} ticket). Please try again.` },
      { status: 500 }
    );
  }
}
