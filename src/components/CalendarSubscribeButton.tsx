'use client';
// "Subscribe to calendar" — the highest-retention, lowest-effort hook on the
// site: one tap and USM events keep showing up in the student's calendar.
//
// webcal:// is what makes the OS treat this as a *subscription* (auto-updating)
// rather than a one-time .ics import. The scheme has no SSR-safe value (it
// needs the real host), so the href is computed on the client after mount.
import { useEffect, useState } from 'react';

export default function CalendarSubscribeButton({ ssaSlug }: { ssaSlug?: string }) {
  const [webcal, setWebcal] = useState<string | null>(null);
  const query = ssaSlug ? `?ssa=${encodeURIComponent(ssaSlug)}` : '';
  const httpHref = `/api/calendar.ics${query}`;

  useEffect(() => {
    setWebcal(`webcal://${window.location.host}/api/calendar.ics${query}`);
  }, [query]);

  return (
    <>
      <a
        href={webcal ?? httpHref}
        className="inline-flex items-center gap-2 rounded-full bg-teal text-white px-5 py-2.5 text-sm font-display font-semibold hover:bg-teal-ink transition-colors"
      >
        <span aria-hidden>📅</span>
        Subscribe to calendar
      </a>
      <a
        href={httpHref}
        className="text-sm text-teal-soft underline underline-offset-4 hover:text-teal"
      >
        or download .ics
      </a>
    </>
  );
}
