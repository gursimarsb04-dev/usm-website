'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/ssas', label: 'Find Your SSA' },
  { href: '/events', label: 'Events' },
  { href: '/donate', label: 'Donate' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sand/90 backdrop-blur border-b border-teal/10">
      <nav className="mx-auto max-w-wrap flex items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-xl font-bold text-teal">
          United Sikh Movement
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm font-medium text-teal-ink hover:text-teal transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/portal/login" className="text-xs text-teal-soft hover:text-teal">
            SSA Login
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}
          className="md:hidden text-teal text-2xl leading-none">☰</button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-teal/10 bg-sand px-5 pb-5 flex flex-col gap-4 pt-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-medium text-teal-ink">{l.label}</Link>
          ))}
          <Link href="/portal/login" onClick={() => setOpen(false)} className="text-sm text-teal-soft">SSA Login</Link>
        </div>
      )}
    </header>
  );
}
