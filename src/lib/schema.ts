// schema.org structured data built strictly from data the site already has.
// Fields we don't have are omitted rather than guessed.
import { SITE_URL, SOCIALS, EIN, CONTACT_EMAIL } from '@/lib/site';
import { registerHref, type CatalogEvent } from '@/lib/events-catalog';
import type { CalendarEvent } from '@/lib/calendar';
import type { SSA } from '@/lib/types';

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

const USM_REF = { '@type': 'Organization', name: 'United Sikh Movement', url: SITE_URL };

/** Homepage: USM itself. A 501(c)(3), so it carries nonprofitStatus + taxID. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'United Sikh Movement',
    alternateName: 'USM',
    url: SITE_URL,
    logo: abs('/logo.png'),
    email: CONTACT_EMAIL,
    nonprofitStatus: 'Nonprofit501c3',
    taxID: EIN,
    sameAs: SOCIALS.map((s) => s.href),
  };
}

// The site stores one free-text location per event, so it fills both the
// place name and its address (Google requires `address` on a Place).
function place(location: string | null | undefined) {
  if (!location) return undefined;
  return { '@type': 'Place', name: location, address: location };
}

/** A USM national event from the server-side catalog. */
export function catalogEventSchema(e: CatalogEvent) {
  if (!e.startsAt) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    startDate: e.startsAt,
    ...(e.endsAt ? { endDate: e.endsAt } : {}),
    ...(e.blurb ? { description: e.blurb } : {}),
    ...(place(e.location) ? { location: place(e.location) } : {}),
    url: abs(registerHref(e)),
    organizer: USM_REF,
    ...(e.priceCents > 0
      ? { offers: { '@type': 'Offer', price: (e.priceCents / 100).toFixed(2), priceCurrency: e.currency.toUpperCase(), url: abs(registerHref(e)) } }
      : {}),
  };
}

/** A calendar entry (chapter event from Supabase, or a catalog event). */
export function calendarEventSchema(e: CalendarEvent, catalog?: CatalogEvent) {
  if (catalog) return catalogEventSchema(catalog);
  const url = e.registerUrl ?? (e.chapterSlug ? `/ssas/${e.chapterSlug}` : '/events');
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    startDate: e.startsAt,
    ...(e.endsAt ? { endDate: e.endsAt } : {}),
    ...(place(e.location) ? { location: place(e.location) } : {}),
    url: abs(url),
    organizer: e.chapter && e.chapterSlug
      ? { '@type': 'Organization', name: e.chapter, url: abs(`/ssas/${e.chapterSlug}`) }
      : USM_REF,
  };
}

/** A chapter page: the SSA, its school, and its place in the USM network. */
export function chapterSchema(s: SSA) {
  const handle = s.instagram_handle?.replace('@', '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: s.name,
    url: abs(`/ssas/${s.slug}`),
    ...(s.school ? { parentOrganization: { '@type': 'CollegeOrUniversity', name: s.school } } : {}),
    memberOf: USM_REF,
    ...(s.city || s.state
      ? { address: { '@type': 'PostalAddress', ...(s.city ? { addressLocality: s.city } : {}), ...(s.state ? { addressRegion: s.state } : {}) } }
      : {}),
    ...(handle ? { sameAs: [`https://www.instagram.com/${handle}/`] } : {}),
  };
}
