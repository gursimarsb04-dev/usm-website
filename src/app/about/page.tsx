'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  const missionCards = [
    {
      icon: Target,
      title: 'Mission',
      description: 'Create pathways for Sikh youth to thrive in their professional, personal, and spiritual journeys',
    },
    {
      icon: Users,
      title: 'Vision',
      description: 'Every Sikh student has access to mentorship, community, and spiritual growth',
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'Seva (Service), Equality, Excellence, Faith, Community',
    },
  ];

  const timeline = [
    { year: '2015', event: 'United Sikh Movement Founded' },
    { year: '2016', event: 'First Sikh Student Association Chapter Established' },
    { year: '2017', event: 'Inaugural Safal Summit (500+ attendees)' },
    { year: '2018', event: '10 SSA Chapters Across Universities' },
    { year: '2020', event: '25 SSA Chapters & Camp Kudrat Launch' },
    { year: '2024', event: '39 Chapters & 4,000+ Annual Summit Attendees' },
  ];

  const team = [
    { name: 'Director of Digital Programs', initials: 'DDP' },
    { name: 'Executive Director', initials: 'ED' },
    { name: 'Programs Director', initials: 'PD' },
    { name: 'Operations Director', initials: 'OD' },
  ];

  const partners = [
    'Jakara Movement',
    'Sikh Coalition',
    'SALDEF',
    'Universities Nationwide',
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About United Sikh Movement
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Empowering Sikh youth to excel professionally, personally, and spiritually while staying
              connected to their faith and community across 39 university chapters.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-[#F8F9FA] rounded-lg p-8 text-center">
                  <div className="w-14 h-14 bg-[#FF6B00] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] text-center mb-12">
            Our Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border-l-4 border-[#FF6B00]">
                <span className="text-2xl font-bold text-[#FF6B00]">{item.year}</span>
                <p className="text-gray-700 mt-2">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B00] to-[#D4A843] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-24 bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (
              <span key={index} className="text-lg font-semibold text-gray-200 bg-white/10 px-6 py-3 rounded-lg">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#FF6B00] to-[#E55A00]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Be part of a community that empowers Sikh youth to thrive.
          </p>
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B00] font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Get Involved
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
