import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getCatalogEvent, formatPrice } from '@/lib/events-catalog';
import RegistrationForm from '../events/[slug]/register/RegistrationForm';

const SLUG = 'east-coast-retreat-2026';
const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdn_rPuv8aRjspyfa3FSOwoFy9srRlxms22zPTM6GGcs2RvoQ/viewform';

export const metadata = { title: 'East Coast SSA Retreat' };

export default function RetreatPage({
  searchParams,
}: {
  searchParams: { canceled?: string };
}) {
  const event = getCatalogEvent(SLUG);
  if (!event) return null;
  const price = formatPrice(event.priceCents, event.currency);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <p className="text-gold-deep font-display tracking-widest uppercase text-xs">
          SSA Collective Presents
        </p>
        <h1 className="font-display text-5xl font-bold text-teal mt-2">
          East Coast SSA Retreat
        </h1>
        <p className="mt-3 text-xl text-teal-ink/80">Poconos Mountains</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-teal">
            August 21–23, 2026
          </span>
          <span className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-teal">
            Register by August 10, 2026
          </span>
          <span className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-teal">
            {price} per person
          </span>
        </div>

        {searchParams.canceled && (
          <p className="mt-5 rounded-xl bg-gold/20 text-teal-ink px-4 py-3 text-sm">
            Checkout canceled — you haven't been charged. You can try again below.
          </p>
        )}
      </FadeUp>

      <FadeUp className="mt-14">
        <h2 className="font-display text-2xl font-bold text-teal">Step 1 — Register</h2>
        <p className="mt-2 text-teal-ink/75">Fill out the form below to apply for a spot.</p>
        <div className="mt-5 overflow-hidden rounded-3xl border border-teal/10 bg-white">
          <iframe
            src={`${GOOGLE_FORM_URL}?embedded=true`}
            title="East Coast SSA Retreat registration form"
            width="100%"
            height="900"
            className="block"
          >
            Loading…
          </iframe>
        </div>
        <p className="mt-2 text-xs text-teal-soft">
          Form not loading?{' '}
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer" className="underline hover:text-teal">
            Open it in a new tab
          </a>
          .
        </p>
      </FadeUp>

      <FadeUp className="mt-14">
        <h2 className="font-display text-2xl font-bold text-teal">Step 2 — Reserve your spot</h2>
        <p className="mt-2 text-teal-ink/75">
          After submitting the form above, secure your place with the {price} registration fee.
        </p>
        <div className="mt-5">
          <RegistrationForm slug={event.slug} priceCents={event.priceCents} priceLabel={price} />
        </div>
        <p className="mt-4 text-xs text-teal-soft text-center">
          Payments are processed securely by Stripe. USM is a registered 501(c)(3).
        </p>
      </FadeUp>

      <FadeUp className="mt-14 text-center">
        <Link href="/events" className="text-sm text-teal-soft hover:text-teal">
          ← All events
        </Link>
      </FadeUp>
    </div>
  );
}
