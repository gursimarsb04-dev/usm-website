import { Metadata } from "next";
import { client } from "@/sanity/client";
import { upcomingEventsQuery, pastEventsQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming Sikh student events — conferences, retreats, workshops, and socials hosted by USM and SSAs nationwide.",
};

export const revalidate = 600;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { view?: string; type?: string };
}) {
  const view = searchParams.view || "upcoming";
  const events = await client.fetch<Event[]>(
    view === "past" ? pastEventsQuery : upcomingEventsQuery
  );

  const filteredEvents = searchParams.type
    ? events.filter((e) => e.eventType === searchParams.type)
    : events;

  return (
    <>
      <section data-section="events-header">
        <h1>Events</h1>
        <p>Find conferences, retreats, workshops, and socials near you.</p>
      </section>

      <nav data-section="events-filters">
        <a href="/events?view=upcoming" data-active={view === "upcoming"}>Upcoming</a>
        <a href="/events?view=past" data-active={view === "past"}>Past</a>
        <a href={`/events?view=${view}`}>All</a>
        <a href={`/events?view=${view}&type=conference`}>Conferences</a>
        <a href={`/events?view=${view}&type=retreat`}>Retreats</a>
        <a href={`/events?view=${view}&type=workshop`}>Workshops</a>
        <a href={`/events?view=${view}&type=social`}>Socials</a>
      </nav>

      <section data-section="events-grid">
        {filteredEvents.length === 0 ? (
          <div data-empty-state>
            <p>No {view} events right now. Join our mailing list to be the first to know.</p>
            {/* EmailSignup component — Antigravity will build */}
          </div>
        ) : (
          filteredEvents.map((event) => (
            <a key={event._id} href={`/events/${event.slug.current}`} data-event-card>
              <span data-event-type>{event.eventType}</span>
              <time>{formatDate(event.date)}</time>
              <h3>{event.title}</h3>
              <span>{event.location}</span>
              {event.hostedBy && <span>Hosted by {event.hostedBy.name}</span>}
            </a>
          ))
        )}
      </section>
    </>
  );
}
