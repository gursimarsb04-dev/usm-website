'use client';
import { useState } from 'react';

export default function ApplyForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const f = new FormData(e.currentTarget);
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: f.get('name'),
        email: f.get('email'),
        school: f.get('school'),
        city: f.get('city'),
        state: f.get('state'),
        message: f.get('message'),
      }),
    });
    setState(res.ok ? 'done' : 'error');
  }

  if (state === 'done')
    return (
      <p className="text-teal font-semibold">
        Application received — a USM coordinator will email you within a week. 🎉
      </p>
    );

  const input = 'w-full rounded-xl border border-teal/20 bg-sand px-4 py-3 text-teal-ink placeholder:text-teal-soft/60';
  return (
    <form onSubmit={submit} className="grid gap-4">
      <input name="name" required placeholder="Your name" className={input} />
      <input name="email" required type="email" placeholder="Email" className={input} />
      <input name="school" required placeholder="School" className={input} />
      <div className="grid grid-cols-2 gap-4">
        <input name="city" placeholder="City" className={input} />
        <input name="state" placeholder="State" className={input} />
      </div>
      <textarea name="message" rows={3} placeholder="Anything we should know? (optional)" className={input} />
      <button disabled={state === 'sending'}
        className="rounded-full bg-gold px-7 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Submit application'}
      </button>
      {state === 'error' && <p className="text-sm text-red-600">Something went wrong — try again or email us directly.</p>}
    </form>
  );
}
