export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Jasleen Kaur',
      university: 'UC Davis',
      program: 'Biology',
      graduationYear: 2025,
      quote:
        'Camp Kudrat changed everything for me. I came in feeling disconnected from my Sikhi and left with a renewed sense of purpose. The reflection sessions, the late-night conversations with sangat, and the connection to nature—it reminded me that spirituality and academics can fuel each other.',
      avatar: '🧬',
    },
    {
      name: 'Manpreet Singh',
      university: 'UT Austin',
      program: 'Computer Science',
      graduationYear: 2026,
      quote:
        'Before joining my SSA, I didn\'t know a single other Sikh student on campus. Now I have a whole community that gets it—people who understand what it\'s like to balance coding projects with keeping your Sikhi strong. USM helped me find my sangat when I needed it most.',
      avatar: '💻',
    },
    {
      name: 'Harleen Kaur',
      university: 'University of Michigan',
      program: 'Business',
      graduationYear: 2025,
      quote:
        'The Kadam Career Panel connected me with Sikh professionals in consulting and finance who looked like me and understood my journey. Having mentors who navigated corporate America while staying true to their identity gave me the confidence to pursue my goals without compromise.',
      avatar: '📊',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#F8F9FA] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from Sikh students transformed by USM
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4A843] text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-[#1a1a2e]">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.program} • {testimonial.university}
                    </p>
                    <p className="text-xs text-gray-500">Class of {testimonial.graduationYear}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
