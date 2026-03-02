'use client';

import { Mail, Clock, Globe, Instagram, Linkedin, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@unitedsikhmovement.org',
      href: 'mailto:info@unitedsikhmovement.org',
    },
  ];

  const socialLinks = [
    {
      icon: Globe,
      name: 'Website',
      href: '#',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: '#',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: '#',
    },
  ];

  const faqItems = [
    {
      question: 'What is USM?',
      answer:
        'United Sikh Movement (USM) is a nonprofit organization dedicated to empowering Sikh youth across 39 university chapters. We provide mentorship, leadership training, and community programs to strengthen the next generation of Sikh leaders.',
    },
    {
      question: 'How do I start an SSA chapter?',
      answer:
        'To start an SSA (Sikh Student Association) chapter at your university, contact our team at info@unitedsikhmovement.org with your university name and your interest in leading the chapter. We provide resources, training, and ongoing support to help you establish a thriving community.',
    },
    {
      question: 'Is my donation tax-deductible?',
      answer:
        'Yes! USM is a registered 501(c)(3) nonprofit organization, which means all donations are tax-deductible. You will receive a tax receipt for your contribution.',
    },
    {
      question: 'How can I become a mentor?',
      answer:
        'We invite professionals and experienced community members to become mentors. You can apply through our volunteer page to join our mentorship program. We match mentors with students based on career interests and experience.',
    },
    {
      question: 'Where is Safal Summit held?',
      answer:
        'Safal Summit rotates annually across different regions to reach our chapters nationwide. Check our events page for the specific location and dates for this year. All registered Sikh youth are welcome to attend!',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r hail from-[#1a1a2e] to-[#FF6B00] opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-6">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form  */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
                Send us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info Cards */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="block bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#FF6B00]" />
                      </div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">
                        {info.label}
                      </p>
                      <p className="text-[#1a1a2e] font-semibold hover:text-[#FF6B00] transition-colors">
                        {info.value}
                      </p>
                    </a>
                  );
                })}

                {/* Social Links */}
                <div className="bg-white rounded-lg p-6">
                  <p className="text-sm font-semibold text-gray-600 mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.href}
                          aria-label={link.name}
                          className="w-10 h-10 rounded-lg bg-[#FF6B00] bg-opacity-10 flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-all"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-white rounded-lg p-6 border-l-4 border-[#FF6B00]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Response Time
                      </p>
                      <p className="text-[#1a1a2e] font-semibold">
                        24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
