// News feed. Also doubles as Ad Grants landing material.
// Sanity wins when configured; the seed post keeps the page real until then.
import FadeUp from '@/components/FadeUp';
import { getNews, urlFor } from '@/lib/sanity';
import { newsFallbacks } from '@/lib/news-fallbacks';
import NewsList from './NewsList';

export const revalidate = 600;
export const metadata = {
  title: 'News',
  description:
    'Stories from across the United Sikh Movement network — career journeys, hackathons, student research, and campus advocacy.',
};

export default async function News() {
  let posts: any[] = [];
  try {
    posts = (await getNews()) ?? [];
  } catch {}

  // Resolve Sanity image refs on the server; the client list just takes a URL.
  posts = posts.map((p) => ({
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(600).height(340).url() : null,
  }));

  if (posts.length === 0) posts = newsFallbacks as any[];

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">News</h1>
        <p className="mt-3 text-lg text-teal-ink/75">From across the movement.</p>
      </FadeUp>

      <FadeUp>
        <NewsList posts={posts} />
      </FadeUp>
    </div>
  );
}
