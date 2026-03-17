import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { eventBySlugQuery, eventSlugsQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/utils";
import { eventJsonLd } from "@/lib/jsonld";
import type { Event } from "@/types";

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(eventSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await client.fetch<Event | null>(eventBySlugQuery, { slug: params.slug });
  if (!event) return {};
  return {
    title: event.title,
    description: `${event.title} — ${formatDate(event.date)} at ${event.location}. Hosted by United Sikh Movement.`,
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await client.fetch<Event | null>(eventBySlugQuery, { slug: params.slug });
  if (!event) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(event)) }}
      />
      <section data-section="event-detail">
        <span data-event-type>{event.eventType}</span>
        <h1>{event.title}</h1>
        <time>{formatDate(event.date)}</time>
        <span>{event.location}</span>
        {event.hostedBy && (
          <a href={`/ssa/${event.hostedBy.slug?.current}`}>
            Hosted by {event.hostedBy.name}
          </a>
        )}

        {event.description && (
          <div data-rich-text>
            {/* PortableText component — styled by Antigravity */}
          </div>
        )}

        {event.eventbriteUrl && (
          <a href={event.eventbriteUrl} target="_blank" rel="noopener noreferrer" data-cta="register">
            Register on Eventbrite
          </a>
        )}
      </section>
    </>
  );
}
