'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  PROGRAM DATA                                                       */
/* ------------------------------------------------------------------ */

interface ProgramEvent {
  title: string;
  location: string;
  date: string;
}

interface ProgramData {
  name: string;
  category: string;
  tagline: string;
  icon: string;
  description: string;
  highlights: string[];
  events: ProgramEvent[];
}

const PROGRAMS: Record<string, ProgramData> = {
  'camp-kudrat': {
    name: 'Camp Kudrat',
    category: 'Sikhi Development',
    tagline: 'Reflect. Connect. Renew.',
    icon: '\u{1F3D5}',
    description:
      'Camp Kudrat is an immersive weekend retreat designed for Sikh college students seeking deeper spiritual growth. Through guided meditation, nature immersion, interactive Sikhi workshops, and community bonding, participants leave with a renewed sense of purpose and a stronger connection to their faith. The retreat creates a safe, judgment-free space where students can ask questions, share experiences, and build lifelong friendships rooted in Gurbani and Sikh values.',
    highlights: [
      'Weekend-long immersive retreat in nature',
      'Guided Simran and Naam Japna sessions',
      'Interactive Sakhi-based workshops on Sikh history',
      'Community bonding through outdoor activities and Langar',
    ],
    events: [
      { title: 'Camp Kudrat 2025 — Northeast', location: 'Catskills, NY', date: 'Sep 2025' },
      { title: 'Camp Kudrat 2024 — West Coast', location: 'Big Bear, CA', date: 'Oct 2024' },
      { title: 'Camp Kudrat 2024 — Midwest', location: 'Lake Geneva, WI', date: 'Aug 2024' },
    ],
  },
  'gurbani-study': {
    name: 'Gurbani Study',
    category: 'Sikhi Development',
    tagline: 'Mother Tongue Made Easy.',
    icon: '\u{1F4D6}',
    description:
      'Gurbani Study provides weekly virtual study circles for students eager to deepen their understanding of Gurbani and Gurmukhi. Led by knowledgeable sevadaars, each session breaks down shabads, explores their historical context, and connects the teachings to everyday college life. Whether you are a beginner learning the Gurmukhi alphabet or looking to dive into advanced Gurbani Vichar, there is a circle for you.',
    highlights: [
      'Weekly virtual sessions with experienced facilitators',
      'Beginner to advanced Gurmukhi reading tracks',
      'Shabad-by-shabad analysis with historical context',
      'Downloadable study guides and pronunciation resources',
    ],
    events: [
      { title: 'Spring Gurbani Circle — Japji Sahib Series', location: 'Virtual (Zoom)', date: 'Mar 2025' },
      { title: 'Fall Gurbani Circle — Rehraas Sahib Deep Dive', location: 'Virtual (Zoom)', date: 'Oct 2024' },
      { title: 'Summer Intensive — Gurmukhi Crash Course', location: 'Virtual (Zoom)', date: 'Jun 2024' },
    ],
  },
  'safal-summit': {
    name: 'Safal Summit',
    category: 'Professional Development',
    tagline: 'Excel. Connect. Lead.',
    icon: '\u{1F4BC}',
    description:
      'Safal Summit is USM\'s flagship annual professional development conference, bringing together hundreds of Sikh students and young professionals for a day of inspiring keynotes, hands-on workshops, and high-impact networking. From career strategy to entrepreneurship, Safal Summit equips attendees with the tools and connections they need to excel in their chosen fields while staying true to their Sikh identity.',
    highlights: [
      'Keynotes from leading Sikh professionals and entrepreneurs',
      'Industry-specific breakout sessions and workshops',
      'Speed networking with Fortune 500 recruiters',
      'Resume reviews and mock interview clinics',
    ],
    events: [
      { title: 'Safal Summit 2025', location: 'New York, NY', date: 'Apr 2025' },
      { title: 'Safal Summit 2024', location: 'San Jose, CA', date: 'Apr 2024' },
      { title: 'Safal Summit 2023', location: 'Chicago, IL', date: 'Mar 2023' },
    ],
  },
  'kadam-career-panel': {
    name: 'Kadam Career Panel',
    category: 'Professional Development',
    tagline: 'Your Next Step Starts Here.',
    icon: '\u{1F680}',
    description:
      'Kadam Career Panel is a series of focused career panels connecting Sikh students with accomplished professionals across a wide range of industries. Each panel features candid conversations about career paths, navigating the workplace as a Sikh, overcoming obstacles, and practical advice for landing internships and full-time roles. Kadam means "step" — and each panel is designed to help you take your next one with confidence.',
    highlights: [
      'Panels spanning tech, finance, medicine, and law',
      'Candid Q&A with established Sikh professionals',
      'Mentorship matching after every panel',
      'Recordings available for on-demand viewing',
    ],
    events: [
      { title: 'Kadam Panel — Careers in Tech', location: 'Virtual (Zoom)', date: 'Feb 2025' },
      { title: 'Kadam Panel — Breaking into Finance', location: 'Virtual (Zoom)', date: 'Nov 2024' },
      { title: 'Kadam Panel — Pre-Med & Healthcare', location: 'Virtual (Zoom)', date: 'Sep 2024' },
    ],
  },
  'national-conference': {
    name: 'National Conference',
    category: 'SSA Network',
    tagline: 'Network, Learn, Lead.',
    icon: '\u{1F310}',
    description:
      'The National Conference is an annual gathering of SSA leaders from across the country, providing a unique space for cross-campus collaboration, knowledge sharing, and strategic planning. Delegates attend workshops on SSA governance, event planning, fundraising, and community engagement, while building a powerful network of peers committed to strengthening the Sikh student presence on every campus.',
    highlights: [
      'Delegates from 80+ SSA chapters nationwide',
      'Workshops on governance, fundraising, and outreach',
      'Cross-campus collaboration and strategy sessions',
      'Awards ceremony recognizing outstanding SSA chapters',
    ],
    events: [
      { title: 'USM National Conference 2025', location: 'Washington, D.C.', date: 'Jun 2025' },
      { title: 'USM National Conference 2024', location: 'Dallas, TX', date: 'Jun 2024' },
      { title: 'USM National Conference 2023', location: 'Atlanta, GA', date: 'Jun 2023' },
    ],
  },
  'leadership-retreat': {
    name: 'Leadership Retreat',
    category: 'SSA Network',
    tagline: 'Lead With Purpose.',
    icon: '\u{1F451}',
    description:
      'The Leadership Retreat is an intensive multi-day training program for newly elected SSA officers and emerging student leaders. Through interactive workshops, team-building exercises, and mentorship from experienced USM alumni, participants develop the skills they need to run thriving campus organizations — from event planning and budgeting to conflict resolution and inclusive leadership rooted in Sikh values.',
    highlights: [
      'Intensive multi-day officer training program',
      'Workshops on event planning, budgeting, and outreach',
      'Mentorship pairing with experienced USM alumni',
      'Team-building exercises rooted in Sikh leadership values',
    ],
    events: [
      { title: 'Leadership Retreat 2025 — Summer Intensive', location: 'Austin, TX', date: 'Jul 2025' },
      { title: 'Leadership Retreat 2024 — Summer Intensive', location: 'Sacramento, CA', date: 'Jul 2024' },
      { title: 'Leadership Retreat 2024 — Winter Session', location: 'Virtual (Zoom)', date: 'Jan 2024' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function ProgramPageClient() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const program = slug ? PROGRAMS[slug] : undefined;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /* 404 fallback */
  if (!program) {
    return (
      <section className="flex flex-col items-center justify-center py-40 px-6 text-center">
        <h1 className="font-display font-semibold text-5xl text-navy mb-4">Program Not Found</h1>
        <p className="font-body text-slate-body text-xl mb-8 max-w-md">
          We could not find the program you are looking for. It may have been moved or no longer exists.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-saffron text-white px-8 py-4 rounded-full font-medium hover:bg-saffron-light transition-colors text-lg"
        >
          <span>&larr;</span> Back to Home
        </Link>
      </section>
    );
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="bg-navy text-white pt-40 pb-16 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-saffron/10 rounded-full blur-[160px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-body mb-10 text-sm"
          >
            <span>&larr;</span> Back to Home
          </Link>

          <div className="flex flex-col gap-6">
            <span className="text-5xl">{program.icon}</span>

            <span className="inline-block self-start bg-white/10 backdrop-blur-md text-saffron-light text-xs uppercase tracking-[0.2em] font-medium px-4 py-2 rounded-full border border-white/10">
              {program.category}
            </span>

            <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tight leading-[1.05]">
              {program.name}
            </h1>

            <p className="font-body text-2xl md:text-3xl text-white/70 max-w-xl">
              {program.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ───────── About ───────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="bg-white rounded-[2rem] ring-1 ring-black/5 shadow-xl shadow-navy/5 p-10 md:p-14">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-navy mb-6">About this Program</h2>
            <p className="font-body text-slate-body text-lg md:text-xl leading-relaxed max-w-3xl">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Key Highlights ───────── */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-navy mb-10">Key Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {program.highlights.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-white rounded-[2rem] ring-1 ring-black/5 shadow-xl shadow-navy/5 p-8"
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-5 h-5 text-saffron"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-body text-navy font-medium text-lg leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Related Events ───────── */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-navy mb-10">Related Events</h2>

          <div className="flex flex-col gap-5">
            {program.events.map((evt, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-[2rem] ring-1 ring-black/5 shadow-xl shadow-navy/5 p-8"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-semibold text-xl text-navy">{evt.title}</h3>
                  <span className="font-body text-slate-body">{evt.location}</span>
                </div>
                <span className="shrink-0 inline-flex items-center bg-cream text-navy font-medium text-sm px-5 py-2.5 rounded-full border border-off-white font-body">
                  {evt.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Email CTA ───────── */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-navy rounded-[3rem] md:rounded-[4rem] px-6 py-16 md:py-24 relative overflow-hidden flex flex-col items-center text-center gap-8 shadow-2xl shadow-navy/20">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col gap-4 items-center relative z-10">
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-white max-w-lg leading-[1.1]">
                Stay in the Loop
              </h2>
              <p className="font-body text-lg text-white/70 max-w-md leading-relaxed">
                Get notified about upcoming {program.name} events, registration windows, and exclusive resources.
              </p>
            </div>

            {submitted ? (
              <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-full px-8 py-5 text-white font-medium font-body text-lg border border-white/10">
                You are subscribed! We will be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-lg relative z-10">
                <div className="w-full relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white text-navy px-8 py-5 md:py-6 rounded-full outline-none font-body text-lg border-2 border-transparent focus:border-saffron transition-colors pr-36"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-saffron text-white px-8 rounded-full font-medium hover:bg-saffron-light transition-colors text-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
