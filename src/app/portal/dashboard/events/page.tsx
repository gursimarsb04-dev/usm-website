'use client';
// SSA event posting — publishes instantly to the chapter page + national calendar.
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase';

export default function PortalEvents() {
  const sb = supabaseBrowser();
  const [ssaId, setSsaId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [state, setState] = useState<'loading' | 'idle' | 'saving'>('loading');

  async function load(id: string) {
    const { data } = await sb.from('events').select('*').eq('ssa_id', id).order('starts_at', { ascending: false });
    setEvents(data ?? []);
  }

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/portal/login'; return; }
      const { data } = await sb.from('profiles').select('ssa_id').eq('id', user.id).single();
      if (data?.ssa_id) { setSsaId(data.ssa_id); await load(data.ssa_id); }
      setState('idle');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ssaId) return;
    setState('saving');
    const form = e.currentTarget;
    const f = new FormData(form);
    await sb.from('events').insert({
      ssa_id: ssaId,
      title: f.get('title'),
      description: f.get('description'),
      starts_at: new Date(f.get('starts_at') as string).toISOString(),
      location: f.get('location'),
      registration_url: f.get('registration_url') || null,
    });
    form.reset();
    await load(ssaId);
    setState('idle');
  }

  if (state === 'loading') return <div className="p-14 text-teal-soft">Loading…</div>;

  const input = 'w-full rounded-xl border border-teal/20 bg-white px-4 py-3';
  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold text-teal">Events</h1>
      <form onSubmit={submit} className="mt-6 grid gap-3 rounded-2xl bg-white border border-teal/10 p-6">
        <input name="title" required placeholder="Event title" className={input} />
        <input name="starts_at" required type="datetime-local" className={input} />
        <input name="location" placeholder="Location" className={input} />
        <input name="registration_url" type="url" placeholder="Registration link (your own form — optional)" className={input} />
        <textarea name="description" rows={2} placeholder="Short description" className={input} />
        <button disabled={state === 'saving'}
          className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
          {state === 'saving' ? 'Posting…' : 'Post event'}
        </button>
      </form>
      <div className="mt-8 space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="rounded-xl bg-white border border-teal/10 p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-teal-ink">{ev.title}</div>
              <div className="text-xs text-teal-soft">{new Date(ev.starts_at).toLocaleString()}</div>
            </div>
            <button onClick={async () => { await sb.from('events').delete().eq('id', ev.id); ssaId && load(ssaId); }}
              className="text-xs text-red-500 underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
