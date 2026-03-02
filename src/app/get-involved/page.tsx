'use client';

import Link from 'next/link';
import { Users, Zap, Heart, DollarSign, Calendar, MapPin } from 'lucide-react';

interface Pathway {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

const pathways: Pathway[] = [
  {
    id: '1',
    title: 'Join Your Local SSA',
    description: 'Find and connect with your campus chapter. Meet other Sikh students, attend events, and build meaningful relationships.',
    icon: <Users className="w-12 h-12 text-[#FF6B00]" />,
    link: '/find-ssa',
  },
  {
    id: '2',
    title: 'Start a New Chapter',
    description: 'Bring USM to your university. We provide resources, training, and ongoing support to help you build a thriving community.',
    icon: <Zap className="w-12 h-12 text-[#FF6B00]" />,
    link: '/get-involved/start-chapter',
  },
  {
    id: '3',
    title: 'Volunteer Your Skills',
    description: 'Help with events, content creation, mentoring, and tech projects. Share your talents and make a direct impact.',
    icon: <Heart className="w-12 h-12 text-[#FF6B00]" />,
    link: '/volunteer',
  },
  {
    id: '4',
    title: 'Support with a Donation',
    description: 'Fund programs that change lives. Your contributions support SSA initiatives, events, and community services.',
    icon: <DollarSign className="w-12 h-12 text-[#FF6B00]" />,
    link: '/donate',
  },
];

const upcomingEvents: Event[] = [
  {
    id: '1',
    name: 'Safal Summit 2026',
    date: 'June 15-17, 2026',
    location: 'Houston, TX',
    description: 'Join SSA leaders from across North America for our flagship annual conference. Network, learn, and celebrate our community.',
  },
  {
    id: '2',
    name: 'Camp Kudrat Spring',
    date: 'April 5-7, 2026',
    location: 'Bay Area, CA',
    description: 'A transformative spring retreat for SSA members. Build confidence, develop leadership skills, and strengthen your faith.',
  },
  {
    id: '3',
    name: 'SSA Leadership Conference',
    date: 'May 10, 2026',
    location: 'Virtual',
    description: 'Virtual training and resources for SSA officers and leaders. Topics include event planning, community engagement, and growth strategies.',
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Get Involved with USM
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            There are many ways to be part of the movement
          </p>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pathways.map((pathway) => (
              <Link key={pathway.id} href={pathway.link}>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-[#FF6B00] hover:shadow-lg transition-all h-full cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    {pathway.icon}
                    <div className="flex-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">
                    {pathway.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {pathway.description}
                  </p>
                  <div className="mt-6 text-[#FF6B00] font-semibold flex items-center gap-2">
                    Learn More <span>â†’</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-[F8F9FA] px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-lg">
              Join us at these transformative experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-[#FF6B00] to-[#D4A843] px-6 py-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">{event.location}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <button className="w-full bg-[#1a1a2e] text-white font-semibold py-3 rounded-lg hover:bg-[#2d2d44] transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Supporters Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Proud Partners & Supporters
            </h2>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
              We collaborate with leading organizations committed to Sikh community development and civil rights.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white font-semibold text-lg">
              <span>Jakara Movement</span>
              <span className="text-[#D4A843]">â€¢</span>
              <span>Sikh Coalition</span>
              <span className="text-[#D4A843]">â€¢</span>
              <span>SALDEF</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FF6B00] px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Whether you're joining, volunteering, or donating, your involvement strengthens our community.
          </p>
          <Link
            href="/find-ssa"
            className="inline-block bg-[#1a1a2e] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#2d2d44] transition-colors text-lg"
          >
            Find Your SSA Chapter
          </Link>
        </div>
      </section>
  
  
   5•dbö>
  );
}
