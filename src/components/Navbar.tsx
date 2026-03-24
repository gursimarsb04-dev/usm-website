"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/find-ssa", label: "Find an SSA" },
    { href: "/events", label: "Events" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#FF6B00]">USM</span>
              <span className="text-xs text-[#1a1a2e] font-medium leading-none">
                United Sikh Movement
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="px-6 py-2 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-[#E55A00] transition-colors"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#1a1a2e] hover:text-[#FF6B00] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/donate"
                className="px-6 py-2 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-[#E55A00] transition-colors text-center"
                onClick={toggleMenu}
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
