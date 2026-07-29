import Link from 'next/link';

// Shared card surface. Before this existed the same
// `rounded-* bg-white border border-teal/10` treatment was hand-rolled in ~30
// places across three different radii (xl / 2xl / 3xl), so cards drifted
// visually from page to page. Use this instead of re-declaring those classes.
//
// `rounded-2xl` is the house standard — 3xl is reserved for full-width feature
// panels (see Section's teal callout), not for cards in a grid.

type Tone = 'default' | 'muted' | 'inverse';

const TONES: Record<Tone, string> = {
  // Standard card on a sand/mist page background.
  default: 'bg-white border border-teal/10',
  // Secondary card — for de-emphasised or not-yet-active items.
  muted: 'bg-mist/60 border border-transparent',
  // Card sitting on a teal section.
  inverse: 'bg-white/5 border border-white/10 text-white',
};

export default function Card({
  href,
  target,
  rel,
  tone = 'default',
  padded = true,
  interactive,
  className = '',
  children,
}: {
  href?: string;
  target?: string;
  rel?: string;
  tone?: Tone;
  /** Set false when the card supplies its own layout (e.g. a full-bleed image top). */
  padded?: boolean;
  /** Force hover affordance on a non-link card. Links get it automatically. */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const isInteractive = interactive ?? Boolean(href);
  const classes = [
    'rounded-2xl overflow-hidden',
    TONES[tone],
    padded ? 'p-6' : '',
    isInteractive
      ? tone === 'inverse'
        ? 'transition-colors hover:border-gold/50'
        : 'transition-colors hover:border-gold'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} target={target} rel={rel} className={`group block ${classes}`}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`group block ${classes}`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
