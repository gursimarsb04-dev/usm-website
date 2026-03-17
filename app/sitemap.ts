import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { ssaSlugsQuery, eventSlugsQuery } from "@/sanity/queries";

const blogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)][].slug.current`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let ssaSlugs: string[] = [];
  let eventSlugs: string[] = [];
  let blogSlugs: string[] = [];

  try {
    [ssaSlugs, eventSlugs, blogSlugs] = await Promise.all([
      client.fetch<string[]>(ssaSlugsQuery),
      client.fetch<string[]>(eventSlugsQuery),
      client.fetch<string[]>(blogSlugsQuery),
    ]);
  } catch {
    // Sanity not configured yet
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/ssa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const ssaPages = ssaSlugs.map((slug) => ({
    url: `${siteUrl}/ssa/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6,
  }));

  const eventPages = eventSlugs.map((slug) => ({
    url: `${siteUrl}/events/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6,
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5,
  }));

  return [...staticPages, ...ssaPages, ...eventPages, ...blogPages];
}
