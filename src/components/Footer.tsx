import Link from 'next/link';
import Phulkari from './Phulkari';
import SocialLinks from './SocialLinks';
import BrandMark from './BrandMark';
import NewsletterSignup from './NewsletterSignup';
import { EIN, CONTACT_EMAIL, SSA_COLLECTIVE_FORM_URL } from '@/lib/site';

// Footer link groups. Kept as data so the three columns stay balanced and are
// easy to re-sort — the old version hard-coded a lopsided 7/6 split.
const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'Find Your SSA', href: '/ssas' },
      { label: 'Programs', href: '/programs' },
      { label: 'Events', href: '/events' },
      { label: 'Our Impact', href: '/impact' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { label: 'Start an SSA', href: '/start-an-ssa' },
      { label: 'Join the Network', href: SSA_COLLECTIVE_FORM_URL, external: true },
      { label: 'Opportunities', href: '/opportunities' },
      { label: 'Our Partners', href: '/partners' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    heading: 'Stay Connected',
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'News', href: '/news' },
      { label: 'Podcast', href: '/podcast' },
      { label: 'Contact', href: '/contact' },
      { label: 'SSA Portal', href: '/portal/login' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-teal text-white mt-24">
      <Phulkari className="text-gold/40" />

      {/* Newsletter band — sits on a darker inset so it reads as its own
          surface rather than blending into the single flat teal slab. */}
      <div className="bg-teal-ink/40 border-b border-white/10">
        <div className="mx-auto max-w-wrap px-5 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-display text-3xl font-bold leading-tight">
              Stay in the movement.
            </div>
            <p className="mt-3 text-white/80 max-w-sm leading-relaxed">
              Events, opportunities, and stories from Sikh students across the
              country — straight to your inbox.
            </p>
          </div>
          <NewsletterSignup source="footer" />
        </div>
      </div>

      {/* Brand + link columns */}
      <div className="mx-auto max-w-wrap px-5 py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-auto" />
            <span className="font-display text-xl font-bold">United Sikh Movement</span>
          </Link>
          <p className="mt-4 text-white/80 max-w-sm text-sm leading-relaxed">
            America&apos;s largest Sikh student network — helping Sikh youth excel
            professionally, personally, and spiritually.
          </p>
          <SocialLinks className="mt-6" />
          <p className="mt-6 text-xs text-white/60 leading-relaxed">
            USM is a registered 501(c)(3) nonprofit.
            <br />
            EIN: {EIN}
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="font-display font-semibold mb-4 text-gold text-sm uppercase tracking-wider">
                {col.heading}
              </div>
              <ul className="space-y-2.5 text-sm text-white/80">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="hover:text-gold transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar — darkest layer, grounds the whole footer. */}
      <div className="bg-teal-ink/60 border-t border-white/10 py-5">
        <div className="mx-auto max-w-wrap px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <span>© {new Date().getFullYear()} United Sikh Movement. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold transition-colors">
              {CONTACT_EMAIL}
            </a>
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
