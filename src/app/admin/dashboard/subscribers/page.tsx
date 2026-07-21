'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Sub = { id: string; email: string; source: string | null; created_at: string };

export default function AdminSubscribers() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((r) => r.json())
      .then((data) => { setSubs(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const csv = useMemo(() => {
    const rows = [['email', 'source', 'subscribed'], ...subs.map((s) => [s.email, s.source ?? '', s.created_at])];
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.map((r) => r.join(',')).join('\n'));
  }, [subs]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Link href="/admin/dashboard" className="text-xs text-teal-soft underline">← Dashboard</Link>
      <div className="flex items-center justify-between mt-2">
        <h1 className="font-display text-3xl font-bold text-teal">Newsletter Subscribers</h1>
        {subs.length > 0 && (
          <a href={csv} download="usm-subscribers.csv"
            className="rounded-full bg-teal text-white px-4 py-1.5 text-xs font-semibold hover:bg-teal-ink">
            Export CSV
          </a>
        )}
      </div>
      <p className="text-sm text-teal-soft mt-1">{subs.length} total</p>

      {loading ? (
        <p className="mt-10 text-teal-soft">Loading…</p>
      ) : subs.length === 0 ? (
        <p className="mt-10 text-teal-soft">No subscribers yet.</p>
      ) : (
        <div className="mt-6 rounded-2xl bg-white border border-teal/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-mist text-teal-ink">
              <tr>
                <th className="text-left px-4 py-2 font-semibold">Email</th>
                <th className="text-left px-4 py-2 font-semibold">Source</th>
                <th className="text-left px-4 py-2 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-t border-teal/5">
                  <td className="px-4 py-2"><a href={`mailto:${s.email}`} className="text-teal hover:underline">{s.email}</a></td>
                  <td className="px-4 py-2 text-teal-soft">{s.source ?? '—'}</td>
                  <td className="px-4 py-2 text-teal-soft">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
