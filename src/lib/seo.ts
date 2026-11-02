// Per-page SEO metadata in one place. Every public page builds its metadata
// through pageMetadata() so it always gets:
//  - a self-referencing canonical URL (resolved against metadataBase, i.e.
//    https://unitedsikhmovement.org/<path>)
//  - its own description
//  - matching Open Graph / Twitter tags (a page-level `openGraph` replaces the
//    root layout's object entirely, so the shared defaults are re-applied here)
import type { Metadata } from 'next';

const SITE_NAME = 'United Sikh Movement';
const DEFAULT_IMAGE = '/photos/hero.jpg';

export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
  image,
}: {
  /** Route path starting with "/", e.g. "/about" or "/ssas/ucla". */
  path: string;
  title?: string;
  description?: string;
  /** Use `title` as-is instead of appending " · United Sikh Movement". */
  absoluteTitle?: boolean;
  image?: string;
}): Metadata {
  const fullTitle = !title ? SITE_NAME : absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    ...(title ? { title: absoluteTitle ? { absolute: title } : title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      ...(description ? { description } : {}),
      images: [image ?? DEFAULT_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, ...(description ? { description } : {}) },
  };
}
