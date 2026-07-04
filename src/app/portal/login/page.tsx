'use client';
// Magic-link login: no passwords to forget across 40 chapters.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

export default function PortalLogin() {
  const router = useRouter();
  const [tab, setTab] = useState<'magic' | 'password'>('password');

  // Magic-link state
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [email, setEmail] = useState('');

  // Password state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/portal/dashboard` },
    });
    setState(error ? 'error' : 'sent');
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/portal/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pin: password }),
    });
    if (res.ok) {
      router.push('/portal/dashboard');
    } else {
      setPwError(true);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-teal/10 p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-teal">SSA Portal</h1>
        <p className="text-sm text-teal-soft mt-1">
          Manage your chapter's page, events, and Wrapped.
        </p>

        {/* Tab switcher */}
        <div className="mt-5 flex rounded-xl border border-teal/20 overflow-hidden text-sm font-medium">
          <button onClick={() => setTab('password')}
            className={`flex-1 py-2 transition-colors ${tab === 'password' ? 'bg-teal text-white' : 'text-teal hover:bg-teal/5'}`}>
            Password
          </button>
          <button onClick={() => setTab('magic')}
            className={`flex-1 py-2 transition-colors ${tab === 'magic' ? 'bg-teal text-white' : 'text-teal hover:bg-teal/5'}`}>
            Magic Link
          </button>
        </div>

        {tab === 'password' ? (
          <form onSubmit={handlePasswordLogin} className="mt-6 grid gap-3">
            <input type="text" required value={username} onChange={(e) => { setUsername(e.target.value); setPwError(false); }}
              placeholder="Username"
              className="rounded-xl border border-teal/20 px-4 py-3" />
            <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
              placeholder="Password"
              className="rounded-xl border border-teal/20 px-4 py-3" />
            <button className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors">
              Sign in
            </button>
            {pwError && (
              <p className="text-sm text-red-600">Incorrect username or password.</p>
            )}
          </form>
        ) : state === 'sent' ? (
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
