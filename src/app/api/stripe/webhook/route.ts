import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Needs the raw request body for Stripe's signature check — must run on the
// Node runtime (not edge) and must NOT call req.json() before this.
export const runtime = 'nodejs';

// POST /api/stripe/webhook — Stripe calls this when a Checkout Session
// completes. This is the ONLY place a registration is marked 'paid': the
// success page a browser lands on after checkout is not proof of payment (it
// can be reached by just visiting the URL), so trusting it would let anyone
// mark themselves paid for free. The webhook is server-to-server and signed.
//
// Setup required in Stripe Dashboard → Developers → Webhooks:
//   Endpoint URL: https://unitedsikhmovement.org/api/stripe/webhook
//   Event to send: checkout.session.completed
// Copy the generated signing secret into STRIPE_WEBHOOK_SECRET in Vercel.
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    // Not configured yet — ack with 200 so Stripe doesn't retry forever, but
    // log loudly since this means payments will never flip to 'paid'.
    console.error('Stripe webhook called but STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET not set.');
    return NextResponse.json({ received: true, warning: 'webhook not configured' });
  }

  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig || '', secret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const registrationId = session.metadata?.registration_id as string | undefined;

    // Wrapped defensively: Stripe being configured doesn't guarantee Supabase
    // is too, and supabaseAdmin() throws synchronously (not a rejected
    // promise) when its env vars are missing — uncaught, that would make
    // Stripe retry this webhook for days for a payment that can never be
    // marked paid. Always ack 200; the payment succeeded regardless of
    // whether our own bookkeeping did.
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Supabase env vars not configured');
      }
      const sb = supabaseAdmin();
      const { error } = registrationId
        ? await sb.from('registrations').update({ payment_status: 'paid' }).eq('id', registrationId)
        : await sb.from('registrations').update({ payment_status: 'paid' }).eq('stripe_session_id', session.id);
      if (error) throw error;
    } catch (err) {
      console.error('Failed to mark registration paid:', err, { registrationId, sessionId: session.id });
      // This is a DB-side problem to fix manually (ids logged above), not
      // something retrying the webhook delivery will resolve.
    }
  }

  return NextResponse.json({ received: true });
}
