'use client';
// Wrapped submission — the portal's onboarding hook. Five questions, photos, done.
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase';

export default function WrappedForm() {
  const sb = supabaseBrowser();
  const [ssaId, setSsaId] = useState<string | null>(null);
  const [state, setState] = useState<'loading' | 'idle' | 'saving' | 'done' | 'error'>('loading');
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/portal/login'; return; }
      const { data } = await sb.from('profiles').select('ssa_id').eq('id', user.id).single();
      setSsaId(data?.ssa_id ?? null);
      setState('idle');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function uploadPhotos(files: FileList | null) {
    if (!files || !ssaId) return;
    const urls: string[] = [];
    for (const f of Array.from(files).slice(0, 6)) {
      const path = `${ssaId}/wrapped/${Date.now()}-${f.name}`;
      const { error } = await sb.storage.from('ssa-photos').upload(path, f);
      if (!error) {
        const { data } = sb.storage.from('ssa-photos').getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    setPhotos((p) => [...p, ...urls].slice(0, 6));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ssaId) return;
    setState('saving');
    const f = new FormData(e.currentTarget);
    const { error } = await sb.from('wrapped_submissions').upsert({
      ssa_id: ssaId,
      school_year: '2025-26',
      events_held: Number(f.get('events_held')) || null,
      member_count: Number(f.get('member_count')) || null,
      seva_hours: Number(f.get('seva_hours')) || null,
      biggest_moment: f.get('biggest_moment'),
      senior_quote: f.get('senior_quote'),
      senior_quote_name: f.get('senior_quote_name'),
      photo_urls: photos,
    }, { onConflict: 'ssa_id,school_year' });
    setState(error ? 'error' : 'done');
  }

  if (state === 'loading') return <div className="p-14 text-teal-soft">Loading…</div>;
  if (state === 'done')
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-teal">Submitted 🎉</h1>
        <p className="mt-3 text-teal-ink/75">
          USM will review and publish your Wrapped — you'll get a shareable link for Instagram.
        </p>
      </div>
    );

  const input = 'w-full rounded-xl border border-teal/20 bg-white px-4 py-3';
  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold text-teal">Your 2025–26 Wrapped</h1>
      <p className="mt-2 text-teal-ink/75">
        Five minutes now → a shareable recap page for your chapter.
      </p>
      <form onSubmit={submit} className="mt-8 grid gap-4">
        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm">Events held
            <input name="events_held" type="number" min="0" className={input} /></label>
          <label className="text-sm">Members
            <input name="member_count" type="number" min="0" className={input} /></label>
          <label className="text-sm">Seva hours
            <input name="seva_hours" type="number" min="0" className={input} /></label>
        </div>
        <label className="text-sm">Biggest moment of the year
          <textarea name="biggest_moment" rows={3} className={input}
            placeholder="One or two sentences — what would your chapter remember this year by?" /></label>
        <label className="text-sm">A quote from a graduating senior
          <textarea name="senior_quote" rows={2} className={input} /></label>
        <label className="text-sm">Their name
          <input name="senior_quote_name" className={input} /></label>
        <label className="text-sm">Up to 6 photos
          <input type="file" accept="image/*" multiple onChange={(e) => uploadPhotos(e.target.files)}
            className="block mt-1 text-sm" /></label>
        {photos.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {photos.map((u, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={u} alt="" className="w-16 h-16 object-cover rounded-lg" />
            ))}
          </div>
        )}
        <button disabled={state === 'saving'}
          className="rounded-full bg-gold py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors disabled:opacity-60">
          {state === 'saving' ? 'Saving…' : 'Submit Wrapped'}
        </button>
        {state === 'error' && <p className="text-sm text-red-600">Couldn't save — try again.</p>}
      </form>
    </div>
  );
}
