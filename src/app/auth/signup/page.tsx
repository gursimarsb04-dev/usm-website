'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseBrowser } from '@/lib/supabase';

export default function Signup() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const f = new FormData(e.currentTarget);
    const email = f.get('email') as string;
    const password = f.get('password') as string;
    const full_name = f.get('full_name') as string;

    const { error } = await supabaseBrowser().auth.signUp({
      email,
      password,
      options: { data: { full_name } },
    });

    if (error) {
      setError(error.message);
      setState('error');
    } else {
      // Supabase may require email confirmation before the session is active
      router.push('/auth/confirm');
    }
  }

  const input = 'w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  return (
    <div className="min-h-[80vh] grid place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-teal/10 p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-teal">Create account</h1>
        <p className="text-sm text-teal-soft mt-1">Join the USM community.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input
            name="full_name" required
            placeholder="Full name"
            className={input}
          />
          <input
            name="email" type="email" required
            placeholder="Email address"
            className={input}
          />
          <input
            name="password" type="password" required minLength={6}
            placeholder="Password (min. 6 characters)"
            className={input}
          />
          <button disabled={state === 'loading'}
            className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
            {state === 'loading' ? 'Creating account…' : 'Create account'}
          </button>
          {state === 'error' && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <p className="mt-5 text-center text-xs text-teal-soft">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-teal underline underline-offset-4">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
