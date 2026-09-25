import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import ArticleBody from '@/components/ArticleBody';
import BlogSignup from '@/components/BlogSignup';
import { urlFor } from '@/lib/sanity';
import { getAllPosts, getPost, type BlogPost } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export const revalidate = 600;

function coverUrl(post: BlogPost, width = 1200): string | null {
  if (post.coverImage) return urlFor(post.coverImage).width(width).url();
  return post.coverImageUrl ?? null;
}

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post not found' };
  const title = post.seoTitle ?? post.title;
  const image = coverUrl(post);
  return {
    // `absolute` so long SEO titles aren't pushed past Google's cutoff by the
    // site-name suffix from the root template.
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: post.excerpt,
      url: `/news/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: image ? [image] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description: post.excerpt, images: image ? [image] : undefined },
  };
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const cover = coverUrl(post);
  const cta: { heading?: string; body?: string } = post.cta ?? {};
  const midSignup = <BlogSignup slug={post.slug} placement="mid" heading={cta.heading} body={cta.body} />;

  // Article structured data — eligible for Google's article rich results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: cover ? [cover.startsWith('http') ? cover : `${SITE_URL}${cover}`] : undefined,
    author: { '@type': 'Organization', name: 'United Sikh Movement', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'United Sikh Movement',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/news/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FadeUp>
        <Link href="/news" className="text-sm text-teal-soft hover:text-teal">
          ← All posts
        </Link>

        {post.category && (
          <p className="mt-6 text-[10px] uppercase tracking-widest text-gold-deep font-semibold">
            {post.category}
          </p>
        )}

        <h1 className="font-display text-4xl md:text-5xl font-bold text-teal mt-2 leading-tight">
          {post.title}
        </h1>

        {/* Byline — a named author is required on every post. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-teal-soft">
          {post.author && <span className="font-medium text-teal-ink">{post.author}</span>}
          {post.author && post.publishedAt && <span aria-hidden>·</span>}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
          )}
        </div>

        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="mt-8 rounded-3xl w-full aspect-[16/9] object-cover" />
        )}

        {post.excerpt && (
          <p className="mt-8 text-lg text-teal-ink/80 leading-relaxed font-medium">{post.excerpt}</p>
        )}
      </FadeUp>

      <div className="mt-6">
        {post.markdown ? (
          <ArticleBody markdown={post.markdown} signup={midSignup} />
        ) : (
          <ArticleBody blocks={Array.isArray(post.body) ? post.body : []} />
        )}
      </div>

      <BlogSignup slug={post.slug} placement="end" heading={cta.heading} body={cta.body} />
    </article>
  );
}
