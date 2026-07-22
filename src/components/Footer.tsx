import Link from 'next/link';
import Phulkari from './Phulkari';
import SocialLinks from './SocialLinks';
import NewsletterSignup from './NewsletterSignup';
import { EIN, CONTACT_EMAIL, START_SSA_FORM_URL } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-teal text-white mt-24">
      <Phulkari className="text-gold/40" />

      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-wrap px-5 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="font-display text-2xl font-bold">Stay in the movement.</div>
            <p className="mt-2 text-white/70 text-sm max-w-sm">
              Events, opportunities, and stories from Sikh students across the
              country — straight to your inbox.
            </p>
          </div>
          <NewsletterSignup source="footer" />
        </div>
      </div>

      <div className="mx-auto max-w-wrap px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold">United Sikh Movement</div>
          <p className="mt-3 text-white/70 max-w-sm text-sm leading-relaxed">
            America's largest Sikh student network — helping Sikh youth excel
            professionally, personally, and spiritually.
          </p>
          <SocialLinks className="mt-5" />
          <p className="mt-5 text-xs text-white/50">
            USM is a registered 501(c)(3) nonprofit. EIN: {EIN}.
          </p>
        </div>
        <div>
          <div className="font-display font-semibold mb-3 text-gold">Explore</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/ssas" className="hover:text-gold">Find Your SSA</Link></li>
            <li><a href={START_SSA_FORM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Start an SSA</a></li>
            <li><Link href="/impact" className="hover:text-gold">Our Impact</Link></li>
            <li><Link href="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link href="/news" className="hover:text-gold">News</Link></li>
            <li><Link href="/podcast" className="hover:text-gold">Podcast</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-3 text-gold">Get Involved</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/partners" className="hover:text-gold">Our Partners</Link></li>
            <li><Link href="/opportunities" className="hover:text-gold">Opportunities</Link></li>
            <li><Link href="/resources" className="hover:text-gold">Resources</Link></li>
            <li><Link href="/donate" className="hover:text-gold">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link href="/portal/login" className="hover:text-gold">SSA Portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto max-w-wrap px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} United Sikh Movement</span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold">{CONTACT_EMAIL}</a>
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
