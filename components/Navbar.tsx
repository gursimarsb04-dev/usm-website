"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/find-ssa", label: "Find an SSA" },
  { href: "/events", label: "Events" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Trap focus and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    // We add a wrapper to center the absolute/fixed navbar
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between bg-white/70 backdrop-blur-xl border border-off-white shadow-[0_4px_32px_rgba(0,0,0,0.05)] rounded-full px-4 md:px-6 py-3 md:py-4 w-full max-w-5xl transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-full">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-navy rounded-full flex items-center justify-center text-white font-display font-semibold text-lg pb-[1px]">
            U
          </div>
          <span className="hidden sm:block font-display font-semibold text-xl tracking-tight text-navy">
            USM
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-md px-2 py-1 ${
                  pathname === link.href ? "text-navy font-semibold" : "text-slate-body hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/donate"
            className="group flex items-center gap-2 bg-saffron text-navy px-6 py-2.5 rounded-full font-medium transition-all hover:bg-saffron-light active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            <span>Donate</span>
            <div className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight weight="bold" className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-navy/5 text-navy hover:bg-navy/10 transition-colors z-[60] outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {isOpen ? <X weight="bold" className="w-5 h-5" /> : <List weight="bold" className="w-5 h-5" />}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 min-h-[100dvh] bg-navy/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center md:hidden pointer-events-auto"
          >
            <ul className="flex flex-col items-center gap-8 w-full px-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-display font-semibold text-white hover:text-saffron-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + links.length * 0.1, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/donate"
                  className="bg-saffron text-navy px-8 py-4 rounded-full font-medium text-xl flex items-center gap-3 transition-transform active:scale-95"
                >
                  <span>Support the Movement</span>
                  <ArrowRight weight="bold" className="w-5 h-5" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
