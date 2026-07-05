// USM Wrapped — a shareable, story-style recap of an SSA's year.
// Designed to be screenshotted: bold numbers, the senior quote, phulkari frame.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import StatCounter from '@/components/StatCounter';
import Phulkari from '@/components/Phulkari';
import { supabasePublic } from '@/lib/supabase-public';
import type { SSA, Wrapped } from '@/lib/types';

export const revalidate = 300;

export default async function WrappedPage({ params }: { params: { slug: string } }) {
  const sb = supabasePublic();
  const { data: ssa } = await sb.from('ssas').select('*').eq('slug', params.slug).single();
  if (!ssa) notFound();
  const s = ssa as SSA;

  const { data } = await sb
    .from('wrapped_submissions')
    .select('*')
    .eq('ssa_id', s.id)
    .eq('published', true)
    .order('school_year', { ascending: false })
    .limit(1);
  const w = data?.[0] as Wrapped | undefined;
  if (!w) notFound();

  const photos: string[] = Array.isArray(w.photo_urls) ? w.photo_urls : [];

  return (
    <div className="bg-teal-ink min-h-screen text-white">
      {/* Story-style column — screenshot-friendly on mobile */}
      <div className="mx-auto max-w-md px-6 py-16 space-y-16">
        <FadeUp className="text-center">
          <Phulkari className="text-gold/50 mb-8" />
          <p className="font-display tracking-[0.3em] uppercase text-gold text-xs">USM Wrapped</p>
          <h1 className="font-display text-4xl font-bold mt-3">{s.name}</h1>
          <p className="text-white/60 mt-1">{w.school_year}</p>
        </FadeUp>

        <FadeUp className="space-y-12">
          {w.events_held != null && (
            <div className="text-center">
              <StatCounter value={w.events_held} label="events held" />
            </div>
          )}
          {w.member_count != null && (
            <div className="text-center">
              <StatCounter value={w.member_count} label="members strong" />
            </div>
          )}
          {w.seva_hours != null && (
            <div className="text-center">
              <StatCounter value={w.seva_hours} label="hours of seva" />
            </div>
          )}
        </FadeUp>

        {w.biggest_moment && (
          <FadeUp className="rounded-3xl bg-teal p-8 text-center">
            <p className="font-display tracking-widest uppercase text-gold text-xs mb-3">
              Biggest moment
            </p>
            <p className="text-lg leading-relaxed">{w.biggest_moment}</p>
          </FadeUp>
        )}

        {photos.length > 0 && (
          <FadeUp className="grid grid-cols-2 gap-3">
            {photos.slice(0, 6).map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={url} alt="" className="aspect-square object-cover rounded-2xl" />
            ))}
          </FadeUp>
        )}

        {w.senior_quote && (
          <FadeUp className="text-center px-2">
            <p className="font-display text-2xl leading-snug">"{w.senior_quote}"</p>
            {w.senior_quote_name && (
              <p className="mt-3 text-gold text-sm">— {w.senior_quote_name}, Class of {w.school_year.slice(-2)}'</p>
            )}
          </FadeUp>
        )}

        <FadeUp className="text-center space-y-4">
          <Phulkari className="text-gold/50" />
          <p className="text-white/60 text-sm">
            One chapter of a 40-chapter movement.
          </p>
          <Link href={`/ssas/${s.slug}`} className="inline-block text-gold font-semibold underline underline-offset-4">
            Visit {s.name} →
          </Link>
        </FadeUp>
      </div>
    </div>
  );
}
