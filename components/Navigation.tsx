"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/wealth-waterfall", label: "Wealth Waterfall" },
    { href: "/notary", label: "Notary Services" },
    {
      href: status === "authenticated" ? "/finclear/app" : "/finclear",
      label: "FinClear",
      special: "finclear" as const,
    },
    { href: "/contact", label: "Book a Consultation", special: "cta" as const },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-gold">
              Signature
            </span>
            <span className="text-sm text-slate tracking-widest uppercase">
              By Tunde O
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  link.special === "cta"
                    ? "bg-gold text-navy px-5 py-2.5 rounded font-semibold hover:bg-gold-light"
                    : link.special === "finclear"
                    ? "text-emerald-400 hover:text-emerald-300 font-medium"
                    : "text-cream/80 hover:text-gold"
                }`}
              >
                {link.special === "finclear" && (
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 align-middle" />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-light border-t border-gold/20 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm tracking-wide py-2 ${
                  link.special === "cta"
                    ? "bg-gold text-navy px-4 py-3 rounded font-semibold text-center"
                    : link.special === "finclear"
                    ? "text-emerald-400"
                    : "text-cream/80 hover:text-gold"
                }`}
              >
                {link.special === "finclear" && (
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 align-middle" />
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
