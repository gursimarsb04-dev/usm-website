import Stripe from 'stripe';

// Lazy Stripe client — returns null when STRIPE_SECRET_KEY is not configured,
// so registration works as a free RSVP today and becomes paid ticketing the
// moment keys are added (no code change to go live). Mirrors supabase-admin.
let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  cached = key ? new Stripe(key) : null;
  return cached;
}
