'use client';
import { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

function PinInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error: boolean;
}) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function handleChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const arr = value.padEnd(4, ' ').split('');
    arr[i] = digit || ' ';
    const next = arr.join('').trimEnd();
    onChange(next);
    if (digit && i < 3) refs[i + 1].current?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      const arr = value.padEnd(4, ' ').split('');
      if (arr[i].trim()) {
        arr[i] = ' ';
        onChange(arr.join('').trimEnd());
      } else if (i > 0) {
        refs[i - 1].current?.focus();
        const prev = value.padEnd(4, ' ').split('');
        prev[i - 1] = ' ';
        onChange(prev.join('').trimEnd());
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs[i - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && i < 3) {
      refs[i + 1].current?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    onChange(digits);
    const focusIdx = Math.min(digits.length, 3);
    refs[focusIdx].current?.focus();
  }

  const boxBase =
    'w-14 h-16 text-center text-2xl font-bold rounded-2xl border-2 transition-all duration-150 focus:outline-none caret-transparent';
  const boxIdle = 'border-teal/20 bg-white focus:border-teal focus:shadow-[0_0_0_3px_rgba(35,84,112,0.12)]';
  const boxError = 'border-red-400 bg-red-50 focus:border-red-500';

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {[0, 1, 2, 3].map(i => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]?.trim() || ''}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onClick={() => refs[i].current?.select()}
          className={`${boxBase} ${error ? boxError : boxIdle}`}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}

export default function PortalLogin() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');

  const handlePinChange = useCallback((v: string) => {
    setPin(v);
    if (state === 'error') setState('idle');
  }, [state]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin.replace(/\s/g, '').length < 4) return;
    setState('loading');
    const res = await fetch('/api/portal/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', pin: pin.trim() }),
    });
    if (res.ok) {
      router.push('/portal/dashboard');
    } else {
      setState('error');
      setPin('');
    }
  }

  const pinComplete = pin.replace(/\s/g, '').length === 4;

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
          <div className="flex items-center gap-3">
            <span className="text-gold text-base">✦</span>
            <span>Chapter page editor</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-base">✦</span>
            <span>Events calendar</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-base">✦</span>
            <span>USM Wrapped submissions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-base">✦</span>
            <span>Member affiliation requests</span>
          </div>
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

          <div className="lg:block">
            <h2 className="font-display text-2xl font-bold text-teal">Welcome back</h2>
            <p className="text-teal-soft text-sm mt-1">Enter your chapter's 4-digit PIN to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <PinInput value={pin} onChange={handlePinChange} error={state === 'error'} />

            {state === 'error' && (
              <p className="mt-4 text-center text-sm text-red-600 font-medium">
                Incorrect PIN — try again or contact USM.
              </p>
            )}

            <button
              type="submit"
              disabled={!pinComplete || state === 'loading'}
              className="mt-6 w-full rounded-full bg-teal text-white py-3.5 font-display font-semibold text-base hover:bg-teal-ink transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
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
            New chapter or forgot your PIN?<br />
            <a href="mailto:info@unitedsikhmovement.org" className="text-teal underline underline-offset-4">
              Contact your USM coordinator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
