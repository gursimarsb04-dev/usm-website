import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroHeadline, heroSubtext, heroImage, donationGoal, trustedByLogos
  }
`;

export const allSSAsQuery = groq`
  *[_type == "ssa"] | order(name asc) {
    _id, name, slug, university, state, city, region,
    logo, description, contactEmail, instagramUrl,
    websiteUrl, memberCount, foundedYear
  }
`;

export const ssaBySlugQuery = groq`
  *[_type == "ssa" && slug.current == $slug][0] {
    _id, name, slug, university, state, city, region,
    logo, description, contactEmail, instagramUrl,
    websiteUrl, memberCount, foundedYear
  }
`;

export const ssaSlugsQuery = groq`
  *[_type == "ssa" && defined(slug.current)][].slug.current
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id, title, slug, date, location, coverImage,
    eventbriteUrl, eventType, isFeatured,
    "hostedBy": hostedBy->{ name, slug }
  }
`;

export const pastEventsQuery = groq`
  *[_type == "event" && date < now()] | order(date desc) {
    _id, title, slug, date, location, coverImage,
    eventbriteUrl, eventType,
    "hostedBy": hostedBy->{ name, slug }
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && isFeatured == true && date >= now()] | order(date asc) [0...3] {
    _id, title, slug, date, location, coverImage,
    eventbriteUrl, eventType,
    "hostedBy": hostedBy->{ name, slug }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id, title, slug, date, location, description,
    coverImage, eventbriteUrl, eventType, isFeatured,
    "hostedBy": hostedBy->{ _id, name, slug }
  }
`;

export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][].slug.current
`;

export const eventsBySSAQuery = groq`
  *[_type == "event" && hostedBy._ref == $ssaId && date >= now()] | order(date asc) [0...5] {
    _id, title, slug, date, location, eventType, eventbriteUrl
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, group, photo, bio, linkedinUrl, order
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id, quote, authorName, authorRole, authorPhoto,
    "ssa": ssa->{ name }
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(category asc) {
    _id, question, answer, category
  }
`;

export const homePageQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    heroHeadline, heroSubtext, heroImage, donationGoal, trustedByLogos
  },
  "featuredEvents": *[_type == "event" && isFeatured == true && date >= now()] | order(date asc) [0...3] {
    _id, title, slug, date, location, coverImage, eventbriteUrl, eventType,
    "hostedBy": hostedBy->{ name, slug }
  },
  "testimonials": *[_type == "testimonial"] {
    _id, quote, authorName, authorRole, authorPhoto,
    "ssa": ssa->{ name }
  },
  "ssaCount": count(*[_type == "ssa"]),
  "eventCount": count(*[_type == "event"]),
  "stateCount": count(array::unique(*[_type == "ssa"].state))
}`;
