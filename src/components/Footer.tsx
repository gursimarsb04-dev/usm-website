import Link from 'next/link';
import Phulkari from './Phulkari';

export default function Footer() {
  return (
    <footer className="bg-teal text-white mt-24">
      <Phulkari className="text-gold/40" />
      <div className="mx-auto max-w-wrap px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold">United Sikh Movement</div>
          <p className="mt-3 text-white/70 max-w-sm text-sm leading-relaxed">
            America's largest Sikh student network — helping Sikh youth excel
            professionally, personally, and spiritually.
          </p>
          <p className="mt-4 text-xs text-white/50">
            USM is a registered 501(c)(3) nonprofit.
          </p>
        </div>
        <div>
          <div className="font-display font-semibold mb-3 text-gold">Explore</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/ssas" className="hover:text-gold">Find Your SSA</Link></li>
            <li><Link href="/start-an-ssa" className="hover:text-gold">Start an SSA</Link></li>
            <li><Link href="/impact" className="hover:text-gold">Our Impact</Link></li>
            <li><Link href="/news" className="hover:text-gold">News</Link></li>
            <li><Link href="/podcast" className="hover:text-gold">Podcast</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-3 text-gold">Get Involved</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/opportunities" className="hover:text-gold">Opportunities</Link></li>
            <li><Link href="/resources" className="hover:text-gold">Resources</Link></li>
            <li><Link href="/donate" className="hover:text-gold">Donate</Link></li>
            <li><Link href="/auth/signup" className="hover:text-gold">Create account</Link></li>
            <li><Link href="/auth/login" className="hover:text-gold">Sign in</Link></li>
            <li><Link href="/portal/login" className="hover:text-gold">SSA Portal</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} United Sikh Movement
      </div>
    </footer>
  );
}
