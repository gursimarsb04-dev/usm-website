'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TreePine, BookOpen, Award, Briefcase, Globe, Users, UtensilsCrossed } from 'lucide-react';

type Program = {
  id: number;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  description: string;
  highlights: string[];
  link: string;
  align: 'left' | 'right';
};

export default function ProgramsPage() {
  const programs: Program[] = [
    {
      id: 1,
      category: 'Sikhi Development',
      title: 'Camp Kudrat',
      tagline: 'Reflect. Connect. Renew.',
      icon: TreePine,
      description: 'An immersive weekend retreat for spiritual growth, self-discovery, and building lifelong bonds. Students unplug from campus life and reconnect with their Sikhi through guided workshops, nature, and sangat.',
      highlights: [
        'Guided Gurbani sessions',
        'Leadership through Sikh values',
        'Outdoor activities & team building',
        'Mentorship from student leaders',
        'Lifelong community bonds',
      ],
      link: '/programs/camp-kudrat',
      align: 'left',
    },
    {
      id: 2,
      category: 'Sikhi Development',
      title: 'Gurbani Study',
      tagline: 'Mother Tongue Made Easy',
      icon: BookOpen,
      description: 'Weekly group sessions making Gurmukhi and Gurbani accessible to students at every level. No prior knowledge required — just a willingness to learn.',
      highlights: [
        'Beginner-friendly Gurmukhi classes',
        'Gurbani reading & comprehension',
        'Sikh history & philosophy',
        'Peer-led study groups',
        'Virtual & in-person options',
      ],
      link: '/programs/gurbani-study',
      align: 'right',
    },
    {
      id: 3,
      category: 'Professional Development',
      title: 'Safal Summit',
      tagline: 'Excel. Connect. Lead.',
      icon: Award,
      description: "USM's flagship annual conference bringing together Sikh students from across the nation for career workshops, keynote speakers, and professional networking.",
      highlights: [
        'Career workshops & resume reviews',
        'Keynote speakers from industry',
        'Networking with Sikh professionals',
        'Leadership panels',
        'Spiritual sessions & kirtan',
      ],
      link: '/programs/safal-summit',
      align: 'left',
    },
    {
      id: 4,
      category: 'Professional Development',
      title: 'Kadam Career Panel',
      tagline: 'Your Next Step Starts Here',
      icon: Briefcase,
      description: 'Intimate career panels connecting students directly with Sikh professionals in tech, medicine, law, business, and beyond.',
      highlights: [
        'Industry-specific panels',
        '1-on-1 mentorship matching',
        'Resume & interview prep',
        'Internship connections',
        'Alumni network access',
      ],
      link: '/programs/kadam-career-panel',
      align: 'right',
    },
    {
      id: 5,
      category: 'SSA Network',
      title: 'National Conference',
      tagline: 'Network, Learn, Lead',
      icon: Globe,
      description: 'The annual gathering of SSA leaders from every chapter. Share strategies, build relationships, and shape the future of Sikh student life on campus.',
      highlights: [
        'Chapter best practices',
        'Event planning workshops',
        'Fundraising strategies',
        'Cross-chapter collaboration',
        'Leadership development',
      ],
      link: '/programs/national-conference',
      align: 'left',
    },
    {
      id: 6,
      category: 'SSA Network',
      title: 'Leadership Retreat',
      tagline: 'Lead, Organize, Serve',
      icon: Users,
      description: 'An intensive training experience for new and returning SSA officers. Learn to lead with purpose, organize effectively, and serve your campus community.',
      highlights: [
        'Officer training curriculum',
        'Conflict resolution',
        'Event management',
        'Community engagement',
        'Sikh leadership values',
      ],
      link: '/programs/leadership-retreat',
      align: 'right',
    },
    {
      id: 7,
      category: 'SSA Network',
      title: 'Langar Seva',
      tagline: 'Feeding All With Humility',
      icon: UtensilsCrossed,
      description: 'Campus-wide langar events open to all students, sharing the Sikh tradition of free community meals. Langar breaks barriers and starts conversations.',
      highlights: [
        'Open to entire campus community',
        'Raises Sikh awareness',
        'Interfaith dialogue',
        'Teamwork & seva in action',
        'Feeds hundreds per event',
      ],
      link: '/programs/langar-seva',
      align: 'left',
    },
  ];

  // Group programs by category for rendering category labels
  let lastCategory = '';

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
              USM offers programs designed to support every aspect of your journey — from spiritual growth and leadership development to career advancement and community connection.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {programs.map((program) => {
            const IconComponent = program.icon;
            const isLeft = program.align === 'left';
            const showCategory = program.category !== lastCategory;
            lastCategory = program.category;

            return (
              <div key={program.id}>
                {/* Category Label */}
                {showCategory && (
                  <div className="mb-10 mt-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6B00]">
                      {program.category}
                    </h3>
                    <div className="w-12 h-1 bg-[#FF6B00] mt-2 rounded-full" />
                  </div>
                )}

                <div
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
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-2">
                      {program.title}
                    </h2>
                    <p className="text-md font-semibold text-[#D4A843] italic mb-4">
                      {program.tagline}
                    </p>
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
                    className={`${isLeft ? 'md:col-span-1' : 'md:col-span-1 md:order-1'}`}
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
                275+
              </div>
              <p className="text-gray-600">Donors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6B00] mb-2">
                $32,840+
              </div>
              <p className="text-gray-600">Raised This Year</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4A843] mb-2">
                7
              </div>
              <p className="text-gray-600">Active Programs</p>
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
              href="/find-ssa"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Find Your Chapter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>


  </div>
  );
}
