'use client';
// Email capture for the footer and Contact page. Posts to /api/newsletter, which
// stores the address in Supabase. `variant` tunes the styling for a dark footer
// vs. a light page section.
import { useState } from 'react';

export default function NewsletterSignup({
  source = 'footer',
  variant = 'dark',
}: {
  source?: string;
  variant?: 'dark' | 'light';
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    setState('sending');
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    if (res.ok) {
      setState('done');
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error ?? 'Something went wrong.');
      setState('error');
    }
  }

  const light = variant === 'light';

  if (state === 'done') {
    return (
      <p className={light ? 'text-teal font-semibold' : 'text-gold font-semibold'}>
        You're on the list — welcome to the movement. 🙏
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor={`nl-${source}`} className="sr-only">Email address</label>
      <input
        id={`nl-${source}`}
        name="email"
        type="email"
        required
        placeholder="you@school.edu"
        className={
          light
            ? 'flex-1 rounded-full border border-teal/20 bg-white px-5 py-3 text-teal-ink placeholder:text-teal-soft/60'
            : 'flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/40'
        }
      />
      <button
        disabled={state === 'sending'}
        className="rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {state === 'sending' ? 'Joining…' : 'Subscribe'}
      </button>
      {state === 'error' && (
        <p className="text-sm text-red-400 sm:absolute sm:mt-14">{msg}</p>
      )}
    </form>
  );
}
