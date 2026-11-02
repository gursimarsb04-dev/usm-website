// Blog post loading: Sanity posts merged with the in-repo articles and drafts.
//
// Precedence on a slug collision: Sanity > draft (preview only) > repo post.
// Sanity wins so an editor can take over any post; a draft wins over the repo
// post it is meant to replace (e.g. the refreshed /news/sikh-scholarships), but
// only where drafts are visible.
//
// Drafts (src/lib/blog-drafts.ts) are visible only on non-production
// deployments: Vercel preview builds and local dev. On production they are
// filtered out everywhere, so their URLs 404 and the live posts stay as they are.
import { getNews, getNewsPost } from '@/lib/sanity';
import { newsFallbacks, type NewsPost } from '@/lib/news-fallbacks';
import { blogDrafts } from '@/lib/blog-drafts';

export type BlogPost = NewsPost & { coverImage?: any; source: 'sanity' | 'repo' };

/** True everywhere except the production deployment. */
export const SHOW_DRAFTS = process.env.VERCEL_ENV !== 'production';

const byDateDesc = (a: BlogPost, b: BlogPost) =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');

function repoPosts(includeDrafts: boolean): BlogPost[] {
  const drafts = includeDrafts && SHOW_DRAFTS ? blogDrafts : [];
  const draftSlugs = new Set(drafts.map((d) => d.slug));
  return [
    ...drafts.map((p) => ({ ...p, source: 'repo' as const })),
    ...newsFallbacks.filter((p) => !draftSlugs.has(p.slug)).map((p) => ({ ...p, source: 'repo' as const })),
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
