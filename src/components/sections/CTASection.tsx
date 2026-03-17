export function CTASection() {
  return (
    <section className="v-full py-20 bg-gradient-to-r from-[#FF6B00] to-[#E55A00]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-orange-100">
            Join thousands of Sikh students building their future
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student CTA */}
          <a
            href="/find-ssa"
            className="bg-white rounded-xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group text-center cursor-pointer"
          >
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#FF6B00] transition-colors">
              I'm a Student
            </h3>
            <p className="text-gray-600 mb-6">
              Find your local chapter, connect with mentors, and join our vibrant community.
            </p>
            <span className="inline-flex items-center text-[#FF6B00] font-semibold group-hover:text-[#E55A00] transition-colors">
              Find Your Chapter
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </a>

          {/* Supporter CTA */}
          <a
            href="/donate"
            className="bg-white rounded-xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group text-center cursor-pointer"
          >
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#FF6B00] transition-colors">
              I Want to Support
            </h3>
            <p className="text-gray-600 mb-6">
              Make a difference by supporting Sikh youth empowerment and education initiatives.
            </p>
            <span className="inline-flex items-center text-[#FF6B00] font-semibold group-hover:text-[#E55A00] transition-colors">
              Support USM
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
