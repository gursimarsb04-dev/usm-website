'use client';

import { useParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  SSA Chapter Data                                                   */
/* ------------------------------------------------------------------ */

interface SSAInfo {
  name: string;
  fullName: string;
  university: string;
  city: string;
  state: string;
  instagram?: string;
}

const ssaData: Record<string, SSAInfo> = {
  'rusikh': { name: 'RUSIKH', fullName: 'Rutgers University Sikh Student Association', university: 'Rutgers University', city: 'New Brunswick', state: 'NJ', instagram: '@rusikh' },
  'uc-berkeley': { name: 'Cal Sikh', fullName: 'UC Berkeley Sikh Student Association', university: 'UC Berkeley', city: 'Berkeley', state: 'CA' },
  'ucla': { name: 'Bruins Sikh', fullName: 'UCLA Sikh Student Association', university: 'UCLA', city: 'Los Angeles', state: 'CA' },
  'usc': { name: 'USC Sikh', fullName: 'USC Sikh Student Association', university: 'University of Southern California', city: 'Los Angeles', state: 'CA' },
  'uc-davis': { name: 'UC Davis SSA', fullName: 'UC Davis Sikh Student Association', university: 'UC Davis', city: 'Davis', state: 'CA' },
  'uc-san-diego': { name: 'UCSD Sikh', fullName: 'UC San Diego Sikh Student Association', university: 'UC San Diego', city: 'San Diego', state: 'CA' },
  'uc-riverside': { name: 'UCR Sikh', fullName: 'UC Riverside Sikh Student Association', university: 'UC Riverside', city: 'Riverside', state: 'CA' },
  'uc-irvine': { name: 'UCI Sikh', fullName: 'UC Irvine Sikh Student Association', university: 'UC Irvine', city: 'Irvine', state: 'CA' },
  'uc-santa-barbara': { name: 'UCSB Sikh', fullName: 'UC Santa Barbara Sikh Student Association', university: 'UC Santa Barbara', city: 'Santa Barbara', state: 'CA' },
  'uc-merced': { name: 'UC Merced SSA', fullName: 'UC Merced Sikh Student Association', university: 'UC Merced', city: 'Merced', state: 'CA' },
  'sacramento-state': { name: 'Sac State SSA', fullName: 'Sacramento State Sikh Student Association', university: 'Sacramento State', city: 'Sacramento', state: 'CA' },
  'fresno-state': { name: 'Fresno SSA', fullName: 'Fresno State Sikh Student Association', university: 'Fresno State', city: 'Fresno', state: 'CA' },
  'sf-state': { name: 'SFSU Sikh', fullName: 'SF State Sikh Student Association', university: 'San Francisco State', city: 'San Francisco', state: 'CA' },
  'usf': { name: 'USF Sikh', fullName: 'University of San Francisco Sikh Student Association', university: 'University of San Francisco', city: 'San Francisco', state: 'CA' },
  'cal-poly-pomona': { name: 'CPP Sikh', fullName: 'Cal Poly Pomona Sikh Student Association', university: 'Cal Poly Pomona', city: 'Pomona', state: 'CA' },
  'csu-stanislaus': { name: 'Stan State SSA', fullName: 'CSU Stanislaus Sikh Student Association', university: 'CSU Stanislaus', city: 'Turlock', state: 'CA' },
  'csu-east-bay': { name: 'CSUEB Sikh', fullName: 'CSU East Bay Sikh Student Association', university: 'CSU East Bay', city: 'Hayward', state: 'CA' },
  'cal-state-fullerton': { name: 'CSUF Sikh', fullName: 'Cal State Fullerton Sikh Student Association', university: 'Cal State Fullerton', city: 'Fullerton', state: 'CA' },
  'cal-state-long-beach': { name: 'CSULB Sikh', fullName: 'Cal State Long Beach Sikh Student Association', university: 'Cal State Long Beach', city: 'Long Beach', state: 'CA' },
  'orange-coast': { name: 'OCC Sikh', fullName: 'Orange Coast College Sikh Student Association', university: 'Orange Coast College', city: 'Costa Mesa', state: 'CA' },
  'uw': { name: 'UW Sikh', fullName: 'University of Washington Sikh Student Association', university: 'University of Washington', city: 'Seattle', state: 'WA' },
  'st-johns': { name: "St. John's Sikh", fullName: "St. John's University Sikh Student Association", university: "St. John's University", city: 'Queens', state: 'NY' },
  'njit': { name: 'NJIT Sikh', fullName: 'NJIT Sikh Student Association', university: 'NJIT', city: 'Newark', state: 'NJ' },
  'purdue': { name: 'Purdue Sikh', fullName: 'Purdue University Sikh Student Association', university: 'Purdue University', city: 'West Lafayette', state: 'IN' },
};

/* ------------------------------------------------------------------ */
/*  Placeholder Events                                                 */
/* ------------------------------------------------------------------ */

function getPlaceholderEvents(ssaName: string) {
  return [
    {
      date: 'Apr 12, 2026',
      title: 'General Body Meeting',
      location: `${ssaName} Campus Meeting Room`,
      description: 'Join us for our bi-weekly general body meeting. All are welcome!',
    },
    {
      date: 'Apr 26, 2026',
      title: 'Langar on the Lawn',
      location: 'Main Campus Quad',
      description: 'Community meal open to all students. Come enjoy free food and great company.',
    },
    {
      date: 'May 10, 2026',
      title: 'End of Year Banquet',
      location: 'Student Union Ballroom',
      description: 'Celebrate an incredible year with dinner, awards, and performances.',
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Chapter Not Found                                                  */
/* ------------------------------------------------------------------ */

function ChapterNotFound({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-saffron" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
          Chapter Not Found
        </h1>
        <p className="text-slate-body text-lg mb-2">
          We couldn&apos;t find an SSA chapter matching <span className="font-semibold text-navy">&ldquo;{slug}&rdquo;</span>.
        </p>
        <p className="text-warm-gray mb-8">
          It may not exist yet, or the URL might be incorrect.
        </p>
        <a
          href="https://unitedsikhmovement.org/find-ssa"
          className="inline-flex items-center gap-2 bg-navy text-white font-medium px-6 py-3 rounded-[2rem] hover:bg-navy-deep transition-colors"
        >
          Browse All Chapters
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main SSA Page                                                      */
/* ------------------------------------------------------------------ */

export default function SSASitePage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const ssa = ssaData[slug];

  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const res = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ssa_slug: slug }),
      });
      if (res.ok) {
        setFormStatus('success');
        setEmail('');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }

  if (!ssa) return <ChapterNotFound slug={slug} />;

  const events = getPlaceholderEvents(ssa.name);

  return (
    <div className="-mt-24 pt-0">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Decorative saffron accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-container mx-auto px-6 py-28 md:py-36 lg:py-44">
          <div className="inline-block bg-saffron/15 border border-saffron/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-saffron font-medium text-sm tracking-wide uppercase">
              United Sikh Movement Chapter
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            {ssa.name}
          </h1>

          <p className="text-xl md:text-2xl text-white/80 font-body mb-2">
            {ssa.fullName}
          </p>

          <p className="flex items-center gap-2 text-white/60 text-lg">
            <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {ssa.city}, {ssa.state}
          </p>

          {ssa.instagram && (
            <p className="flex items-center gap-2 text-white/60 mt-2">
              <svg className="w-5 h-5 text-saffron" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              {ssa.instagram}
            </p>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABOUT                                                       */}
      {/* ============================================================ */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">
              About {ssa.name}
            </h2>
            <div className="space-y-4 text-lg text-slate-body leading-relaxed">
              <p>
                {ssa.fullName} is a student-led organization at{' '}
                <span className="font-semibold text-navy">{ssa.university}</span> in {ssa.city}, {ssa.state}.
                We are dedicated to fostering a vibrant Sikh community on campus through education,
                service, and fellowship.
              </p>
              <p>
                As a chapter of the United Sikh Movement, we connect students to a
                nationwide network of Sikh student organizations, providing mentorship,
                resources, and a shared mission of spiritual grounding and community building.
              </p>
              <p>
                Whether you are Sikh, interested in learning about Sikhi, or simply looking for a
                welcoming community, we invite you to get involved and join us at our events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  UPCOMING EVENTS                                             */}
      {/* ============================================================ */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-12">
            Upcoming Events
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-white border border-off-white rounded-[2rem] p-8 flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center gap-2 bg-saffron/10 text-saffron font-medium text-sm px-3 py-1 rounded-full mb-4 self-start">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  {event.date}
                </div>

                <h3 className="font-display text-xl font-semibold text-navy mb-2">
                  {event.title}
                </h3>

                <p className="text-slate-body text-sm mb-3 leading-relaxed">
                  {event.description}
                </p>

                <p className="flex items-center gap-1.5 text-warm-gray text-sm mt-auto pt-4 border-t border-off-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  JOIN EMAIL LIST                                             */}
      {/* ============================================================ */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Join Our Email List
            </h2>
            <p className="text-slate-body text-lg mb-8">
              Stay updated on events, meetings, and community news from {ssa.name}.
            </p>

            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-[2rem] border border-off-white bg-white text-navy placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron transition-colors"
              />
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="bg-saffron text-white font-medium px-8 py-3 rounded-[2rem] hover:bg-saffron/90 disabled:opacity-60 transition-colors whitespace-nowrap"
              >
                {formStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {formStatus === 'success' && (
              <p className="mt-4 text-green-600 font-medium">You&apos;re subscribed! Welcome aboard.</p>
            )}
            {formStatus === 'error' && (
              <p className="mt-4 text-red-500 font-medium">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SSA OFFICER LOGIN                                           */}
      {/* ============================================================ */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center bg-white border border-off-white rounded-[2rem] p-10">
            <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-navy mb-2">
              SSA Officer Portal
            </h2>
            <p className="text-slate-body mb-6">
              Officers can log in to manage events, members, and chapter settings.
            </p>
            <Link
              href={`/login?callbackUrl=/dashboard&ssa=${slug}`}
              className="inline-flex items-center gap-2 bg-navy text-white font-medium px-8 py-3 rounded-[2rem] hover:bg-navy-deep transition-colors"
            >
              Login to Dashboard
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="bg-navy text-white/60 py-12">
        <div className="max-w-container mx-auto px-6 text-center">
          <p className="text-sm mb-2">
            Part of the{' '}
            <a
              href="https://unitedsikhmovement.org"
              className="text-saffron hover:text-saffron-light transition-colors font-medium"
            >
              United Sikh Movement
            </a>{' '}
            network
          </p>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} United Sikh Movement. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
