'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, HandHeart, Users, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  const pillarCards = [
    {
      icon: Sparkles,
      title: 'Simran',
      subtitle: 'Spirituality',
      description: 'Grounding students in their Sikhi through Gurbani study, Camp Kudrat retreats, and daily practice.',
    },
    {
      icon: HandHeart,
      title: 'Seva',
      subtitle: 'Philanthropy',
      description: 'Serving communities through Langar Seva, volunteer drives, and giving back beyond the campus.',
    },
    {
      icon: Users,
      title: 'Sangat',
      subtitle: 'Community',
      description: 'Building lifelong bonds through SSA chapters, national conferences, and a network that feels like family.',
    },
    {
      icon: GraduationCap,
      title: 'Academics',
      subtitle: 'Excellence',
      description: 'Supporting professional excellence through career panels, mentorship, and real-world skill building.',
    },
  ];

  const timeline = [
    { year: '2015', event: 'USM founded by Harsimran Kaur in Elk Grove, CA' },
    { year: '2016', event: 'First SSA chapter established' },
    { year: '2018', event: 'Camp Kudrat launched — "Reflect. Connect. Renew"' },
    { year: '2020', event: '20+ SSA chapters across the US' },
    { year: '2022', event: 'Safal Summit draws record attendance' },
    { year: '2024', event: '39 active chapters nationwide' },
  ];

  const team = [
    { name: 'Harsimran Kaur', role: 'Founder & Executive Director', initials: 'HK' },
    { name: 'Director of Programs', role: 'Programs', initials: 'DP' },
    { name: 'Director of Outreach', role: 'Outreach', initials: 'DO' },
    { name: 'Director of Operations', role: 'Operations', initials: 'DOO' },
  ];

  const partners = [
    'Jakara Movement',
    'Sikh Coalition',
    'SALDEF',
    'Dasvandh Network',
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
              An ecosystem for Sikh youth to excel professionally, personally and spiritually — across 39 university chapters nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] text-center mb-12">
            Our Four Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillarCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-[#F8F9FA] rounded-lg p-8 text-center">
                  <div className="w-14 h-14 bg-[#FF6B00] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-1">{card.title}</h3>
                  <p className="text-sm font-medium text-[#FF6B00] mb-3">{card.subtitle}</p>
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
                <p className="text-sm text-gray-500">{member.role}</p>
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
