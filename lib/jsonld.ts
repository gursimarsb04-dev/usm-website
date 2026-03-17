export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "United Sikh Movement",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://unitedsikh.org",
    description: "America's largest Sikh student network. Connecting Sikh student organizations across the country.",
    nonprofitStatus: "Nonprofit501c3",
  };
}

export function eventJsonLd(event: {
  title: string;
  date: string;
  location: string;
  eventbriteUrl?: string;
  slug: { current: string };
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unitedsikh.org";
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: { "@type": "Place", name: event.location },
    url: event.eventbriteUrl || `${siteUrl}/events/${event.slug.current}`,
    organizer: { "@type": "Organization", name: "United Sikh Movement" },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unitedsikh.org";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
