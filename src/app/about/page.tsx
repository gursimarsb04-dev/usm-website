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
      </div>
  );
}
