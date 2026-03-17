"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
            <Link href="/about" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors">
              About
            </Link>

            {/* Programs Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors"
              >
                Programs
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link href="/programs" className="block px-4 py-2 text-sm text-[#1a1a2e] hover:bg-[#F8F9FA] hover:text-[#FF6B00]" onClick={() => setIsDropdownOpen(false)}>
                    All Programs
                  </Link>
                  <Link href="/find-ssa" className="block px-4 py-2 text-sm text-[#1a1a2e] hover:bg-[#F8F9FA] hover:text-[#FF6B00]" onClick={() => setIsDropdownOpen(false)}>
                    Find Your SSA
                  </Link>
                </div>
              )}
            </div>

            <Link href="/get-involved" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors">
              Get Involved
            </Link>
            <Link href="/volunteer" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors">
              Volunteer
            </Link>
            <Link href="/contact" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors">
              Contact
            </Link>
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
              <Link href="/about" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors" onClick={toggleMenu}>
                About
              </Link>
              <Link href="/programs" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors" onClick={toggleMenu}>
                Programs
              </Link>
              <Link href="/find-ssa" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors" onClick={toggleMenu}>
                Find Your SSA
              </Link>
              <Link href="/get-involved" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors" onClick={toggleMenu}>
                Get Involved
              </Link>
              <Link href="/volunteer" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors" onClick={toggleMenu}>
                Volunteer
              </Link>
              <Link href="/contact" className="text-[#1a1a2e] hover:text-[#FF6B00] font-medium transition-colors" onClick={toggleMenu}>
                Contact
              </Link>
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