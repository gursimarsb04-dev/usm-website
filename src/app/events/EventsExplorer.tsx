'use client';
// Client-side explorer for the unified national calendar: filter every chapter's
// events (plus USM national) by school / region / type, and switch between a
// grouped List and a month Calendar grid. Data is fetched server-side and passed
// in as plain CalendarEvent[] so this stays a thin interactive shell.
import { useMemo, useState } from 'react';
import FilterPills from '@/components/FilterPills';
import EmptyState from '@/components/EmptyState';
import { REGIONS } from '@/lib/regions';
import type { CalendarEvent } from '@/lib/calendar';

type View = 'list' | 'calendar';

export default function EventsExplorer({
  events,
  chapters,
  types,
}: {
  events: CalendarEvent[];
  chapters: string[];
  types: string[];
}) {
  const [view, setView] = useState<View>('list');
  const [chapter, setChapter] = useState<string>(''); // '' = all
  const [region, setRegion] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const regionOptions = useMemo(
    () => REGIONS.filter((r) => events.some((e) => e.region === r)),
    [events]
  );

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (!chapter || e.chapter === chapter) &&
          (!region || e.region === region) &&
          (!type || e.type === type)
      ),
    [events, chapter, region, type]
  );

  const toggle = 'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors';

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-3xl bg-mist/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-full bg-white p-1 border border-teal/10">
            <button
              onClick={() => setView('list')}
              className={`${toggle} ${view === 'list' ? 'bg-teal text-white' : 'text-teal-ink hover:text-teal'}`}
              aria-pressed={view === 'list'}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`${toggle} ${view === 'calendar' ? 'bg-teal text-white' : 'text-teal-ink hover:text-teal'}`}
              aria-pressed={view === 'calendar'}
            >
              Calendar
            </button>
          </div>
          {chapters.length > 0 && (
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="rounded-full border border-teal/15 bg-white px-4 py-2 text-sm text-teal-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              aria-label="Filter by school"
            >
              <option value="">All schools</option>
              {chapters.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        {regionOptions.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-soft mb-2">Region</p>
            <FilterPills options={regionOptions as unknown as string[]} onChange={setRegion} />
          </div>
        )}
        {types.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-soft mb-2">Type</p>
            <FilterPills options={types} onChange={setType} />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title="No events match these filters"
            body="Try clearing a filter, or check back soon — chapters add events throughout the year."
          />
        ) : view === 'list' ? (
          <EventList events={filtered} />
        ) : (
          <CalendarGrid events={filtered} />
        )}
      </div>
    </div>
  );
}

// ── List view: grouped by month ──
function EventList({ events }: { events: CalendarEvent[] }) {
  const groups = useMemo(() => {
    const m = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const key = new Date(e.startsAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      (m.get(key) ?? m.set(key, []).get(key)!).push(e);
    }
    return Array.from(m.entries());
  }, [events]);

  return (
    <div className="space-y-10">
      {groups.map(([month, evs]) => (
        <div key={month}>
          <h3 className="font-display text-lg font-bold text-teal mb-4">{month}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {evs.map((e) => <CalendarEventCard key={e.id} event={e} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarEventCard({ event }: { event: CalendarEvent }) {
  const d = new Date(event.startsAt);
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-teal/10 flex gap-5">
      <div className="text-center shrink-0 w-16">
        <div className="font-display text-3xl font-bold text-teal">{d.getDate()}</div>
        <div className="text-xs uppercase tracking-widest text-teal-soft">
          {d.toLocaleString('en-US', { month: 'short' })}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest">
          <span className="text-gold-deep font-semibold">{event.chapter || 'USM National'}</span>
          {event.type && <span className="rounded-full bg-mist px-2 py-0.5 text-teal-soft normal-case tracking-normal">{event.type}</span>}
          {event.region && <span className="text-teal-soft/80 normal-case tracking-normal">· {event.region}</span>}
        </div>
        <h4 className="font-display font-semibold text-lg text-teal-ink mt-0.5">{event.title}</h4>
        {event.location && <p className="text-sm text-teal-soft mt-1">{event.location}</p>}
        <div className="mt-3 flex gap-4">
          {event.registerUrl && (
            <a
              href={event.registerUrl}
              target={event.registerUrl.startsWith('/') ? undefined : '_blank'}
              rel="noreferrer"
              className="text-sm font-semibold text-teal underline underline-offset-4 hover:text-gold-deep"
            >
              Register
            </a>
          )}
          {event.chapterSlug && (
            <a href={`/ssas/${event.chapterSlug}`} className="text-sm text-teal-soft hover:text-teal">
              View chapter →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Calendar view: month grid ──
function CalendarGrid({ events }: { events: CalendarEvent[] }) {
  // Anchor on the month of the earliest event so the grid opens where the
  // events are, not on an empty "today" when the next event is months out.
  const earliest = events.length ? new Date(events[0].startsAt) : new Date();
  const [cursor, setCursor] = useState({ y: earliest.getFullYear(), m: earliest.getMonth() });

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const d = new Date(e.startsAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      (map.get(key) ?? map.set(key, []).get(key)!).push(e);
    }
    return map;
  }, [events]);

  const first = new Date(cursor.y, cursor.m, 1);
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const leading = first.getDay(); // 0 = Sun
  const cells: (number | null)[] = [
    ...Array(leading).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const step = (delta: number) => {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };
  const navBtn = 'rounded-full h-9 w-9 grid place-items-center border border-teal/15 text-teal hover:border-gold';

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-teal">{monthLabel}</h3>
        <div className="flex gap-2">
          <button onClick={() => step(-1)} className={navBtn} aria-label="Previous month">‹</button>
          <button onClick={() => step(1)} className={navBtn} aria-label="Next month">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px rounded-2xl overflow-hidden border border-teal/10 bg-teal/10">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="bg-mist text-center text-xs uppercase tracking-widest text-teal-soft py-2">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const key = day ? `${cursor.y}-${cursor.m}-${day}` : `blank-${i}`;
          const dayEvents = day ? byDay.get(`${cursor.y}-${cursor.m}-${day}`) ?? [] : [];
          return (
            <div key={key} className={`min-h-[92px] bg-white p-1.5 ${day ? '' : 'bg-mist/40'}`}>
              {day && <div className="text-xs text-teal-soft mb-1">{day}</div>}
              <div className="space-y-1">
                {dayEvents.map((e) => (
                  <a
                    key={e.id}
                    href={e.registerUrl || (e.chapterSlug ? `/ssas/${e.chapterSlug}` : '#')}
                    target={e.registerUrl && !e.registerUrl.startsWith('/') ? '_blank' : undefined}
                    rel="noreferrer"
                    title={`${e.title}${e.chapter ? ` · ${e.chapter}` : ''}`}
                    className="block truncate rounded bg-teal/10 px-1.5 py-0.5 text-[11px] font-medium text-teal hover:bg-gold/30"
                  >
                    {e.title}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
