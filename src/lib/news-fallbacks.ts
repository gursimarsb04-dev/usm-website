import { blogArticles } from '@/lib/blog-articles';

// In-repo blog posts. These are merged with Sanity posts by src/lib/blog.ts —
// Sanity wins only on a slug collision, so both sources show side by side.
// The long-form SEO articles live in src/lib/blog-articles.ts.
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
  'Events',
  'Sikhi',
  'Student Life',
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
  /** Full article body in the Markdown subset ArticleBody understands. */
  markdown?: string;
  /** Static cover image path (e.g. /photos/...). Sanity posts use `coverImage`. */
  coverImageUrl?: string;
  /** SEO title (<title>/og:title) when it should differ from the on-page H1. */
  seoTitle?: string;
  /** Article-specific email-capture pitch shown mid-article and at the end. */
  cta?: { heading: string; body: string };
  isHumansOfUSM?: boolean;
};

const seedPosts: NewsPost[] = [
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
  {
    slug: 'inter-ssa-conferences-2026',
    title: 'Three Coasts, 300+ Students: The Inter-SSA Conferences',
    author: 'USM Team',
    category: 'Activism & News',
    publishedAt: '2026-05-15',
    excerpt:
      'Across three conferences — national and two regional — over 300 students and 23 speakers gathered to put every chapter in one room.',
    body: [
      'This year USM ran three Inter-SSA Conferences: one national gathering in California and two regional events across the Midwest and East Coast.',
      'Together they drew more than 300 attendees nationwide — 110 on the West Coast, 110 on the East Coast, and 80 across the Midwest — with 23 speakers sharing what they have learned in their careers, their communities, and their Sikhi.',
      'The point of putting every chapter in one room is simple: SSAs are stronger when they are not islands. Boards traded ideas, students found sangat beyond their own campus, and chapters left with relationships that outlast a single event.',
    ],
  },
  {
    slug: 'camp-kudrat-recap',
    title: 'Camp Kudrat: Being Fully Sikh in a Room That Gets It',
    author: 'USM Team',
    publishedAt: '2026-06-20',
    excerpt:
      'An immersive Sikhi retreat in nature — nitnem, kirtan, and sangat — and for many campers, the first time being fully Sikh among people who feel the same.',
    body: [
      'Camp Kudrat is an annual immersive Sikhi retreat in nature. Campers disconnect from daily life and reconnect with Gurmat through nitnem, kirtan, workshops, and sangat.',
      'For many students it is the first time being fully Sikh in a room full of people who feel the same way — a kind of belonging that is hard to find on a busy campus.',
      'One camper shared that after Camp Kudrat they began doing Kirtan Sohila before sleeping and were able to let go of their anxiety medication; when their parents saw the change, they too started walking the Sikh path. Stories like that are why the camp exists.',
    ],
  },
];

export const newsFallbacks: NewsPost[] = [...blogArticles, ...seedPosts];
