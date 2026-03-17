'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Award, Lightbulb, Briefcase } from 'lucide-react';

export default function ProgramsPage() {
  const programs = [
    {
      id: 1,
      title: 'Safal Summit',
      icon: Award,
      description: 'Our flagship annual conference bringing together Sikh youth from across the nation.',
      highlights: [
        '4,000+ attendees annually',
        'Keynote speakers from Fortune 500 companies',
        'Career workshops and interview practice',
        'Spiritual sessions and kirtan',
        'Networking opportunities',
      ],
      link: '/programs/safal-summit',
      align: 'left',
    },
    {
      id: 2,
      title: 'SSA Coordination & Support',
      icon: Users,
      description: 'Empowering our 39 Sikh Student Association chapters to thrive on their campuses.',
      highlights: [
        'Leadership training and workshops',
        'Event planning templates and resources',
        'Fundraising guides and support',
        'Annual leadership conference',
        'Dedicated chapter support team',
      ],
      link: '/programs/ssa-coordination',
      align: 'right',
    },
    {
      id: 3,
      title: 'Camp Kudrat',
      icon: Lightbulb,
      description: 'An immersive weekend retreat for high school and college students seeking community and growth.',
      highlights: [
        'Spiritual workshops and guidance',
        'Leadership development sessions',
        'Outdoor activities and team building',
        'Community connection and friendship',
        'Mentorship from student leaders',
      ],
      link: '/programs/camp-kudrat',
      align: 'left',
    },
    {
      id: 4,
      title: 'Professional Development',
      icon: Briefcase,
      description: 'Supporting Sikh youth in launching successful careers through mentorship and coaching.',
      highlights: [
        '500+ mentor network',
        '1:1 mentorship matching',
        'Internship placements',
        'Resume and interview coaching',
        '95% placement rate',
      ],
      link: '/programs/professional-development',
      align: 'right',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Programs That Change Lives
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              USM offers programs designed to support every aspect of your journey—from spiritual growth and leadership development to career advancement and community connection.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            const isLeft = program.align === 'left';

            return (
              <div
                key={program.id}
                className={`grid md:grid-cols-2 gap-12 items-center mb-20 md:mb-32 ${
                  !isLeft ? 'md:auto-cols-end' : ''
                }`}
              >
                {/* Content */}
                <div className={isLeft ? 'md:col-span-1' : 'md:col-span-1 md:order-2'}>
                  <div className="mb-4">
                    <div
                      className="inline-flex w-14 h-14 bg-gradient-to-br from-[#FF6B00] to-[#D4A843] rounded-lg items-center justify-center mb-4"
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
                    {program.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-8">
                    {program.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={program.link}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Image Placeholder */}
                <div
                  className={`${isLeft ? 'md:col-span:1' : 'md:col-span:1 md:order-1'}`}
                >
                  <div
                    className="bg-gradient-to-br from-[#FF6B00] to-[#D4A843] rounded-lg h-96 md:h-full flex items-center justify-center text-white"
                  >
                    <div className="text-center">
                      <IconComponent className="w-20 h-20 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-semibold">{program.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] text-center mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6B00] mb-2">
                39
              </div>
              <p className="text-gray-600">University Chapters</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4A843] mb-2">
                4,000+
              </div>
              <p className="text-gray-600">Summit Attendees</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6B00] mb-2">
                500+
              </div>
              <p className="text-gray-600">Mentors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4A843] mb-2">
                95%
              </div>
              <p className="text-gray-600">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Get Involved?
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Join thousands of Sikh students who are growing, learning, and thriving with USM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Find Your Chapter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>
  
    
  </div>
  );
}
