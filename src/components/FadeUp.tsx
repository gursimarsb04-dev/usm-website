'use client';
// Scroll-reveal wrapper. Wrap any section in <FadeUp> for the default rise,
// or pass a `variant` for a different entrance. `delay` staggers siblings.
//
//   <FadeUp>…</FadeUp>                     // default: rise up
//   <FadeUp variant="left" delay={100}>…   // slide in from the left, staggered
//   <FadeUp variant="blur">…               // de-blur into place
//
// Uses one IntersectionObserver per element; adds `.in-view` when it enters and
// (unless `once`) removes it when it leaves, so animations replay on scroll-back.
import { useEffect, useRef } from 'react';

type Variant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'rise' | 'clip';

export default function FadeUp({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in-view');
          if (once) obs.disconnect();
        } else if (!once) {
          el.classList.remove('in-view');
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
