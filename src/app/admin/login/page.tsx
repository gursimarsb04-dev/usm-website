'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(true);
    }
  }

  const input = 'w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  return (
    <div className="min-h-screen grid place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-teal/10 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-gold-deep font-semibold">USM Admin</p>
        <h1 className="font-display text-2xl font-bold text-teal mt-1">Admin Panel</h1>
        <p className="text-sm text-teal-soft mt-1">United Sikh Movement internal access only.</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input
            type="text" required value={username}
            onChange={e => { setUsername(e.target.value); setError(false); }}
            placeholder="Username" className={input}
          />
          <input
            type="password" required value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            placeholder="Password" className={input}
          />
          <button
            disabled={loading}
            className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          {error && <p className="text-sm text-red-600">Incorrect username or password.</p>}
        </form>
      </div>
    </div>
  );
}
