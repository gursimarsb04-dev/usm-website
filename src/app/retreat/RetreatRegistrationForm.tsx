'use client';
import { useState } from 'react';

export default function RetreatRegistrationForm({
  slug,
  priceLabel,
}: {
  slug: string;
  priceLabel: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setMessage('');
    const form = new FormData(e.currentTarget);
    const payload = {
      slug,
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      quantity: 1,
      returnPath: window.location.pathname,
      extra: {
        ssa: form.get('ssa'),
        position: form.get('position'),
        emergency_contact_name: form.get('emergencyContactName'),
        emergency_contact_phone: form.get('emergencyContactPhone'),
        goals: form.get('goals'),
        dietary: form.get('dietary'),
        media_consent: form.get('mediaConsent') ? 'Yes I agree' : '',
      },
    };

    try {
      const res = await fetch('/api/register', {
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
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setState('error');
      setMessage('Payment could not be started. Please try again.');
    } catch {
      setState('error');
      setMessage('Network error. Please try again.');
    }
  }

  const input =
    'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 text-teal-ink placeholder:text-teal-soft/60 focus:outline-none focus:ring-2 focus:ring-teal/30';
  const label = 'grid gap-1 text-sm font-medium text-teal-ink';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className={label}>
        Full name
        <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
      </label>
      <label className={label}>
        Phone number
        <input name="phone" type="tel" required autoComplete="tel" placeholder="(555) 555-5555" className={input} />
      </label>
      <label className={label}>
        Email address
        <input name="email" type="email" required autoComplete="email" placeholder="you@school.edu" className={input} />
      </label>
      <label className={label}>
        Which SSA are you a member of?
        <input name="ssa" required placeholder="e.g. Rutgers SSA" className={input} />
      </label>
      <label className={label}>
        What position do you hold in your SSA?
        <input name="position" required placeholder="e.g. President, Treasurer" className={input} />
      </label>
      <label className={label}>
        Emergency contact name
        <input name="emergencyContactName" required placeholder="Full name" className={input} />
      </label>
      <label className={label}>
        Emergency contact phone number
        <input name="emergencyContactPhone" type="tel" required placeholder="(555) 555-5555" className={input} />
      </label>
      <label className={label}>
        What are you looking to get out of this leadership retreat? <span className="text-teal-soft font-normal">(optional)</span>
        <textarea name="goals" rows={3} placeholder="Optional" className={input} />
      </label>
      <label className={label}>
        Dietary restrictions or allergies?
        <textarea name="dietary" required rows={2} placeholder="Let us know, or write 'None'" className={input} />
      </label>

      <label className="flex items-start gap-3 text-sm text-teal-ink/90">
        <input name="mediaConsent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-teal/30" />
        <span>
          I agree to the media consent &amp; liability waiver <a href="#media-consent" className="underline hover:text-teal">(see below)</a>.
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-red-600 font-medium">{message}</p>}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-2 rounded-full bg-teal text-white py-3.5 font-display font-semibold text-base hover:bg-teal-ink transition-colors disabled:opacity-50"
      >
        {state === 'loading' ? 'Processing…' : `Continue to payment · ${priceLabel}`}
      </button>
    </form>
  );
}
