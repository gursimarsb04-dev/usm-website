import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getCatalogEvent, formatPrice } from '@/lib/events-catalog';
import RetreatRegistrationForm from './RetreatRegistrationForm';

const SLUG = 'east-coast-retreat-2026';

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
          East Coast SSA Leadership Retreat
        </h1>
        <p className="mt-3 text-xl text-teal-ink/80">Valhalla River Haven, Pocono Mountains</p>

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

        <div className="mt-8 space-y-4 text-teal-ink/80 leading-relaxed">
          <p>
            Join SSA board members from across the region for a leadership getaway focused on
            connecting with the sangat, building relationships between Sikh Student Associations,
            and learning from one another.
          </p>
          <p>
            This retreat is your chance to grow both as a leader and as a member of your SSA
            chapter. Expect to dive into hands-on workshops focused on improving Sikh Student Life
            on campus, mastering organization management, addressing financial and leadership
            challenges, and exploring resources for your SSA to thrive.
          </p>
          <p>
            Come connect, learn, and recharge with us in the beautiful Pocono Mountains at Valhalla
            River Haven.
          </p>
        </div>

        <p className="mt-5 rounded-xl bg-gold/20 text-teal-ink px-4 py-3 text-sm font-medium">
          Space is limited to only 30 SSA board members, so register and pay as soon as possible
          to secure your spot!
        </p>

        {searchParams.canceled && (
          <p className="mt-5 rounded-xl bg-gold/20 text-teal-ink px-4 py-3 text-sm">
            Checkout canceled — you haven't been charged. You can try again below.
          </p>
        )}
      </FadeUp>

      <FadeUp className="mt-14">
        <h2 className="font-display text-2xl font-bold text-teal">Register &amp; reserve your spot</h2>
        <p className="mt-2 text-teal-ink/75">
          Fill out the form below — submitting takes you straight to payment ({price}) to lock in
          your spot.
        </p>
        <div className="mt-5">
          <RetreatRegistrationForm slug={event.slug} priceLabel={price} />
        </div>
        <p className="mt-4 text-xs text-teal-soft text-center">
          Payments are processed securely by Stripe. USM is a registered 501(c)(3).
        </p>
      </FadeUp>

      <div id="media-consent" className="mt-16 scroll-mt-24">
      <FadeUp className="rounded-3xl bg-mist p-6 text-sm text-teal-ink/80 leading-relaxed space-y-3">
        <h2 className="font-display text-lg font-bold text-teal">Media consent &amp; liability waiver</h2>
        <p>
          When you enter a United Sikh Movement event or program, you enter an area where
          photography, audio, and video recording may occur.
        </p>
        <p>
          By entering the event premises, you consent to interview(s), photography, audio
          recording, video recording and its/their release, publication, exhibition, or
          reproduction to be used for news, web casts, promotional purposes, telecasts,
          advertising, inclusion on websites, social media, or any other purpose by USM and its
          affiliates and representatives. Images, photos and/or videos may be used to promote
          similar USM events in the future, highlight the event and exhibit the capabilities of
          USM. You release USM, its officers and employees, and each and all persons involved from
          any liability connected with the taking, recording, digitizing, or publication and use
          of interviews, photographs, computer images, video and/or sound recordings.
        </p>
        <p>
          By entering the event premises, you waive all rights you may have to any claims for
          payment or royalties in connection with any use, exhibition, streaming, web casting,
          televising, or other publication of these materials, regardless of the purpose or
          sponsoring of such use, exhibiting, broadcasting, web casting, or other publication
          irrespective of whether a fee for admission or sponsorship is charged. You also waive any
          right to inspect or approve any photo, video, or audio recording taken by USM or the
          person or entity designated to do so by USM.
        </p>
        <p>You have been fully informed of your consent, waiver of liability, and release before entering the event.</p>
      </FadeUp>
      </div>

      <FadeUp className="mt-10 text-center">
        <Link href="/events" className="text-sm text-teal-soft hover:text-teal">
          ← All events
        </Link>
      </FadeUp>
    </div>
  );
}
