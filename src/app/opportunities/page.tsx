// A clean, filterable feed of internships, scholarships, and roles.
// Sanity wins when configured; otherwise the static roster keeps the page real.
import FadeUp from '@/components/FadeUp';
import { getOpportunities } from '@/lib/sanity';
import { visibleOpportunities, type Opportunity } from '@/lib/opportunity-fallbacks';
import OpportunitiesList from './OpportunitiesList';

export const revalidate = 600;
export const metadata = {
  title: 'Opportunities',
  description:
    'Internships, scholarships, grants, and volunteer roles for Sikh students — curated by the United Sikh Movement team.',
};

export default async function Opportunities() {
  let opps: Opportunity[] = [];
  try {
    opps = (await getOpportunities()) ?? [];
  } catch {}
  if (opps.length === 0) opps = visibleOpportunities;

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Opportunities</h1>
        <p className="mt-3 text-lg text-teal-ink/75 max-w-xl">
          Internships, scholarships, and roles worth your time. Updated by the USM team.
        </p>
      </FadeUp>

      <FadeUp>
        <OpportunitiesList items={opps} />
      </FadeUp>
    </div>
  );
}
