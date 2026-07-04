'use client';
import { useState } from 'react';
import Link from 'next/link';

type Recipient = 'all' | 'followers' | 'members';

const RECIPIENT_OPTIONS: { value: Recipient; label: string; desc: string }[] = [
  { value: 'all', label: 'Everyone', desc: 'Followers + affiliated members' },
  { value: 'followers', label: 'Followers only', desc: 'People who follow your page' },
  { value: 'members', label: 'Members only', desc: 'Affiliated chapter members' },
];

export default function EmailBlastPage() {
  const [recipients, setRecipients] = useState<Recipient>('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<{ sent?: number; note?: string; error?: string } | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const res = await fetch('/api/portal/email-blast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, message, recipients }),
    });
    const data = await res.json();
    if (res.ok) { setState('done'); setResult(data); }
    else { setState('error'); setResult(data); }
  }

  const inp = 'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  if (state === 'done') {
    return (
      <div className="mx-auto max-w-xl px-5 py-14 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h2 className="font-display text-2xl font-bold text-teal">Email sent!</h2>
        <p className="text-teal-soft mt-2">
          Delivered to {result?.sent} recipient{result?.sent !== 1 ? 's' : ''}.
        </p>
        {result?.note && (
          <p className="mt-3 text-xs bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-yellow-800">
            {result.note}
          </p>
        )}
        <button
          onClick={() => { setState('idle'); setSubject(''); setMessage(''); }}
          className="mt-6 rounded-full bg-teal text-white px-8 py-3 font-display font-semibold hover:bg-teal-ink transition-colors">
          Send another
        </button>
        <div className="mt-4">
          <Link href="/portal/dashboard" className="text-sm text-teal-soft underline underline-offset-4">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <Link href="/portal/dashboard" className="text-sm text-teal-soft underline underline-offset-4">
        ← Back to dashboard
      </Link>
      <h1 className="font-display text-3xl font-bold text-teal mt-4">Email your community</h1>
      <p className="text-sm text-teal-soft mt-1">
        Send a message directly to your followers and chapter members.
      </p>

      <form onSubmit={send} className="mt-8 grid gap-5">
        <div>
          <p className="text-sm font-medium text-teal-ink mb-2">Send to</p>
          <div className="grid gap-2">
            {RECIPIENT_OPTIONS.map(opt => (
              <label key={opt.value}
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                  recipients === opt.value ? 'border-teal bg-teal/5' : 'border-teal/15 hover:border-teal/30'
                }`}>
                <input type="radio" name="recipients" value={opt.value}
                  checked={recipients === opt.value}
                  onChange={() => setRecipients(opt.value)}
                  className="accent-teal" />
                <div>
                  <p className="text-sm font-semibold text-teal-ink">{opt.label}</p>
                  <p className="text-xs text-teal-soft">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <label className="text-sm font-medium text-teal-ink">
          Subject
          <input value={subject} onChange={e => setSubject(e.target.value)} required
            placeholder="Important update from your SSA…"
            className={`mt-1 ${inp}`} />
        </label>

        <label className="text-sm font-medium text-teal-ink">
          Message
          <textarea value={message} onChange={e => setMessage(e.target.value)} required
            rows={9} placeholder={'Hi everyone,\n\nWe\'re excited to share…'}
            className={`mt-1 ${inp}`} />
        </label>

        {state === 'error' && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {result?.error ?? 'Something went wrong. Please try again.'}
          </div>
        )}

        <button
          disabled={state === 'sending' || !subject.trim() || !message.trim()}
          className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Send email'}
        </button>
        <p className="text-xs text-center text-teal-soft">
          Recipients in both lists will only receive one email.
        </p>
      </form>
    </div>
  );
}
