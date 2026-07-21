'use client';
// Thin gold bar pinned to the top of the viewport that fills as you scroll the
// page. Reads the reduced-motion preference (CSS hides it) and uses rAF so the
// scroll handler never thrashes layout.
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0;
      ref.current?.style.setProperty('--p', String(p));
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
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden />;
}
