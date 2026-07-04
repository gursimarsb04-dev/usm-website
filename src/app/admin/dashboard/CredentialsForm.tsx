'use client';
import { useState } from 'react';

export default function CredentialsForm() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setError('');
    const f = new FormData(e.currentTarget);
    const newPassword = f.get('newPassword') as string;
    const confirmPassword = f.get('confirmPassword') as string;
    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setState('error');
      return;
    }
    const res = await fetch('/api/admin/change-credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: f.get('currentPassword'),
        newUsername: f.get('newUsername') || undefined,
        newPassword: newPassword || undefined,
      }),
    });
    if (res.ok) {
      setState('saved');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setState('idle'), 3000);
    } else {
      const data = await res.json();
      setError(data.error ?? 'Failed to update');
      setState('error');
    }
  }

  const input = 'w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  return (
    <div className="mt-8 rounded-2xl bg-white border border-teal/10 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-teal-ink">Admin Credentials</h2>
          <p className="text-sm text-teal-soft mt-0.5">Change your admin username or password.</p>
        </div>
        <button onClick={() => setOpen(o => !o)}
          className="text-sm text-teal underline underline-offset-4">
          {open ? 'Cancel' : 'Change'}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <label className="text-sm font-medium text-teal-ink">Current password (required to save)
            <input name="currentPassword" type="password" required className={`mt-1 ${input}`} />
          </label>
          <label className="text-sm font-medium text-teal-ink">New username <span className="text-teal-soft font-normal">(leave blank to keep current)</span>
            <input name="newUsername" type="text" className={`mt-1 ${input}`} />
          </label>
          <label className="text-sm font-medium text-teal-ink">New password <span className="text-teal-soft font-normal">(leave blank to keep current)</span>
            <input name="newPassword" type="password" minLength={6} className={`mt-1 ${input}`} />
          </label>
          <label className="text-sm font-medium text-teal-ink">Confirm new password
            <input name="confirmPassword" type="password" className={`mt-1 ${input}`} />
          </label>
          {state === 'error' && <p className="text-sm text-red-600">{error}</p>}
          {state === 'saved' && <p className="text-sm text-green-700">Credentials updated successfully.</p>}
          <button disabled={state === 'loading'}
            className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
            {state === 'loading' ? 'Saving…' : 'Save credentials'}
          </button>
        </form>
      )}
    </div>
  );
}
