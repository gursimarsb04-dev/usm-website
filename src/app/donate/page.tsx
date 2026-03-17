import { CheckCircle2, Heart, TrendingUp, Users } from 'lucide-react';

export default function DonatePage() {
  const donationTiers = [
    {
      amount: '$10',
      frequency: '/month',
      title: 'Supporter',
      description: 'Provides one student with access to career resources and mentorship materials',
      benefits: ['Career resource access', 'Mentorship materials', 'Community updates'],
    },
    {
      amount: '$25',
      frequency: '/month',
      title: 'Champion',
      description: "Sponsors a student's attendance at a regional workshop or networking event",
      benefits: ['Workshop attendance', 'Networking events', 'Impact reports'],
      featured: true,
    },
    {
      amount: '$50',
      frequency: '/month',
      title: 'Leader',
      description: 'Funds leadership training for an entire SSA chapter for one semester',
      benefits: ['Full chapter support', 'Leadership training', 'Donor recognition'],
    },
    {
      amount: '$100',
      frequency: '/month',
      title: 'Visionary',
      description: "Covers a student's full Safal Summit experience including travel assistance",
      benefits: ['Summit sponsorship', 'Travel assistance', 'VIP recognition'],
    },
  ];

  const fundAllocation = [
    {
      percentage: 40,
      label: 'Mentorship & Career Programs',
      icon: Users,
    },
    {
      percentage: 25,
      label: 'Events & Conferences',
      icon: TrendingUp,
    },
    {
      percentage: 20,
      label: 'Chapter Support & Resources',
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
      number: '4,200',
      description: 'students attended Safal Summit',
    },
    {
      number: '39',
      description: 'SSA chapters received support',
    },
    {
      number: '500+',
      description: 'mentorship connections made',
    },
    {
      number: '12',
      description: 'Camp Kudrat retreats hosted',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#FF6B00] opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-6">
            Invest in the Next Generation of Sikh Leaders
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Your donation directly supports mentorship, education, and community programs for Sikh youth across 39 university chapters.
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
                  href="https://unitedsikhmovement.org"
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

      {/* Trust Signals */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 font-medium mb-2">
            USM is a registered 501(c)(3) nonprofit organization.
          </p>
          <p className="text-gray-600 mb-2">
            All donations are tax-deductible.
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
            Contact us at {' '}
            <a href="mailto:donate@unitedsikhmovement.org" className="font-semibold hover:underline">
              donate@unitedsikhmovement.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
