'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const programData: Record<
  string,
  {
    title: string;
    icon: string;
    category: string;
    tagline: string;
    description: string;
    highlights: string[];
    relatedEvents: { title: string; date: string; location: string }[];
  }
> = {
  'camp-kudrat': {
    title: 'Camp Kudrat',
    icon: '\u{1F3D5}\uFE0F',
    category: 'Sikhi Development',
    tagline: 'Reflect. Connect. Renew.',
    description:
      'An immersive weekend retreat for spiritual growth, self-discovery, and building lifelong bonds with sangat. Camp Kudrat brings Sikh college students together in nature for guided Gurbani sessions, outdoor activities, and meaningful team building. It is a space to step away from the noise of campus life and reconnect with your roots.',
    highlights: [
      'Annual retreat running since 2018',
      '1,100+ photos captured at the latest event',
      'Open to all Sikh college students nationwide',
      'Features guided Gurbani sessions and nature activities',
    ],
    relatedEvents: [
      { title: 'Camp Kudrat 2024', date: 'October 2024', location: 'Northern California' },
      { title: 'Camp Kudrat 2023', date: 'October 2023', location: 'Northern California' },
      { title: 'Camp Kudrat 2022', date: 'September 2022', location: 'Northern California' },
    ],
  },
  'gurbani-study': {
    title: 'Gurbani Study',
    icon: '\u{1F4D6}',
    category: 'Sikhi Development',
    tagline: 'Mother Tongue Made Easy.',
    description:
      'Weekly study circles exploring Sikh scripture and its relevance to modern life. Students dive into Gurbani together, building understanding and spiritual grounding in a supportive, judgment-free environment. Whether you are just beginning your journey or have years of experience, these sessions meet you where you are.',
    highlights: [
      'Regular weekly sessions throughout the academic year',
      'Open to all levels, from beginners to advanced',
      'Builds strong Sikhi foundations and community',
      'Interactive discussions connecting scripture to daily life',
    ],
    relatedEvents: [
      { title: 'Spring 2025 Study Circle', date: 'January - May 2025', location: 'Virtual & In-Person' },
      { title: 'Fall 2024 Study Circle', date: 'August - December 2024', location: 'Virtual & In-Person' },
      { title: 'Spring 2024 Study Circle', date: 'January - May 2024', location: 'Virtual & In-Person' },
    ],
  },
  'safal-summit': {
    title: 'Safal Summit',
    icon: '\u{1F393}',
    category: 'Professional Development',
    tagline: 'Excel. Connect. Lead.',
    description:
      "USM's flagship annual conference bringing together Sikh students from across the country. Safal Summit features career workshops, keynote speakers from top companies, professional networking, and a celebration of Sikh student excellence. It is the premier event for ambitious Sikh students looking to level up their careers.",
    highlights: [
      '311+ photos captured at the latest summit',
      'Draws Sikh students from universities nationwide',
      'Top Sikh professionals as keynote speakers and panelists',
      'Career workshops, resume reviews, and networking sessions',
    ],
    relatedEvents: [
      { title: 'Safal Summit 2024', date: 'March 2024', location: 'University of California' },
      { title: 'Safal Summit 2023', date: 'March 2023', location: 'Bay Area, CA' },
      { title: 'Safal Summit 2022', date: 'April 2022', location: 'Virtual' },
    ],
  },
  'kadam-career-panel': {
    title: 'Kadam Career Panel',
    icon: '\u{1F4BC}',
    category: 'Professional Development',
    tagline: 'Your Next Step Starts Here.',
    description:
      'Intimate career panels connecting students directly with Sikh professionals in tech, medicine, law, and business. Kadam panels are about real conversations -- how to navigate career paths while staying true to your identity, what it takes to break into competitive fields, and building authentic professional relationships.',
    highlights: [
      'Multiple panels hosted per year across different industries',
      'Covers diverse industries including tech, medicine, law, and business',
      'Direct mentorship connections with Sikh professionals',
      'Candid conversations about career and identity',
    ],
    relatedEvents: [
      { title: 'Kadam: Tech Careers Panel', date: 'November 2024', location: 'Virtual' },
      { title: 'Kadam: Healthcare Panel', date: 'September 2024', location: 'Virtual' },
      { title: 'Kadam: Law & Policy Panel', date: 'April 2024', location: 'Virtual' },
    ],
  },
  'national-conference': {
    title: 'National Conference',
    icon: '\u{1F91D}',
    category: 'SSA Network',
    tagline: 'Network, Learn, Lead.',
    description:
      'The annual gathering of SSA leaders from every chapter across the country. National Conference is where chapter leaders share strategies, build lasting relationships, plan the year ahead, and strengthen the broader Sikh student network. It is the backbone of the SSA movement.',
    highlights: [
      '10th annual conference held in 2024',
      '585 photos captured at the latest conference',
      'All SSA chapters represented from coast to coast',
      'Strategic planning and cross-chapter collaboration',
    ],
    relatedEvents: [
      { title: '10th Annual National Conference', date: 'July 2024', location: 'East Coast' },
      { title: '9th Annual National Conference', date: 'July 2023', location: 'Midwest' },
      { title: '8th Annual National Conference', date: 'July 2022', location: 'West Coast' },
    ],
  },
  'leadership-retreat': {
    title: 'Leadership Retreat',
    icon: '\u{1F3AF}',
    category: 'SSA Network',
    tagline: 'Lead With Purpose.',
    description:
      'Intensive training for new and returning SSA officers. The Leadership Retreat equips students with the skills to lead with purpose, organize impactful events, and serve their campus communities effectively. From event planning to conflict resolution, this program develops the next generation of Sikh student leaders.',
    highlights: [
      'Summer intensive program before the academic year',
      'Comprehensive officer development curriculum',
      'Community leadership and event management skills',
      'Builds strong bonds between chapter leaders nationwide',
    ],
    relatedEvents: [
      { title: 'Leadership Retreat 2024', date: 'June 2024', location: 'Retreat Center, CA' },
      { title: 'Leadership Retreat 2023', date: 'June 2023', location: 'Retreat Center, CA' },
      { title: 'Leadership Retreat 2022', date: 'June 2022', location: 'Virtual' },
    ],
  },
};

export function ProgramPageClient() {
  const params = useParams();
  const slug = params.slug as string;
  const program = programData[slug];
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!program) {
    return (
      <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">Program Not Found</h1>
          <Link href="/" className="text-[#FF6B00] font-semibold hover:text-[#E55A00]">
            &larr; Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#1a1a2e] text-white py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{program.icon}</span>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full">
              {program.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">{program.title}</h1>
          <p className="text-xl text-gray-300 italic">{program.tagline}</p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">About This Program</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{program.description}</p>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">Key Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {program.highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">Related Events</h2>
          <div className="space-y-4">
            {program.relatedEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e]">{event.title}</h3>
                  <p className="text-gray-500 text-sm">{event.location}</p>
                </div>
                <span className="text-sm font-medium text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full self-start sm:self-center">
                  {event.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture CTA */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-[#1a1a2e] rounded-xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h2>
            <p className="text-gray-300 mb-6">
              Sign up to be notified about the next {program.title}.
            </p>
            {submitted ? (
              <div className="text-green-400 font-semibold text-lg">
                Thank you! We will keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B00] hover:bg-[#E55A00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Notified
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
