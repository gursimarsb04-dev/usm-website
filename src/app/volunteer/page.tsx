'use client';

import { Briefcase, Camera, Calendar, Users, Code, Handshake, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function VolunteerPage() {
  const roles = [
    {
      icon: Camera,
      title: 'Content Creator',
      description: 'Social media, blogs, video',
      hours: '5-10 hrs/month',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calendar,
      title: 'Event Coordinator',
      description: 'Help plan Safal Summit, Camp Kudrat',
      hours: '10-15 hrs/month',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Briefcase,
      title: 'Mentor',
      description: 'Guide students in your career field',
      hours: '2-4 hrs/month',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      title: 'Campus Ambassador',
      description: 'Represent USM at your university',
      hours: '5-8 hrs/month',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Code,
      title: 'Tech Volunteer',
      description: 'Website, apps, automation',
      hours: '5-10 hrs/month',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Handshake,
      title: 'Fundraising Lead',
      description: 'Grant writing, donor relations',
      hours: '8-12 hrs/month',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const benefits = [
    {
      title: 'Professional Development',
      description: 'Develop new skills and grow your expertise',
    },
    {
      title: 'Networking',
      description: 'Connect with like-minded Sikh professionals',
    },
    {
      title: 'Resume Builder',
      description: 'Build meaningful experience for your career',
    },
    {
      title: 'Community Impact',
      description: 'Make a real difference for Sikh youth',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#FF6B00] opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-6">
            Join the Movement
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Whether you have 2 hours or 20, your skills can make a real difference for Sikh youth.
          </p>
        </div>
      </section>

      {/* Volunteer Roles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-12">
            Volunteer Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`h-2 bg-gradient-to-r ${role.color}`} />
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] group-hover:bg-opacity-10 transition-colors">
                      <Icon className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{role.description}</p>
                    <div className="bg-[#F8F9FA] rounded-lg p-3">
                      <p className="text-sm font-semibold text-[#FF6B00]">
                        {role.hours}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-12">
            Why Volunteer With USM?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-12">
            Get Started
          </h2>
          <VolunteerSignupForm roles={roles} />
        </div>
      </section>
    </div>
  );
}

function VolunteerSignupForm({
  roles,
}: {
  roles: Array<{ title: string }>;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    about: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'University or organization is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.about.trim()) {
      newErrors.about = 'Please tell us about yourself';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        about: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            Thank You!
          </h3>
          <p className="text-green-800">
            We've received your volunteer application. Our team will contact you within 24-48 hours to discuss opportunities.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* University/Organization Field */}
          <div className="mb-6">
            <label htmlFor="organization" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              University/Organization *
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
                errors.organization
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="University of California"
            />
            {errors.organization && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.organization}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Role Interest *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
                errors.role
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
            >
              <option value="">Select a role...</option>
              {roles.map((role, index) => (
                <option key={index} value={role.title}>
                  {role.title}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.role}
              </p>
            )}
          </div>

          {/* About Textarea */}
          <div className="mb-6">
            <label htmlFor="about" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Tell Us About Yourself *
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] resize-none ${
                errors.about
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Share your background, skills, and why you want to volunteer with USM..."
            />
            {errors.about && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.about}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF6B00] to-[#E55A00] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
          >
            Submit Application
          </button>

          <p className="mt-4 text-sm text-gray-600 text-center">
            We'll get back to you within 24-48 hours
          </p>
        </form>
      )}
    </div>
  );
}

