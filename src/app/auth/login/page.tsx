'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseBrowser } from '@/lib/supabase';

export default function AuthLogin() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const f = new FormData(e.currentTarget);
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email: f.get('email') as string,
      password: f.get('password') as string,
    });
    if (error) {
      const msg = error.message.toLowerCase().includes('email')
        ? 'Please confirm your email first — check your inbox for a link from USM.'
        : error.message;
      setError(msg);
      setState('error');
    } else {
      router.push('/auth/dashboard');
    }
  }

  const input = 'w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  return (
    <div className="min-h-[80vh] grid place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-teal/10 p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-teal">Sign in</h1>
        <p className="text-sm text-teal-soft mt-1">Welcome back.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input name="email" type="email" required placeholder="Email address" className={input} />
          <input name="password" type="password" required placeholder="Password" className={input} />
          <button disabled={state === 'loading'}
            className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
            {state === 'loading' ? 'Signing in…' : 'Sign in'}
          </button>
          {state === 'error' && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <p className="mt-5 text-center text-xs text-teal-soft">
          No account yet?{' '}
          <Link href="/auth/signup" className="text-teal underline underline-offset-4">Create one</Link>
        </p>
      </div>
    </div>
  );
}
