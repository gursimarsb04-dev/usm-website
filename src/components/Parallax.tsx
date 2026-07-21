'use client';
// Wraps a child (typically a background image) and shifts it vertically as it
// scrolls through the viewport, at a fraction of scroll speed. `speed` is the
// parallax factor: 0.3 means the layer moves 30% as far as the page. Negative
// values move it the other way. Disabled under prefers-reduced-motion via CSS.
import { useEffect, useRef } from 'react';

export default function Parallax({
  children,
  speed = 0.3,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // Distance of the element's center from the viewport center.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty('--y', `${(-offset * speed).toFixed(1)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return <div ref={ref} className={`parallax ${className}`}>{children}</div>;
}
