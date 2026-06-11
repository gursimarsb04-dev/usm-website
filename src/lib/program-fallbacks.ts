// Real program data — used until Sanity is populated, then Sanity wins.
export const programDescriptions: Record<string, string> = {
  'camp-kudrat': "Camp Kudrat is USM's flagship Sikhi immersion — days in nature built around Simran, Seva, and Sangat. Students unplug from campus life and reconnect with what grounds them, alongside Sikhs walking the same path.",
  'gurbani-study': 'Structured Gurbani study circles that take students deeper than translation — building a real, personal relationship with Bani that carries into everyday campus life.',
  'safal-summit': 'Safal — Shaping the Sikh Leaders of Tomorrow. A multi-day summit at the World Trade Center in NYC connecting 150+ Sikh students and young professionals with mentors and industry leaders across tech, finance, medicine, and law.',
  'kadam-career-panel': 'Kadam puts Sikh professionals in front of Sikh students — real career paths, honest conversations about navigating industries, and mentorship that continues after the panel ends.',
  'lsat-prep': 'In partnership with the Sikh Legal Society: 20+ students receiving free, personalized LSAT preparation from five top-10th-percentile Sikh mentors. Law school starts with the LSAT — now there is sangat to tackle it with.',
  'hackathon': "The first Sikh-focused hackathon — students building together, mentored by Sikh engineers and PMs, proving that technical ambition and Sikh identity belong in the same room.",
  'national-conference': 'The whole network in one place — every chapter, every region, sharing what works, celebrating wins, and setting the agenda for the year ahead.',
  'leadership-retreat': 'A retreat for the students who carry their chapters — SSA boards recharge, learn from each other, and head back to campus with a plan and a sangat behind them.',
  'khudrang-roots': "Khudrang Roots empowers diaspora students to design and lead projects contributing to Punjab's recovery and long-term growth. Teams travel to Punjab to listen to village leaders, families, and educators first — then build. Community-informed. Student-driven. Built to last.",
};

export const programFallbacks = [
  { slug: 'camp-kudrat', title: 'Camp Kudrat', pillar: 'Sikhi Development',
    tagline: 'An immersive Sikhi experience in nature.' },
  { slug: 'gurbani-study', title: 'Gurbani Study', pillar: 'Sikhi Development',
    tagline: 'Deepen your connection, line by line.' },
  { slug: 'safal-summit', title: 'Safal Summit', pillar: 'Professional Development',
    tagline: 'Shaping the Sikh leaders of tomorrow — WTC, NYC.' },
  { slug: 'kadam-career-panel', title: 'Kadam Career Panel', pillar: 'Professional Development',
    tagline: 'Sikh professionals, real career paths.' },
  { slug: 'lsat-prep', title: 'LSAT Prep Series', pillar: 'Professional Development',
    tagline: 'Free prep with top-decile Sikh mentors · with the Sikh Legal Society.' },
  { slug: 'hackathon', title: 'Hackathon', pillar: 'Professional Development',
    tagline: 'The first Sikh-focused hackathon.' },
  { slug: 'national-conference', title: 'National Conference', pillar: 'SSA Network',
    tagline: 'Every chapter, one room.' },
  { slug: 'leadership-retreat', title: 'Leadership Retreat', pillar: 'SSA Network',
    tagline: 'Where SSA boards recharge and level up.' },
  { slug: 'khudrang-roots', title: 'Khudrang Roots', pillar: 'SSA Network',
    tagline: 'Where students grow, Punjab thrives.' },
];
