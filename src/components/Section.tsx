// Consistent vertical rhythm + heading hierarchy.
//
// Section padding was previously split across py-14 / py-16 / py-20 / py-24 with
// no rule, so the page cadence wobbled. Two sizes only:
//   default → py-20  (standard content section)
//   feature → py-24  (hero-adjacent / emotional beats: pillars, final CTA)
//
// Type scale (use these rather than ad-hoc sizes — text-5xl and text-3xl were
// each used 27x for *different* heading levels before this):
//   h1 page title    → text-4xl md:text-5xl
//   h2 section head  → text-3xl md:text-4xl   (`size="lg"` for statement beats)
//   h3 card title    → text-xl
//   eyebrow          → text-xs uppercase tracking-widest

type Tone = 'sand' | 'mist' | 'white' | 'teal';

const TONES: Record<Tone, string> = {
  sand: 'bg-sand',
  mist: 'bg-mist',
  white: 'bg-white',
  teal: 'bg-teal text-white',
};

export function Section({
  tone = 'sand',
  size = 'default',
  className = '',
  children,
}: {
  tone?: Tone;
  size?: 'default' | 'feature';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${size === 'feature' ? 'py-24' : 'py-20'} ${TONES[tone]} ${className}`}>
      <div className="mx-auto max-w-wrap px-5">{children}</div>
    </section>
  );
}

/** Gold eyebrow with the diamond tick — the established USM section marker. */
export function Eyebrow({
  children,
  inverse = false,
  className = '',
}: {
  children: React.ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`font-display tracking-widest uppercase text-xs flex items-center gap-2 ${
        inverse ? 'text-gold' : 'text-gold-deep'
      } ${className}`}
    >
      <span className="inline-block w-2 h-2 rotate-45 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  size = 'default',
  inverse = false,
  className = '',
}: {
  children: React.ReactNode;
  /** `lg` for statement beats (pillar headlines, final CTA). */
  size?: 'default' | 'lg';
  inverse?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-display font-bold ${
        size === 'lg' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
      } ${inverse ? 'text-white' : 'text-teal'} ${className}`}
    >
      {children}
    </h2>
  );
}
