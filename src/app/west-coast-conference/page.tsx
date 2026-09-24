import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getCatalogEvent, formatPrice, resolveTier } from '@/lib/events-catalog';
import TypeformEmbed from '@/components/TypeformEmbed';

const SLUG = 'west-coast-conference-2026';
const TYPEFORM_ID = 'mL7bujpH';

// Tier boundaries are date-based and coarse (days), not minute-precision — a
// short revalidate keeps the displayed price correct across a tier switch
// without needing force-dynamic on every request.
export const revalidate = 300;
export const metadata = { title: 'West Coast Conference' };

export default function WestCoastConferencePage() {
  const event = getCatalogEvent(SLUG);
  if (!event) return null;

  const currentTier = resolveTier(event);
  const price = formatPrice(currentTier?.priceCents ?? event.priceCents, event.currency);
  const noHotelTier = event.tiers?.find((t) => t.id === 'no_hotel');
  const noHotelPrice = noHotelTier ? formatPrice(noHotelTier.priceCents, event.currency) : null;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <p className="text-gold-deep font-display tracking-widest uppercase text-xs">
          United Sikh Movement Presents
        </p>
        <h1 className="font-display text-5xl font-bold text-teal mt-2">West Coast Conference</h1>
        <p className="mt-3 text-xl text-teal-ink/80">University of Southern California</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-teal">
            November 6–8, 2026
          </span>
          <span className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-teal">
            {currentTier ? `${currentTier.label} — ${price}` : price} / person
            {noHotelPrice && ` (${noHotelPrice} without housing)`}
          </span>
        </div>

        <div className="mt-8 space-y-4 text-teal-ink/80 leading-relaxed">
          <p>
            Join Sikh students from across the country for USM's West Coast Conference — speakers,
            workshops, and sangat from across the network, hosted at USC.
          </p>
          <p>
            Ticket price depends on when you register: Early Bird pricing is in effect now and
            increases as the event gets closer, so the earlier you lock in your spot, the less you
            pay. If you're arranging your own housing, a lower no-hotel rate is available regardless
            of when you register — just say so on the form.
          </p>
        </div>
      </FadeUp>

      <FadeUp className="mt-14">
        <h2 className="font-display text-2xl font-bold text-teal">Register &amp; reserve your spot</h2>
        <p className="mt-2 text-teal-ink/75">
          Fill out the form below to lock in your spot at today's price.
        </p>
        <div className="mt-5">
          <TypeformEmbed formId={TYPEFORM_ID} title="West Coast Conference registration" />
        </div>
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

      <div id="liability-waiver" className="mt-8 scroll-mt-24">
        <FadeUp className="rounded-3xl bg-mist p-6 text-sm text-teal-ink/80 leading-relaxed space-y-3">
          <h2 className="font-display text-lg font-bold text-teal">Acknowledgment of risk</h2>
          <p>
            I, the undersigned, acknowledge that my participation in this event organized by United
            Sikh Movement (USM) may involve physical activities that could potentially result in
            bodily harm or injury. I understand that these risks are inherent to the nature of the
            activities involved and could result from, but are not limited to, slips, falls,
            collisions, and other similar incidents.
          </p>
          <p>
            <strong className="text-teal-ink">Voluntary participation.</strong> I confirm that my
            participation in this conference is voluntary, and I fully understand the potential risks
            involved. I accept these risks and agree to assume full responsibility for any personal
            injury, including serious injury or death, that may occur as a result of my participation.
          </p>
          <p>
            <strong className="text-teal-ink">Waiver of liability.</strong> In consideration of being
            allowed to participate in this event, I hereby waive, release, and discharge USM, its
            officers, directors, employees, agents, volunteers, and any other affiliated entities from
            any and all liability, claims, demands, or causes of action that may arise from any
            injury, harm, or damage incurred during or in connection with my participation in this
            event.
          </p>
          <p>
            <strong className="text-teal-ink">Medical treatment.</strong> I authorize United Sikh
            Movement to obtain medical treatment on my behalf if necessary in case of injury or
            illness during the event. I understand that I am responsible for any medical costs
            incurred as a result of such treatment.
          </p>
          <p>
            <strong className="text-teal-ink">Indemnification.</strong> I agree to indemnify and hold
            harmless the United Sikh Movement from any loss, liability, damage, or cost, including
            attorneys' fees, that may arise from my participation in the event, whether caused by the
            negligence of USM or otherwise.
          </p>
          <p>
            I have carefully read and fully understand this waiver and release. I affirm that I am
            signing it voluntarily and without any inducement.
          </p>
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
