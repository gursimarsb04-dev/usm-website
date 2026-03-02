export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      university: 'UCLA',
      program: 'Computer Science',
      graduationYear: 2024,
      quote:
        'USM gave me the confidence to pursue a tech career while staying connected to my roots. The mentorship from professionals in the tech industry helped me land an internship at Google, and the community support made me feel like I truly belonged.',
      avatar: '👩‍💻',
    },
    {
      name: 'Arjun Patel',
      university: 'University of Michigan',
      program: 'Pre-Med',
      graduationYear: 2025,
      quote:
        'Balancing pre-med coursework and my faith was challenging until I joined USM. The Camp Kudrat retreat was transformative—it reminded me why I want to become a doctor and gave me a support system of students on the same journey.',
      avatar: '👨‍⚕️',
    },
    {
      name: 'Simran Kaur',
      university: 'University of Texas at Austin',
      program: 'Business Administration',
      graduationYear: 2024,
      quote:
        'As someone passionate about entrepreneurship, USM\'s professional development program was a game-changer. The 500+ mentor network connected me with successful Sikh entrepreneurs who guided me in launching my own business venture.',
      avatar: '👩‍💼',
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
