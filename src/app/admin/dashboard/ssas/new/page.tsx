'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewSSA() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState<{ name: string; pin: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const f = new FormData(e.currentTarget);
    const body = {
      slug: f.get('slug'),
      name: f.get('name'),
      school: f.get('school'),
      city: f.get('city'),
      state: f.get('state'),
      instagram_handle: f.get('instagram_handle') || null,
      contact_email: f.get('contact_email') || null,
      status: f.get('status'),
    };
    const res = await fetch('/api/admin/ssas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setCreated({ name: data.name, pin: data.pin });
    } else {
      const data = await res.json();
      setError(data.error ?? 'Something went wrong');
    }
  }

  const input = 'w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  if (created) {
    return (
      <div className="mx-auto max-w-lg px-5 py-14">
        <div className="rounded-2xl bg-white border border-teal/10 p-8 text-center">
          <p className="text-4xl mb-3">✓</p>
          <h2 className="font-display text-2xl font-bold text-teal">{created.name} created</h2>
          <p className="text-teal-soft mt-2 text-sm">Share these credentials with the SSA leader.</p>
          <div className="mt-6 rounded-xl bg-gold/20 p-5 text-left">
            <p className="text-sm text-teal-soft">Login at <strong>/portal/login</strong></p>
            <p className="mt-2 text-sm">Username: <code className="font-bold text-teal">admin</code></p>
            <p className="text-sm">PIN: <code className="font-bold text-teal text-lg">{created.pin}</code></p>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/admin/dashboard/ssas"
              className="rounded-full border border-teal/20 px-5 py-2.5 text-sm font-semibold text-teal hover:bg-teal/5">
              Back to SSAs
            </Link>
            <button onClick={() => setCreated(null)}
              className="rounded-full bg-teal text-white px-5 py-2.5 text-sm font-semibold hover:bg-teal-ink">
              Add another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-14">
      <Link href="/admin/dashboard/ssas" className="text-xs text-teal-soft underline">← All SSAs</Link>
      <h1 className="font-display text-3xl font-bold text-teal mt-2">New SSA</h1>
      <p className="text-sm text-teal-soft mt-1">A unique PIN will be auto-generated for the admin login.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-teal-ink">Slug (URL-safe, lowercase, no spaces)
          <input name="slug" required pattern="[a-z0-9\-]+" placeholder="e.g. rutgers" className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">Chapter name
          <input name="name" required placeholder="e.g. Rutgers SSA" className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">School / University
          <input name="school" required placeholder="e.g. Rutgers University" className={`mt-1 ${input}`} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-teal-ink">City
            <input name="city" placeholder="e.g. New Brunswick" className={`mt-1 ${input}`} />
          </label>
          <label className="text-sm font-medium text-teal-ink">State
            <input name="state" placeholder="e.g. NJ" maxLength={2} className={`mt-1 ${input}`} />
          </label>
        </div>
        <label className="text-sm font-medium text-teal-ink">Instagram handle (without @)
          <input name="instagram_handle" placeholder="e.g. rutgersssa" className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">Contact email
          <input name="contact_email" type="email" placeholder="e.g. ssa@rutgers.edu" className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">Status
          <select name="status" className={`mt-1 ${input}`}>
            <option value="unclaimed">Unclaimed</option>
            <option value="live">Live</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading}
          className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
          {loading ? 'Creating…' : 'Create SSA'}
        </button>
      </form>
    </div>
  );
}
