'use client';
import { useEffect, useState } from 'react';

export default function PortalEvents() {
  const [ssaId, setSsaId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [state, setState] = useState<'loading' | 'idle' | 'saving'>('loading');

  async function loadEvents() {
    const res = await fetch('/api/portal/events');
    if (!res.ok) { window.location.href = '/portal/login'; return; }
    const data = await res.json();
    setEvents(data);
  }

  useEffect(() => {
    fetch('/api/portal/ssa')
      .then(r => { if (!r.ok) { window.location.href = '/portal/login'; return null; } return r.json(); })
      .then(async ssa => {
        if (!ssa) return;
        setSsaId(ssa.id);
        await loadEvents();
        setState('idle');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('saving');
    const f = new FormData(e.currentTarget);
    await fetch('/api/portal/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: f.get('title'),
        description: f.get('description'),
        starts_at: new Date(f.get('starts_at') as string).toISOString(),
        location: f.get('location'),
        registration_url: f.get('registration_url') || null,
      }),
    });
    (e.target as HTMLFormElement).reset();
    await loadEvents();
    setState('idle');
  }

  async function deleteEvent(id: string) {
    await fetch(`/api/portal/events/${id}`, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.id !== id));
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
        <input name="registration_url" type="url" placeholder="Registration link (optional)" className={input} />
        <textarea name="description" rows={2} placeholder="Short description" className={input} />
        <button disabled={state === 'saving'}
          className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
          {state === 'saving' ? 'Posting…' : 'Post event'}
        </button>
      </form>
      <div className="mt-8 space-y-3">
        {events.map(ev => (
          <div key={ev.id} className="rounded-xl bg-white border border-teal/10 p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-teal-ink">{ev.title}</div>
              <div className="text-xs text-teal-soft">{new Date(ev.starts_at).toLocaleString()}</div>
            </div>
            <button onClick={() => deleteEvent(ev.id)} className="text-xs text-red-500 underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
