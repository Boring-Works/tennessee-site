"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/lectures", label: "Lectures" },
  { href: "/first-250", label: "First 250" },
  { href: "/visit", label: "Visit" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-lg"
          : isHome
          ? "bg-transparent"
          : "bg-primary"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm">
            <span
              className={`text-sm uppercase tracking-[0.2em] font-semibold transition-colors ${
                scrolled || !isHome
                  ? "text-white"
                  : "text-white group-hover:text-white"
              }`}
            >
              Rocky Mount
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative text-sm uppercase tracking-[0.1em] transition-colors rounded-sm px-1 py-0.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-white hover:text-accent transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-4 space-y-4 border-t border-white/20">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block text-sm uppercase tracking-[0.1em] transition-colors py-2 rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </nav>
    </header>
  );
}
