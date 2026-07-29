import Link from 'next/link';

// A deliberate empty state instead of a bare sentence of grey text.
//
// Empty lists previously rendered as a lone `<p className="text-teal-soft">`,
// which reads as a broken page rather than an intentional "nothing here yet".
// This gives the moment a bordered surface, a clear line, and — importantly —
// somewhere to go next, so a dead end becomes a redirect.

export default function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
  className = '',
}: {
  title: string;
  body?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-teal/20 bg-white/50 px-6 py-12 text-center ${className}`}
    >
      <span
        className="inline-block w-3 h-3 rotate-45 bg-gold/60 mb-4"
        aria-hidden
      />
      <p className="font-display text-lg font-semibold text-teal">{title}</p>
      {body && (
        <p className="mt-2 text-sm text-teal-ink/70 max-w-sm mx-auto leading-relaxed">{body}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block mt-5 text-sm font-semibold text-teal underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
