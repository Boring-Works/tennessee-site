'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import styles from './Header/Header.module.css'

const NAV_LINKS = [
  { href: '/visit', label: 'Visit' },
  { href: '/programs', label: 'Programs' },
  { href: '/events', label: 'Events' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/explore', label: 'Explore' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/educators', label: 'Educators' },
  { href: '/support', label: 'Support' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top + focus management on route change
  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Move focus to main heading for better keyboard navigation
    // Give page time to render, then focus first h1
    const focusHeading = () => {
      const mainHeading = document.querySelector('main h1, main [role="heading"][aria-level="1"]')
      if (mainHeading instanceof HTMLElement) {
        mainHeading.setAttribute('tabindex', '-1')
        mainHeading.focus({ preventScroll: true })
        // Remove tabindex after focus to preserve natural tab order
        mainHeading.addEventListener(
          'blur',
          () => {
            mainHeading.removeAttribute('tabindex')
          },
          { once: true }
        )
      }
    }

    // Small delay to let page content render
    const timeoutId = setTimeout(focusHeading, 100)
    return () => clearTimeout(timeoutId)
  }, [pathname])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Scroll lock + escape key + focus trap
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`

      // Focus first interactive element
      const firstFocusable = menuRef.current?.querySelector('a, button')
      if (firstFocusable) (firstFocusable as HTMLElement).focus()
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }

      // Focus trap
      if (e.key === 'Tab' && mobileMenuOpen && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll('a, button')
        const first = focusables[0] as HTMLElement
        const last = focusables[focusables.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [mobileMenuOpen])

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/' || pathname === '/home'
      // Exact match or starts with href followed by /
      return pathname === href || pathname.startsWith(href + '/')
    },
    [pathname]
  )

  // Pages with light backgrounds need dark header
  const isLightBackgroundPage = pathname.startsWith('/evidence/documents')

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`${styles.header} ${
          isScrolled || mobileMenuOpen || isLightBackgroundPage
            ? styles['header--scrolled']
            : styles['header--transparent']
        }`}
        role="banner"
      >
        {/* Tricolor stripe - appears on scroll or light backgrounds */}
        <div
          className={`${styles.stripe} ${isScrolled || isLightBackgroundPage ? styles['stripe--visible'] : ''}`}
          aria-hidden="true"
        >
          <span className={styles['stripe--crimson']} />
          <span className={styles['stripe--gold']} />
          <span className={styles['stripe--federal']} />
        </div>

        <div className={styles.container}>
          <div className={styles.inner}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <div className={styles['logo-stack']}>
                <span className={styles['logo-text']}>ROCKY MOUNT</span>
                <div
                  className={`${styles['logo-tagline']} ${isScrolled ? styles['logo-tagline--hidden'] : ''}`}
                >
                  <span className={styles['logo-tagline-text']}>Tennessee starts here</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className={styles.nav} aria-label="Main navigation">
              <ul className={styles['nav-list']} role="menubar">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={`${styles['nav-link']} ${
                        isActive(link.href) ? styles['nav-link--active'] : ''
                      }`}
                    >
                      {link.label}
                      <span className={styles['nav-link-underline']} aria-hidden="true" />
                      <span className={styles['nav-link-glow']} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <span className={styles['nav-divider']} aria-hidden="true" />

              {/* CTA - Primary */}
              <Link href="/visit" className={styles.cta}>
                <span className={styles['cta-text']}>Plan Your Visit</span>
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              type="button"
              className={styles['mobile-toggle']}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Decorative bottom rule - appears on scroll */}
          <div
            className={`${styles['bottom-rule']} ${isScrolled ? styles['bottom-rule--visible'] : ''}`}
            aria-hidden="true"
          >
            <span className={styles['bottom-rule-line']} />
            <span className={styles['bottom-rule-ornament']}>✦</span>
            <span className={styles['bottom-rule-line']} />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobile} ${mobileMenuOpen ? styles['mobile--open'] : ''}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div className={styles['mobile-backdrop']} onClick={closeMobileMenu} />

        {/* Drawer */}
        <div className={styles['mobile-drawer']}>
          {/* Content */}
          <nav className={styles['mobile-nav']}>
            <ul className={styles['mobile-list']}>
              {NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`${styles['mobile-link']} ${
                      isActive(link.href) ? styles['mobile-link--active'] : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                  >
                    <span className={styles['mobile-link-text']}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Separator */}
            <div className={styles['mobile-separator']} aria-hidden="true" />

            {/* Mobile CTA - Primary */}
            <Link href="/visit" className={styles['mobile-cta']} onClick={closeMobileMenu}>
              <span>Plan Your Visit</span>
            </Link>

            {/* Tagline - plain text, no flourishes */}
            <p className={styles['mobile-tagline']}>Tennessee starts here</p>
          </nav>
        </div>
      </div>
    </>
  )
}
