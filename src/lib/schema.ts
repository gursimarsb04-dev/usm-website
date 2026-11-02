// schema.org structured data built strictly from data the site already has.
// Fields we don't have are omitted rather than guessed.
import { SITE_URL, SOCIALS, EIN, CONTACT_EMAIL } from '@/lib/site';
import { registerHref, type CatalogEvent } from '@/lib/events-catalog';
import type { CalendarEvent } from '@/lib/calendar';
import type { Chapter } from '@/lib/chapters';

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

const CA_PROVINCES = new Set(['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK']);

/**
 * A chapter page (spec: content-import/ssa/landing_page_plan.md): the SSA as an
 * Organization under USM, located at its school, with its verified Instagram.
 */
export function chapterSchema(c: Chapter) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: c.displayName,
    url: abs(`/ssas/${c.slug}`),
    ...(c.instagram ? { sameAs: [c.instagram.url] } : {}),
    parentOrganization: { '@type': 'NGO', name: 'United Sikh Movement', url: SITE_URL },
    location: {
      '@type': 'Place',
      name: c.school,
      ...(c.city || c.state
        ? {
            address: {
              '@type': 'PostalAddress',
              ...(c.city ? { addressLocality: c.city } : {}),
              ...(c.state ? { addressRegion: c.state, addressCountry: CA_PROVINCES.has(c.state) ? 'CA' : 'US' } : {}),
            },
          }
        : {}),
    },
  };
}

/** Breadcrumb trail; each item is [name, path]. */
export function breadcrumbSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
  };
}

/** FAQPage from plain-text question/answer pairs. Only for FAQs visible on the page. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}
