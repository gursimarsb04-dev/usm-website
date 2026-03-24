'use client';

import { useState } from 'react';

type Category = 'conference' | 'camp' | 'leadership';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: Category;
  upcoming: boolean;
  description: string;
}

const events: Event[] = [
  // Upcoming
  {
    id: 1,
    title: "Bhai Khalra's Legacy, Our Responsibility",
    date: '2025',
    location: 'California',
    category: 'conference',
    upcoming: true,
    description:
      'A powerful conference honoring the legacy of Bhai Jaswant Singh Khalra and exploring our collective responsibility to carry forward his mission of human rights and justice.',
  },
  {
    id: 2,
    title: 'Safal Summit 2025',
    date: '2025',
    location: 'California',
    category: 'conference',
    upcoming: true,
    description:
      'An annual career-focused summit connecting Sikh professionals and students with mentorship, networking, and leadership development opportunities.',
  },
  {
    id: 3,
    title: 'Camp Kudrat 2025',
    date: 'Summer 2025',
    location: 'California',
    category: 'camp',
    upcoming: true,
    description:
      'An immersive outdoor retreat blending Sikhi, nature, and community bonding for college-age students looking to deepen their connection with the sangat.',
  },
  // Past
  {
    id: 4,
    title: '10th Annual USM Conference',
    date: '2024',
    location: 'California',
    category: 'conference',
    upcoming: false,
    description:
      'A milestone gathering celebrating a decade of USM conferences, featuring keynote speakers, workshops, and community dialogue.',
  },
  {
    id: 5,
    title: 'Camp Kudrat 2024',
    date: 'Summer 2024',
    location: 'California',
    category: 'camp',
    upcoming: false,
    description:
      'A weekend retreat in nature fostering spiritual growth, team-building, and meaningful connections among Sikh college students.',
  },
  {
    id: 6,
    title: '9th Annual USM Conference',
    date: '2024',
    location: 'California',
    category: 'conference',
    upcoming: false,
    description:
      'Bringing together Sikh student leaders from across the nation to discuss identity, advocacy, and community building.',
  },
  {
    id: 7,
    title: 'Camp Kudrat 2023',
    date: 'Summer 2023',
    location: 'California',
    category: 'camp',
    upcoming: false,
    description:
      'A nature-centered retreat offering workshops on Sikhi, wellness, and leadership in a collaborative camp setting.',
  },
  {
    id: 8,
    title: '8th Annual USM Conference',
    date: '2023',
    location: 'California',
    category: 'conference',
    upcoming: false,
    description:
      'A conference dedicated to empowering Sikh youth through panels on education, mental health, and civic engagement.',
  },
  {
    id: 9,
    title: '7th Annual Inter-SSA Conference',
    date: '2022',
    location: 'California',
    category: 'conference',
    upcoming: false,
    description:
      'A collaborative conference uniting Sikh Student Associations nationwide to share resources, ideas, and inspiration.',
  },
  {
    id: 10,
    title: 'Leadership Retreat 2019',
    date: 'Summer 2019',
    location: 'California',
    category: 'leadership',
    upcoming: false,
    description:
      'An intensive leadership development retreat for emerging Sikh student leaders focused on organizational skills and community impact.',
  },
  {
    id: 11,
    title: '2nd Annual Camp Kudrat',
    date: 'Summer 2019',
    location: 'California',
    category: 'camp',
    upcoming: false,
    description:
      'The second edition of Camp Kudrat, expanding on the inaugural retreat with new activities, deeper conversations, and lasting friendships.',
  },
  {
    id: 12,
    title: '4th Annual Inter-SSA Conference',
    date: '2018',
    location: 'California',
    category: 'conference',
    upcoming: false,
    description:
      'A gathering of Sikh Student Associations to strengthen inter-campus collaboration and share best practices.',
  },
  {
    id: 13,
    title: '1st Annual Camp Kudrat',
    date: 'Summer 2018',
    location: 'California',
    category: 'camp',
    upcoming: false,
    description:
      'The inaugural Camp Kudrat retreat — a groundbreaking outdoor experience rooted in Sikhi, nature, and student fellowship.',
  },
  {
    id: 14,
    title: '1st Annual Inter-SSA Conference',
    date: '2016',
    location: 'California',
    category: 'conference',
    upcoming: false,
    description:
      'The very first Inter-SSA Conference, laying the foundation for a national network of Sikh student organizations.',
  },
];

const filters: { label: string; value: Category | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Conference', value: 'conference' },
  { label: 'Camp / Retreat', value: 'camp' },
  { label: 'Career & Leadership', value: 'leadership' },
];

const categoryLabel: Record<Category, string> = {
  conference: 'Conference',
  camp: 'Camp / Retreat',
  leadership: 'Career & Leadership',
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filtered =
    activeFilter === 'all'
      ? events
      : events.filter((e) => e.category === activeFilter);

  const upcoming = filtered.filter((e) => e.upcoming);
  const past = filtered.filter((e) => !e.upcoming);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">
            Community Hub
          </span>
          <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter text-white leading-[1.05]">
            USM Events
          </h1>
          <p className="font-body text-xl text-white/80 max-w-2xl">
            Join retreats, workshops, and social gatherings that bring Sikh
            students together across the country.
          </p>
        </div>
      </section>

      {/* Filter Tabs + Cards */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-warm-white flex-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
                  activeFilter === f.value
                    ? 'bg-saffron text-white shadow-lg shadow-saffron/20'
                    : 'bg-white text-navy ring-1 ring-black/5 hover:ring-navy/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-semibold text-3xl text-navy">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((evt) => (
                  <div
                    key={evt.id}
                    className="group border-2 border-saffron rounded-[2rem] bg-white ring-1 ring-black/5 shadow-xl shadow-navy/5 flex flex-col h-full hover:-translate-y-1 transition-all overflow-hidden"
                  >
                    {/* Gradient header */}
                    <div className="bg-gradient-to-br from-saffron to-navy px-6 pt-6 pb-5 flex flex-col gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/80 bg-white/15 rounded-full px-3 py-1 w-fit">
                        {categoryLabel[evt.category]}
                      </span>
                      <h3 className="font-display font-semibold text-xl text-white leading-tight line-clamp-2">
                        {evt.title}
                      </h3>
                    </div>
                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1 gap-4">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy bg-navy/5 rounded-full px-3 py-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          {evt.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-warm-gray">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                          </svg>
                          {evt.location}
                        </span>
                      </div>
                      <p className="text-sm text-slate-body leading-relaxed line-clamp-3 flex-1">
                        {evt.description}
                      </p>
                      <button className="mt-2 w-full py-3.5 rounded-full bg-saffron text-white font-medium text-center hover:bg-saffron/90 transition-all shadow-md shadow-saffron/20 outline-none focus-visible:ring-2 focus-visible:ring-saffron">
                        Details &amp; Registration
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-semibold text-3xl text-navy">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((evt) => (
                  <div
                    key={evt.id}
                    className="group rounded-[2rem] bg-white ring-1 ring-black/5 shadow-xl shadow-navy/5 flex flex-col h-full hover:-translate-y-1 transition-all overflow-hidden"
                  >
                    {/* Navy header */}
                    <div className="bg-navy px-6 pt-6 pb-5 flex flex-col gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 bg-white/10 rounded-full px-3 py-1 w-fit">
                        {categoryLabel[evt.category]}
                      </span>
                      <h3 className="font-display font-semibold text-xl text-white leading-tight line-clamp-2">
                        {evt.title}
                      </h3>
                    </div>
                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1 gap-4">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy bg-navy/5 rounded-full px-3 py-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          {evt.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-warm-gray">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                          </svg>
                          {evt.location}
                        </span>
                      </div>
                      <p className="text-sm text-slate-body leading-relaxed line-clamp-3 flex-1">
                        {evt.description}
                      </p>
                      <button className="mt-2 w-full py-3.5 rounded-full border border-off-white text-navy font-medium text-center hover:border-navy hover:bg-navy/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-saffron">
                        View Recap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {upcoming.length === 0 && past.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center text-center bg-navy/5 rounded-[2rem] border border-dashed border-warm-gray/30">
              <svg
                className="w-12 h-12 text-warm-gray mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <h3 className="font-display font-semibold text-2xl text-navy mb-2">
                No events found
              </h3>
              <p className="text-slate-body">
                Try a different filter or check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Email CTA */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-cream">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full">
            Stay Connected
          </span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-navy tracking-tight">
            Never Miss an Event
          </h2>
          <p className="font-body text-slate-body">
            Get notified about upcoming conferences, retreats, and community
            gatherings straight to your inbox.
          </p>
          {submitted ? (
            <div className="bg-saffron/10 text-navy font-medium px-6 py-4 rounded-2xl">
              Thanks for subscribing! We will keep you in the loop.
            </div>
          ) : (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-black/5 text-navy placeholder:text-warm-gray outline-none focus:ring-2 focus:ring-saffron transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-saffron text-white font-medium hover:bg-saffron/90 transition-all shadow-lg shadow-saffron/20 outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
