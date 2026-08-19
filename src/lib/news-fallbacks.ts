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
  {
    slug: '13hacks-first-sikh-hosted-hackathon',
    title: 'A Look Back at 13Hacks: The First Sikh-Hosted Hackathon',
    author: 'USM Team',
    category: 'Hackathons',
    publishedAt: '2026-02-10',
    excerpt:
      'In January, 13Hacks became the first-ever Sikh-hosted hackathon — 100+ attendees, 9 states, and 30 mentors across tech.',
    body: [
      'This January, 13Hacks became the first-ever Sikh-hosted hackathon. It brought together more than 100 attendees from 9 states, alongside 30 mentors working across the tech industry.',
      'For a weekend, students and young professionals built, shipped, and learned side by side — turning ideas into working projects and meeting mentors who understood both their ambitions and their identity.',
      'More than a competition, 13Hacks was a proof point: that Sikh students belong at the front of technical innovation, and that a community built around them can help them get there. Keep an eye out for 13Hacks 2027.',
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
    slug: 'free-lsat-prep-sikh-mentors',
    title: 'Free LSAT Prep, Led by 97th-Percentile Sikh Mentors',
    author: 'USM Team',
    category: 'Career Development',
    publishedAt: '2026-05-01',
    excerpt:
      'USM is launching free LSAT preparation led by Sikhs who scored in the 97th percentile and above, in partnership with the Sikh Legal Society.',
    body: [
      'Law school is expensive before you ever set foot in a classroom — and LSAT prep is one of the first walls students hit. USM is launching free LSAT preparation to help take that wall down.',
      'The program is led by Sikh mentors who scored in the 97th percentile and above, in partnership with the Sikh Legal Society. It launches in May 2026, with MCAT and DAT preparation planned next.',
      'The goal is not just better scores. It is a generation of Sikh students who can pursue law, medicine, and beyond without leaving their community or their identity at the door.',
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
