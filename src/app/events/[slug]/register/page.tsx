import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getCatalogEvent, formatPrice } from '@/lib/events-catalog';
import RegistrationForm from './RegistrationForm';

export const metadata = { title: 'Register' };

export default function RegisterPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { canceled?: string };
}) {
  const event = getCatalogEvent(params.slug);
  if (!event) notFound();

  const price = formatPrice(event.priceCents, event.currency);

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <FadeUp>
        <Link href="/events" className="text-sm text-teal-soft hover:text-teal">← All events</Link>
        <p className="mt-4 text-gold-deep font-display tracking-widest uppercase text-xs">Register</p>
        <h1 className="font-display text-4xl font-bold text-teal mt-2">{event.title}</h1>
        <p className="mt-2 text-teal-soft">{event.date}</p>
        <p className="mt-4 text-teal-ink/80 leading-relaxed">{event.blurb}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2">
          <span className="text-xs uppercase tracking-widest text-teal-soft">Ticket</span>
          <span className="font-display font-semibold text-teal">{price}</span>
        </div>

        {searchParams.canceled && (
          <p className="mt-5 rounded-xl bg-gold/20 text-teal-ink px-4 py-3 text-sm">
            Checkout canceled — you haven't been charged. You can try again below.
          </p>
        )}
      </FadeUp>

      <FadeUp className="mt-8">
        <RegistrationForm
          slug={event.slug}
          priceCents={event.priceCents}
          priceLabel={price}
        />
      </FadeUp>

      <p className="mt-6 text-xs text-teal-soft text-center">
        {event.priceCents > 0
          ? 'Payments are processed securely by Stripe. USM is a registered 501(c)(3).'
          : 'This event is free — registering just holds your spot.'}
      </p>
    </div>
  );
}
