export function ProgramsSection() {
  const programs = [
    {
      icon: '🎓',
      title: 'Safal Summit',
      description:
        'Our flagship annual conference bringing together 4,000+ Sikh students for networking, workshops, and inspirational talks from industry leaders.',
      link: '/programs',
    },
    {
      icon: '🤝',
      title: 'SSA Coordination',
      description:
        'Support and resources for all 39 chapters including event planning guides, leadership training, and community building initiatives.',
      link: '/programs',
    },
    {
      icon: '🏕️',
      title: 'Camp Kudrat',
      description:
        'An immersive retreat designed for spiritual growth, self-discovery, and building lifelong connections with fellow Sikh students.',
      link: '/programs',
    },
    {
      icon: '💼',
      title: 'Professional Development',
      description:
        'Mentorship from 500+ professionals, career coaching, internship opportunities, and networking events to launch your career.',
      link: '/programs',
    },
  ];

  return (
    <section className="v-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600">
            Empowering Sikh youth through mentorship, career development, and spiritual growth
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{program.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#FF6B00] transition-colors">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {program.description}
              </p>

              {/* Learn More Link */}
              <a
                href={program.link}
                className="inline-flex items-center text-[#FF6B00] font-semibold hover:text-[#E55A00] transition-colors group/link"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
