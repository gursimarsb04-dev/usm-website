'use client';
import { useState } from 'react';
import { EVENT_TYPES } from '@/lib/event-types';

export default function SubmitEventForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setMessage('');
    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get('title'),
      starts_at: form.get('starts_at'),
      ends_at: form.get('ends_at') || null,
      location: form.get('location'),
      type: form.get('type'),
      chapter: form.get('chapter'),
      registration_url: form.get('registration_url'),
      description: form.get('description'),
      submitter_name: form.get('submitter_name'),
      submitter_email: form.get('submitter_email'),
    };
    try {
      const res = await fetch('/api/events/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setState('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setState('done');
    } catch {
      setState('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-3xl bg-mist p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-teal">Thanks — it&apos;s in!</h2>
        <p className="mt-2 text-teal-ink/80">
          Your event has been submitted for review. Once USM approves it, it&apos;ll show up on
          the national calendar.
        </p>
      </div>
    );
  }

  const input =
    'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 text-teal-ink placeholder:text-teal-soft/60 focus:outline-none focus:ring-2 focus:ring-teal/30';
  const label = 'grid gap-1 text-sm font-medium text-teal-ink';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className={label}>
        Event title
        <input name="title" required placeholder="e.g. Weekly Divaan" className={input} />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className={label}>
          Starts
          <input name="starts_at" type="datetime-local" required className={input} />
        </label>
        <label className={label}>
          Ends <span className="text-teal-soft font-normal">(optional)</span>
          <input name="ends_at" type="datetime-local" className={input} />
        </label>
      </div>
      <label className={label}>
        Location
        <input name="location" placeholder="Building, room, or address" className={input} />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className={label}>
          Type
          <select name="type" className={input} defaultValue="">
            <option value="" disabled>Choose a type…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          Chapter / host <span className="text-teal-soft font-normal">(optional)</span>
          <input name="chapter" placeholder="e.g. Rutgers SSA" className={input} />
        </label>
      </div>
      <label className={label}>
        Registration link <span className="text-teal-soft font-normal">(optional)</span>
        <input name="registration_url" type="url" placeholder="https://…" className={input} />
      </label>
      <label className={label}>
        Description
        <textarea name="description" rows={3} placeholder="What's happening?" className={input} />
      </label>

      <div className="grid sm:grid-cols-2 gap-4 border-t border-teal/10 pt-4">
        <label className={label}>
          Your name
          <input name="submitter_name" placeholder="So we know who to follow up with" className={input} />
        </label>
        <label className={label}>
          Your email
          <input name="submitter_email" type="email" required placeholder="you@school.edu" className={input} />
        </label>
      </div>

      {state === 'error' && <p className="text-sm text-red-600 font-medium">{message}</p>}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-2 rounded-full bg-teal text-white py-3.5 font-display font-semibold text-base hover:bg-teal-ink transition-colors disabled:opacity-50"
      >
        {state === 'sending' ? 'Submitting…' : 'Submit for review'}
      </button>
    </form>
  );
}
