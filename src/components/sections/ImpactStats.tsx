import { AnimatedCounter } from '@/components/AnimatedCounter';

export function ImpactStats() {
  const stats = [
    {
      number: 39,
      label: 'Student Chapters',
    },
    {
      number: 500,
      label: 'Mentors & Leaders',
      suffix: '+',
    },
    {
      number: 5000,
      label: 'Students Reached',
      suffix: '+',
    },
    {
      number: 15,
      label: 'Years of Excellence',
      suffix: '+',
    },
  ];

  return (
    <section className="w-full py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-lg text-gray-600">
            Building a stronger Sikh youth community across North America
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="mb-4">
                <span className="text-5xl sm:text-6xl font-bold text-[#FF6B00]">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </span>
              </div>
              <p className="text-lg font-semibold text-[#1a1a2e]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
