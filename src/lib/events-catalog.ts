// Server-side events catalog. Ticket prices live HERE (never trusted from the
// client) so the registration API can re-validate the amount before charging.
// When Supabase events are wired up, this can be replaced by a DB lookup that
// returns the same shape — the API/form don't care where it comes from.

export type CatalogEvent = {
  slug: string;
  title: string;
  date: string;        // human-readable, for display ("Fall 2026")
  location: string;
  blurb: string;
  priceCents: number;  // 0 = free RSVP
  currency: string;    // 'usd'
  soldOut?: boolean;
  // Machine-readable dates for the calendar feed (/api/calendar.ics).
  // Only set these once the real date is known — an event without `startsAt`
  // is simply omitted from the feed. Do NOT try to derive these from `date`:
  // "Fall 2026" parses to Jan 1 and "August 21–23, 2026" doesn't parse at all,
  // so guessing produces either wrong entries or silently dropped ones.
  startsAt?: string;   // ISO 8601, e.g. '2026-08-21T17:00:00Z'
  endsAt?: string;     // ISO 8601
  // Past events, or ones whose next date isn't set yet. Kept in the catalog
  // (so /events/<slug>/register still resolves and old links don't 404) but
  // moved off the main Events page into /events/archive.
  archived?: boolean;
  // Some events have a bespoke landing page with a custom form — point the
  // CTA there instead of the generic /events/<slug>/register flow, so there's
  // only ever one registration path per event.
  registerPath?: string;
};

export const eventsCatalog: CatalogEvent[] = [
  {
    slug: '13hacks-2026',
    title: '13Hacks 2026',
    date: 'January 2026',
    location: 'California',
    blurb: 'The first and largest Sikh-focused hackathon in America. Mentors from Nvidia, Tesla, Rippling, Kaiser, Accenture, and GE Healthcare.',
    priceCents: 1500,
    currency: 'usd',
    archived: true, // January 2026 — already happened.
  },
  {
    slug: 'leadership-retreat-2026',
    title: 'SSA Leadership Retreat',
    date: 'Fall 2026',
    location: 'West Coast',
    blurb: 'A retreat for SSA board members to recharge, learn from each other, and head back to campus with a plan and a sangat behind them.',
    priceCents: 0, // free RSVP — demonstrates the no-payment path
    currency: 'usd',
    archived: true, // "Fall 2026" — no firm date yet, so not open for registration.
  },
  {
    slug: 'east-coast-retreat-2026',
    title: 'East Coast SSA Leadership Retreat',
    date: 'August 21–23, 2026',
    location: 'Valhalla River Haven, Pocono Mountains, PA',
    blurb: 'A leadership getaway for SSA board members across the region — workshops, sangat, and recharging together at Valhalla River Haven. Space limited to 30.',
    priceCents: 7000,
    currency: 'usd',
    // Arrival Fri Aug 21, departure Sun Aug 23 (times are placeholders —
    // adjust once the schedule is set).
    startsAt: '2026-08-21T21:00:00Z',
    endsAt: '2026-08-23T19:00:00Z',
    // Has a dedicated landing page with a richer form (carpool, dietary,
    // emergency contact) — send people there, not the generic register route.
    registerPath: '/retreat',
  },
];

export function getCatalogEvent(slug: string): CatalogEvent | undefined {
  return eventsCatalog.find((e) => e.slug === slug);
}

/** Events open for registration now — the main Events page. */
export const activeEvents = eventsCatalog.filter((e) => !e.archived);

/** Past events / dates not yet announced — /events/archive. */
export const archivedEvents = eventsCatalog.filter((e) => e.archived);

/** Where a given event's CTA should point. */
export function registerHref(e: CatalogEvent): string {
  return e.registerPath ?? `/events/${e.slug}/register`;
}

export function formatPrice(cents: number, currency = 'usd'): string {
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}
