'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type App = {
  id: string;
  applicant_name: string;
  email: string;
  school: string;
  city: string | null;
  state: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ['new', 'contacted', 'onboarding', 'launched', 'closed'] as const;
const statusColor: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  onboarding: 'bg-purple-100 text-purple-800',
  launched: 'bg-green-100 text-green-800',
  closed: 'bg-gray-200 text-gray-600',
};

export default function AdminApplications() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'open' | 'all'>('open');

  useEffect(() => {
    fetch('/api/admin/applications')
      .then((r) => r.json())
      .then((data) => { setApps(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  async function setStatus(id: string, status: string) {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  }

  const visible = filter === 'open' ? apps.filter((a) => a.status !== 'closed' && a.status !== 'launched') : apps;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Link href="/admin/dashboard" className="text-xs text-teal-soft underline">← Dashboard</Link>
      <h1 className="font-display text-3xl font-bold text-teal mt-2">SSA Applications</h1>
      <p className="text-sm text-teal-soft mt-1">Students applying to start a new chapter.</p>

      <div className="mt-4 flex gap-2">
        {(['open', 'all'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${filter === f ? 'bg-teal text-white' : 'border border-teal/20 text-teal hover:bg-teal/5'}`}>
            {f === 'open' ? 'Open' : 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 text-teal-soft">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="mt-10 text-teal-soft">No {filter === 'open' ? 'open ' : ''}applications.</p>
      ) : (
        <div className="mt-6 grid gap-3">
          {visible.map((a) => (
            <div key={a.id} className="rounded-2xl bg-white border border-teal/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-teal-ink">{a.applicant_name} <span className="font-normal text-teal-soft">· {a.school}</span></p>
                  <p className="text-xs text-teal-soft">
                    <a href={`mailto:${a.email}`} className="underline">{a.email}</a>
                    {(a.city || a.state) && <> · {[a.city, a.state].filter(Boolean).join(', ')}</>}
                  </p>
                  {a.message && <p className="mt-2 text-sm text-teal-ink/80 italic">“{a.message}”</p>}
                  <p className="text-xs text-teal-soft mt-2">{new Date(a.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[a.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {a.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => setStatus(a.id, s)} disabled={s === a.status}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${s === a.status ? 'bg-teal text-white' : 'border border-teal/20 text-teal hover:bg-teal/5'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
