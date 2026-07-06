import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getCatalogEvent } from '@/lib/events-catalog';

export const metadata = { title: 'Registration confirmed' };

export default function RegistrationSuccess({
  searchParams,
}: {
  searchParams: { event?: string };
}) {
  const event = searchParams.event ? getCatalogEvent(searchParams.event) : undefined;

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <FadeUp>
        <div className="text-5xl">🎉</div>
        <h1 className="font-display text-4xl font-bold text-teal mt-4">You're registered!</h1>
        <p className="mt-4 text-teal-ink/80 leading-relaxed">
          {event ? (
            <>Your spot for <strong className="text-teal">{event.title}</strong> is confirmed. A receipt and details are on the way to your email.</>
          ) : (
            <>Your registration is confirmed. A receipt and details are on the way to your email.</>
          )}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/events" className="rounded-full bg-teal text-white px-6 py-3 font-display font-semibold hover:bg-teal-ink transition-colors">
            See more events
          </Link>
        </div>
      </FadeUp>
    </div>
  );
}
