// Chapter (SSA) data for the /ssas/[slug] landing pages and the /ssas map.
//
// Three sources, merged per chapter:
//  1. Supabase `ssas`: the row (any status). Only a chapter that has claimed
//     its page (status "live") contributes its own details: meeting time,
//     description, board, etc.
//  2. The static roster (ssa-fallback.ts): name, school, city, coordinates.
//  3. Instagram research (ssa-instagram.ts, generated from
//     content-import/ssa/ssa_instagram.csv): display name, bio, confidence.
//
// Rules from content-import/ssa/landing_page_plan.md:
//  - Link Instagram only when confidence is exactly "high", or when the chapter
//    entered the handle itself (claimed page).
//  - Index a page only with a linkable Instagram plus at least one verified
//    detail (the Instagram bio, or details the chapter gave USM). Everything
//    else is noindex,follow, and flips to indexable on its own once that
//    content exists.
//  - No follower counts. No hosted profile pictures until permission is decided.
import { supabasePublic } from '@/lib/supabase-public';
import { SSA_PUBLIC_COLUMNS } from '@/lib/ssa-columns';
import { ssaFallbacks } from '@/lib/ssa-fallback';
import { chapterInstagram } from '@/lib/ssa-instagram';
import type { SSA } from '@/lib/types';

/**
 * Switch for chapter profile pictures. Leave false until chapters have given
 * permission. When true, a chapter with an `image` path in ssa-instagram.ts
 * shows it in the hero instead of the generic initials graphic.
 */
export const CHAPTER_IMAGES_ENABLED = false;

export type Chapter = {
  /** Supabase id, or the slug for roster-only chapters. */
  id: string;
  slug: string;
  /** Name on the USM roster. */
  usmName: string;
  /** Heading name: the Instagram display name when verified, else usmName. */
  displayName: string;
  school: string;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  /** Only set when it is safe to link (see rules above). */
  instagram: { handle: string; url: string } | null;
  /** Instagram bio, quoted exactly. Only from verified accounts. */
  bio: string | null;
  bioPulledOn: string | null;
  /** Claimed by the chapter: its own details are present below. */
  claimed: boolean;
  details: Pick<
    SSA,
    | 'tagline'
    | 'description'
    | 'meets_when'
    | 'meets_where'
    | 'founded_year'
    | 'joining_instructions'
    | 'board_members'
    | 'contact_email'
    | 'cover_photo_url'
    | 'programs_content'
  > | null;
  image: string | null;
  initials: string;
  indexable: boolean;
};

const GENERIC_WORDS = new Set(['university', 'college', 'state', 'the', 'of', 'at', 'and', 'uc', 'csu', 'suny', 'school', 'secondary', 'high']);

/** "UC Los Angeles" -> "UCLA", "San Jose State University" -> "SJSU". Max 4 letters. */
export function schoolInitials(school: string): string {
  const caps = school.replace(/[^A-Z]/g, '');
  if (caps.length >= 2) return caps.slice(0, 4);
  return school
    .split(/\s+/)
    .filter((w) => w && !['of', 'at', 'the', 'and', '&'].includes(w.toLowerCase()))
    .map((w) => w[0].toUpperCase())
    .join('')
    .slice(0, 4);
}

/** Does the display name already say which school this is? */
function namesSchool(displayName: string, school: string): boolean {
  const d = displayName.toLowerCase();
  if (d.includes(school.toLowerCase())) return true;
  const initials = schoolInitials(school);
  if (initials.length >= 3 && new RegExp(`\\b${initials}\\b`, 'i').test(displayName)) return true;
  return school
    .split(/[\s,&]+/)
    .filter((w) => w.length >= 4 && !GENERIC_WORDS.has(w.toLowerCase()))
    .some((w) => d.includes(w.toLowerCase()));
}

/** H1 per spec ("<Display name> at <School>"), without repeating the school. */
export function chapterHeading(c: Chapter): string {
  return namesSchool(c.displayName, c.school) ? c.displayName : `${c.displayName} at ${c.school}`;
}

/**
 * The Instagram handle that may be shown for a chapter anywhere on the site,
 * or null. Used by the chapter page and the /ssas map.
 */
export function safeInstagramHandle(slug: string, handleFromData: string | null | undefined, claimed: boolean): string | null {
  const research = chapterInstagram[slug];
  if (research?.confidence === 'low') return null; // e.g. harvard: account looks unrelated
  const own = handleFromData?.replace(/^@/, '').trim() || null;
  if (claimed && own) return own; // the chapter entered it itself
  if (research?.confidence === 'high' && research.handle) return research.handle;
  return null;
}

function build(row: SSA | null, fb: SSA | undefined, slug: string): Chapter | null {
  const base = row ?? fb;
  if (!base) return null;
  const claimed = row?.status === 'live';
  const research = chapterInstagram[slug];

  const handle = safeInstagramHandle(slug, claimed ? row?.instagram_handle : fb?.instagram_handle ?? row?.instagram_handle, claimed);
  const verifiedResearch = research?.confidence === 'high';
  const bio = verifiedResearch ? research.bio : null;
  const details = claimed && row
    ? {
        tagline: row.tagline ?? null,
        description: row.description ?? null,
        meets_when: row.meets_when ?? null,
        meets_where: row.meets_where ?? null,
        founded_year: row.founded_year ?? null,
        joining_instructions: row.joining_instructions ?? null,
        board_members: row.board_members ?? [],
        contact_email: row.contact_email ?? null,
        cover_photo_url: row.cover_photo_url ?? null,
        programs_content: row.programs_content ?? null,
      }
    : null;
  const hasUsmDetails = !!(details && (details.tagline || details.description || details.meets_when || details.meets_where || details.founded_year));

  const school = base.school;
  return {
    id: row?.id ?? base.id,
    slug,
    usmName: base.name,
    displayName: (verifiedResearch && research.displayName) || base.name,
    school,
    city: base.city ?? fb?.city ?? null,
    state: base.state ?? fb?.state ?? null,
    latitude: base.latitude ?? fb?.latitude ?? null,
    longitude: base.longitude ?? fb?.longitude ?? null,
    instagram: handle ? { handle, url: `https://www.instagram.com/${handle}/` } : null,
    bio,
    bioPulledOn: bio ? research?.pulledOn ?? null : null,
    claimed,
    details,
    image: CHAPTER_IMAGES_ENABLED ? research?.image ?? null : null,
    initials: schoolInitials(school),
    indexable: !!handle && (!!bio || hasUsmDetails),
  };
}

/** One chapter by slug, or null if it isn't on the roster or in the database. */
export async function getChapter(slug: string): Promise<Chapter | null> {
  let row: SSA | null = null;
  try {
    const { data } = await supabasePublic().from('ssas').select(SSA_PUBLIC_COLUMNS).eq('slug', slug).maybeSingle();
    if (data && (data as unknown as SSA).status !== 'inactive') row = data as unknown as SSA;
  } catch {}
  return build(row, ssaFallbacks.find((f) => f.slug === slug), slug);
}

/** Every chapter on the roster (for the sitemap and nearby-chapter lookups). */
export async function getAllChapters(): Promise<Chapter[]> {
  let rows: SSA[] = [];
  try {
    const { data } = await supabasePublic().from('ssas').select(SSA_PUBLIC_COLUMNS).neq('status', 'inactive');
    rows = (data as unknown as SSA[]) ?? [];
  } catch {}
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const slugs = new Set([...ssaFallbacks.map((f) => f.slug), ...rows.map((r) => r.slug)]);
  return Array.from(slugs)
    .map((slug) => build(bySlug.get(slug) ?? null, ssaFallbacks.find((f) => f.slug === slug), slug))
    .filter(Boolean) as Chapter[];
}

function km(a: Chapter, b: Chapter): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.latitude! - a.latitude!);
  const dLng = toRad(b.longitude! - a.longitude!);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.latitude!)) * Math.cos(toRad(b.latitude!)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * The 3 to 5 closest other chapters, by the roster's city coordinates. Up to 5
 * within 500 km; if fewer than 3 are that close, the 3 nearest regardless.
 */
export function nearbyChapters(chapter: Chapter, all: Chapter[]): Chapter[] {
  if (chapter.latitude == null || chapter.longitude == null) return [];
  const ranked = all
    .filter((c) => c.slug !== chapter.slug && c.latitude != null && c.longitude != null)
    .map((c) => ({ c, d: km(chapter, c) }))
    .sort((x, y) => x.d - y.d);
  const close = ranked.filter((r) => r.d <= 500).slice(0, 5);
  return (close.length >= 3 ? close : ranked.slice(0, 3)).map((r) => r.c);
}
