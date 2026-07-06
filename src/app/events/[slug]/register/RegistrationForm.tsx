'use client';
import { useState } from 'react';

export default function RegistrationForm({
  slug,
  priceCents,
  priceLabel,
}: {
  slug: string;
  priceCents: number;
  priceLabel: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const isPaid = priceCents > 0;

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
      quantity: form.get('quantity'),
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
        // Paid ticket → hand off to Stripe Checkout.
        window.location.href = data.url;
        return;
      }
      setState('done');
      setMessage(data.message || "You're registered!");
    } catch {
      setState('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-3xl bg-teal text-white p-8 text-center">
        <h2 className="font-display text-2xl font-bold">You're in. 🎉</h2>
        <p className="mt-2 text-white/80">{message}</p>
      </div>
    );
  }

  const input =
    'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 text-teal-ink placeholder:text-teal-soft/60 focus:outline-none focus:ring-2 focus:ring-teal/30';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1 text-sm font-medium text-teal-ink">
        Full name
        <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
      </label>
      <label className="grid gap-1 text-sm font-medium text-teal-ink">
        Email
        <input name="email" type="email" required autoComplete="email" placeholder="you@school.edu" className={input} />
      </label>
      <label className="grid gap-1 text-sm font-medium text-teal-ink">
        Phone <span className="text-teal-soft font-normal">(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" className={input} />
      </label>
      <label className="grid gap-1 text-sm font-medium text-teal-ink">
        Number of tickets
        <select name="quantity" defaultValue="1" className={input}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      {state === 'error' && (
        <p className="text-sm text-red-600 font-medium">{message}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-2 rounded-full bg-teal text-white py-3.5 font-display font-semibold text-base hover:bg-teal-ink transition-colors disabled:opacity-50"
      >
        {state === 'loading'
          ? 'Processing…'
          : isPaid
          ? `Continue to payment · ${priceLabel}`
          : 'Reserve my spot'}
      </button>
    </form>
  );
}
