'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PortalLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    const res = await fetch('/api/portal/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pin: password }),
    });
    if (res.ok) {
      router.push('/portal/dashboard');
    } else {
      setState('error');
      setPassword('');
    }
  }

  const inp = 'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 transition-shadow';

  return (
    <div className="flex min-h-[calc(100vh-65px)]">

      {/* Left panel — teal branding (desktop only) */}
      <div className="hidden lg:flex flex-col justify-between bg-teal text-white w-[45%] shrink-0 p-14">
        <div>
          <p className="text-gold font-display text-xs tracking-widest uppercase font-semibold">
            United Sikh Movement
          </p>
          <h1 className="font-display text-5xl font-bold mt-4 leading-tight">
            SSA Leader<br />Portal
          </h1>
          <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-xs">
            Manage your chapter's page, events, Wrapped, and member requests — all in one place.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/50">
          {['Chapter page editor', 'Events calendar', 'USM Wrapped submissions', 'Member affiliation requests'].map(f => (
            <div key={f} className="flex items-center gap-3">
              <span className="text-gold text-base">✦</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 bg-sand/40">
        <div className="w-full max-w-sm">

          {/* Mobile header */}
          <div className="lg:hidden text-center mb-10">
            <p className="text-gold-deep font-display text-xs tracking-widest uppercase font-semibold">
              United Sikh Movement
            </p>
            <h1 className="font-display text-3xl font-bold text-teal mt-1">SSA Portal</h1>
          </div>

          <h2 className="font-display text-2xl font-bold text-teal">Welcome back</h2>
          <p className="text-teal-soft text-sm mt-1">Sign in to manage your chapter.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="text-sm font-medium text-teal-ink">
              Username
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setState('idle'); }}
                required
                autoComplete="username"
                autoFocus
                placeholder="admin"
                className={`mt-1 ${inp}`}
              />
            </label>

            <label className="text-sm font-medium text-teal-ink">
              Password
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setState('idle'); }}
                required
                autoComplete="current-password"
                placeholder="••••••"
                className={`mt-1 ${inp}`}
              />
            </label>

            {state === 'error' && (
              <p className="text-sm text-red-600 font-medium">
                Incorrect username or password — try again or contact USM.
              </p>
            )}

            <button
              type="submit"
              disabled={!username || !password || state === 'loading'}
              className="mt-2 w-full rounded-full bg-teal text-white py-3.5 font-display font-semibold text-base hover:bg-teal-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {state === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-teal-soft leading-relaxed">
            New chapter or forgot your credentials?<br />
            <a href="mailto:info@unitedsikhmovement.org" className="text-teal underline underline-offset-4">
              Contact your USM coordinator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
