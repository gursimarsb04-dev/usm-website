// Blog post loading: Sanity posts merged with the in-repo articles. Sanity
// wins on a slug collision (so an editor can take over any post), but the repo
// articles never disappear just because Sanity has *some* posts — previously
// a single Sanity post hid every seed post.
import { getNews, getNewsPost } from '@/lib/sanity';
import { newsFallbacks, type NewsPost } from '@/lib/news-fallbacks';

export type BlogPost = NewsPost & { coverImage?: any; source: 'sanity' | 'repo' };

const byDateDesc = (a: BlogPost, b: BlogPost) =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');

export async function getAllPosts(): Promise<BlogPost[]> {
  let cms: BlogPost[] = [];
  try {
    cms = ((await getNews(100)) ?? []).map((p: any) => ({ ...p, source: 'sanity' as const }));
  } catch {}
  const taken = new Set(cms.map((p) => p.slug));
  const repo = newsFallbacks
    .filter((p) => !taken.has(p.slug))
    .map((p) => ({ ...p, source: 'repo' as const }));
  // Stable sort: same-day posts keep their authored order.
  return [...cms, ...repo].sort(byDateDesc);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const p = await getNewsPost(slug);
    if (p) return { ...p, source: 'sanity' };
  } catch {}
  const f = newsFallbacks.find((p) => p.slug === slug);
  return f ? { ...f, source: 'repo' } : null;
}
