// /sitemap.xml: every public page Google should index (noindexed pages are left out). Blog posts, programs,
// and SSA chapter pages are pulled live so new content shows up automatically.
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import { programFallbacks } from '@/lib/program-fallbacks';
import { getAllChapters } from '@/lib/chapters';

export const revalidate = 3600;

const STATIC_ROUTES = [
  '', '/about', '/programs', '/ssas', '/start-an-ssa', '/events', '/west-coast-conference',
  '/retreat', '/news', '/resources', '/opportunities', '/impact',
  '/gallery', '/partners', '/donate', '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: now,
    priority: r === '' ? 1 : r === '/news' ? 0.8 : 0.6,
  }));

  for (const p of await getAllPosts()) {
    entries.push({
      url: `${SITE_URL}/news/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      priority: 0.7,
    });
  }

  for (const p of programFallbacks.filter((p) => !p.hidden)) {
    entries.push({ url: `${SITE_URL}/programs/${p.slug}`, lastModified: now, priority: 0.5 });
  }

  // Only chapter pages that are indexable (same rule as the page's robots tag),
  // plus a claimed chapter's programs page when it has content.
  for (const c of await getAllChapters()) {
    if (!c.indexable) continue;
    entries.push({ url: `${SITE_URL}/ssas/${c.slug}`, lastModified: now, priority: 0.4 });
    if (c.details?.programs_content) {
      entries.push({ url: `${SITE_URL}/ssas/${c.slug}/programs`, lastModified: now, priority: 0.3 });
    }
  }

  return entries;
}
