'use client';

import { CheckCircle2, Heart, TrendingUp, Users } from 'lucide-react';
import EmailCapture from '@/components/EmailCapture';

export default function DonatePage() {
  const donationTiers = [
    {
      amount: '$10',
      frequency: '/month',
      title: 'Supporter',
      description: 'Covers study materials for one Gurbani Study session',
      benefits: ['Gurbani Study support', 'Community updates', 'Quarterly impact reports'],
    },
    {
      amount: '$25',
      frequency: '/month',
      title: 'Champion',
      description: "Sponsors a student's Camp Kudrat retreat scholarship",
      benefits: ['Retreat scholarship', 'Impact reports', 'Donor recognition'],
      featured: true,
    },
    {
      amount: '$50',
      frequency: '/month',
      title: 'Builder',
      description: "Funds an SSA chapter's Langar Seva event",
      benefits: ['Langar Seva funding', 'Chapter support', 'Donor recognition'],
    },
    {
      amount: '$100',
      frequency: '/month',
      title: 'Visionary',
      description: "Covers a student's full Safal Summit experience",
      benefits: ['Summit sponsorship', 'Full experience coverage', 'VIP recognition'],
    },
  ];

  const fundAllocation = [
    {
      percentage: 40,
      label: 'Programs & Events (Camp Kudrat, Safal Summit, Langar Seva)',
      icon: Users,
    },
    {
      percentage: 25,
      label: 'SSA Chapter Support & Resources',
      icon: TrendingUp,
    },
    {
      percentage: 20,
      label: 'Sikhi Development (Gurbani Study, Retreats)',
      icon: Heart,
    },
    {
      percentage: 15,
      label: 'Operations & Growth',
      icon: CheckCircle2,
    },
  ];

  const impactMetrics = [
    {
      number: '$32,840+',
      description: 'raised this year',
    },
    {
      number: '275',
      description: 'donors supporting USM',
    },
    {
      number: '39',
      description: 'SSA chapters funded',
    },
    {
      number: '7',
      description: 'active programs running',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#FF6B00] opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-6">
            Fuel the Movement
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Your support funds Camp Kudrat retreats, Safal Summit, Langar Seva, and the programs that help Sikh students thrive.
          </p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-12">
            Choose Your Impact Level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg p-8 transition-all duration-300 ${
                  tier.featured
                    ? 'bg-[#FF6B00] text-white shadow-lg scale-105'
                    : 'bg-white text-[#1a1a2e] border border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${tier.featured ? 'text-white' : 'text-[#FF6B00]'}`}>
                    {tier.amount}
                  </span>
                  <span className={`text-lg ${tier.featured ? 'text-gray-100' : 'text-gray-600'}`}>
                    {tier.frequency}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3">{tier.title}</h3>
                <p className={`mb-6 ${tier.featured ? 'text-gray-100' : 'text-gray-600'}`}>
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://dvnetwork.org/organizations/united-sikh-movement"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    tier.featured
                      ? 'bg-white text-[#FF6B00] hover:bg-gray-100'
                      : 'bg-[#FF6B00] text-white hover:bg-[#E55A00]'
                  }`}
                >
                  Donate Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Your Money Goes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-12">
            Where Your Money Goes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fundAllocation.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#FF6B00]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bold text-[#FF6B00]">{item.percentage}%</span>
                      <span className="text-lg font-semibold text-[#1a1a2e]">{item.label}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#FF6B00] to-[#D4A843] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-4">
            Last Year, Your Donations Helped:
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Together, we're building a stronger, more connected Sikh youth community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-bold text-[#FF6B00] mb-3">
                  {metric.number}
                </div>
                <p className="text-gray-700 font-medium">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <EmailCapture
            variant="inline"
            headline="Stay in the Loop"
            subtitle="Get notified about upcoming fundraising campaigns and impact updates."
          />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 font-medium mb-2">
            USM is a registered 501(c)(3) nonprofit organization.
          </p>
          <p className="text-gray-600 mb-2">
            All donations are tax-deductible. Donations processed securely through Dasvandh Network.
          </p>
          <p className="text-gray-600">
            EIN: Available upon request
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e] to-[#FF6B00]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Prefer to give once?
          </h3>
          <p className="text-gray-100 mb-6">
            Make a one-time donation through{' '}
            <a href="https://dvnetwork.org/organizations/united-sikh-movement" className="font-semibold hover:underline">
              Dasvandh Network
            </a>
            {' '}or reach out at{' '}
            <a href="mailto:info@unitedsikhmovement.org" className="font-semibold hover:underline">
              info@unitedsikhmovement.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
