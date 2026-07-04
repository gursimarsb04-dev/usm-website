'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseBrowser } from '@/lib/supabase';

type ViewState = 'loading' | 'guest' | 'not-member' | 'member';

export default function MembersPage({ params }: { params: { slug: string } }) {
  const [view, setView] = useState<ViewState>('loading');
  const [ssa, setSsa] = useState<any>(null);
  const sb = supabaseBrowser();

  useEffect(() => {
    async function check() {
      const { data: ssaData } = await sb
        .from('ssas')
        .select('id, name, slug, status, members_content')
        .eq('slug', params.slug)
        .single();
      if (!ssaData || ssaData.status !== 'live') { setView('guest'); return; }
      setSsa(ssaData);

      const { data: { user } } = await sb.auth.getUser();
      if (!user) { setView('guest'); return; }

      const { data: profile } = await sb.from('profiles').select('ssa_id').eq('id', user.id).single();
      setView(profile?.ssa_id === ssaData.id ? 'member' : 'not-member');
    }
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  if (view === 'loading') {
    return <div className="p-14 text-teal-soft text-sm">Loading…</div>;
  }

  if (view === 'guest') {
    return (
      <div className="mx-auto max-w-wrap px-5 py-24 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="font-display text-2xl font-bold text-teal">Members Only</h2>
        <p className="text-teal-soft mt-3 max-w-sm mx-auto">
          Sign in and affiliate with this chapter to access this section.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/auth/login"
            className="rounded-full bg-teal text-white px-8 py-3 font-display font-semibold hover:bg-teal-ink transition-colors">
            Sign in
          </Link>
          <Link href="/auth/signup"
            className="rounded-full border border-teal/30 text-teal px-8 py-3 font-display font-semibold hover:border-teal transition-colors">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  if (view === 'not-member') {
    return (
      <div className="mx-auto max-w-wrap px-5 py-24 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="font-display text-2xl font-bold text-teal">Members Only</h2>
        <p className="text-teal-soft mt-3 max-w-sm mx-auto">
          This content is exclusive to affiliated members of {ssa?.name}.
        </p>
        <Link href={`/ssas/${params.slug}`}
          className="inline-block mt-6 rounded-full bg-teal text-white px-8 py-3 font-display font-semibold hover:bg-teal-ink transition-colors">
          Request affiliation →
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-teal text-white py-16">
        <div className="mx-auto max-w-wrap px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Members Only</p>
          <h1 className="font-display text-4xl font-bold mt-2">{ssa?.name}</h1>
        </div>
      </section>
      <div className="mx-auto max-w-wrap px-5 py-14">
        {ssa?.members_content ? (
          <div className="max-w-2xl text-teal-ink/80 leading-relaxed whitespace-pre-line text-[15px]">
            {ssa.members_content}
          </div>
        ) : (
          <p className="text-teal-soft">Your admin hasn't added members content yet.</p>
        )}
      </div>
    </>
  );
}
