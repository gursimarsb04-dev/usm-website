'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

type SSA = { id: string; name: string; school: string; state: string };
type Request = { id: string; status: string; ssas: { name: string } | null };

export default function UserDashboard() {
  const router = useRouter();
  const sb = supabaseBrowser();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [ssas, setSsas] = useState<SSA[]>([]);
  const [myRequest, setMyRequest] = useState<Request | null>(null);
  const [selectedSSA, setSelectedSSA] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/auth/login'); return; }
      setUser(user);

      const [{ data: prof }, { data: ssaList }, { data: req }] = await Promise.all([
        sb.from('profiles').select('full_name, ssa_id, role').eq('id', user.id).single(),
        sb.from('ssas').select('id, name, school, state').eq('status', 'live').order('name'),
        sb.from('affiliation_requests')
          .select('id, status, ssas(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single(),
      ]);

      setProfile(prof);
      setSsas(ssaList ?? []);
      setMyRequest(req ?? null);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSSA || !user) return;
    setSubmitting(true);
    await sb.from('affiliation_requests').insert({
      user_id: user.id,
      ssa_id: selectedSSA,
      user_name: profile?.full_name ?? user.email,
      user_email: user.email,
      message: message || null,
    });
    setSubmitted(true);
    setSubmitting(false);
    setMyRequest({ id: '', status: 'pending', ssas: { name: ssas.find(s => s.id === selectedSSA)?.name ?? '' } });
  }

  if (loading) return <div className="p-14 text-teal-soft">Loading…</div>;

  const isAffiliated = !!profile?.ssa_id;

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold text-teal">
        Hi, {profile?.full_name ?? user?.email}
      </h1>
      <p className="text-sm text-teal-soft mt-1">{user?.email}</p>

      <div className="mt-8 rounded-2xl bg-white border border-teal/10 p-6">
        <h2 className="font-display font-semibold text-teal-ink">Chapter Affiliation</h2>

        {isAffiliated ? (
          <p className="mt-3 text-sm text-green-700 font-medium">
            ✓ You're affiliated with your chapter. Your SSA admin can see your membership.
          </p>
        ) : myRequest ? (
          <div className="mt-3">
            <p className="text-sm text-teal-ink">
              Request to join <strong>{(myRequest.ssas as any)?.name}</strong>:{' '}
              <span className={`font-semibold ${myRequest.status === 'pending' ? 'text-yellow-700' : myRequest.status === 'approved' ? 'text-green-700' : 'text-red-600'}`}>
                {myRequest.status}
              </span>
            </p>
            {myRequest.status === 'pending' && (
              <p className="text-xs text-teal-soft mt-1">Waiting for your SSA admin to approve.</p>
            )}
            {myRequest.status === 'rejected' && (
              <p className="text-xs text-teal-soft mt-1">Contact your SSA directly for help.</p>
            )}
          </div>
        ) : (
          <form onSubmit={submitRequest} className="mt-4 grid gap-3">
            <p className="text-sm text-teal-soft">Select your chapter to request affiliation.</p>
            <select
              value={selectedSSA}
              onChange={e => setSelectedSSA(e.target.value)}
              required
              className="w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            >
              <option value="">Select your SSA…</option>
              {ssas.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.school} ({s.state})</option>
              ))}
            </select>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Optional message to your SSA admin (e.g. your name, year, how you heard about them)"
              rows={3}
              className="w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
            <button disabled={submitting || !selectedSSA}
              className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
              {submitting ? 'Sending…' : 'Request to join'}
            </button>
          </form>
        )}
      </div>

      <form action="/auth/logout" method="post" className="mt-10">
        <button className="text-xs text-teal-soft underline">Sign out</button>
      </form>
    </div>
  );
}
