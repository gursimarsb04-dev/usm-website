'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SSANav({ ssaName, ssaSlug }: { ssaName: string; ssaSlug: string }) {
  const pathname = usePathname();
  const base = `/ssas/${ssaSlug}`;

  const links = [
    { href: base, label: 'Homepage' },
    { href: `${base}/programs`, label: 'Programs' },
  ];

  function isActive(href: string) {
    if (href === base) return pathname === base || pathname === `${base}/`;
    return pathname.startsWith(href);
  }

  return (
    <div className="bg-white border-b border-teal/10">
      <div className="mx-auto max-w-wrap px-5 flex items-center gap-2 h-12 overflow-x-auto">
        <span className="font-display font-semibold text-teal text-sm shrink-0 mr-3 hidden sm:block">
          {ssaName}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                isActive(l.href)
                  ? 'bg-teal text-white'
                  : 'text-teal-ink/70 hover:text-teal hover:bg-teal/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
