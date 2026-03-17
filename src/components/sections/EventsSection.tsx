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
  {
    id: '1',
    name: 'Safal Summit 2024',
    date: 'March 2024',
    location: 'California',
    description:
      "USM's flagship annual conference. Career workshops, keynote speakers, and a celebration of Sikh student excellence.",
    type: 'past',
  },
  {
    id: '2',
    name: 'Camp Kudrat 2024',
    date: 'Summer 2024',
    location: 'California',
    description:
      'An immersive weekend retreat for spiritual growth, self-discovery, and building lifelong bonds with sangat.',
    type: 'past',
  },
  {
    id: '3',
    name: 'National Conference 2024',
    date: 'Fall 2024',
    location: 'Virtual',
    description:
      'SSA leaders from every chapter came together to share strategies, build relationships, and plan the year ahead.',
    type: 'past',
  },
  {
    id: '4',
    name: 'Langar Seva Events',
    date: 'Ongoing',
    location: 'Campuses Nationwide',
    description:
      'Campus-wide langar events open to all students, sharing the Sikh tradition of free community meals.',
    type: 'past',
  },
  {
    id: '5',
    name: 'Kadam Career Panels',
    date: 'Throughout 2024',
    location: 'Various Campuses',
    description:
      'Intimate career panels connecting students directly with Sikh professionals in tech, medicine, law, and business.',
    type: 'past',
  },
  {
    id: '6',
    name: 'Leadership Retreat 2024',
    date: 'Summer 2024',
    location: 'TBA',
    description:
      'Intensive training for new and returning SSA officers — learning to lead with purpose and serve campus communities.',
    type: 'past',
  },
  {
    id: '7',
    name: 'Safal Summit 2025',
    date: 'Date TBA',
    location: 'Location TBA',
    description:
      'The next Safal Summit is coming. Career workshops, keynote speakers, and professional networking for Sikh students.',
    type: 'upcoming',
  },
  {
    id: '8',
    name: 'Camp Kudrat 2025',
    date: 'Date TBA',
    location: 'Location TBA',
    description:
      'Reflect. Connect. Renew. The next Camp Kudrat retreat for spiritual growth and lifelong bonds.',
    type: 'upcoming',
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
