import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getCatalogEvent, formatPrice } from '@/lib/events-catalog';
import { CONTACT_EMAIL } from '@/lib/site';

// POST /api/register
// Body: { slug, name, email, phone?, quantity }
// - Price is looked up SERVER-SIDE from the catalog (client cannot set it).
// - If Stripe is configured and the ticket costs money → returns { url } to
//   a Stripe Checkout Session. Client redirects there.
// - Otherwise (no key, or free event) → records a free RSVP and returns
//   { free: true }.
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { slug, name, email, phone, returnPath, extra } = body ?? {};
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

  // Optional extra metadata (e.g. per-event custom fields like emergency contact,
  // school, dietary notes). Sanitized to Stripe's metadata limits: string values only,
  // capped length, capped key count — never trusted to affect price or line items.
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

  // Free event → free RSVP path.
  if (event.priceCents === 0) {
    // Best-effort: a real deployment would persist this to the DB here.
    return NextResponse.json({
      free: true,
      message: `You're registered for ${event.title}. See you there!`,
    });
  }

  // Paid ticket but Stripe isn't configured → do NOT silently register for free.
  // Without this guard a paid ($70) ticket would fall through and let anyone
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

  // Paid ticket → Stripe Checkout.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity,
          price_data: {
            currency: event.currency,
            unit_amount: event.priceCents,
            product_data: {
              name: `${event.title} — Registration`,
              description: `${event.date} · ${event.location}`,
            },
          },
        },
      ],
      metadata: {
        slug: event.slug,
        attendee_name: name,
        attendee_phone: phone || '',
        quantity: String(quantity),
        ...extraMetadata,
      },
      success_url: `${origin}/events/register/success?event=${encodeURIComponent(event.slug)}`,
      cancel_url: `${origin}${cancelPath}?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: `Payment couldn't be started (${formatPrice(event.priceCents, event.currency)} ticket). Please try again.` },
      { status: 500 }
    );
  }
}
