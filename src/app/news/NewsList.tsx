'use client';
// Client half of /news: owns the category filter, renders the card grid.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FilterPills from '@/components/FilterPills';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
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
          <Card key={p.slug} interactive padded={false} className="flex flex-col">
            {p.coverImageUrl && (
              // `fill` + `sizes` so Next serves a correctly-sized, lazy-loaded
              // image per breakpoint. alt="" is deliberate: the post title sits
              // directly below, so describing the image repeats it.
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={p.coverImageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
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
          </Card>
        ))}
      </div>

      {shown.length === 0 && (
        <EmptyState
          className="mt-8"
          title="No posts in this category yet"
          body="Stories from across the movement — chapter wins, student research, and guest speakers — land here as they're published."
          actionLabel="Read all stories →"
          actionHref="/news"
        />
      )}
    </>
  );
}
