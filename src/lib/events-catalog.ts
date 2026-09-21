// Server-side events catalog. Ticket prices live HERE (never trusted from the
// client) so the registration API can re-validate the amount before charging.
// When Supabase events are wired up, this can be replaced by a DB lookup that
// returns the same shape — the API/form don't care where it comes from.

// A dated pricing window (Early Bird / Regular / Late), or a flat rate with no
// date window at all (e.g. a "no hotel" option available the whole time).
// `opensAt`/`closesAt` omitted = unbounded on that side.
export type TicketTier = {
  id: string;
  label: string;
  priceCents: number;
  opensAt?: string;  // ISO 8601, inclusive
  closesAt?: string; // ISO 8601, exclusive
};

export type CatalogEvent = {
  slug: string;
  title: string;
  date: string;        // human-readable, for display ("Fall 2026")
  location: string;
  blurb: string;
  priceCents: number;  // 0 = free RSVP. Fallback/display price when `tiers` isn't set.
  currency: string;    // 'usd'
  soldOut?: boolean;
  // Multiple simultaneous price points (Early Bird/Regular/Late, or a flat
  // no-date-window option) instead of one flat priceCents. When set, the API
  // resolves the correct tier server-side via resolveTier() — never trust a
  // client-submitted tier id for price, only for *which* tier they're asking for.
  tiers?: TicketTier[];
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
    slug: 'west-coast-conference-2026',
    title: 'West Coast Conference',
    date: 'November 6–8, 2026',
    location: 'University of Southern California',
    blurb: 'USM\'s West Coast conference — speakers, workshops, and sangat from across the network, hosted at USC.',
    priceCents: 10000, // Early Bird, for display before a tier is resolved
    currency: 'usd',
    startsAt: '2026-11-06T18:00:00Z',
    endsAt: '2026-11-08T22:00:00Z',
    tiers: [
      // "Early Bird - now until the 26th" — closes at the start of Sept 26 Pacific.
      { id: 'early_bird', label: 'Early Bird', priceCents: 10000, closesAt: '2026-09-26T07:00:00Z' },
      // "Regular - Sept 26 - Oct 17" — through end of day Oct 17 Pacific.
      { id: 'regular', label: 'Regular', priceCents: 12500, opensAt: '2026-09-26T07:00:00Z', closesAt: '2026-10-18T07:00:00Z' },
      // "Late - Oct 18 - Oct 24th" — through end of day Oct 24 Pacific.
      { id: 'late', label: 'Late', priceCents: 15000, opensAt: '2026-10-18T07:00:00Z', closesAt: '2026-10-25T07:00:00Z' },
      // "No Hotel Ticket ($60)" — flat rate, no date window. Selected when the
      // attendee says they don't need housing, instead of picking a date tier.
      { id: 'no_hotel', label: 'No Hotel', priceCents: 6000 },
    ],
    // Has a dedicated landing page with a richer form (school/major, housing +
    // roommate matching, waivers) — send people there, not the generic register route.
    registerPath: '/west-coast-conference',
  },
  {
    slug: 'west-coast-retreat-2026',
    title: 'West Coast SSA Leadership Retreat',
    date: 'October 23, 2026',
    location: 'Sierra Nevada Mountains, CA',
    blurb: 'A leadership getaway for SSA board members across the region — workshops, sangat, and recharging together in the Sierra Nevada Mountains. Space limited to 30.',
    priceCents: 7000,
    currency: 'usd',
    // Single-day event, Oct 23 (times are placeholders — adjust once the
    // schedule is set).
    startsAt: '2026-10-23T16:00:00Z',
    endsAt: '2026-10-24T01:00:00Z',
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

/**
 * Resolve which ticket tier applies right now — the ONLY place price is
 * decided for a tiered event. Never trust a client-submitted tier id for
 * price; this is what the API calls server-side to compute the real amount.
 *
 * `noHousing: true` selects the flat no-date-window tier (id `no_hotel`) if
 * one exists, bypassing the date-based tiers entirely. Otherwise picks the
 * date tier whose [opensAt, closesAt) window contains `now`.
 */
export function resolveTier(
  event: CatalogEvent,
  opts: { noHousing?: boolean } = {},
  now: Date = new Date()
): TicketTier | null {
  if (!event.tiers?.length) return null;
  const nowMs = now.getTime();

  if (opts.noHousing) {
    return event.tiers.find((t) => t.id === 'no_hotel') ?? null;
  }
  return (
    event.tiers.find((t) => {
      if (t.id === 'no_hotel') return false; // only selected explicitly above
      const afterOpen = !t.opensAt || nowMs >= new Date(t.opensAt).getTime();
      const beforeClose = !t.closesAt || nowMs < new Date(t.closesAt).getTime();
      return afterOpen && beforeClose;
    }) ?? null
  );
}
