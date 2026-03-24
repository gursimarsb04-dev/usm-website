'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Mail } from 'lucide-react';

type EventCategory = 'Conference' | 'Camp / Retreat' | 'Career & Leadership';
type EventStatus = 'upcoming' | 'past';
type TabFilter = 'All' | EventCategory;

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
}

const events: Event[] = [
  // Conference
  {
    id: '1',
    name: 'Safal Summit 2025',
    date: '2025',
    location: 'California',
    description:
      "USM's flagship annual conference featuring career workshops, keynote speakers, and professional networking for Sikh students.",
    category: 'Conference',
    status: 'upcoming',
  },
  {
    id: '2',
    name: '10th Annual USM Conference',
    date: '2024',
    location: 'California',
    description:
      'A milestone celebration — the 10th annual gathering of SSA leaders with workshops, panels, and community building.',
    category: 'Conference',
    status: 'past',
  },
  {
    id: '3',
    name: '9th Annual USM Conference',
    date: '2024',
    location: 'California',
    description:
      'SSA leaders from every chapter came together to share strategies, build relationships, and plan the year ahead.',
    category: 'Conference',
    status: 'past',
  },
  {
    id: '4',
    name: '8th Annual USM Conference',
    date: '2023',
    location: 'California',
    description:
      'Another year of bringing SSA chapters together for collaboration, learning, and celebration.',
    category: 'Conference',
    status: 'past',
  },
  {
    id: '5',
    name: '7th Annual Inter-SSA Conference',
    date: '2022',
    location: 'California',
    description:
      'Workshops, keynotes, and the energy of Sikh students united under one roof.',
    category: 'Conference',
    status: 'past',
  },
  {
    id: '6',
    name: '4th Annual Inter-SSA Conference',
    date: '2018',
    location: 'California',
    description:
      'A highly attended conference showcasing Sikh student excellence and inter-chapter collaboration.',
    category: 'Conference',
    status: 'past',
  },
  {
    id: '7',
    name: '1st Annual Inter-SSA Conference',
    date: '2016',
    location: 'California',
    description:
      'The very first USM Inter-SSA Conference — marking the start of a movement.',
    category: 'Conference',
    status: 'past',
  },
  // Camp / Retreat
  {
    id: '8',
    name: 'Camp Kudrat 2025',
    date: 'Summer 2025',
    location: 'California',
    description:
      'Reflect. Connect. Renew. A retreat for spiritual growth, self-discovery, and lifelong bonds with sangat.',
    category: 'Camp / Retreat',
    status: 'upcoming',
  },
  {
    id: '9',
    name: 'Camp Kudrat 2024',
    date: 'Summer 2024',
    location: 'California',
    description:
      'An immersive weekend retreat for spiritual growth, self-discovery, and building lifelong bonds with sangat.',
    category: 'Camp / Retreat',
    status: 'past',
  },
  {
    id: '10',
    name: 'Camp Kudrat 2023',
    date: 'Summer 2023',
    location: 'California',
    description:
      'Sangat connecting through nature, Gurbani, and meaningful workshops in the California outdoors.',
    category: 'Camp / Retreat',
    status: 'past',
  },
  {
    id: '11',
    name: '2nd Annual Camp Kudrat',
    date: 'Summer 2019',
    location: 'California',
    description:
      'Sangat reconnecting with Sikhi through guided sessions, nature, and team building.',
    category: 'Camp / Retreat',
    status: 'past',
  },
  {
    id: '12',
    name: '1st Annual Camp Kudrat',
    date: 'Summer 2018',
    location: 'California',
    description:
      'Where it all began. The first Camp Kudrat retreat launched a beloved USM tradition.',
    category: 'Camp / Retreat',
    status: 'past',
  },
  // Career & Leadership
  {
    id: '13',
    name: "Bhai Khalra's Legacy, Our Responsibility",
    date: '2025',
    location: 'California',
    description:
      'A powerful event honoring the legacy of Bhai Jaswant Singh Khalra and exploring our collective responsibility to continue his work.',
    category: 'Career & Leadership',
    status: 'upcoming',
  },
  {
    id: '14',
    name: 'Leadership Retreat 2019',
    date: 'Summer 2019',
    location: 'California',
    description:
      'Intensive officer training — learning to lead with purpose, organize events, and serve campus communities.',
    category: 'Career & Leadership',
    status: 'past',
  },
];

const tabs: TabFilter[] = ['All', 'Conference', 'Camp / Retreat', 'Career & Leadership'];

const categoryColors: Record<EventCategory, string> = {
  Conference: 'bg-blue-100 text-blue-800',
  'Camp / Retreat': 'bg-green-100 text-green-800',
  'Career & Leadership': 'bg-purple-100 text-purple-800',
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>('All');

  const filteredEvents =
    activeTab === 'All'
      ? events
      : events.filter((e) => e.category === activeTab);

  // Sort: upcoming first, then past
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.status === 'upcoming' && b.status === 'past') return -1;
    if (a.status === 'past' && b.status === 'upcoming') return 1;
    return 0;
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Events
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              From retreats and conferences to career panels and langar &mdash;
              here&apos;s what we&apos;ve been up to and what&apos;s next.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs + Events */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center bg-white rounded-lg shadow-sm border border-gray-200 p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 rounded-md text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#FF6B00] text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow relative ${
                  event.status === 'upcoming'
                    ? 'border-2 border-[#FF6B00]'
                    : ''
                }`}
              >
                {/* Card Header */}
                <div
                  className={`px-6 py-5 ${
                    event.status === 'upcoming'
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#D4A843]'
                      : 'bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-xl font-bold text-white leading-tight">
                      {event.name}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
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

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* Category Badge */}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[event.category]}`}
                    >
                      {event.category}
                    </span>
                    {/* Past Label */}
                    {event.status === 'past' && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                        Past Event
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {sortedEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No events found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Email Capture CTA */}
      <section className="py-16 md:py-20 bg-[#1a1a2e]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Mail className="w-10 h-10 text-[#FF6B00] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-gray-300 mb-8">
            Get notified about upcoming USM events, retreats, and conferences.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-[#E55A00] transition-colors whitespace-nowrap"
            >
              Get Event Updates
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
