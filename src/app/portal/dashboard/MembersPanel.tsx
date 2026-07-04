'use client';
import { useEffect, useState } from 'react';

type AffReq = {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
  user_name: string | null;
  user_email: string | null;
};

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-700',
};

export default function MembersPanel() {
  const [requests, setRequests] = useState<AffReq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portal/affiliation-requests')
      .then(r => r.json())
      .then(data => { setRequests(data); setLoading(false); });
  }, []);

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    await fetch('/api/portal/affiliation-requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }

  const pending = requests.filter(r => r.status === 'pending');
  const others = requests.filter(r => r.status !== 'pending');

  return (
    <div className="mt-10 rounded-2xl bg-white border border-teal/10 p-6">
      <h2 className="font-display font-semibold text-teal-ink">Member Requests</h2>
      <p className="text-sm text-teal-soft mt-1">Students requesting to affiliate with your chapter.</p>

      {loading ? (
        <p className="mt-4 text-sm text-teal-soft">Loading…</p>
      ) : requests.length === 0 ? (
        <p className="mt-4 text-sm text-teal-soft">No requests yet.</p>
      ) : (
        <div className="mt-4 grid gap-3">
          {[...pending, ...others].map(r => (
            <div key={r.id} className="flex items-start justify-between gap-4 rounded-xl border border-teal/10 p-4">
              <div>
                <p className="text-sm font-medium text-teal-ink">{r.user_name ?? 'Unknown'}</p>
                <p className="text-xs text-teal-soft">{r.user_email}</p>
                {r.message && <p className="mt-1 text-xs text-teal-ink/70 italic">"{r.message}"</p>}
                <p className="text-xs text-teal-soft mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[r.status]}`}>
                  {r.status}
                </span>
                {r.status === 'pending' && (
                  <div className="flex gap-2">
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
          ))}
        </div>
      )}
    </div>
  );
}
