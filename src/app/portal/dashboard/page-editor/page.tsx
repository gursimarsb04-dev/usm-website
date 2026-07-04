'use client';
import { useEffect, useState } from 'react';

export default function PageEditor() {
  const [ssa, setSsa] = useState<any>(null);
  const [state, setState] = useState<'loading' | 'idle' | 'saving' | 'saved'>('loading');

  useEffect(() => {
    fetch('/api/portal/ssa')
      .then(r => {
        if (!r.ok) { window.location.href = '/portal/login'; return null; }
        return r.json();
      })
      .then(data => { if (data) { setSsa(data); setState('idle'); } });
  }, []);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('saving');
    const f = new FormData(e.currentTarget);
    const body = {
      description: f.get('description'),
      joining_instructions: f.get('joining_instructions'),
      instagram_handle: f.get('instagram_handle'),
      contact_email: f.get('contact_email'),
    };
    await fetch('/api/portal/ssa', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setState('saved');
    setTimeout(() => setState('idle'), 2000);
  }

  if (state === 'loading') return <div className="p-14 text-teal-soft">Loading…</div>;
  if (!ssa) return <div className="p-14 text-teal-soft">No chapter linked — contact your USM coordinator.</div>;

  const input = 'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/30';
  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold text-teal">Edit {ssa.name}</h1>
      <form onSubmit={save} className="mt-6 grid gap-4">
        <label className="text-sm">About your chapter
          <textarea name="description" rows={5} defaultValue={ssa.description ?? ''} className={input} /></label>
        <label className="text-sm">How students join
          <textarea name="joining_instructions" rows={3} defaultValue={ssa.joining_instructions ?? ''} className={input}
            placeholder="GroupMe link, meeting time, first-step instructions" /></label>
        <label className="text-sm">Instagram handle
          <input name="instagram_handle" defaultValue={ssa.instagram_handle ?? ''} className={input} /></label>
        <label className="text-sm">Contact email
          <input name="contact_email" type="email" defaultValue={ssa.contact_email ?? ''} className={input} /></label>
        <button disabled={state === 'saving'}
          className="rounded-full bg-gold py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60">
          {state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved ✓' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
