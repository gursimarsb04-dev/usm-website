'use client';
import Link from 'next/link';
import { useState } from 'react';

// Wayfinding links. Donate is deliberately NOT in here — it's the conversion
// action and gets its own pill treatment so it reads as a button, not a page.
const links = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/ssas', label: 'Find Your SSA' },
  { href: '/events', label: 'Events' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/resources', label: 'Resources' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    // Floating pill nav (Maxima Therapy reference) rather than an edge-to-edge
    // bar: the header itself stays transparent with breathing room on all
    // sides, and the pill underneath carries the surface/shadow/border.
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="mx-auto max-w-wrap flex items-center justify-between gap-4 rounded-full border border-teal/10 bg-sand/95 backdrop-blur shadow-[0_2px_16px_-4px_rgba(22,56,76,0.12)] px-5 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg sm:text-xl font-bold text-teal shrink-0">
          United Sikh Movement
        </Link>
        <div className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm font-medium text-teal-ink hover:text-teal transition-colors whitespace-nowrap">
              {l.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="rounded-full bg-gold px-5 py-2 text-sm font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors"
          >
            Donate
          </Link>
          <Link href="/portal/login" className="text-xs text-teal-soft hover:text-teal whitespace-nowrap">
            SSA Login
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}
          className="lg:hidden text-teal text-2xl leading-none shrink-0">☰</button>
      </nav>
      {open && (
        <div className="lg:hidden mx-auto max-w-wrap mt-2 rounded-3xl border border-teal/10 bg-sand shadow-lg px-6 pb-6 pt-5 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-medium text-teal-ink">{l.label}</Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="rounded-full bg-gold px-5 py-2.5 text-center font-display font-semibold text-teal-ink"
          >
            Donate
          </Link>
          <Link href="/portal/login" onClick={() => setOpen(false)} className="text-sm text-teal-soft">SSA Login</Link>
        </div>
      )}
    </header>
  );
}
