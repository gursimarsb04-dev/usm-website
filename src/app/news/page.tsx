// News feed: mirrors Mailchimp blasts. Each post is also Ad Grants landing material.
import FadeUp from '@/components/FadeUp';
import { getNews, urlFor } from '@/lib/sanity';

export const revalidate = 600;
export const metadata = { title: 'News' };

export default async function News() {
  let posts: any[] = [];
  try { posts = await getNews(); } catch {}

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">News</h1>
        <p className="mt-3 text-lg text-teal-ink/75">From across the movement.</p>
      </FadeUp>
      <FadeUp className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-3xl bg-white border border-teal/10 overflow-hidden">
            {p.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={urlFor(p.coverImage).width(600).height(340).url()} alt="" className="w-full aspect-[16/9] object-cover" />
            )}
            <div className="p-6">
              {p.isHumansOfUSM && (
                <span className="text-[10px] uppercase tracking-widest bg-gold/40 text-teal-ink rounded-full px-3 py-1 font-semibold">
                  Humans of USM
                </span>
              )}
              <h2 className="font-display text-lg font-semibold text-teal-ink mt-2">{p.title}</h2>
              {p.excerpt && <p className="text-sm text-teal-ink/70 mt-2">{p.excerpt}</p>}
              <p className="text-xs text-teal-soft mt-3">
                {p.publishedAt && new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </article>
        ))}
        {posts.length === 0 && <p className="text-teal-soft md:col-span-3">Posts load from Sanity — add News Post documents in the Studio.</p>}
      </FadeUp>
    </div>
  );
}
