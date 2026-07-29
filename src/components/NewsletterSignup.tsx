'use client';
// Email capture for the footer and Contact page. Posts to /api/newsletter, which
// stores the address in Supabase. `variant` tunes the styling for a dark footer
// vs. a light page section.
//
// Captures a segment (student vs. alumni/donor) so USM can send those groups
// different content, plus an optional phone number for a future SMS digest.
// The SMS consent box is deliberately NOT pre-checked — consent must be
// affirmative, and nothing is sent until a provider + TCPA review are in place.
import { useState } from 'react';

type Segment = 'student' | 'alumni_donor';

export default function NewsletterSignup({
  source = 'footer',
  variant = 'dark',
}: {
  source?: string;
  variant?: 'dark' | 'light';
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [segment, setSegment] = useState<Segment>('student');
  const [smsConsent, setSmsConsent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState('sending');
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.get('email'),
        phone: form.get('phone') || null,
        smsConsent,
        segment,
        source,
      }),
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

  const field = light
    ? 'rounded-full border border-teal/20 bg-white px-5 py-3 text-teal-ink placeholder:text-teal-soft/60'
    : 'rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/40';
  const muted = light ? 'text-teal-soft' : 'text-white/60';

  // Segment toggle styling
  const segBase = 'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors border';
  const segOn = light
    ? 'bg-teal text-white border-teal'
    : 'bg-gold text-teal-ink border-gold';
  const segOff = light
    ? 'bg-white text-teal-ink border-teal/20 hover:border-gold'
    : 'bg-white/5 text-white/80 border-white/20 hover:border-gold';

  return (
    <form onSubmit={submit} className="grid gap-3">
      {/* Who are you? — drives which content they get. */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="I am a">
        <button
          type="button"
          onClick={() => setSegment('student')}
          aria-pressed={segment === 'student'}
          className={`${segBase} ${segment === 'student' ? segOn : segOff}`}
        >
          I'm a student
        </button>
        <button
          type="button"
          onClick={() => setSegment('alumni_donor')}
          aria-pressed={segment === 'alumni_donor'}
          className={`${segBase} ${segment === 'alumni_donor' ? segOn : segOff}`}
        >
          Alum or supporter
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`nl-${source}`} className="sr-only">Email address</label>
        <input
          id={`nl-${source}`}
          name="email"
          type="email"
          required
          placeholder="you@school.edu"
          className={`flex-1 ${field}`}
        />
        <button
          disabled={state === 'sending'}
          className="rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'sending' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>

      {/* Optional SMS opt-in. Unchecked by default, on purpose. */}
      <label className={`flex items-start gap-2 text-xs ${muted}`}>
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 shrink-0"
        />
        <span>Also text me event reminders and deadlines (optional)</span>
      </label>

      {smsConsent && (
        <>
          <label htmlFor={`nl-phone-${source}`} className="sr-only">Phone number</label>
          <input
            id={`nl-phone-${source}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            className={field}
          />
          <p className={`text-[11px] ${muted}`}>
            Message and data rates may apply. Reply STOP to unsubscribe at any time.
          </p>
        </>
      )}

      {state === 'error' && <p className="text-sm text-red-400">{msg}</p>}
    </form>
  );
}
