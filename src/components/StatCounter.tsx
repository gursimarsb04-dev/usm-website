'use client';
// Counts up when scrolled into view. Respects reduced motion.
import { useEffect, useRef, useState } from 'react';

export default function StatCounter({ value, prefix = '', suffix = '', label, size = 'default' }:
  { value: number; prefix?: string; suffix?: string; label: string; size?: 'default' | 'band' }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setN(value); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  // `band` variant: full-bleed gold band treatment (Mobbin ref: Employment
  // Hero — https://mobbin.com/sites/sections/3ca84297-a513-46e4-a14a-d7170df4a1ff).
  // Oversized ink-on-gold numerals instead of a small number in a card.
  const isBand = size === 'band';
  return (
    <div ref={ref} className="text-center">
      <div
        className={
          isBand
            ? 'font-display text-6xl md:text-7xl font-bold text-teal-ink tracking-tight tabular-nums whitespace-nowrap'
            : 'font-display text-4xl font-semibold text-teal tracking-tight tabular-nums whitespace-nowrap'
        }
      >
        {prefix}{n.toLocaleString()}{suffix}
      </div>
      <div
        className={
          isBand
            ? 'mt-3 text-sm uppercase tracking-widest text-teal-ink/70 leading-snug font-medium'
            : 'mt-2 text-xs uppercase tracking-widest text-teal-soft leading-snug'
        }
      >
        {label}
      </div>
    </div>
  );
}
