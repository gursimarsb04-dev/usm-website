'use client';
// Shared logo mark for Nav + Footer — sits transparent on whatever background
// it's placed on (no chip). Hides itself if /logo.png can't load so callers can
// safely pair it with the "United Sikh Movement" wordmark text without ever
// showing a broken-image icon. The mount check catches a 404 that fires before
// hydration; onError catches everything else.
import { useState, useRef, useEffect } from 'react';

export default function BrandMark({ className = 'h-8 sm:h-9 w-auto' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/logo.png"
      alt=""
      aria-hidden="true"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
