// Gated leader toolkit — only reachable after login.
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import { getResources } from '@/lib/sanity';
import { resourceFallbacks } from '@/lib/resource-fallbacks';

export default async function LeaderResources() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/portal/login');

  let resources: any[] = [];
  try { resources = await getResources(true); } catch {}
  if (!resources || resources.length === 0) resources = resourceFallbacks;
  const gated = resources.filter((r) => r.gated);
  const categories = Array.from(new Set(gated.map((r) => r.category))).filter(Boolean);

  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold text-teal">Leader toolkit</h1>
      {categories.map((cat) => (
        <div key={cat} className="mt-8">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep mb-3">{cat}</h2>
          <div className="space-y-2">
            {gated.filter((r) => r.category === cat).map((r, i) => (
              <a key={i} href={r.fileUrl || r.externalUrl || '#'} target="_blank" rel="noreferrer"
                className="block rounded-xl bg-white border border-teal/10 p-4 hover:border-gold transition-colors">
                <div className="font-semibold text-teal-ink">{r.title}</div>
                {r.description && <div className="text-sm text-teal-ink/70">{r.description}</div>}
              </a>
            ))}
          </div>
        </div>
      ))}
      {gated.length === 0 && <p className="mt-6 text-teal-soft">Toolkit content loads from Sanity — mark resources as "SSA leaders only".</p>}
    </div>
  );
}
