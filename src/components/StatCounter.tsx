'use client';
// Counts up when scrolled into view. Respects reduced motion.
import { useEffect, useRef, useState } from 'react';

export default function StatCounter({ value, prefix = '', suffix = '', label }:
  { value: number; prefix?: string; suffix?: string; label: string }) {
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
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-semibold text-teal">{prefix}{n.toLocaleString()}{suffix}</div>
      <div className="mt-1 text-sm uppercase tracking-widest text-teal-soft">{label}</div>
    </div>
  );
}
