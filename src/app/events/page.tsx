// Unified calendar: USM national + every SSA's events, one feed.
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import EventCard from '@/components/EventCard';
import { supabasePublic } from '@/lib/supabase-public';
import { eventsCatalog, formatPrice } from '@/lib/events-catalog';

export const revalidate = 300;
export const metadata = { title: 'Events' };

export default async function Events() {
  let upcoming: any[] = [], past: any[] = [];
  try {
    const sb = supabasePublic();
    const now = new Date().toISOString();
    const [{ data: up }, { data: pa }] = await Promise.all([
      sb.from('events').select('*, ssas(name)').gte('starts_at', now).order('starts_at').limit(50),
      sb.from('events').select('*, ssas(name)').lt('starts_at', now).not('archive_summary', 'is', null).order('starts_at', { ascending: false }).limit(12),
    ]);
    upcoming = up ?? []; past = pa ?? [];
  } catch {}

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Events</h1>
        <p className="mt-3 text-lg text-teal-ink/75">
          Everything happening across the movement — national events and every chapter's.
        </p>
      </FadeUp>

      {/* Register-now events (server catalog with ticketing) */}
      {eventsCatalog.length > 0 && (
        <FadeUp className="mt-10">
          <h2 className="font-display text-2xl font-bold text-teal mb-5">Open for registration</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {eventsCatalog.map((e) => (
              <div key={e.slug} className="rounded-3xl bg-white border border-teal/10 p-6 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-widest text-gold-deep font-semibold">USM National</span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-teal">
                    {formatPrice(e.priceCents, e.currency)}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-teal-ink mt-2">{e.title}</h3>
                <p className="text-sm text-teal-soft mt-0.5">{e.date}</p>
                <p className="text-sm text-teal-ink/75 mt-2 flex-1">{e.blurb}</p>
                <Link
                  href={`/events/${e.slug}/register`}
                  className="mt-4 inline-block rounded-full bg-teal text-white text-center py-2.5 font-display font-semibold text-sm hover:bg-teal-ink transition-colors"
                >
                  {e.priceCents > 0 ? 'Register' : 'RSVP — free'}
                </Link>
              </div>
            ))}
          </div>
        </FadeUp>
      )}

      <FadeUp className="mt-12">
        <h2 className="font-display text-2xl font-bold text-teal mb-5">Across the network</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {upcoming.length > 0
            ? upcoming.map((e) => <EventCard key={e.id} event={e} ssaName={e.ssas?.name} />)
            : <p className="text-teal-soft">More chapter events are added all year — check back soon.</p>}
        </div>
      </FadeUp>

      {past.length > 0 && (
        <FadeUp className="mt-20">
          <h2 className="font-display text-3xl font-bold text-teal mb-6">From the archive</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {past.map((e) => (
              <div key={e.id} className="rounded-2xl bg-mist p-6">
                <div className="text-xs uppercase tracking-widest text-teal-soft">
                  {new Date(e.starts_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <h3 className="font-display font-semibold text-teal-ink mt-1">{e.title}</h3>
                <p className="text-sm text-teal-ink/70 mt-2">{e.archive_summary}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      )}
    </div>
  );
}
