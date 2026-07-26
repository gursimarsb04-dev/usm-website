'use client';
// Client half of /news: owns the category filter, renders the card grid.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import FilterPills from '@/components/FilterPills';
import { NEWS_CATEGORIES } from '@/lib/news-fallbacks';

export default function NewsList({ posts }: { posts: any[] }) {
  const [cat, setCat] = useState<string | null>(null);

  // Only show filters for categories that actually have posts.
  const { present, counts } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of posts) if (p.category) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return { present: NEWS_CATEGORIES.filter((c) => counts[c]), counts };
  }, [posts]);

  const shown = cat ? posts.filter((p) => p.category === cat) : posts;

  return (
    <>
      {present.length > 1 && (
        <div className="mt-8">
          <FilterPills options={[...present]} counts={counts} onChange={setCat} />
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {shown.map((p) => (
          <article
            key={p.slug}
            className="rounded-3xl bg-white border border-teal/10 overflow-hidden hover:border-gold transition-colors"
          >
            {p.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.coverImageUrl} alt="" className="w-full aspect-[16/9] object-cover" />
            )}
            <div className="p-6">
              {p.category && (
                <span className="text-[10px] uppercase tracking-widest bg-gold/40 text-teal-ink rounded-full px-3 py-1 font-semibold">
                  {p.category}
                </span>
              )}
              <h2 className="font-display text-lg font-semibold text-teal-ink mt-2">
                <Link href={`/news/${p.slug}`} className="hover:text-teal">
                  {p.title}
                </Link>
              </h2>
              {p.excerpt && <p className="text-sm text-teal-ink/70 mt-2">{p.excerpt}</p>}
              <p className="text-xs text-teal-soft mt-3">
                {p.author && <span className="text-teal-ink/70">{p.author}</span>}
                {p.author && p.publishedAt && ' · '}
                {p.publishedAt &&
                  new Date(p.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
              </p>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-8 text-teal-soft">No posts in this category yet.</p>
      )}
    </>
  );
}
