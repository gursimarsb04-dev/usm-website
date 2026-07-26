'use client';
// Client half of /opportunities: owns the active type filter and renders the
// cards. The page itself stays a server component so data still loads on the
// server (Sanity first, static fallback second).
import { useMemo, useState } from 'react';
import FilterPills from '@/components/FilterPills';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import { OPPORTUNITY_TYPES, type Opportunity } from '@/lib/opportunity-fallbacks';

export default function OpportunitiesList({ items }: { items: Opportunity[] }) {
  const [type, setType] = useState<string | null>(null);

  // Only offer filters for types that actually have listings.
  const { present, counts } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const o of items) if (o.type) counts[o.type] = (counts[o.type] ?? 0) + 1;
    return { present: OPPORTUNITY_TYPES.filter((t) => counts[t]), counts };
  }, [items]);

  const shown = type ? items.filter((o) => o.type === type) : items;

  return (
    <>
      {present.length > 1 && (
        <div className="mt-8">
          <FilterPills options={present} counts={counts} onChange={setType} />
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {shown.map((o, i) => (
          <Card
            key={`${o.title}-${i}`}
            href={o.url || '#'}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col h-full"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-[10px] uppercase tracking-widest text-gold-deep font-semibold">
                {o.type}
              </span>
              {o.deadline && (
                <span className="shrink-0 text-[11px] text-teal-soft">
                  due{' '}
                  <span className="font-semibold text-teal-ink">
                    {new Date(o.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </span>
              )}
            </div>
            <h2 className="font-display font-semibold text-teal-ink group-hover:text-teal mt-1.5">
              {o.title}
            </h2>
            {o.organization && (
              <p className="text-sm text-teal-soft mt-0.5">{o.organization}</p>
            )}
            {o.blurb && (
              <p className="text-sm text-teal-ink/70 mt-2 flex-1">{o.blurb}</p>
            )}
          </Card>
        ))}
      </div>

      {shown.length === 0 && (
        <EmptyState
          className="mt-8"
          title={`No ${type?.toLowerCase() ?? ''} listings right now`}
          body="New internships, scholarships, and roles are posted as the USM team finds them worth your time."
          actionLabel="Browse all opportunities →"
          actionHref="/opportunities"
        />
      )}
    </>
  );
}
