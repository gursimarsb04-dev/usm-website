import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (src: any) => builder.image(src);

// Convenience fetchers — every public page reads through these.
export async function getPrograms() {
  return sanity.fetch(`*[_type=="program"]|order(order asc){title, "slug": slug.current, pillar, tagline, coverImage}`);
}
export async function getNews(limit = 12) {
  return sanity.fetch(`*[_type=="newsPost"]|order(publishedAt desc)[0...$limit]{title, "slug": slug.current, publishedAt, excerpt, coverImage, isHumansOfUSM}`, { limit });
}
export async function getOpportunities() {
  return sanity.fetch(`*[_type=="opportunity" && (deadline >= now() || !defined(deadline))]|order(deadline asc){title, type, organization, deadline, url, blurb}`);
}
export async function getResources(includeGated = false) {
  const filter = includeGated ? '' : ' && gated != true';
  return sanity.fetch(`*[_type=="resource"${filter}]|order(category asc){title, category, description, "fileUrl": file.asset->url, externalUrl, gated}`);
}
export async function getImpactStats(homepageOnly = false) {
  const filter = homepageOnly ? ' && showOnHomepage == true' : '';
  return sanity.fetch(`*[_type=="impactStat"${filter}]|order(order asc){label, value}`);
}
export async function getPodcastEpisodes() {
  return sanity.fetch(`*[_type=="podcastEpisode"]|order(publishedAt desc){title, guest, publishedAt, youtubeUrl, description}`);
}
export async function getSiteSettings() {
  return sanity.fetch(`*[_type=="siteSettings"][0]`);
}
