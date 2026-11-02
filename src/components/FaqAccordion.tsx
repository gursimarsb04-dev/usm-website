// FAQ accordion built on native <details>/<summary>: keyboard accessible, works
// without JavaScript, and the answers stay in the HTML for search engines.
import type { ReactNode } from 'react';

export type FaqItem = { q: string; a: ReactNode };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-teal/10 rounded-3xl border border-teal/10 bg-white">
      {items.map((it, i) => (
        <details key={i} className="group px-5 md:px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 font-display font-semibold text-teal-ink">
            <span>{it.q}</span>
            <span
              aria-hidden
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mist text-teal transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-5 -mt-1 text-teal-ink/80 leading-relaxed">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
