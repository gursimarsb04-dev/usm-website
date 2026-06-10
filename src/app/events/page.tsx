// Unified calendar: USM national + every SSA's events, one feed.
import FadeUp from '@/components/FadeUp';
import EventCard from '@/components/EventCard';
import { supabasePublic } from '@/lib/supabase-public';

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

      <FadeUp className="mt-10 grid gap-5 md:grid-cols-2">
        {upcoming.length > 0
          ? upcoming.map((e) => <EventCard key={e.id} event={e} ssaName={e.ssas?.name} />)
          : <p className="text-teal-soft">New events are added all year — check back soon.</p>}
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
