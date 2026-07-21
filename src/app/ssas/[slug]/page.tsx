// Individual SSA page — one consistent template, personalized per chapter.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import EventCard from '@/components/EventCard';
import Phulkari from '@/components/Phulkari';
import { supabasePublic } from '@/lib/supabase-public';
import { SSA_PUBLIC_COLUMNS } from '@/lib/ssa-columns';
import type { SSA, USMEvent, Wrapped } from '@/lib/types';

export const revalidate = 300;

export default async function SSAPage({ params }: { params: { slug: string } }) {
  const sb = supabasePublic();
  const { data } = await sb.from('ssas').select(SSA_PUBLIC_COLUMNS).eq('slug', params.slug).single();
  const ssa = data as unknown as SSA | null;
  if (!ssa || ssa.status !== 'live') notFound();
  const s = ssa;

  const [{ data: events }, { data: wrapped }, { data: photos }] = await Promise.all([
    sb.from('events').select('*').eq('ssa_id', s.id).gte('starts_at', new Date().toISOString()).order('starts_at').limit(6),
    sb.from('wrapped_submissions').select('*').eq('ssa_id', s.id).eq('published', true).order('school_year', { ascending: false }).limit(1),
    sb.from('ssa_photos').select('*').eq('ssa_id', s.id).order('created_at', { ascending: false }).limit(8),
  ]);
  const w = (wrapped?.[0] as Wrapped) || null;

  return (
    <>
      <section className="bg-teal text-white py-20">
        <FadeUp className="mx-auto max-w-wrap px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">USM Chapter</p>
          <h1 className="font-display text-5xl font-bold mt-2">{s.name}</h1>
          <p className="mt-2 text-white/75">{s.school}{s.city ? ` · ${s.city}, ${s.state}` : ''}</p>
          <div className="mt-5 flex gap-4 text-sm">
            {s.instagram_handle && (
              <a href={`https://instagram.com/${s.instagram_handle.replace('@','')}`} target="_blank" rel="noreferrer"
                className="underline underline-offset-4 hover:text-gold">@{s.instagram_handle.replace('@','')}</a>
            )}
            {s.contact_email && (
              <a href={`mailto:${s.contact_email}`} className="underline underline-offset-4 hover:text-gold">Contact</a>
            )}
            {w && (
              <Link href={`/ssas/${s.slug}/wrapped`} className="text-gold font-semibold underline underline-offset-4">
                {w.school_year} Wrapped ✦
              </Link>
            )}
          </div>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <div className="mx-auto max-w-wrap px-5 py-14 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-12">
          {s.description && (
            <FadeUp>
              <h2 className="font-display text-2xl font-semibold text-teal mb-3">About us</h2>
              <p className="text-teal-ink/80 leading-relaxed whitespace-pre-line">{s.description}</p>
            </FadeUp>
          )}
          <FadeUp>
            <h2 className="font-display text-2xl font-semibold text-teal mb-4">Upcoming events</h2>
            <div className="grid gap-4">
              {(events as USMEvent[] | null)?.length
                ? (events as USMEvent[]).map((e) => <EventCard key={e.id} event={e} ssaName={s.name} />)
                : <p className="text-teal-soft">Nothing scheduled yet — follow us for updates.</p>}
            </div>
          </FadeUp>
          {photos && photos.length > 0 && (
            <FadeUp>
              <h2 className="font-display text-2xl font-semibold text-teal mb-4">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photos.map((p: any) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.id} src={p.url} alt={p.caption || s.name} className="aspect-square object-cover rounded-xl" />
                ))}
              </div>
            </FadeUp>
          )}
        </div>

        <FadeUp className="space-y-8">
          {s.joining_instructions && (
            <div className="rounded-2xl bg-gold/30 p-6">
              <h3 className="font-display font-semibold text-teal-ink">How to join</h3>
              <p className="mt-2 text-sm text-teal-ink/80 whitespace-pre-line">{s.joining_instructions}</p>
            </div>
          )}
          {s.board_members?.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-teal mb-3">Board</h3>
              <ul className="space-y-2 text-sm">
                {s.board_members.map((b, i) => (
                  <li key={i} className="flex justify-between border-b border-teal/10 pb-2">
                    <span className="font-medium text-teal-ink">{b.name}</span>
                    <span className="text-teal-soft">{b.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </FadeUp>
      </div>
    </>
  );
}
