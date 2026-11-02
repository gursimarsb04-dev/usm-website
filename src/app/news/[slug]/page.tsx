import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import ArticleBody, { extractToc, REVIEW_FLAG, type FlagMode } from '@/components/ArticleBody';
import BlogSignup from '@/components/BlogSignup';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import { urlFor } from '@/lib/sanity';
import { getAllPosts, getPost, relatedPosts, type BlogPost } from '@/lib/blog';
import { programFallbacks } from '@/lib/program-fallbacks';
import { faqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export const revalidate = 600;

function coverUrl(post: BlogPost, width = 1200): string | null {
  if (post.coverImage) return urlFor(post.coverImage).width(width).url();
  return post.coverImageUrl ?? null;
}

const stripFlags = (s: string) => s.replace(/\s*\[(NEEDS GURSIMAR REVIEW|VERIFY)[^\]]*\]/g, '').trim();

// Friendly labels for suggested internal links that aren't blog posts.
const PAGE_LABELS: Record<string, string> = {
  '/guides/sikhi-101': 'Sikhi 101: a plain-language introduction',
  '/events': 'Upcoming USM events',
  '/start-an-ssa': 'Start an SSA at your school',
  '/ssas': 'Find the SSA on your campus',
  '/donate': 'Support Sikh students',
  '/impact': 'What USM built this year',
  '/programs': 'USM programs',
  '/opportunities': 'Opportunities for Sikh students',
};

export async function generateStaticParams() {
  return (await getAllPosts({ includeDrafts: true })).map((p) => ({ slug: p.slug }));
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
    // Drafts are preview-only and must never be indexed.
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
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

function Autolink({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^https?:\/\//.test(p) ? (
          <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="break-all text-teal underline underline-offset-2 hover:text-gold-deep">
            {p}
          </a>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function TodoBadge({ text }: { text: string }) {
  return (
    <span className="mr-2 inline-block rounded bg-amber-400 px-1.5 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-amber-950">
      TODO: {/NEEDS GURSIMAR REVIEW/.test(text) ? 'review' : 'verify'}
    </span>
  );
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  // Drafts show review markers as visible TODOs; anything published drops them.
  const flags: FlagMode = post.draft ? 'todo' : 'hide';
  const all = await getAllPosts({ includeDrafts: true });
  const visible = new Map(all.map((p) => [p.slug, p]));

  const cover = coverUrl(post);
  const cta: { heading?: string; body?: string } = post.cta ?? {};
  const midSignup = <BlogSignup slug={post.slug} placement="mid" heading={cta.heading} body={cta.body} />;
  const toc = post.markdown ? extractToc(post.markdown, flags) : [];
  const showToc = toc.length >= 4;

  const faq = (post.faq ?? []).filter((f) => flags === 'todo' || !f.flagged);
  const sources = (post.sources ?? []).filter((s) => flags === 'todo' || !REVIEW_FLAG.test(s));
  const moreLinks = (post.internalLinks ?? [])
    .map((href) => {
      if (href.startsWith('/news/')) {
        const p = visible.get(href.slice(6));
        return p ? { href, label: p.title } : null;
      }
      if (href.startsWith('/programs/')) {
        const prog = programFallbacks.find((x) => x.slug === href.slice(10) && !x.hidden);
        return prog ? { href, label: prog.title } : null;
      }
      return PAGE_LABELS[href] ? { href, label: PAGE_LABELS[href] } : null;
    })
    .filter(Boolean) as { href: string; label: string }[];
  const related = relatedPosts(post, all.filter((p) => p.draft === post.draft || !p.draft));

  // Article structured data, plus FAQPage for the visible, unflagged FAQ.
  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(cover ? { image: [cover.startsWith('http') ? cover : `${SITE_URL}${cover}`] } : {}),
      ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
      author: { '@type': 'Organization', name: 'United Sikh Movement', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'United Sikh Movement',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: `${SITE_URL}/news/${post.slug}`,
    },
  ];
  const schemaFaq = (post.faq ?? []).filter((f) => !f.flagged);
  if (schemaFaq.length) jsonLd.push(faqSchema(schemaFaq.map((f) => ({ q: f.q, a: stripFlags(f.a) }))));

  return (
    <article className="px-5 py-14">
      <JsonLd data={jsonLd} />

      {/* One grid for the whole post: the contents list gets its own sticky
          column on wide screens, and the header and body share the other
          column, so the title, intro and article text all line up. */}
      <div className={`mx-auto ${showToc ? 'max-w-5xl lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14' : 'max-w-3xl'}`}>
        {showToc && (
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28 pt-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-soft">On this page</p>
              <ol className="mt-3 space-y-1 border-l border-teal/15 text-sm leading-snug">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-teal-ink/70 hover:border-gold hover:text-teal">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}

        <div className="min-w-0">
      {/* ── Header ── */}
      <header className="max-w-3xl">
        <FadeUp>
          <Link href="/news" className="text-sm text-teal-soft hover:text-teal">
            ← All posts
          </Link>

          {post.draft && (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5 text-sm text-amber-950">
              <p className="font-bold uppercase tracking-wider">Draft: preview only, not published</p>
              <p className="mt-1">
                Highlighted TODO blocks are lines marked for review. They are hidden automatically if this post is
                published.
                {post.flagCounts && (
                  <> This post has {post.flagCounts.review} &ldquo;needs Gursimar review&rdquo; and {post.flagCounts.verify} &ldquo;verify&rdquo; lines.</>
                )}
              </p>
              {post.publishingNote && <p className="mt-2"><span className="font-semibold">Editor note:</span> {post.publishingNote}</p>}
              {post.sourceFile && <p className="mt-1 text-amber-900/70">Source: content-import/posts/{post.sourceFile}</p>}
            </div>
          )}

          {post.category && (
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-gold-deep">{post.category}</p>
          )}
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-teal md:text-5xl">{post.title}</h1>

          {/* Byline: a named author is required on every post. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-teal-soft">
            {post.author && <span className="font-medium text-teal-ink">{post.author}</span>}
            {post.author && post.publishedAt && <span aria-hidden>·</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
              </time>
            )}
          </div>

          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover" />
          )}
          {post.excerpt && <p className="mt-8 text-lg font-medium leading-relaxed text-teal-ink/80">{post.excerpt}</p>}
        </FadeUp>
      </header>

      {/* ── Body: readable column ── */}
      <div className="mt-6">
        {showToc && (
          <details className="mb-6 rounded-2xl border border-teal/10 bg-mist/50 px-5 py-3 lg:hidden">
            <summary className="cursor-pointer font-display font-semibold text-teal">On this page</summary>
            <ol className="mt-3 space-y-2 pb-2 text-sm">
              {toc.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-teal-ink/75 hover:text-teal">{t.text}</a></li>
              ))}
            </ol>
          </details>
        )}

        <div className="max-w-[68ch]">
          {post.markdown ? (
            <ArticleBody markdown={post.markdown} signup={midSignup} flags={flags} />
          ) : (
            <ArticleBody blocks={Array.isArray(post.body) ? post.body : []} />
          )}

          {/* ── More on USM (editor-suggested internal links) ── */}
          {moreLinks.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-teal">More on USM</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {moreLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block h-full rounded-2xl border border-teal/10 bg-white px-4 py-3 text-sm font-semibold text-teal-ink transition-colors hover:border-gold hover:text-teal">
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── FAQ ── */}
          {faq.length > 0 && (
            <section className="mt-12" id="faq">
              <h2 className="font-display text-2xl font-bold text-teal md:text-3xl">Frequently asked questions</h2>
              <div className="mt-5">
                <FaqAccordion
                  items={faq.map((f) => ({
                    q: stripFlags(f.q),
                    a: f.flagged ? <><TodoBadge text={f.q + f.a} />{stripFlags(f.a)}</> : f.a,
                  }))}
                />
              </div>
            </section>
          )}

          {/* ── CTA box ── */}
          <section className="mt-12 rounded-3xl bg-teal p-6 text-white md:p-8">
            <h2 className="font-display text-2xl font-bold">Find your sangat</h2>
            <p className="mt-2 text-white/75">Sikh students across the country are building community on campus. Here is how to plug in.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href="/start-an-ssa" className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/20">
                <div className="font-display font-semibold text-gold">Start an SSA</div>
                <div className="mt-1 text-sm text-white/75">No SSA at your school? We will help.</div>
              </Link>
              <a href="#newsletter" className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/20">
                <div className="font-display font-semibold text-gold">Join the newsletter</div>
                <div className="mt-1 text-sm text-white/75">Events and opportunities in your inbox.</div>
              </a>
              <Link href="/events" className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/20">
                <div className="font-display font-semibold text-gold">Events</div>
                <div className="mt-1 text-sm text-white/75">Conferences, retreats, and chapter events.</div>
              </Link>
            </div>
          </section>

          <div id="newsletter" className="scroll-mt-28">
            <BlogSignup slug={post.slug} placement="end" heading={cta.heading} body={cta.body} />
          </div>

          {/* ── Sources ── */}
          {sources.length > 0 && (
            <section className="mt-10 border-t border-teal/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-teal-soft">Sources</h2>
              <ul className="mt-3 space-y-2 text-sm text-teal-ink/75">
                {sources.map((s, i) => (
                  <li key={i} className={REVIEW_FLAG.test(s) ? 'rounded-lg bg-amber-50 px-2 py-1' : undefined}>
                    {REVIEW_FLAG.test(s) && <TodoBadge text={s} />}
                    <Autolink text={stripFlags(s)} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
        </div>
      </div>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl border-t border-teal/10 pt-10">
          <h2 className="font-display text-2xl font-bold text-teal">Keep reading</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/news/${r.slug}`} className="group rounded-3xl border border-teal/10 bg-white p-5 transition-colors hover:border-gold">
                {r.category && <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-deep">{r.category}</span>}
                <h3 className="mt-1 font-display text-lg font-semibold text-teal-ink group-hover:text-teal">{r.title}</h3>
                {r.excerpt && <p className="mt-2 line-clamp-3 text-sm text-teal-ink/70">{r.excerpt}</p>}
                {r.draft && <span className="mt-3 inline-block rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-900">Draft</span>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
