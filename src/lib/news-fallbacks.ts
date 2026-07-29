// Seed post so /news isn't empty before Sanity is configured. Sanity wins the
// moment News Post documents exist.
//
// Every post carries a real human byline (USM policy — AI-assisted drafts still
// require a named author and must stay strictly factual).

export const NEWS_CATEGORIES = [
  'Career Development',
  'Hackathons',
  'Guest Speakers',
  'Student Research',
  'Activism & News',
  'Humans of USM',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsPost = {
  slug: string;
  title: string;
  author: string;
  category?: NewsCategory;
  publishedAt?: string; // ISO
  excerpt?: string;
  /** Plain paragraphs — the Sanity version uses portable text. */
  body?: string[];
  isHumansOfUSM?: boolean;
};

export const newsFallbacks: NewsPost[] = [
  {
    slug: 'welcome-to-the-usm-blog',
    title: 'Welcome to the USM Blog',
    author: 'Harsimran Kaur',
    category: 'Activism & News',
    publishedAt: '2026-07-01',
    excerpt:
      'A new home for stories from across the movement — chapter wins, career journeys, and what Sikh students are building on campus.',
    body: [
      'United Sikh Movement supports Sikh Student Associations across North America — connecting chapters to funding, mentorship, programming, and each other.',
      'This blog is where we share what is actually happening across that network: what chapters are building, where students are landing after graduation, and the work being done to make campuses better for Sikh students.',
      'Expect posts on career development, hackathons and technical programs, guest speakers, student research, and advocacy. If your chapter has a story worth telling, reach out — we would rather publish your words than ours.',
    ],
  },
];
