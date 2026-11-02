// "From the blog": the three newest posts, for internal linking from the
// homepage and /programs. Same merged source as /news (Sanity + repo posts).
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/Card';
import FadeUp from '@/components/FadeUp';
import { SectionHeading } from '@/components/Section';
import { getAllPosts } from '@/lib/blog';
import { urlFor } from '@/lib/sanity';

export default async function LatestPosts({ count = 3 }: { count?: number }) {
  const posts = (await getAllPosts()).slice(0, count);
  if (!posts.length) return null;

  return (
    <FadeUp>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading>From the blog</SectionHeading>
        <Link href="/news" className="text-sm font-semibold text-teal underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep">
          All posts →
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => {
          const cover = p.coverImage ? urlFor(p.coverImage).width(600).height(340).url() : p.coverImageUrl;
          return (
            <Card key={p.slug} interactive padded={false} className="flex flex-col">
              {cover && (
                <div className="relative w-full aspect-[16/9]">
                  {/* alt="" on purpose: the linked title sits right below. */}
                  <Image src={cover} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
              )}
              <div className="p-6">
                {p.category && (
                  <span className="text-[10px] uppercase tracking-widest bg-gold/40 text-teal-ink rounded-full px-3 py-1 font-semibold">
                    {p.category}
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-teal-ink mt-2">
                  <Link href={`/news/${p.slug}`} className="hover:text-teal">
                    {p.title}
                  </Link>
                </h3>
                {p.excerpt && <p className="text-sm text-teal-ink/70 mt-2 line-clamp-3">{p.excerpt}</p>}
              </div>
            </Card>
          );
        })}
      </div>
    </FadeUp>
  );
}
