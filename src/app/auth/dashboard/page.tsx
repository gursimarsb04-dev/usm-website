'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

type SSA = { id: string; name: string; school: string; state: string };
type AffRequest = { id: string; status: string; ssas: { name: string } | { name: string }[] | null };
type Follow = { ssa_id: string; ssas: { name: string; slug: string } | { name: string; slug: string }[] | null };
type Notification = { id: string; title: string; body: string | null; link: string | null; read: boolean; created_at: string };

export default function UserDashboard() {
  const router = useRouter();
  const sb = supabaseBrowser();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [ssas, setSsas] = useState<SSA[]>([]);
  const [myRequest, setMyRequest] = useState<AffRequest | null>(null);
  const [follows, setFollows] = useState<Follow[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedSSA, setSelectedSSA] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/auth/login'); return; }
      setUser(user);

      const [{ data: prof }, { data: ssaList }, { data: req }, { data: followList }, { data: notifs }] = await Promise.all([
        sb.from('profiles').select('full_name, ssa_id, role').eq('id', user.id).single(),
        sb.from('ssas').select('id, name, school, state').eq('status', 'live').order('name'),
        sb.from('affiliation_requests').select('id, status, ssas(name)').eq('user_id', user.id)
          .order('created_at', { ascending: false }).limit(1).single(),
        sb.from('ssa_follows').select('ssa_id, ssas(name, slug)').eq('user_id', user.id),
        sb.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
      ]);

      setProfile(prof);
      setSsas(ssaList ?? []);
      setMyRequest(req ?? null);
      setFollows(followList ?? []);
      setNotifications(notifs ?? []);
      setLoading(false);

      // Mark all unread notifications as read
      const unreadIds = (notifs ?? []).filter((n: Notification) => !n.read).map((n: Notification) => n.id);
      if (unreadIds.length > 0) {
        await sb.from('notifications').update({ read: true }).in('id', unreadIds);
      }
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
    setSubmitting(false);
    setMyRequest({ id: '', status: 'pending', ssas: { name: ssas.find(s => s.id === selectedSSA)?.name ?? '' } });
  }

  async function unfollow(ssaId: string) {
    await sb.from('ssa_follows').delete().eq('user_id', user.id).eq('ssa_id', ssaId);
    setFollows(prev => prev.filter(f => f.ssa_id !== ssaId));
  }

  if (loading) return <div className="p-14 text-teal-soft">Loading…</div>;

  const isAffiliated = !!profile?.ssa_id;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-teal">
          Hi, {profile?.full_name ?? user?.email}
        </h1>
        <p className="text-sm text-teal-soft mt-1">{user?.email}</p>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="rounded-2xl bg-white border border-teal/10 p-6">
          <h2 className="font-display font-semibold text-teal-ink">Notifications</h2>
          <div className="mt-4 space-y-3">
            {notifications.map(n => (
              <div key={n.id}
                className={`rounded-xl p-4 ${n.read ? 'bg-mist/40' : 'bg-gold/15 border border-gold/30'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-teal-ink">{n.title}</p>
                    {n.body && <p className="text-xs text-teal-soft mt-0.5">{n.body}</p>}
                    <p className="text-xs text-teal-soft/60 mt-1">
                      {new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                  {n.link && (
                    <a href={n.link} className="shrink-0 text-xs text-teal underline underline-offset-4 mt-0.5">
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chapter affiliation */}
      <div className="rounded-2xl bg-white border border-teal/10 p-6">
        <h2 className="font-display font-semibold text-teal-ink">Chapter Affiliation</h2>
        {isAffiliated ? (
          <p className="mt-3 text-sm text-green-700 font-medium">
            ✓ You're affiliated with your chapter.
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
          </div>
        ) : (
          <form onSubmit={submitRequest} className="mt-4 grid gap-3">
            <p className="text-sm text-teal-soft">Select your chapter to request affiliation.</p>
            <select value={selectedSSA} onChange={e => setSelectedSSA(e.target.value)} required
              className="w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30">
              <option value="">Select your SSA…</option>
              {ssas.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.school} ({s.state})</option>
              ))}
            </select>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Optional message to your SSA admin"
              rows={2}
              className="w-full rounded-xl border border-teal/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30" />
            <button disabled={submitting || !selectedSSA}
              className="rounded-full bg-teal text-white py-3 font-display font-semibold hover:bg-teal-ink transition-colors disabled:opacity-60">
              {submitting ? 'Sending…' : 'Request to join'}
            </button>
          </form>
        )}
      </div>

      {/* Following */}
      <div className="rounded-2xl bg-white border border-teal/10 p-6">
        <h2 className="font-display font-semibold text-teal-ink">Following</h2>
        {follows.length === 0 ? (
          <p className="mt-3 text-sm text-teal-soft">
            You're not following any chapters yet. Visit an{' '}
            <a href="/ssas" className="text-teal underline underline-offset-4">SSA page</a> and click "Follow" to get event notifications.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {follows.map(f => (
              <li key={f.ssa_id} className="flex items-center justify-between rounded-xl border border-teal/10 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-teal-ink">{(f.ssas as any)?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`/ssas/${(f.ssas as any)?.slug}`}
                    className="text-xs text-teal underline underline-offset-4">View page</a>
                  <button onClick={() => unfollow(f.ssa_id)}
                    className="text-xs text-teal-soft hover:text-red-500 transition-colors">
                    Unfollow
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form action="/auth/logout" method="post">
        <button className="text-xs text-teal-soft underline">Sign out</button>
      </form>
    </div>
  );
}
