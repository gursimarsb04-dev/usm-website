import { supabasePublic } from '@/lib/supabase-public';
import { eventsCatalog } from '@/lib/events-catalog';

// iCalendar feed of USM events — subscribe once and USM stays in your calendar.
// Merges the Supabase `events` table with the static registration catalog.
//
// Optional ?ssa=<slug> narrows the feed to a single chapter's events.
//
// RFC 5545 notes (these matter — a malformed feed fails *silently* in Apple
// Calendar and Google Calendar rather than showing an error):
//   - TEXT values must escape backslash, semicolon, comma and newline.
//   - Lines longer than 75 octets must be folded with CRLF + a leading space.
//   - Line endings must be CRLF, and the feed must end with one.

export const revalidate = 300;
export const dynamic = 'force-dynamic';

/** Escape a value for an iCalendar TEXT property (RFC 5545 §3.3.11). */
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** UTC timestamp in iCalendar form: 20260731T170000Z */
function stamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** Fold to 75 octets per line with CRLF + single leading space continuations. */
function fold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;

  const out: string[] = [];
  let cur = '';
  let curBytes = 0;
  // Split by code point so multi-byte characters are never cut in half.
  for (const ch of line) {
    const chBytes = enc.encode(ch).length;
    // Continuation lines carry a leading space, so their budget is 74.
    const limit = out.length === 0 ? 75 : 74;
    if (curBytes + chBytes > limit) {
      out.push(cur);
      cur = ch;
      curBytes = chBytes;
    } else {
      cur += ch;
      curBytes += chBytes;
    }
  }
  if (cur) out.push(cur);
  return out.join('\r\n ');
}

type FeedEvent = {
  uid: string;
  title: string;
  start: Date;
  end?: Date | null;
  location?: string | null;
  description?: string | null;
  url?: string | null;
};

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const ssaSlug = searchParams.get('ssa');

  const items: FeedEvent[] = [];

  // ── Supabase events (national + per-chapter) ──
  try {
    const sb = supabasePublic();
    let ssaId: string | null = null;
    if (ssaSlug) {
      const { data } = await sb.from('ssas').select('id').eq('slug', ssaSlug).single();
      ssaId = data?.id ?? null;
    }

    let q = sb.from('events').select('*').order('starts_at');
    if (ssaId) q = q.eq('ssa_id', ssaId);
    const { data } = await q;

    for (const e of data ?? []) {
      if (!e.starts_at) continue;
      items.push({
        uid: `event-${e.id}@unitedsikhmovement.org`,
        title: e.title,
        start: new Date(e.starts_at),
        end: e.ends_at ? new Date(e.ends_at) : null,
        location: e.location,
        description: e.description,
        url: e.registration_url,
      });
    }
  } catch {
    // No database configured — fall through to the static catalog.
  }

  // ── Static registration catalog (national events only) ──
  // Only events with an explicit ISO `startsAt` are included. Their display
  // `date` is prose ("Fall 2026") and must never be parsed — it either yields a
  // wrong date or none at all. An event with no confirmed date simply doesn't
  // belong in a calendar yet.
  if (!ssaSlug) {
    for (const c of eventsCatalog) {
      if (!c.startsAt) continue;
      const start = new Date(c.startsAt);
      if (Number.isNaN(start.getTime())) continue;
      items.push({
        uid: `catalog-${c.slug}@unitedsikhmovement.org`,
        title: c.title,
        start,
        end: c.endsAt ? new Date(c.endsAt) : null,
        location: c.location,
        description: c.blurb,
        url: `${origin}/events/${c.slug}/register`,
      });
    }
  }

  const now = stamp(new Date());
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//United Sikh Movement//USM Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(ssaSlug ? `USM — ${ssaSlug}` : 'United Sikh Movement Events')}`,
    'X-WR-TIMEZONE:UTC',
  ];

  for (const e of items) {
    // A VEVENT with no valid DTSTART breaks the whole feed in some clients.
    if (Number.isNaN(e.start.getTime())) continue;
    const end = e.end && !Number.isNaN(e.end.getTime())
      ? e.end
      : new Date(e.start.getTime() + 2 * 60 * 60 * 1000); // default 2h

    lines.push(
      'BEGIN:VEVENT',
      `UID:${esc(e.uid)}`,
      `DTSTAMP:${now}`,
      `DTSTART:${stamp(e.start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${esc(e.title)}`,
    );
    if (e.location) lines.push(`LOCATION:${esc(e.location)}`);
    if (e.description) lines.push(`DESCRIPTION:${esc(e.description)}`);
    if (e.url) lines.push(`URL:${esc(e.url)}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  const body = lines.map(fold).join('\r\n') + '\r\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="usm-events.ics"',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
