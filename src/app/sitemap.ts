// /sitemap.xml — every public page Google should index. Blog posts, programs,
// and SSA chapter pages are pulled live so new content shows up automatically.
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import { programFallbacks } from '@/lib/program-fallbacks';
import { supabasePublic } from '@/lib/supabase-public';
import { ssaFallbacks } from '@/lib/ssa-fallback';

export const revalidate = 3600;

const STATIC_ROUTES = [
  '', '/about', '/programs', '/ssas', '/start-an-ssa', '/events', '/west-coast-conference',
  '/retreat', '/news', '/resources', '/guides/sikhi-101', '/opportunities', '/impact',
  '/podcast', '/gallery', '/partners', '/donate', '/contact',
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

  let ssaSlugs: string[] = [];
  try {
    const { data } = await supabasePublic().from('ssas').select('slug').neq('status', 'inactive');
    ssaSlugs = (data ?? []).map((s: any) => s.slug).filter(Boolean);
  } catch {}
  if (!ssaSlugs.length) ssaSlugs = ssaFallbacks.map((s) => s.slug).filter(Boolean) as string[];
  for (const slug of ssaSlugs) entries.push({ url: `${SITE_URL}/ssas/${slug}`, lastModified: now, priority: 0.4 });

  return entries;
}
