'use client';
// Magic-link login: no passwords to forget across 40 chapters.
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase';

export default function PortalLogin() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [email, setEmail] = useState('');

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/portal/dashboard` },
    });
    setState(error ? 'error' : 'sent');
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-teal/10 p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-teal">SSA Portal</h1>
        <p className="text-sm text-teal-soft mt-1">
          Manage your chapter's page, events, and Wrapped.
        </p>
        {state === 'sent' ? (
          <p className="mt-6 text-teal font-medium">
            Check your email — we sent you a sign-in link.
          </p>
        ) : (
          <form onSubmit={send} className="mt-6 grid gap-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your-ssa@school.edu"
              className="rounded-xl border border-teal/20 px-4 py-3" />
            <button disabled={state === 'sending'}
              className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
              {state === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
            </button>
            {state === 'error' && (
              <p className="text-sm text-red-600">
                That email isn't registered. Ask your USM coordinator for access.
              </p>
            )}
          </form>
        )}
        <p className="mt-6 text-xs text-teal-soft">
          New chapter? Your USM coordinator creates your account during onboarding.
        </p>
      </div>
    </div>
  );
}
