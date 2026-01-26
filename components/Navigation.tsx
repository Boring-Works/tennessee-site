"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Header/Header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/lectures", label: "Lectures" },
  { href: "/first-250", label: "First 250" },
  { href: "/almanac", label: "Almanac" },
];

// Period-authentic wax seal emblem
const WaxSeal = () => (
  <div className={styles["nav-seal"]} aria-hidden="true">
    <span className={styles["nav-seal-inner"]}>RM</span>
  </div>
);

// Period-styled hamburger icon (quill-inspired strokes)
const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={styles["nav-menu-icon"]}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    {isOpen ? (
      <>
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M6 18L18 6"
        />
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M6 6l12 12"
        />
      </>
    ) : (
      <>
        {/* Quill-inspired strokes with varying widths */}
        <path
          strokeLinecap="round"
          strokeWidth={2}
          d="M4 6h16"
          className={`${styles["nav-menu-stroke"]} ${styles["nav-menu-stroke--1"]}`}
        />
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M6 12h12"
          className={`${styles["nav-menu-stroke"]} ${styles["nav-menu-stroke--2"]}`}
        />
        <path
          strokeLinecap="round"
          strokeWidth={1}
          d="M8 18h8"
          className={`${styles["nav-menu-stroke"]} ${styles["nav-menu-stroke--3"]}`}
        />
      </>
    )}
  </svg>
);

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
    <>
      {/* Skip to main content - accessibility (global class) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`${styles["site-header"]} ${
          scrolled
            ? styles["site-header--scrolled"]
            : isHome
            ? styles["site-header--transparent"]
            : styles["site-header--solid"]
        }`}
      >
        {/* Gold top border when scrolled */}
        <div className={styles["header-gold-border"]} aria-hidden="true" />

        <nav className={styles["nav-container"]}>
          <div className={styles["nav-inner"]}>
            {/* Logo with wax seal and ornate flourishes */}
            <Link href="/" className={styles["nav-logo"]}>
              <WaxSeal />
              <span className={styles["nav-logo-flourish"]} aria-hidden="true">❧</span>
              <span className={styles["nav-logo-text"]}>Rocky Mount</span>
              <span className={`${styles["nav-logo-flourish"]} ${styles["nav-logo-flourish--flip"]}`} aria-hidden="true">❧</span>
              <span className={styles["nav-logo-year"]}>1790</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className={styles["nav-links"]} role="menubar">
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`${styles["nav-link"]} ${isActive(link.href) ? styles["nav-link--active"] : ""}`}
                  >
                    {link.label}
                    <span className={styles["nav-link-underline"]} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <Link href="/visit" className={styles["nav-cta"]}>
              <span className={styles["nav-cta-seal"]} aria-hidden="true">★</span>
              <span className={styles["nav-cta-text"]}>Plan Your Visit</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={styles["nav-mobile-toggle"]}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon isOpen={mobileMenuOpen} />
            </button>
          </div>

          {/* Decorative bottom rule when scrolled */}
          <div className={`${styles["nav-bottom-rule"]} ${scrolled ? styles["nav-bottom-rule--visible"] : ""}`} aria-hidden="true">
            <span className={styles["nav-bottom-rule-line"]} />
            <span className={styles["nav-bottom-rule-ornament"]}>✦</span>
            <span className={styles["nav-bottom-rule-line"]} />
          </div>

          {/* Mobile Navigation */}
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className={`${styles["nav-mobile"]} ${mobileMenuOpen ? styles["nav-mobile--open"] : ""}`}
          >
            {/* Mobile menu header with seal */}
            <div className={styles["nav-mobile-header"]}>
              <div className={styles["nav-mobile-seal"]} aria-hidden="true">
                <span className={styles["nav-mobile-seal-inner"]}>RM</span>
              </div>
              <span className={styles["nav-mobile-tagline"]}>Est. 1770</span>
            </div>

            <ul className={styles["nav-mobile-links"]}>
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  {/* Heritage divider between items */}
                  {index > 0 && (
                    <span className={styles["nav-mobile-divider"]} aria-hidden="true">
                      <span className={styles["nav-mobile-divider-line"]} />
                      <span className={styles["nav-mobile-divider-star"]}>★</span>
                      <span className={styles["nav-mobile-divider-line"]} />
                    </span>
                  )}
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`${styles["nav-mobile-link"]} ${isActive(link.href) ? styles["nav-mobile-link--active"] : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={styles["nav-mobile-link-bullet"]} aria-hidden="true">◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <Link
              href="/visit"
              className={styles["nav-mobile-cta"]}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className={styles["nav-mobile-cta-seal"]} aria-hidden="true">★</span>
              Plan Your Visit
            </Link>

            {/* Mobile menu footer flourish */}
            <div className={styles["nav-mobile-footer"]} aria-hidden="true">
              <span className={styles["nav-mobile-footer-flourish"]}>❧</span>
              <span className={styles["nav-mobile-footer-text"]}>Where Tennessee Began</span>
              <span className={`${styles["nav-mobile-footer-flourish"]} ${styles["nav-mobile-footer-flourish--flip"]}`}>❧</span>
            </div>
          </nav>
        </nav>

        {/* Parchment texture overlay when scrolled */}
        <div className={styles["header-texture"]} aria-hidden="true" />
      </header>
    </>
  );
}
