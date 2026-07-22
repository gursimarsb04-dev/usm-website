// Real resource data — used until Sanity is populated, then Sanity wins.

export type Resource = {
  title: string;
  category: string;
  description?: string;
  fileUrl?: string;
  externalUrl?: string;
  gated?: boolean;
};

export const resourceFallbacks: Resource[] = [
  {
    title: 'Gurbani Study',
    category: 'Sikhi',
    description: 'Structured Gurmat study that takes students beyond translation into a real, personal relationship with Bani.',
    gated: false,
  },
];
