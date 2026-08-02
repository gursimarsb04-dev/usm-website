// Unified calendar: USM national + every SSA's events, one filterable feed.
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import Card from '@/components/Card';
import { PageHeader, SectionHeading } from '@/components/Section';
import { activeEvents, archivedEvents, formatPrice, registerHref } from '@/lib/events-catalog';
import { getUpcomingCalendarEvents, chapterOptions, typeOptions } from '@/lib/calendar';
import CalendarSubscribeButton from '@/components/CalendarSubscribeButton';
import EventsExplorer from './EventsExplorer';

export const revalidate = 300;
export const metadata = { title: 'Events' };

export default async function Events() {
  const events = await getUpcomingCalendarEvents();
  const chapters = chapterOptions(events);
  const types = typeOptions(events);

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <PageHeader
          title="Events"
          intro="Everything happening across the movement — national events and every chapter's, in one place."
        >
          {/* webcal:// so one tap subscribes in the OS calendar app; the .ics
              fallback link covers desktop browsers that don't register webcal. */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <CalendarSubscribeButton />
            <Link
              href="/events/submit"
              className="rounded-full border border-teal/20 px-5 py-2.5 text-sm font-semibold text-teal hover:border-gold transition-colors"
            >
              Submit an event
            </Link>
          </div>
        </PageHeader>
      </FadeUp>

      {/* Register-now events (server catalog with ticketing) stay highlighted up
          top — these are the paid USM national events with a firm date. */}
      {activeEvents.length > 0 && (
        <FadeUp className="mt-10">
          <SectionHeading className="mb-5">Open for registration</SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            {activeEvents.map((e) => (
              <Card key={e.slug} className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-widest text-gold-deep font-semibold">USM National</span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-teal">
                    {formatPrice(e.priceCents, e.currency)}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-teal-ink mt-2">{e.title}</h3>
                <p className="text-sm text-teal-soft mt-0.5">{e.date}</p>
                <p className="text-sm text-teal-ink/75 mt-2 flex-1">{e.blurb}</p>
                <Link
                  href={registerHref(e)}
                  className="mt-4 inline-block rounded-full bg-teal text-white text-center py-2.5 font-display font-semibold text-sm hover:bg-teal-ink transition-colors"
                >
                  {e.priceCents > 0 ? 'Register' : 'RSVP — free'}
                </Link>
              </Card>
            ))}
          </div>
        </FadeUp>
      )}

      {/* The unified, filterable calendar — every chapter + national. */}
      <FadeUp className="mt-14">
        <SectionHeading className="mb-5">Across the network</SectionHeading>
        <EventsExplorer events={events} chapters={chapters} types={types} />
      </FadeUp>

      {archivedEvents.length > 0 && (
        <FadeUp className="mt-16 text-center">
          <Link
            href="/events/archive"
            className="font-semibold text-teal underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep"
          >
            Browse past USM events →
          </Link>
        </FadeUp>
      )}
    </div>
  );
}
