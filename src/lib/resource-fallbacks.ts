// Resource data — used until Sanity is populated, then Sanity wins.
//
// ⚠️ Entries marked "[Sample]" are PLACEHOLDER structure, not real guides.
// They exist so the Funding Guides and Scholarships categories render while the
// real content is written. Replace the text/links (or publish Resource
// documents in Sanity, which take priority) before promoting this page.

export type Resource = {
  title: string;
  category: string;
  description?: string;
  fileUrl?: string;
  externalUrl?: string;
  gated?: boolean;
};

export const resourceFallbacks: Resource[] = [
  // ── Sikhi ──
  {
    title: 'Gurbani Study',
    category: 'Sikhi',
    description:
      'Structured Gurmat study that takes students beyond translation into a real, personal relationship with Bani.',
    gated: false,
  },

  // ── Funding Guides ── (placeholder content)
  {
    title: '[Sample] How to Request SSA Chapter Funding',
    category: 'Funding Guides',
    description:
      'Placeholder — replace with the real walkthrough of USM chapter funding: what qualifies, how much, and how to apply.',
    gated: false,
  },
  {
    title: '[Sample] Getting Your Student Org Funded on Campus',
    category: 'Funding Guides',
    description:
      'Placeholder — replace with real guidance on student government funding, budget requests, and campus grant cycles.',
    gated: false,
  },

  // ── Scholarships ── (placeholder content)
  {
    title: '[Sample] Scholarship Guide for Sikh Students',
    category: 'Scholarships',
    description:
      'Placeholder — replace with a real, verified list of scholarships available to Sikh students, with deadlines.',
    gated: false,
  },
];
