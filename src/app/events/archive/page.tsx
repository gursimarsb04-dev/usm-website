// Past USM national events, and ones whose next date isn't announced yet.
// These stay in the catalog (so old /events/<slug>/register links still
// resolve rather than 404) but are kept off the main Events page so that page
// only ever shows things people can actually act on.
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import { PageHeader } from '@/components/Section';
import { archivedEvents } from '@/lib/events-catalog';

export const metadata = {
  title: 'Event Archive',
  description:
    'Past United Sikh Movement national events — hackathons, retreats, and conferences from across the movement.',
};

export default function EventArchive() {
  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <Link href="/events" className="text-sm text-teal-soft hover:text-teal">
          ← All events
        </Link>
        <PageHeader
          className="mt-4"
          title="Event archive"
          intro="Events that have already happened, plus ones whose next date we haven't announced yet. Registration is closed — but this is what the movement has been building."
        />
      </FadeUp>

      {archivedEvents.length > 0 ? (
        <FadeUp className="mt-10">
          <div className="grid gap-5 md:grid-cols-2">
            {archivedEvents.map((e) => (
              <Card key={e.slug} tone="muted" className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-widest text-gold-deep font-semibold">
                    USM National
                  </span>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-teal-soft">
                    Registration closed
                  </span>
                </div>
                <h2 className="font-display font-semibold text-lg text-teal-ink mt-2">{e.title}</h2>
                <p className="text-sm text-teal-soft mt-0.5">
                  {e.date}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
                <p className="text-sm text-teal-ink/75 mt-2 flex-1">{e.blurb}</p>
              </Card>
            ))}
          </div>
        </FadeUp>
      ) : (
        <EmptyState
          className="mt-10"
          title="Nothing archived yet"
          body="Past USM national events will be collected here once they wrap."
          actionLabel="See upcoming events →"
          actionHref="/events"
        />
      )}

      <FadeUp className="mt-16 rounded-3xl bg-teal text-white p-10 text-center">
        <h2 className="font-display text-2xl font-bold">Don't miss the next one.</h2>
        <p className="mt-2 text-white/75">
          Subscribe to the USM calendar and new events land in your phone automatically.
        </p>
        <Link
          href="/events"
          className="inline-block mt-6 rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors"
        >
          See what's coming up
        </Link>
      </FadeUp>
    </div>
  );
}
