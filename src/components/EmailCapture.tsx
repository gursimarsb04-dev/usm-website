'use client';

import { FormEvent, useState } from 'react';

interface EmailCaptureProps {
  heading?: string;
  subheading?: string;
  headline?: string;
  subtitle?: string;
  variant: 'inline' | 'banner' | 'card';
  buttonText?: string;
}

export default function EmailCapture({
  heading,
  subheading,
  headline,
  subtitle,
  variant,
  buttonText = 'Subscribe',
}: EmailCaptureProps) {
  const resolvedHeadline = heading || headline || 'Stay in the Loop';
  const resolvedSubtitle = subheading || subtitle || 'Get updates on events and community news.';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setMessage('You\'re subscribed! Check your email for confirmation.');
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const form = (
    <form
      onSubmit={handleSubmit}
      className={
        variant === 'inline'
          ? 'flex flex-col sm:flex-row gap-3'
          : 'flex flex-col sm:flex-row gap-3 max-w-xl mx-auto'
      }
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        className="flex-1 px-5 py-3 rounded-lg bg-white text-[#1a1a2e] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:opacity-50"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-[#FF6B00] hover:bg-[#E55A00] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? 'Submitting...' : buttonText}
      </button>
    </form>
  );

  const statusMessage = message && (
    <div
      className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
        status === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
      role="alert"
    >
      {message}
    </div>
  );

  const privacy = (
    <p
      className={`text-sm mt-4 ${
        variant === 'banner' ? 'text-gray-400' : 'text-gray-500'
      } ${variant === 'inline' ? '' : 'text-center'}`}
    >
      We respect your privacy. Unsubscribe anytime.
    </p>
  );

  if (variant === 'banner') {
    return (
      <section className="w-full py-16 bg-[#1a1a2e]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {resolvedHeadline}
          </h2>
          <p className="text-lg text-gray-300 mb-8">{resolvedSubtitle}</p>
          {form}
          {statusMessage}
          {privacy}
        </div>
      </section>
    );
  }

  if (variant === 'card') {
    return (
      <div className="max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            {resolvedHeadline}
          </h3>
          <p className="text-gray-600">{resolvedSubtitle}</p>
        </div>
        {form}
        {statusMessage}
        {privacy}
      </div>
    );
  }

  // inline variant
  return (
    <div className="bg-[#F8F9FA] rounded-lg p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] mb-1">
            {resolvedHeadline}
          </h3>
          <p className="text-gray-600 text-sm">{resolvedSubtitle}</p>
        </div>
        {form}
        {statusMessage}
        {privacy}
      </div>
    </div>
  );
}
