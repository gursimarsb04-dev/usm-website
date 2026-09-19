// A chapter's own landing page. Deliberately NOT framed as a USM directory
// entry: the chapter's name, tagline and meeting details lead, and the USM
// affiliation sits at the bottom as a badge. A student landing here from an
// Instagram bio should immediately know what this chapter is and when to show
// up — everything above the fold answers that.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import EventCard from '@/components/EventCard';
import Phulkari from '@/components/Phulkari';
import { supabasePublic } from '@/lib/supabase-public';
import { SSA_PUBLIC_COLUMNS } from '@/lib/ssa-columns';
import { ssaFallbacks } from '@/lib/ssa-fallback';
import type { SSA, USMEvent, Wrapped } from '@/lib/types';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let ssa: SSA | null = null;
  try {
    const { data } = await supabasePublic()
      .from('ssas').select(SSA_PUBLIC_COLUMNS).eq('slug', params.slug).single();
    if (data) ssa = data as unknown as SSA;
  } catch {}
  if (!ssa) ssa = ssaFallbacks.find((f) => f.slug === params.slug) ?? null;
  if (!ssa) return { title: 'Chapter not found' };
  return {
    title: ssa.name,
    description: ssa.tagline ?? ssa.description ?? `${ssa.name} at ${ssa.school}.`,
  };
}

export default async function SSAPage({ params }: { params: { slug: string } }) {
  // Supabase first; fall back to the static roster so every chapter has a real
  // page even before the database is seeded/configured. Mirrors /ssas.
  let ssa: SSA | null = null;
  try {
    const { data } = await supabasePublic()
      .from('ssas')
      .select(SSA_PUBLIC_COLUMNS)
      .eq('slug', params.slug)
      .single();
    if (data && (data as unknown as SSA).status === 'live') ssa = data as unknown as SSA;
  } catch {}
  if (!ssa) ssa = ssaFallbacks.find((f) => f.slug === params.slug) ?? null;
  if (!ssa) notFound();
  const s = ssa;

  // Chapter-scoped content only exists for DB-backed chapters (fallback rows
  // carry the slug as their id, so these queries would never match).
  let events: USMEvent[] = [], photos: any[] = [], w: Wrapped | null = null;
  try {
    const sb = supabasePublic();
    const [{ data: ev }, { data: wr }, { data: ph }] = await Promise.all([
      sb.from('events').select('*').eq('ssa_id', s.id).gte('starts_at', new Date().toISOString()).order('starts_at').limit(6),
      sb.from('wrapped_submissions').select('*').eq('ssa_id', s.id).eq('published', true).order('school_year', { ascending: false }).limit(1),
      sb.from('ssa_photos').select('*').eq('ssa_id', s.id).order('created_at', { ascending: false }).limit(8),
    ]);
    events = (ev as USMEvent[]) ?? [];
    photos = ph ?? [];
    w = (wr?.[0] as Wrapped) ?? null;
  } catch {}

  const handle = s.instagram_handle?.replace('@', '');
  // Quick-facts strip: only the ones this chapter has actually filled in.
  const facts = [
    s.meets_when && { label: 'We meet', value: s.meets_when },
    s.meets_where && { label: 'Where', value: s.meets_where },
    s.founded_year && { label: 'Established', value: String(s.founded_year) },
    w?.member_count && { label: 'Members', value: `${w.member_count}+` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* ── Hero: their name and their tagline lead, over their cover photo ── */}
      <section className="relative bg-teal text-white overflow-hidden">
        {s.cover_photo_url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.cover_photo_url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-ink via-teal-ink/85 to-teal-ink/60" />
          </>
        )}
        <FadeUp className="relative mx-auto max-w-wrap px-5 py-24">
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">{s.name}</h1>
          {s.tagline && (
            <p className="mt-4 text-xl md:text-2xl text-gold font-display max-w-2xl leading-snug">
              {s.tagline}
            </p>
          )}
          <p className="mt-4 text-white/75">
            {s.school}{s.city ? ` · ${s.city}, ${s.state}` : ''}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {s.joining_instructions && (
              <a
                href="#join"
                className="rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors"
              >
                Come to our next event
              </a>
            )}
            {handle && (
              <a
                href={`https://instagram.com/${handle}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                @{handle}
              </a>
            )}
            {s.contact_email && (
              <a
                href={`mailto:${s.contact_email}`}
                className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                Email us
              </a>
            )}
          </div>
        </FadeUp>
      </section>

      {/* ── Quick facts: when and where to actually show up ── */}
      {facts.length > 0 && (
        <section className="bg-mist border-b border-teal/10">
          <div className="mx-auto max-w-wrap px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="text-[11px] uppercase tracking-widest text-teal-soft">{f.label}</div>
                <div className="font-display font-semibold text-teal-ink mt-1 leading-snug">{f.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-wrap px-5 py-16 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-14">
          {s.description && (
            <FadeUp>
              <h2 className="font-display text-3xl font-bold text-teal mb-4">Who we are</h2>
              <p className="text-lg text-teal-ink/80 leading-relaxed whitespace-pre-line">{s.description}</p>
            </FadeUp>
          )}

          <FadeUp>
            <h2 className="font-display text-3xl font-bold text-teal mb-5">What&apos;s coming up</h2>
            <div className="grid gap-4">
              {events.length ? (
                events.map((e) => <EventCard key={e.id} event={e} ssaName={s.name} />)
              ) : (
                <p className="text-teal-soft">
                  Nothing on the calendar right now — follow us on Instagram and we&apos;ll post as soon as it&apos;s set.
                </p>
              )}
            </div>
          </FadeUp>

          {photos.length > 0 && (
            <FadeUp>
              <h2 className="font-display text-3xl font-bold text-teal mb-5">Our year so far</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photos.map((p: any) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={p.id}
                    src={p.url}
                    alt={p.caption || s.name}
                    className="aspect-square object-cover rounded-xl"
                  />
                ))}
              </div>
            </FadeUp>
          )}
        </div>

        <FadeUp className="space-y-8">
          {s.joining_instructions && (
            <div id="join" className="rounded-3xl bg-gold/30 p-6 scroll-mt-24">
              <h3 className="font-display text-lg font-bold text-teal-ink">New here? Start here.</h3>
              <p className="mt-2 text-sm text-teal-ink/80 whitespace-pre-line leading-relaxed">
                {s.joining_instructions}
              </p>
            </div>
          )}

          {s.board_members?.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-bold text-teal mb-3">Your board</h3>
              <ul className="space-y-2.5">
                {s.board_members.map((b, i) => (
                  <li key={i} className="rounded-xl bg-white border border-teal/10 px-4 py-3">
                    <div className="font-medium text-teal-ink text-sm">{b.name}</div>
                    <div className="text-xs text-teal-soft mt-0.5">{b.role}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {w && (
            <Link
              href={`/ssas/${s.slug}/wrapped`}
              className="block rounded-3xl bg-teal text-white p-6 hover:bg-teal-ink transition-colors"
            >
              <div className="text-[11px] uppercase tracking-widest text-gold">{w.school_year} Wrapped</div>
              <div className="font-display font-bold text-lg mt-1">See our year in numbers ✦</div>
            </Link>
          )}
        </FadeUp>
      </div>

      <Phulkari className="text-teal/15" />

      {/* ── USM affiliation: a footnote, not the headline ── */}
      <section className="bg-sand">
        <div className="mx-auto max-w-wrap px-5 py-10 text-center">
          <p className="text-sm text-teal-ink/70">
            {s.name} is part of the{' '}
            <Link href="/" className="font-semibold text-teal underline underline-offset-4 hover:text-gold-deep">
              United Sikh Movement
            </Link>{' '}
            network — 40 chapters supporting Sikh students across the country.
          </p>
          <Link
            href="/ssas"
            className="inline-block mt-3 text-sm text-teal-soft hover:text-teal"
          >
            Find another chapter →
          </Link>
        </div>
      </section>
    </>
  );
}
