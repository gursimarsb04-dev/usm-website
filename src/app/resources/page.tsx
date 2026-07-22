// Public resources here; SSA-leader resources live inside the portal.
import FadeUp from '@/components/FadeUp';
import Link from 'next/link';
import { getResources } from '@/lib/sanity';
import { resourceFallbacks } from '@/lib/resource-fallbacks';

export const revalidate = 600;
export const metadata = { title: 'Resources' };

export default async function Resources() {
  let resources: any[] = [];
  try { resources = await getResources(false); } catch {}
  if (!resources || resources.length === 0) resources = resourceFallbacks.filter((r) => !r.gated);
  const categories = Array.from(new Set(resources.map((r) => r.category))).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Resources</h1>
        <p className="mt-3 text-lg text-teal-ink/75">
          Guides and tools for Sikh students. SSA leaders: your full toolkit lives in{' '}
          <Link href="/portal/login" className="underline text-teal">the portal</Link>.
        </p>
      </FadeUp>
      {categories.map((cat) => (
        <FadeUp key={cat} className="mt-12">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep mb-4">{cat}</h2>
          <div className="space-y-3">
            {resources.filter((r) => r.category === cat).map((r, i) => (
              <a key={i} href={r.fileUrl || r.externalUrl || '#'} target="_blank" rel="noreferrer"
                className="block rounded-xl bg-white border border-teal/10 p-5 hover:border-gold transition-colors">
                <h3 className="font-display font-semibold text-teal-ink">{r.title}</h3>
                {r.description && <p className="text-sm text-teal-ink/70 mt-1">{r.description}</p>}
              </a>
            ))}
          </div>
        </FadeUp>
      ))}
      {resources.length === 0 && <p className="mt-10 text-teal-soft">Resources load from Sanity — add Resource documents in the Studio.</p>}
    </div>
  );
}
