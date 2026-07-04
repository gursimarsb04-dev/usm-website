'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

type Status = 'loading' | 'guest' | 'following' | 'not-following';

export default function FollowSSAButton({ ssaId, ssaName }: { ssaId: string; ssaName: string }) {
  const router = useRouter();
  const sb = supabaseBrowser();
  const [status, setStatus] = useState<Status>('loading');
  const [userId, setUserId] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setStatus('guest'); return; }
      setUserId(user.id);
      const { data } = await sb
        .from('ssa_follows')
        .select('id')
        .eq('user_id', user.id)
        .eq('ssa_id', ssaId)
        .single();
      setStatus(data ? 'following' : 'not-following');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssaId]);

  async function toggle() {
    if (status === 'guest') { router.push('/auth/signup'); return; }
    if (!userId || toggling) return;
    setToggling(true);
    if (status === 'following') {
      await sb.from('ssa_follows').delete().eq('user_id', userId).eq('ssa_id', ssaId);
      setStatus('not-following');
    } else {
      await sb.from('ssa_follows').insert({ user_id: userId, ssa_id: ssaId });
      setStatus('following');
    }
    setToggling(false);
  }

  if (status === 'loading') return null;

  if (status === 'following') {
    return (
      <button onClick={toggle} disabled={toggling}
        className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white px-5 py-2 text-sm font-semibold hover:border-white/70 transition-colors disabled:opacity-60">
        <span className="w-2 h-2 rounded-full bg-gold" />
        {toggling ? 'Updating…' : 'Following'}
      </button>
    );
  }

  return (
    <button onClick={toggle} disabled={toggling}
      className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60">
      {toggling ? 'Following…' : `Follow ${ssaName}`}
    </button>
  );
}
