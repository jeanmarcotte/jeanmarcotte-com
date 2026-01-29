"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap: focus the close button when menu opens
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
        isOpen ? "visible" : "invisible"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-charcoal-950 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end px-6 py-5">
          <button
            ref={closeButtonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ivory-200 transition-colors duration-300 hover:text-gold-300"
            onClick={onClose}
            aria-label="Close navigation menu"
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
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-1 flex-col justify-center px-10">
          <ul className="space-y-8" role="list">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${150 + index * 50}ms` : "0ms",
                  transitionTimingFunction:
                    "cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <Link
                  href={item.href}
                  className="font-serif text-3xl text-ivory-100 transition-colors duration-300 hover:text-gold-300"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div
            className={`mt-12 transition-all duration-500 ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? "450ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <Link
              href="/contact"
              className="inline-block rounded-sm border border-gold-400/60 px-8 py-3 text-label text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10"
              onClick={onClose}
            >
              Book a Consultation
            </Link>
          </div>
        </nav>

        {/* Bottom brand */}
        <div className="px-10 pb-10">
          <p className="text-label text-warm-gray-600">
            Premium Wedding Photography
          </p>
        </div>
      </div>
    </div>
  );
}
