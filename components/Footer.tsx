"use client";

import Link from "next/link";
import { InstagramLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react";
import EmailSignup from "./EmailSignup";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80 py-20 px-6 md:px-12 mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Brand & Mission */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy font-display font-semibold text-lg pb-[1px]">
              U
            </div>
            <span className="font-display font-semibold text-2xl tracking-tight text-white">
              United Sikh Movement
            </span>
          </Link>
          <p className="text-warm-gray leading-relaxed max-w-sm">
            Empowering Sikh students through academic excellence, professional mentorship, and spiritual grounding.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-saffron hover:text-navy transition-colors">
              <InstagramLogo weight="light" className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-saffron hover:text-navy transition-colors">
              <TwitterLogo weight="light" className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-saffron hover:text-navy transition-colors">
              <LinkedinLogo weight="light" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-2 md:col-start-6 flex flex-col gap-4">
          <h4 className="text-white font-medium mb-2">Explore</h4>
          <Link href="/" className="hover:text-saffron transition-colors w-fit">Home</Link>
          <Link href="/about" className="hover:text-saffron transition-colors w-fit">About Us</Link>
          <Link href="/find-ssa" className="hover:text-saffron transition-colors w-fit">Find an SSA</Link>
          <Link href="/events" className="hover:text-saffron transition-colors w-fit">Events</Link>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-white font-medium mb-2">Engage</h4>
          <Link href="/donate" className="hover:text-saffron transition-colors w-fit">Donate</Link>
          <a href="mailto:contact@unitedsikhmovement.org" className="hover:text-saffron transition-colors w-fit">Contact</a>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-white font-medium mb-2">Join Our Newsletter</h4>
          <p className="text-warm-gray text-sm mb-2">Stay updated on events, mentorship opportunities, and community news.</p>
          <EmailSignup theme="dark" />
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-warm-gray">
        <p>© {new Date().getFullYear()} United Sikh Movement. All rights reserved.</p>
        <p>United Sikh Movement is a registered 501(c)(3) non-profit organization.</p>
      </div>
    </footer>
  );
}
