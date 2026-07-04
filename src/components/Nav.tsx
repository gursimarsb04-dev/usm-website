'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabaseBrowser } from '@/lib/supabase';

const links = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/ssas', label: 'Find Your SSA' },
  { href: '/events', label: 'Events' },
  { href: '/donate', label: 'Donate' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sb = supabaseBrowser();
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setLoggedIn(true);
      const { count } = await sb
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);
      setUnread(count ?? 0);
    });
  }, []);

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
          <Link href={loggedIn ? '/auth/dashboard' : '/auth/login'}
            className="relative text-xs text-teal-soft hover:text-teal transition-colors">
            {loggedIn ? (
              <>
                Account
                {unread > 0 && (
                  <span className="absolute -top-1.5 -right-3 min-w-[16px] h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center px-0.5">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </>
            ) : 'Sign in'}
          </Link>
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
          <Link href={loggedIn ? '/auth/dashboard' : '/auth/login'} onClick={() => setOpen(false)}
            className="text-sm text-teal-soft">
            {loggedIn ? `Account${unread > 0 ? ` (${unread})` : ''}` : 'Sign in'}
          </Link>
          <Link href="/portal/login" onClick={() => setOpen(false)} className="text-sm text-teal-soft">SSA Login</Link>
        </div>
      )}
    </header>
  );
}
