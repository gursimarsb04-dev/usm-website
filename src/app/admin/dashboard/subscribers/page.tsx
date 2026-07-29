'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Sub = {
  id: string;
  email: string;
  source: string | null;
  segment: string | null;
  phone: string | null;
  sms_consent: boolean | null;
  created_at: string;
};

const SEGMENT_LABEL: Record<string, string> = {
  student: 'Student',
  alumni_donor: 'Alum / Supporter',
};

/** Quote a CSV cell so commas, quotes and newlines can't break the columns. */
function csvCell(v: unknown): string {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function AdminSubscribers() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((r) => r.json())
      .then((data) => { setSubs(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const s of subs) {
      const k = s.segment ?? 'student';
      c[k] = (c[k] ?? 0) + 1;
    }
    return c;
  }, [subs]);

  const shown = useMemo(
    () => (filter ? subs.filter((s) => (s.segment ?? 'student') === filter) : subs),
    [subs, filter]
  );

  // Export what's currently filtered, so a segment can be pulled on its own for
  // import into a Mailchimp audience/tag.
  const csv = useMemo(() => {
    const rows = [
      ['email', 'segment', 'phone', 'sms_consent', 'source', 'subscribed'],
      ...shown.map((s) => [
        s.email,
        s.segment ?? 'student',
        s.phone ?? '',
        s.sms_consent ? 'yes' : 'no',
        s.source ?? '',
        s.created_at,
      ]),
    ];
    return (
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(rows.map((r) => r.map(csvCell).join(',')).join('\n'))
    );
  }, [shown]);

  const pill = 'rounded-full px-3 py-1 text-xs font-semibold border transition-colors';
  const on = 'bg-teal text-white border-teal';
  const off = 'bg-white text-teal-ink border-teal/15 hover:border-gold';

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Link href="/admin/dashboard" className="text-xs text-teal-soft underline">← Dashboard</Link>
      <div className="flex items-center justify-between mt-2">
        <h1 className="font-display text-3xl font-bold text-teal">Newsletter Subscribers</h1>
        {shown.length > 0 && (
          <a href={csv} download={`usm-subscribers-${filter ?? 'all'}.csv`}
            className="rounded-full bg-teal text-white px-4 py-1.5 text-xs font-semibold hover:bg-teal-ink">
            Export CSV{filter ? ` (${SEGMENT_LABEL[filter] ?? filter})` : ''}
          </a>
        )}
      </div>
      <p className="text-sm text-teal-soft mt-1">
        {subs.length} total · {counts.student ?? 0} students · {counts.alumni_donor ?? 0} alumni/supporters
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button onClick={() => setFilter(null)} className={`${pill} ${filter === null ? on : off}`}>
          All
        </button>
        {Object.keys(SEGMENT_LABEL).map((k) => (
          <button key={k} onClick={() => setFilter(k)} className={`${pill} ${filter === k ? on : off}`}>
            {SEGMENT_LABEL[k]} <span className="opacity-60">{counts[k] ?? 0}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 text-teal-soft">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="mt-10 text-teal-soft">No subscribers yet.</p>
      ) : (
        <div className="mt-6 rounded-2xl bg-white border border-teal/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist text-teal-ink">
              <tr>
                <th className="text-left px-4 py-2 font-semibold">Email</th>
                <th className="text-left px-4 py-2 font-semibold">Segment</th>
                <th className="text-left px-4 py-2 font-semibold">SMS</th>
                <th className="text-left px-4 py-2 font-semibold">Source</th>
                <th className="text-left px-4 py-2 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((s) => (
                <tr key={s.id} className="border-t border-teal/5">
                  <td className="px-4 py-2">
                    <a href={`mailto:${s.email}`} className="text-teal hover:underline">{s.email}</a>
                  </td>
                  <td className="px-4 py-2 text-teal-ink/80">
                    {SEGMENT_LABEL[s.segment ?? 'student'] ?? s.segment}
                  </td>
                  <td className="px-4 py-2 text-teal-soft">
                    {s.sms_consent ? (s.phone ?? 'opted in') : '—'}
                  </td>
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
