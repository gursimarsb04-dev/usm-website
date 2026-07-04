'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Req = {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
  user_name: string | null;
  user_email: string | null;
  ssas: { name: string; slug: string } | null;
};

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-700',
};

export default function AdminRequests() {
  const [requests, setRequests] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending'>('pending');

  useEffect(() => {
    fetch('/api/admin/requests')
      .then(r => r.json())
      .then(data => { setRequests(data); setLoading(false); });
  }, []);

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    await fetch('/api/admin/requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }

  const visible = filter === 'pending' ? requests.filter(r => r.status === 'pending') : requests;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Link href="/admin/dashboard" className="text-xs text-teal-soft underline">← Dashboard</Link>
      <h1 className="font-display text-3xl font-bold text-teal mt-2">Affiliation Requests</h1>

      <div className="mt-4 flex gap-2">
        {(['pending', 'all'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${filter === f ? 'bg-teal text-white' : 'border border-teal/20 text-teal hover:bg-teal/5'}`}>
            {f === 'pending' ? 'Pending' : 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 text-teal-soft">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="mt-10 text-teal-soft">No {filter === 'pending' ? 'pending ' : ''}requests.</p>
      ) : (
        <div className="mt-6 grid gap-3">
          {visible.map(r => (
            <div key={r.id} className="rounded-2xl bg-white border border-teal/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-teal-ink">{r.user_name ?? 'Unknown user'}</p>
                  <p className="text-xs text-teal-soft">{r.user_email}</p>
                  <p className="text-xs text-teal-soft mt-0.5">→ {r.ssas?.name ?? 'Unknown SSA'}</p>
                  {r.message && <p className="mt-2 text-sm text-teal-ink/80 italic">"{r.message}"</p>}
                  <p className="text-xs text-teal-soft mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[r.status]}`}>
                    {r.status}
                  </span>
                  {r.status === 'pending' && (
                    <div className="flex gap-2 mt-1">
                      <button onClick={() => handleAction(r.id, 'approved')}
                        className="rounded-full bg-teal text-white px-3 py-1 text-xs font-semibold hover:bg-teal-ink">
                        Approve
                      </button>
                      <button onClick={() => handleAction(r.id, 'rejected')}
                        className="rounded-full border border-red-300 text-red-600 px-3 py-1 text-xs font-semibold hover:bg-red-50">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
