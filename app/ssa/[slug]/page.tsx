import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { ssaBySlugQuery, ssaSlugsQuery, eventsBySSAQuery } from "@/sanity/queries";
import { getSSAJoinUrl } from "@/lib/utils";
import type { SSA, Event } from "@/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(ssaSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ssa = await client.fetch<SSA | null>(ssaBySlugQuery, { slug: params.slug });
  if (!ssa) return {};
  return {
    title: `${ssa.name} — ${ssa.university}`,
    description: ssa.description || `Learn about ${ssa.name} at ${ssa.university}.`,
  };
}

export default async function SSADetailPage({ params }: { params: { slug: string } }) {
  const ssa = await client.fetch<SSA | null>(ssaBySlugQuery, { slug: params.slug });
  if (!ssa) notFound();

  const upcomingEvents = await client.fetch<Event[]>(eventsBySSAQuery, { ssaId: ssa._id });
  const joinUrl = getSSAJoinUrl(ssa);

  return (
    <>
      <section data-section="ssa-detail">
        <h1>{ssa.name}</h1>
        <p>{ssa.university} — {ssa.city}, {ssa.state}</p>
        {ssa.description && <p>{ssa.description}</p>}
        {ssa.memberCount && <span>{ssa.memberCount} members</span>}
        {ssa.foundedYear && <span>Founded {ssa.foundedYear}</span>}

        <div data-contact>
          {ssa.contactEmail && <a href={`mailto:${ssa.contactEmail}`}>Email</a>}
          {ssa.instagramUrl && <a href={ssa.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {ssa.websiteUrl && <a href={ssa.websiteUrl} target="_blank" rel="noopener noreferrer">Website</a>}
        </div>

        <a href={joinUrl} target="_blank" rel="noopener noreferrer" data-cta="join">
          Join This SSA
        </a>
      </section>

      {upcomingEvents.length > 0 && (
        <section data-section="ssa-events">
          <h2>Upcoming Events</h2>
          {upcomingEvents.map((event) => (
            <a key={event._id} href={`/events/${event.slug.current}`} data-event-card>
              <span>{event.date}</span>
              <span>{event.title}</span>
              <span>{event.location}</span>
            </a>
          ))}
        </section>
      )}
    </>
  );
}
