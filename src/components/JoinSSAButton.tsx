'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

export default function JoinSSAButton({ ssaId, ssaName }: { ssaId: string; ssaName: string }) {
  const router = useRouter();
  const sb = supabaseBrowser();
  const [status, setStatus] = useState<'loading' | 'guest' | 'affiliated' | 'pending' | 'rejected' | 'none'>('loading');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setStatus('guest'); return; }
      const [{ data: profile }, { data: req }] = await Promise.all([
        sb.from('profiles').select('ssa_id').eq('id', user.id).single(),
        sb.from('affiliation_requests').select('status').eq('user_id', user.id).eq('ssa_id', ssaId).single(),
      ]);
      if (profile?.ssa_id === ssaId) { setStatus('affiliated'); return; }
      if (req) { setStatus(req.status as any); return; }
      setStatus('none');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssaId]);

  async function requestJoin() {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) { router.push('/auth/signup'); return; }
    setSubmitting(true);
    const { data: profile } = await sb.from('profiles').select('full_name').eq('id', user.id).single();
    await sb.from('affiliation_requests').insert({
      user_id: user.id,
      ssa_id: ssaId,
      user_name: profile?.full_name ?? null,
      user_email: user.email,
    });
    setSubmitting(false);
    setStatus('pending');
  }

  if (status === 'loading') return null;

  if (status === 'guest') return (
    <a href="/auth/signup"
      className="inline-block rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors">
      Join this SSA →
    </a>
  );

  if (status === 'affiliated') return (
    <span className="inline-block rounded-full bg-green-100 text-green-800 px-5 py-2.5 text-sm font-semibold">
      ✓ You're a member
    </span>
  );

  if (status === 'pending') return (
    <span className="inline-block rounded-full bg-yellow-100 text-yellow-800 px-5 py-2.5 text-sm font-semibold">
      Request pending approval
    </span>
  );

  if (status === 'rejected') return (
    <span className="inline-block text-sm text-red-600">
      Request not approved — contact the chapter directly.
    </span>
  );

  return (
    <button onClick={requestJoin} disabled={submitting}
      className="inline-block rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60">
      {submitting ? 'Sending request…' : `Join ${ssaName} →`}
    </button>
  );
}
