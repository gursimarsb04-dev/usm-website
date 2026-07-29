// ⚠️ PLACEHOLDER CONTENT — REPLACE BEFORE TREATING THIS PAGE AS CREDIBLE.
//
// These are sample listings so the /opportunities filter UI has something to
// render before Sanity is populated. They are NOT real openings — every entry
// is prefixed "[Sample]" and points at a placeholder URL. Swap them for real
// postings (or publish Opportunity documents in Sanity, which take priority).
//
// Same fallback-first pattern as program-fallbacks.ts / ssa-fallback.ts.

export type OpportunityType =
  | 'Internship'
  | 'Scholarship'
  | 'Volunteer'
  | 'Job'
  | 'Grant'
  | 'Other';

export type Opportunity = {
  title: string;
  type: OpportunityType;
  organization?: string;
  deadline?: string; // ISO date
  url?: string;
  blurb?: string;
};

// All the types the filter can show, in display order.
export const OPPORTUNITY_TYPES: OpportunityType[] = [
  'Internship',
  'Scholarship',
  'Volunteer',
  'Job',
  'Grant',
  'Other',
];

export const opportunityFallbacks: Opportunity[] = [
  {
    title: '[Sample] Summer Software Engineering Internship',
    type: 'Internship',
    organization: 'Example Tech Company',
    url: '#',
    blurb: 'Placeholder listing — replace with a real internship posting.',
  },
  {
    title: '[Sample] Sikh Student Leadership Scholarship',
    type: 'Scholarship',
    organization: 'Example Foundation',
    url: '#',
    blurb: 'Placeholder listing — replace with a real scholarship posting.',
  },
  {
    title: '[Sample] Langar Seva Volunteer Weekend',
    type: 'Volunteer',
    organization: 'Example Gurdwara',
    url: '#',
    blurb: 'Placeholder listing — replace with a real volunteer opportunity.',
  },
  {
    title: '[Sample] Campus Outreach Coordinator',
    type: 'Job',
    organization: 'Example Nonprofit',
    url: '#',
    blurb: 'Placeholder listing — replace with a real job posting.',
  },
  {
    title: '[Sample] SSA Chapter Programming Grant',
    type: 'Grant',
    organization: 'United Sikh Movement',
    url: '#',
    blurb: 'Placeholder listing — replace with real chapter grant details.',
  },
  {
    title: '[Sample] Undergraduate Research Assistantship',
    type: 'Internship',
    organization: 'Example University Lab',
    url: '#',
    blurb: 'Placeholder listing — replace with a real research opportunity.',
  },
  {
    title: '[Sample] Sikh Legal Society Mentorship Cohort',
    type: 'Other',
    organization: 'Example Partner Org',
    url: '#',
    blurb: 'Placeholder listing — replace with a real program listing.',
  },
];

// ── Public visibility ────────────────────────────────────────────────────────
// The entries above are structure placeholders, not real listings — every one
// is "[Sample]"-prefixed and points at a dead URL. Showing them publicly makes
// the page look fake, so they're filtered out of what the site renders.
//
// To bring listings back: replace the samples with real ones (drop the
// "[Sample]" prefix and set a real `url`) — they'll appear automatically. Set
// SHOW_SAMPLE_OPPORTUNITIES to true only for previewing the layout locally.
const SHOW_SAMPLE_OPPORTUNITIES = false;

export const visibleOpportunities: Opportunity[] = SHOW_SAMPLE_OPPORTUNITIES
  ? opportunityFallbacks
  : opportunityFallbacks.filter((o) => !o.title.startsWith('[Sample]'));
