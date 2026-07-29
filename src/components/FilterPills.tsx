'use client';
// Shared pill-tab filter used by /opportunities and /news so both pages share
// one interactive pattern. Renders "All" plus one pill per option, and calls
// back with the active value (null = All).
import { useState } from 'react';

export default function FilterPills({
  options,
  onChange,
  counts,
}: {
  options: string[];
  onChange: (active: string | null) => void;
  /** Optional per-option counts, shown alongside the label. */
  counts?: Record<string, number>;
}) {
  const [active, setActive] = useState<string | null>(null);

  function pick(value: string | null) {
    setActive(value);
    onChange(value);
  }

  const base =
    'rounded-full px-4 py-1.5 text-sm font-medium transition-colors border';
  const on = 'bg-teal text-white border-teal';
  const off = 'bg-white text-teal-ink border-teal/15 hover:border-gold';

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
      <button
        onClick={() => pick(null)}
        aria-pressed={active === null}
        className={`${base} ${active === null ? on : off}`}
      >
        All
      </button>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => pick(o)}
          aria-pressed={active === o}
          className={`${base} ${active === o ? on : off}`}
        >
          {o}
          {counts?.[o] !== undefined && (
            <span className={active === o ? 'text-white/60 ml-1.5' : 'text-teal-soft ml-1.5'}>
              {counts[o]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
