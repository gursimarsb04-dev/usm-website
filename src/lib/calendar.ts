// Unified national calendar feed.
//
// Two sources feed the calendar (see the exploration notes in the PR):
//   1. Supabase `events` — every chapter's events + USM national events
//      (ssa_id null = national). This is the live, growing source.
//   2. The hardcoded `events-catalog.ts` — USM national ticketed events whose
//      price lives server-side. Only the ones with a machine-readable `startsAt`
//      can appear on a dated calendar.
//
// getUpcomingCalendarEvents() normalizes both into one CalendarEvent shape so
// the Events page can filter (school / region / type) and lay them out on a
// month grid without caring where each event came from.

import { supabasePublic } from '@/lib/supabase-public';
import { SSA_PUBLIC_COLUMNS } from '@/lib/ssa-columns';
import { eventsCatalog, registerHref } from '@/lib/events-catalog';
import { regionForState, type Region } from '@/lib/regions';

export type CalendarEvent = {
  id: string;
  title: string;
  startsAt: string; // ISO 8601 — always present (undated events are excluded)
  endsAt: string | null;
  location: string | null;
  /** SSA name, or null for a USM national event. */
  chapter: string | null;
  chapterSlug: string | null;
  region: Region | null;
  /** Event category (Divaan/Kirtan, Social/GBM, …); null until tagged. */
  type: string | null;
  registerUrl: string | null;
  source: 'chapter' | 'national';
};

// Chapter events join `ssas` for the name/slug/state (state → region). `type`
// comes from the events row once migration 005 adds the column; selecting `*`
// means this keeps working before the migration (type simply reads undefined).
type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  registration_url: string | null;
  type?: string | null;
  status?: string | null;
  ssa_id: string | null;
  ssas: { name: string | null; slug: string | null; state: string | null } | null;
};

/**
 * All upcoming events across the network, newest-first-cutoff at `now`,
 * normalized and sorted ascending by start. Fails soft to catalog-only if
 * Supabase is unavailable.
 */
export async function getUpcomingCalendarEvents(): Promise<CalendarEvent[]> {
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  let rows: EventRow[] = [];
  try {
    const { data } = await supabasePublic()
      .from('events')
      .select(`*, ssas(${SSA_PUBLIC_COLUMNS})`)
      .gte('starts_at', nowIso)
      .order('starts_at')
      .limit(500);
    rows = (data as EventRow[] | null) ?? [];
  } catch {
    rows = [];
  }

  const fromDb: CalendarEvent[] = rows
    // Hide events awaiting admin approval. Done in JS (not a .neq query) so this
    // keeps working before migration 005 adds the `status` column — a row with
    // no status reads undefined and is treated as approved.
    .filter((e) => e.status !== 'pending')
    .map((e) => ({
    id: e.id,
    title: e.title,
    startsAt: e.starts_at,
    endsAt: e.ends_at,
    location: e.location,
    chapter: e.ssa_id ? e.ssas?.name ?? null : null,
    chapterSlug: e.ssa_id ? e.ssas?.slug ?? null : null,
    region: e.ssa_id ? regionForState(e.ssas?.state) : null,
    type: e.type ?? null,
    registerUrl: e.registration_url,
    source: e.ssa_id ? 'chapter' : 'national',
  }));

  // National catalog events that have a real date and haven't passed. These are
  // USM-run, so they carry no chapter/region. registerHref points at the bespoke
  // landing page (e.g. /retreat) when one exists, else the generic register route.
  const fromCatalog: CalendarEvent[] = eventsCatalog
    .filter((e) => e.startsAt && new Date(e.startsAt).getTime() >= now)
    .map((e) => ({
      id: `catalog:${e.slug}`,
      title: e.title,
      startsAt: e.startsAt as string,
      endsAt: e.endsAt ?? null,
      location: e.location,
      chapter: null,
      chapterSlug: null,
      region: null,
      type: null,
      registerUrl: registerHref(e),
      source: 'national',
    }));

  return [...fromDb, ...fromCatalog].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  );
}

/** Distinct chapter names present in a set of events, sorted, for the filter. */
export function chapterOptions(events: CalendarEvent[]): string[] {
  return Array.from(new Set(events.map((e) => e.chapter).filter(Boolean) as string[])).sort();
}

/** Distinct event types present, for the filter. */
export function typeOptions(events: CalendarEvent[]): string[] {
  return Array.from(new Set(events.map((e) => e.type).filter(Boolean) as string[])).sort();
}
