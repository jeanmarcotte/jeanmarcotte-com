"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Venues", href: "/venues" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          isScrolled
            ? "bg-charcoal-950/95 backdrop-blur-md shadow-editorial"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"
          aria-label="Main navigation"
        >
          {/* Logo / Brand */}
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-ivory-50 transition-opacity duration-300 hover:opacity-80 md:text-2xl"
            aria-label="Jean Marcotte - Home"
          >
            Jean Marcotte
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 lg:flex" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="accent-underline text-label text-ivory-200 transition-colors duration-300 hover:text-ivory-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden rounded-sm border border-gold-400/60 px-5 py-2 text-label text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-200 lg:inline-block"
          >
            Book a Consultation
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ivory-100 transition-colors duration-300 hover:text-gold-300 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
