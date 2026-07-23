// Real program data — used until Sanity is populated, then Sanity wins.
// `image` is set ONLY when a genuine photo from that exact event exists in
// /public/photos. Programs without a real photo intentionally stay image-less.

export type ProgramStat = { value: string; label: string };

export type Program = {
  slug: string;
  title: string;
  pillar: 'Sikhi Development' | 'Professional Development' | 'SSA Network';
  tagline: string;
  body: string;
  image?: string;
  stats?: ProgramStat[];
  testimonial?: string;
  hidden?: boolean;
};

export const programFallbacks: Program[] = [
  // ── Sikhi Development ──
  {
    slug: 'camp-kudrat',
    title: 'Camp Kudrat',
    pillar: 'Sikhi Development',
    tagline: 'An immersive Sikhi experience in nature.',
    body: 'An annual immersive Sikhi retreat in nature. Campers disconnect from life and reconnect with Gurmat through nitnem, kirtan, workshops, and sangat. Often the first time students experience being fully Sikh in a room full of people who feel the same way.',
    image: '/photos/prog-camp-kudrat.jpg',
    testimonial: 'Ever since Camp Kudrat my life has changed. I started doing Kirtan Sohila before sleeping and let go of my anxiety pills. When my parents saw the change in me, they also started following the Sikh path.',
  },
  {
    slug: 'gurmat-sangeet',
    title: 'Gurmat Sangeet Initiative',
    pillar: 'Sikhi Development',
    tagline: 'Deepen your connection, line by line.',
    body: 'Structured Gurmat study that takes students beyond translation into a real, personal relationship with Bani. Our 10-week Gurmat Sangeet course is now an official UC Davis offering — with 250+ attendees in Fall 2025 and expansion to a second UC campus in Fall 2026.',
    image: '/photos/prog-gurmat-sangeet.jpg',
    stats: [
      { value: '250+', label: 'Attendees, Fall 2025' },
      { value: '2nd', label: 'UC campus joining Fall 2026' },
    ],
  },
  {
    slug: 'salok-mahala-9',
    title: 'Salok Mahala 9 Series',
    pillar: 'Sikhi Development',
    tagline: "Guru Teg Bahadur Ji's teachings, led by youth.",
    body: "In collaboration with Sikh Dharmsal, USM trained 6 youth facilitators to lead workshops on Guru Teg Bahadur Ji's Salok Mahala 9. The series is now expanding to SSAs across the West Coast.",
    image: '/photos/prog-salok-mahala-9.jpg',
    stats: [{ value: '6', label: 'Youth facilitators trained' }],
  },

  // ── Professional Development ──
  {
    slug: 'safal-summit',
    title: 'Safal Summit',
    pillar: 'Professional Development',
    tagline: 'Shaping the Sikh leaders of tomorrow.',
    body: "USM's annual professional development summit. In 2025: 46 mentors across tech, finance, healthcare, and law — including 4 Forbes 30 Under 30 honorees. The 2026 Summit heads to NYC, in partnership with SikhTeens.",
    image: '/photos/prog-safal-summit.jpg',
    stats: [
      { value: '46', label: 'Mentors in 2025' },
      { value: '4', label: 'Forbes 30 Under 30 honorees' },
      { value: '51%', label: 'Made 3–5 mentor connections' },
    ],
  },
  {
    slug: 'hackathon',
    title: '13Hacks',
    pillar: 'Professional Development',
    tagline: 'The first and largest Sikh-focused hackathon in America.',
    body: 'January 2026: participants from 9 states, with mentors from Nvidia, Tesla, Rippling, Kaiser, Accenture, and GE Healthcare, plus 8 founders. 85.7% of participants gained a new skill — and 4 teams are now building startups.',
    image: '/photos/prog-hackathon.jpg',
    stats: [
      { value: '9', label: 'States represented' },
      { value: '85.7%', label: 'Gained a new skill' },
      { value: '4', label: 'Teams now building startups' },
    ],
  },
  {
    slug: 'lsat-prep',
    title: 'LSAT Prep Series',
    pillar: 'Professional Development',
    tagline: 'Free prep with 97th-percentile Sikh mentors.',
    body: 'Free LSAT preparation led by Sikhs who scored in the 97th percentile and above. Launching May 2026 in partnership with the Sikh Legal Society. MCAT and DAT prep are coming next.',
  },
  {
    slug: 'fateh-collective',
    title: 'Fateh Collective',
    pillar: 'Professional Development',
    tagline: 'Mentorship, curated and community-backed.',
    body: 'A platform connecting Sikh youth to Sikh professionals for 1:1 mentorship, career navigation, and internship opportunities. Not cold outreach — curated, community-backed connection.',
    hidden: true,
  },
  {
    slug: 'case-competitions',
    title: 'Case Competitions & Mock Trial',
    pillar: 'Professional Development',
    tagline: 'Hands-on skill building for law, business, and beyond.',
    body: 'Hands-on case competitions and mock trial experiences that build real, résumé-ready skills for careers in law, business, and beyond.',
    hidden: true,
  },

  // ── SSA Network ──
  {
    slug: 'national-conference',
    title: 'Inter-SSA Conferences',
    pillar: 'SSA Network',
    tagline: 'Every chapter, one room.',
    body: "Three annual Inter-SSA Conferences — one national (California) and two regional (Midwest and East Coast). West Coast drew 100+ attendees and 11 expert speakers; the Midwest brought 80+ attendees from 5+ campuses, pioneering USM's first inter-SSA event in the region.",
    image: '/photos/prog-national-conference.jpg',
    stats: [
      { value: '3', label: 'Annual conferences' },
      { value: '100+', label: 'West Coast attendees' },
      { value: '11', label: 'Expert speakers' },
    ],
  },
  {
    slug: 'leadership-retreat',
    title: 'Leadership Retreat',
    pillar: 'SSA Network',
    tagline: 'Where SSA boards recharge and level up.',
    body: 'Annual retreats for SSA board members across the West Coast, Midwest, and East Coast. This year: 65+ participants from 18 SSAs, with 95% feeling more confident leading their SSA after attending.',
    image: '/photos/prog-leadership-retreat.jpg',
    stats: [
      { value: '65+', label: 'Participants' },
      { value: '18', label: 'SSAs represented' },
      { value: '95%', label: 'Felt more confident' },
    ],
  },
  {
    slug: 'ssa-coordination',
    title: '1-on-1 SSA Coordination',
    pillar: 'SSA Network',
    tagline: 'A dedicated USM coordinator for every SSA.',
    body: 'Every SSA in the network has a dedicated USM coordinator for guidance, resources, programming support, and accountability — so no board is ever left to figure it out alone.',
    image: '/photos/prog-ssa-coordination.jpg',
  },
  {
    slug: 'national-network',
    title: 'National SSA Network',
    pillar: 'SSA Network',
    tagline: '120+ board members, coast to coast.',
    body: '120+ board members connected coast to coast, sharing resources, ideas, and support in real time.',
    image: '/photos/prog-national-network.jpg',
    stats: [{ value: '120+', label: 'Board members connected' }],
  },
  {
    slug: 'advocacy',
    title: 'Advocacy',
    pillar: 'SSA Network',
    tagline: 'Showing up when it matters.',
    body: 'After the SJSU hate crime, USM mobilized West Coast schools toward Sikh awareness trainings with UC and CSU administrators and university police.',
    image: '/photos/prog-advocacy.jpg',
  },
  {
    slug: 'khudrang-roots',
    title: 'Khudrang Roots',
    pillar: 'SSA Network',
    tagline: 'Where students grow, Punjab thrives.',
    body: 'A student-led initiative sending diaspora youth to Punjab — listening to village leaders, families, and educators first, then building projects that last. Community-informed, student-driven, built to last. This is what it looks like when Gurmat principles meet real-world seva.',
  },
];

// Pillar-level spiritual-impact counts, shown as a callout on the Programs page
// under Sikhi Development.
export const spiritualImpact: ProgramStat[] = [
  { value: '3', label: 'Students started tying Dastar' },
  { value: '4', label: 'Students started keeping Kes' },
  { value: '2', label: 'Students took Amrit' },
  { value: '9', label: 'USM staff have taken Amrit' },
];
