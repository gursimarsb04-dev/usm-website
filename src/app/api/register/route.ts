import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getCatalogEvent, formatPrice } from '@/lib/events-catalog';

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

  const { slug, name, email, phone } = body ?? {};
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

  const stripe = getStripe();
  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    new URL(req.url).origin;

  // Free event, or Stripe not configured → free RSVP path.
  if (event.priceCents === 0 || !stripe) {
    // Best-effort: a real deployment would persist this to the DB here.
    return NextResponse.json({
      free: true,
      message:
        event.priceCents === 0
          ? `You're registered for ${event.title}. See you there!`
          : `Registration received for ${event.title}. We'll follow up by email.`,
    });
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
      },
      success_url: `${origin}/events/register/success?event=${encodeURIComponent(event.slug)}`,
      cancel_url: `${origin}/events/${event.slug}/register?canceled=1`,
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
