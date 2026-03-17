import { client } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";

export const revalidate = 1800;

export default async function HomePage() {
  const data = await client.fetch(homePageQuery);
  const { settings, featuredEvents, testimonials, ssaCount, eventCount, stateCount } = data;

  return (
    <>
      <section data-section="hero">
        <h1>{settings?.heroHeadline || "Empowering Sikh Students to Lead, Connect, and Grow"}</h1>
        <p>{settings?.heroSubtext}</p>
      </section>

      <section data-section="trusted-by">
        {settings?.trustedByLogos?.map((logo: any, i: number) => (
          <div key={i}>{/* Logo image */}</div>
        ))}
      </section>

      <section data-section="pillars">
        {/* Static content: Academic Excellence, Professional Mentorship, Spiritual Grounding */}
      </section>

      <section data-section="impact-stats">
        <div data-stat="ssas">{ssaCount}</div>
        <div data-stat="events">{eventCount}</div>
        <div data-stat="states">{stateCount}</div>
      </section>

      <section data-section="testimonials">
        {testimonials?.map((t: any) => (
          <div key={t._id} data-testimonial>
            <blockquote>{t.quote}</blockquote>
            <cite>{t.authorName}</cite>
            <span>{t.authorRole}</span>
            <span>{t.ssa?.name}</span>
          </div>
        ))}
      </section>

      <section data-section="featured-events">
        {featuredEvents?.map((e: any) => (
          <div key={e._id} data-event>
            <span>{e.date}</span>
            <h3>{e.title}</h3>
            <span>{e.location}</span>
            <a href={e.eventbriteUrl || `/events/${e.slug.current}`}>Register</a>
          </div>
        ))}
      </section>

      <section data-section="join-the-movement">
        {/* EmailSignup component + Donate link */}
      </section>
    </>
  );
}
