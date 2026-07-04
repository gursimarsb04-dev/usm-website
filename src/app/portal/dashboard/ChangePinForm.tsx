'use client';
import { useState } from 'react';

export default function ChangePinForm() {
  const [pin, setPin] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setError('');
    const res = await fetch('/api/portal/change-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      setState('saved');
      setPin('');
      setTimeout(() => setState('idle'), 3000);
    } else {
      const data = await res.json();
      setError(data.error ?? 'Failed to update PIN');
      setState('error');
    }
  }

  return (
    <div className="mt-10 rounded-2xl bg-white border border-teal/10 p-6">
      <h2 className="font-display font-semibold text-teal-ink">Change PIN</h2>
      <p className="text-sm text-teal-soft mt-1">Update your 4-digit login PIN.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3 items-start">
        <input
          type="text" inputMode="numeric" pattern="\d{4}" maxLength={4}
          value={pin} onChange={e => { setPin(e.target.value); setState('idle'); }}
          placeholder="New 4-digit PIN" required
          className="rounded-xl border border-teal/20 px-4 py-3 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
        <button disabled={state === 'loading'}
          className="rounded-full bg-teal text-white px-5 py-3 text-sm font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
          {state === 'loading' ? 'Saving…' : state === 'saved' ? 'Saved ✓' : 'Update'}
        </button>
      </form>
      {state === 'error' && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
