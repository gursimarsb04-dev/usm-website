// News feed. Also doubles as Ad Grants landing material.
// Sanity wins when configured; the seed post keeps the page real until then.
import FadeUp from '@/components/FadeUp';
import { urlFor } from '@/lib/sanity';
import { getAllPosts } from '@/lib/blog';
import NewsList from './NewsList';

export const revalidate = 600;
export const metadata = {
  title: 'Blog',
  description:
    'Guides and stories for Sikh students — scholarships, careers, hackathons, Sikhi, and events from across the United Sikh Movement network.',
  alternates: { canonical: '/news' },
};

export default async function News() {
  // Sanity + in-repo posts, merged. Resolve Sanity image refs on the server;
  // the client list just takes a URL (repo posts already carry one).
  const posts = (await getAllPosts()).map(({ markdown, body, ...p }) => ({
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(600).height(340).url() : p.coverImageUrl ?? null,
  }));

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Blog</h1>
        <p className="mt-3 text-lg text-teal-ink/75">Guides, stories, and events from across the movement.</p>
      </FadeUp>

      <FadeUp>
        <NewsList posts={posts} />
      </FadeUp>
    </div>
  );
}
