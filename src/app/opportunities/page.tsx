// Brief by design: a clean feed of internships, scholarships, and roles.
import FadeUp from '@/components/FadeUp';
import { getOpportunities } from '@/lib/sanity';

export const revalidate = 600;
export const metadata = { title: 'Opportunities' };

export default async function Opportunities() {
  let opps: any[] = [];
  try { opps = await getOpportunities(); } catch {}

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Opportunities</h1>
        <p className="mt-3 text-lg text-teal-ink/75">
          Internships, scholarships, and roles worth your time. Updated by the USM team.
        </p>
      </FadeUp>
      <FadeUp className="mt-10 divide-y divide-teal/10">
        {opps.map((o, i) => (
          <a key={i} href={o.url || '#'} target="_blank" rel="noreferrer"
            className="flex items-start justify-between gap-6 py-5 group">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold-deep font-semibold">{o.type}{o.organization ? ` · ${o.organization}` : ''}</div>
              <h2 className="font-display font-semibold text-teal-ink group-hover:text-teal mt-0.5">{o.title}</h2>
              {o.blurb && <p className="text-sm text-teal-ink/70 mt-1">{o.blurb}</p>}
            </div>
            {o.deadline && (
              <div className="shrink-0 text-right text-xs text-teal-soft">
                due<br /><span className="font-semibold text-teal-ink">{new Date(o.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </a>
        ))}
        {opps.length === 0 && <p className="py-6 text-teal-soft">Opportunities load from Sanity — add Opportunity documents in the Studio.</p>}
      </FadeUp>
    </div>
  );
}
