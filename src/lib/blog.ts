// Blog post loading: Sanity posts merged with the in-repo articles and drafts.
//
// Precedence on a slug collision: Sanity > draft (preview only) > repo post.
// Sanity wins so an editor can take over any post; a draft wins over the repo
// post it is meant to replace (e.g. the refreshed /news/sikh-scholarships), but
// only where drafts are visible.
//
// Imported posts (src/lib/blog-drafts.ts) with draft: true are visible only on
// non-production deployments (Vercel previews, local dev); on production they
// are filtered out everywhere and their URLs 404. Published imports show
// everywhere, with review-flagged lines dropped by the renderer.
import { getNews, getNewsPost } from '@/lib/sanity';
import { newsFallbacks, type NewsPost } from '@/lib/news-fallbacks';
import { blogDrafts } from '@/lib/blog-drafts';

export type BlogPost = NewsPost & { coverImage?: any; source: 'sanity' | 'repo' };

/** True everywhere except the production deployment. */
export const SHOW_DRAFTS = process.env.VERCEL_ENV !== 'production';

const byDateDesc = (a: BlogPost, b: BlogPost) =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');

function repoPosts(includeDrafts: boolean): BlogPost[] {
  // Imported posts (blog-drafts.ts): published ones always, drafts only where
  // drafts are visible. An imported post replaces an older post at its URL.
  const imported = blogDrafts.filter((p) => !p.draft || (includeDrafts && SHOW_DRAFTS));
  const importedSlugs = new Set(imported.map((d) => d.slug));
  return [
    ...imported.map((p) => ({ ...p, source: 'repo' as const })),
    ...newsFallbacks.filter((p) => !importedSlugs.has(p.slug)).map((p) => ({ ...p, source: 'repo' as const })),
  ];
}

/**
 * All visible posts, newest first. Drafts only when `includeDrafts` is set AND
 * this isn't production; they sort first so they're easy to find in review.
 */
export async function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): Promise<BlogPost[]> {
  let cms: BlogPost[] = [];
  try {
    cms = ((await getNews(100)) ?? []).map((p: any) => ({ ...p, source: 'sanity' as const }));
  } catch {}
  const taken = new Set(cms.map((p) => p.slug));
  const all = [...cms, ...repoPosts(includeDrafts).filter((p) => !taken.has(p.slug))];
  // Stable sort: same-day posts keep their authored order.
  return all.sort((a, b) => (a.draft === b.draft ? byDateDesc(a, b) : a.draft ? -1 : 1));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const p = await getNewsPost(slug);
    if (p) return { ...p, source: 'sanity' };
  } catch {}
  return repoPosts(true).find((p) => p.slug === slug) ?? null;
}

/**
 * Three related posts: the editor's suggested internal links first, then the
 * same topic cluster, then the same category, then the newest.
 */
export function relatedPosts(post: BlogPost, all: BlogPost[], count = 3): BlogPost[] {
  const pool = all.filter((p) => p.slug !== post.slug);
  const picked: BlogPost[] = [];
  const add = (p?: BlogPost) => {
    if (p && !picked.some((x) => x.slug === p.slug) && picked.length < count) picked.push(p);
  };
  for (const href of post.internalLinks ?? []) {
    if (href.startsWith('/news/')) add(pool.find((p) => p.slug === href.slice(6)));
  }
  if (post.cluster) pool.filter((p) => p.cluster === post.cluster).forEach(add);
  if (post.category) pool.filter((p) => p.category === post.category).forEach(add);
  pool.forEach(add);
  return picked;
}
