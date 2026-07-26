import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getNewsPost, urlFor } from '@/lib/sanity';
import { newsFallbacks } from '@/lib/news-fallbacks';

export const revalidate = 600;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await resolvePost(params.slug);
  if (!post) return { title: 'Post not found' };
  return { title: post.title, description: post.excerpt };
}

// Sanity first, static seed second — same pattern as the rest of the site.
async function resolvePost(slug: string): Promise<any | null> {
  try {
    const p = await getNewsPost(slug);
    if (p) return p;
  } catch {}
  return newsFallbacks.find((p) => p.slug === slug) ?? null;
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await resolvePost(params.slug);
  if (!post) notFound();

  // Sanity stores portable text; the fallback stores plain paragraphs.
  const paragraphs: string[] = Array.isArray(post.body)
    ? post.body.map((b: any) =>
        typeof b === 'string'
          ? b
          : b?._type === 'block'
          ? (b.children ?? []).map((c: any) => c.text).join('')
          : ''
      ).filter(Boolean)
    : [];

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <FadeUp>
        <Link href="/news" className="text-sm text-teal-soft hover:text-teal">
          ← All news
        </Link>

        {post.category && (
          <p className="mt-6 text-[10px] uppercase tracking-widest text-gold-deep font-semibold">
            {post.category}
          </p>
        )}

        <h1 className="font-display text-4xl md:text-5xl font-bold text-teal mt-2 leading-tight">
          {post.title}
        </h1>

        {/* Byline — a real human is required on every post. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-teal-soft">
          {post.author && (
            <span className="font-medium text-teal-ink">{post.author}</span>
          )}
          {post.author && post.publishedAt && <span aria-hidden>·</span>}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
        </div>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(post.coverImage).width(1200).url()}
            alt=""
            className="mt-8 rounded-3xl w-full"
          />
        )}

        {post.excerpt && (
          <p className="mt-8 text-lg text-teal-ink/80 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 space-y-5 text-teal-ink/85 leading-relaxed">
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </FadeUp>
    </article>
  );
}
