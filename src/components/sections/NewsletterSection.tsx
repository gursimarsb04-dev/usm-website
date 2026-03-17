'use client';

import { FormEvent, useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus('success');
      setMessage('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="w-full py-20 bg-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-gray-400 mb-2">
            Get updates on events, new SSA chapters, and ways to get involved.
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            className="flex-1 px-6 py-4 rounded-lg bg-white text-[#1a1a2e] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-0 disabled:opacity-50"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-[#FF6B00] hover:bg-[#E55A00] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Status Messages */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-medium ${
              status === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Privacy Notice */}
        <p className="text-center text-gray-500 text-sm mt-8">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
