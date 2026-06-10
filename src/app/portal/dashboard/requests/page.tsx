'use client';
// Support hub: typed requests that route to the SSA Coordinator.
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase';

const types = [
  { v: 'speaker', l: 'Speaker request' },
  { v: 'funding', l: 'Funding request' },
  { v: 'board_support', l: 'Board support' },
  { v: 'event_help', l: 'Event help' },
  { v: 'resource', l: 'Resource request' },
  { v: 'other', l: 'Something else' },
];

export default function Requests() {
  const sb = supabaseBrowser();
  const [ssaId, setSsaId] = useState<string | null>(null);
  const [mine, setMine] = useState<any[]>([]);
  const [state, setState] = useState<'loading' | 'idle' | 'saving' | 'done'>('loading');

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/portal/login'; return; }
      const { data: p } = await sb.from('profiles').select('ssa_id').eq('id', user.id).single();
      if (p?.ssa_id) {
        setSsaId(p.ssa_id);
        const { data } = await sb.from('support_requests').select('*').eq('ssa_id', p.ssa_id).order('created_at', { ascending: false });
        setMine(data ?? []);
      }
      setState('idle');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ssaId) return;
    setState('saving');
    const f = new FormData(e.currentTarget);
    await sb.from('support_requests').insert({
      ssa_id: ssaId,
      request_type: f.get('request_type'),
      details: f.get('details'),
    });
    // TODO(interns): n8n webhook here → email the SSA Coordinator + confirmation
    // email to the submitter. POST the row to your n8n workflow URL.
    setState('done');
  }

  if (state === 'loading') return <div className="p-14 text-teal-soft">Loading…</div>;
  if (state === 'done')
    return <div className="mx-auto max-w-xl px-5 py-20 text-center">
      <h1 className="font-display text-3xl font-bold text-teal">Request sent</h1>
      <p className="mt-3 text-teal-ink/75">The SSA Coordinator has it — you'll hear back by email.</p>
    </div>;

  const input = 'w-full rounded-xl border border-teal/20 bg-white px-4 py-3';
  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold text-teal">Request support</h1>
      <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl bg-white border border-teal/10 p-6">
        <label className="text-sm">What do you need?
          <select name="request_type" className={input}>
            {types.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}
          </select></label>
        <label className="text-sm">Details
          <textarea name="details" required rows={4} className={input}
            placeholder="What, when, and any context that helps us move fast" /></label>
        <button disabled={state === 'saving'}
          className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
          {state === 'saving' ? 'Sending…' : 'Send request'}
        </button>
      </form>
      {mine.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display font-semibold text-teal mb-3">Your requests</h2>
          <div className="space-y-2">
            {mine.map((r) => (
              <div key={r.id} className="rounded-xl bg-white border border-teal/10 p-4 flex justify-between text-sm">
                <span className="font-medium text-teal-ink capitalize">{r.request_type.replace('_', ' ')}</span>
                <span className="text-teal-soft capitalize">{r.status.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
