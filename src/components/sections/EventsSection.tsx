'use client';

import { Calendar, MapPin } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  type: 'past' | 'upcoming';
}

const events: Event[] = [
  // Recent / Upcoming
  {
    id: '1',
    name: "Bhai Khalra's Legacy, Our Responsibility",
    date: '2025',
    location: 'California',
    description:
      'A powerful event honoring the legacy of Bhai Jaswant Singh Khalra and exploring our collective responsibility to continue his work.',
    type: 'upcoming',
  },
  {
    id: '2',
    name: 'Safal Summit 2025',
    date: '2025',
    location: 'California',
    description:
      "USM's flagship annual conference — 311 photos captured. Career workshops, keynote speakers, and professional networking for Sikh students.",
    type: 'upcoming',
  },
  {
    id: '3',
    name: 'Camp Kudrat 2025',
    date: 'Summer 2025',
    location: 'California',
    description:
      'Reflect. Connect. Renew. Over 1,100 photos captured at this year\'s retreat for spiritual growth and lifelong bonds.',
    type: 'upcoming',
  },
  // Past Events
  {
    id: '4',
    name: '10th Annual USM Conference',
    date: '2024',
    location: 'California',
    description:
      'A milestone celebration — the 10th annual gathering of SSA leaders with 585 photos of workshops, panels, and community.',
    type: 'past',
  },
  {
    id: '5',
    name: 'Camp Kudrat 2024',
    date: 'Summer 2024',
    location: 'California',
    description:
      'An immersive weekend retreat for spiritual growth, self-discovery, and building lifelong bonds with sangat.',
    type: 'past',
  },
  {
    id: '6',
    name: '9th Annual USM Conference',
    date: '2024',
    location: 'California',
    description:
      'SSA leaders from every chapter came together to share strategies, build relationships, and plan the year ahead.',
    type: 'past',
  },
  {
    id: '7',
    name: 'Camp Kudrat 2023',
    date: 'Summer 2023',
    location: 'California',
    description:
      'Nearly 500 photos of sangat connecting through nature, Gurbani, and meaningful workshops.',
    type: 'past',
  },
  {
    id: '8',
    name: '8th Annual USM Conference',
    date: '2023',
    location: 'California',
    description:
      'Another year of bringing SSA chapters together for collaboration, learning, and celebration.',
    type: 'past',
  },
  {
    id: '9',
    name: '7th Annual Inter-SSA Conference',
    date: '2022',
    location: 'California',
    description:
      '250 photos capturing workshops, keynotes, and the energy of Sikh students united.',
    type: 'past',
  },
  {
    id: '10',
    name: 'Leadership Retreat 2019',
    date: 'Summer 2019',
    location: 'California',
    description:
      'Intensive officer training — learning to lead with purpose, organize events, and serve campus communities.',
    type: 'past',
  },
  {
    id: '11',
    name: '2nd Annual Camp Kudrat',
    date: 'Summer 2019',
    location: 'California',
    description:
      'Over 450 photos of sangat reconnecting with Sikhi through guided sessions, nature, and team building.',
    type: 'past',
  },
  {
    id: '12',
    name: '4th Annual Inter-SSA Conference',
    date: '2018',
    location: 'California',
    description:
      'The most-viewed conference album — 334 photos and 1,600+ views of Sikh student excellence.',
    type: 'past',
  },
  {
    id: '13',
    name: '1st Annual Camp Kudrat',
    date: 'Summer 2018',
    location: 'California',
    description:
      'Where it all began. The first Camp Kudrat retreat launched with 430 photos and 1,700+ views.',
    type: 'past',
  },
  {
    id: '14',
    name: '1st Annual Inter-SSA Conference',
    date: '2016',
    location: 'California',
    description:
      'The very first USM Inter-SSA Conference — 69 photos marking the start of a movement.',
    type: 'past',
  },
];

export function EventsSection() {
  const pastEvents = events.filter((e) => e.type === 'past');
  const upcomingEvents = events.filter((e) => e.type === 'upcoming');

  return (
    <section className="w-full py-20 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-4">
            Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From retreats and conferences to career panels and langar — here&apos;s what we&apos;ve been up to and what&apos;s next.
          </p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6B00] mb-6">
              Upcoming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md border-2 border-[#FF6B00] hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-[#FF6B00] to-[#D4A843] px-6 py-6">
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {event.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
            Past Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] px-6 py-5">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {event.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
