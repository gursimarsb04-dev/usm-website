'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditSSA() {
  const { id } = useParams<{ id: string }>();
  const [ssa, setSsa] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [resettingPin, setResettingPin] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/ssas/${id}`)
      .then(r => r.json())
      .then(setSsa);
  }, [id]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError('');
    const f = new FormData(e.currentTarget);
    const body: Record<string, any> = {};
    for (const key of ['name', 'school', 'city', 'state', 'instagram_handle', 'contact_email', 'description', 'joining_instructions', 'status']) {
      body[key] = f.get(key) || null;
    }
    const res = await fetch(`/api/admin/ssas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
    else setError('Failed to save.');
  }

  async function resetPin() {
    if (!confirm('Generate a new access code for this SSA? The old one will stop working immediately.')) return;
    setResettingPin(true);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const newPin = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const res = await fetch(`/api/admin/ssas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: newPin }),
    });
    setResettingPin(false);
    if (res.ok) setSsa((s: any) => ({ ...s, pin: newPin }));
    else alert('Failed to reset PIN');
  }

  if (!ssa) return <div className="p-14 text-teal-soft">Loading…</div>;

  const input = 'w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30';

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <Link href="/admin/dashboard/ssas" className="text-xs text-teal-soft underline">← All SSAs</Link>
      <h1 className="font-display text-3xl font-bold text-teal mt-2">Edit {ssa.name}</h1>

      <div className="mt-4 flex items-center gap-4 rounded-xl bg-gold/20 px-5 py-3">
        <div>
          <p className="text-xs text-teal-soft">Admin login</p>
          <p className="text-sm">Username: <code className="font-bold text-teal">admin</code> &nbsp; PIN: <code className="font-bold text-teal text-lg">{ssa.pin ?? '—'}</code></p>
        </div>
        <button onClick={resetPin} disabled={resettingPin}
          className="ml-auto text-xs text-teal underline underline-offset-4 disabled:opacity-50">
          {resettingPin ? 'Resetting…' : 'Reset PIN'}
        </button>
      </div>

      <form onSubmit={handleSave} className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-teal-ink">Chapter name
          <input name="name" required defaultValue={ssa.name} className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">School
          <input name="school" required defaultValue={ssa.school} className={`mt-1 ${input}`} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-teal-ink">City
            <input name="city" defaultValue={ssa.city ?? ''} className={`mt-1 ${input}`} />
          </label>
          <label className="text-sm font-medium text-teal-ink">State
            <input name="state" defaultValue={ssa.state ?? ''} maxLength={2} className={`mt-1 ${input}`} />
          </label>
        </div>
        <label className="text-sm font-medium text-teal-ink">Instagram handle
          <input name="instagram_handle" defaultValue={ssa.instagram_handle ?? ''} className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">Contact email
          <input name="contact_email" type="email" defaultValue={ssa.contact_email ?? ''} className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">Status
          <select name="status" defaultValue={ssa.status} className={`mt-1 ${input}`}>
            <option value="unclaimed">Unclaimed</option>
            <option value="live">Live</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label className="text-sm font-medium text-teal-ink">Description
          <textarea name="description" rows={4} defaultValue={ssa.description ?? ''} className={`mt-1 ${input}`} />
        </label>
        <label className="text-sm font-medium text-teal-ink">Joining instructions
          <textarea name="joining_instructions" rows={3} defaultValue={ssa.joining_instructions ?? ''} className={`mt-1 ${input}`} />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={saving}
          className="rounded-full bg-gold py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60">
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
