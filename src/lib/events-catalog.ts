// Server-side events catalog. Ticket prices live HERE (never trusted from the
// client) so the registration API can re-validate the amount before charging.
// When Supabase events are wired up, this can be replaced by a DB lookup that
// returns the same shape — the API/form don't care where it comes from.

export type CatalogEvent = {
  slug: string;
  title: string;
  date: string;        // human-readable
  location: string;
  blurb: string;
  priceCents: number;  // 0 = free RSVP
  currency: string;    // 'usd'
  soldOut?: boolean;
};

export const eventsCatalog: CatalogEvent[] = [
  {
    slug: 'safal-summit-2026',
    title: 'Safal Summit 2026',
    date: 'Spring 2026 · New York City',
    location: 'New York City (in partnership with SikhTeens)',
    blurb: "USM's annual professional development summit — mentors across tech, finance, healthcare, and law, including Forbes 30 Under 30 honorees.",
    priceCents: 4500,
    currency: 'usd',
  },
  {
    slug: '13hacks-2026',
    title: '13Hacks 2026',
    date: 'January 2026',
    location: 'California',
    blurb: 'The first and largest Sikh-focused hackathon in America. Mentors from Nvidia, Tesla, Rippling, Kaiser, Accenture, and GE Healthcare.',
    priceCents: 1500,
    currency: 'usd',
  },
  {
    slug: 'leadership-retreat-2026',
    title: 'SSA Leadership Retreat',
    date: 'Fall 2026',
    location: 'West Coast',
    blurb: 'A retreat for SSA board members to recharge, learn from each other, and head back to campus with a plan and a sangat behind them.',
    priceCents: 0, // free RSVP — demonstrates the no-payment path
    currency: 'usd',
  },
  {
    slug: 'east-coast-retreat-2026',
    title: 'East Coast SSA Retreat',
    date: 'August 21–23, 2026',
    location: 'Poconos Mountains, PA',
    blurb: 'SSA Collective presents the East Coast SSA Retreat — three days in the Poconos for SSA members and leaders from across the East Coast.',
    priceCents: 7000,
    currency: 'usd',
  },
];

export function getCatalogEvent(slug: string): CatalogEvent | undefined {
  return eventsCatalog.find((e) => e.slug === slug);
}

export function formatPrice(cents: number, currency = 'usd'): string {
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}
