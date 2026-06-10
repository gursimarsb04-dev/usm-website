import type { USMEvent } from '@/lib/types';

export default function EventCard({ event, ssaName }: { event: USMEvent; ssaName?: string }) {
  const d = new Date(event.starts_at);
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-teal/10 flex gap-5">
      <div className="text-center shrink-0 w-16">
        <div className="font-display text-3xl font-bold text-teal">{d.getDate()}</div>
        <div className="text-xs uppercase tracking-widest text-teal-soft">
          {d.toLocaleString('en-US', { month: 'short' })}
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-gold-deep font-semibold">
          {ssaName || 'USM National'}
        </div>
        <h3 className="font-display font-semibold text-lg text-teal-ink mt-0.5">{event.title}</h3>
        {event.location && <p className="text-sm text-teal-soft mt-1">{event.location}</p>}
        {event.registration_url && (
          <a href={event.registration_url} target="_blank" rel="noreferrer"
            className="inline-block mt-3 text-sm font-semibold text-teal underline underline-offset-4 hover:text-gold-deep">
            Register
          </a>
        )}
      </div>
    </div>
  );
}
