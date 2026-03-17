export function ProgramsSection() {
  const programs = [
    {
      icon: '🏕️',
      title: 'Camp Kudrat',
      tagline: 'Reflect. Connect. Renew',
      category: 'Sikhi Development',
      description:
        'An immersive retreat for spiritual growth, self-discovery, and building lifelong bonds with fellow Sikh students.',
      link: '/programs',
    },
    {
      icon: '📖',
      title: 'Gurbani Study',
      tagline: 'Mother Tongue Made Easy',
      category: 'Sikhi Development',
      description:
        'Weekly sessions making Gurmukhi and Gurbani accessible, helping students connect with Sikh scripture in a supportive environment.',
      link: '/programs',
    },
    {
      icon: '🎓',
      title: 'Safal Summit',
      tagline: 'Excel. Connect. Lead.',
      category: 'Professional Development',
      description:
        'Our flagship conference bringing Sikh students together for career workshops, keynote speakers, and networking with industry professionals.',
      link: '/programs',
    },
    {
      icon: '💼',
      title: 'Kadam Career Panel',
      tagline: 'Your Next Step Starts Here',
      category: 'Professional Development',
      description:
        'Intimate career panels connecting students directly with Sikh professionals across tech, medicine, law, business, and more.',
      link: '/programs',
    },
    {
      icon: '🤝',
      title: 'National Conference',
      tagline: 'Network, Learn, Lead',
      category: 'SSA Network',
      description:
        'Annual gathering of SSA leaders from every chapter to share strategies, build relationships, and shape the future of Sikh student life.',
      link: '/programs',
    },
    {
      icon: '🍽️',
      title: 'Langar Seva',
      tagline: 'Feeding All With Humility',
      category: 'SSA Network',
      description:
        'Campus-wide langar events open to all students, sharing the Sikh tradition of community meals and breaking barriers through food.',
      link: '/programs',
    },
  ];

  return (
    <section className="v-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            Our Initiatives
          </h2>
          <p className="text-lg text-gray-600">
            Grounded in Simran, Seva, Sangat, and Academics
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{program.icon}</div>

              {/* Category Badge */}
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF6B00] mb-2">
                {program.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-1 group-hover:text-[#FF6B00] transition-colors">
                {program.title}
              </h3>

              {/* Tagline */}
              <p className="text-sm text-gray-500 italic mb-3">
                {program.tagline}
              </p>

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
