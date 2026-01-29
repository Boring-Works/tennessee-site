'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import styles from './Header/Header.module.css'

interface NavItem {
  href?: string
  label: string
  dropdown?: Array<{ href: string; label: string }>
}

const NAV_STRUCTURE: NavItem[] = [
  { href: '/visit', label: 'Visit' },
  {
    label: 'Events & Programs',
    dropdown: [
      { href: '/events', label: '2026 Events Calendar' },
      { href: '/programs', label: 'Recurring Programs' },
      { href: '/lectures', label: 'Lecture Series' },
    ],
  },
  { href: '/membership', label: 'Membership' },
  {
    label: 'The Region',
    dropdown: [{ href: '/explore', label: 'Explore the Original Seven' }],
  },
  { href: '/evidence', label: 'Evidence' },
  { href: '/educators', label: 'Educators' },
  { href: '/support', label: 'Support' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState<Set<string>>(new Set())
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
      // Escape closes dropdown or mobile menu
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        if (mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
      }

      // Focus trap in mobile menu
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
    (href?: string) => {
      if (!href) return false
      if (href === '/') return pathname === '/' || pathname === '/home'
      // Exact match or starts with href followed by /
      return pathname === href || pathname.startsWith(href + '/')
    },
    [pathname]
  )

  // Check if any item in dropdown is active
  const isDropdownActive = useCallback(
    (items?: Array<{ href: string; label: string }>) => {
      if (!items) return false
      return items.some((item) => isActive(item.href))
    },
    [isActive]
  )

  // Pages with light backgrounds need dark header
  const isLightBackgroundPage = pathname.startsWith('/evidence/documents')

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-dropdown-menu]')) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown])

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  // Hover handlers for desktop dropdowns
  const handleDropdownHover = useCallback((label: string, isEntering: boolean) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }

    if (isEntering) {
      // Small delay to prevent accidental opens
      dropdownTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(label)
      }, 150)
    } else {
      // Delay to allow moving to dropdown
      dropdownTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(null)
      }, 100)
    }
  }, [])

  // Mobile dropdown toggle
  const toggleMobileDropdown = useCallback((label: string) => {
    setExpandedMobileDropdowns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(label)) {
        newSet.delete(label)
      } else {
        newSet.add(label)
      }
      return newSet
    })
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
            <nav className={styles.nav} aria-label="Main navigation" data-dropdown-menu>
              <ul className={styles['nav-list']} role="menubar">
                {NAV_STRUCTURE.map((item) => (
                  <li key={item.label} role="none" className={styles['nav-item']}>
                    {item.dropdown ? (
                      // Dropdown item
                      <div
                        className={styles['dropdown-wrapper']}
                        onMouseEnter={() => handleDropdownHover(item.label, true)}
                        onMouseLeave={() => handleDropdownHover(item.label, false)}
                      >
                        <button
                          role="menuitem"
                          aria-haspopup="true"
                          aria-expanded={openDropdown === item.label}
                          className={`${styles['dropdown-toggle']} ${
                            isDropdownActive(item.dropdown) ? styles['dropdown-toggle--active'] : ''
                          }`}
                          onClick={() =>
                            setOpenDropdown(openDropdown === item.label ? null : item.label)
                          }
                        >
                          {item.label}
                          <ChevronDown
                            size={14}
                            className={styles['dropdown-chevron']}
                            aria-hidden="true"
                          />
                          <span
                            className={styles['dropdown-toggle-underline']}
                            aria-hidden="true"
                          />
                        </button>

                        {/* Dropdown menu */}
                        <ul
                          role="menu"
                          className={styles['dropdown-menu']}
                          aria-hidden={openDropdown !== item.label}
                        >
                          {item.dropdown.map((subitem) => (
                            <li key={subitem.href} role="none">
                              <Link
                                href={subitem.href}
                                role="menuitem"
                                aria-current={isActive(subitem.href) ? 'page' : undefined}
                                className={`${styles['dropdown-item']} ${
                                  isActive(subitem.href) ? styles['dropdown-item--active'] : ''
                                }`}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subitem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      // Regular link item
                      <Link
                        href={item.href!}
                        role="menuitem"
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={`${styles['nav-link']} ${
                          isActive(item.href) ? styles['nav-link--active'] : ''
                        }`}
                      >
                        {item.label}
                        <span className={styles['nav-link-underline']} aria-hidden="true" />
                        <span className={styles['nav-link-glow']} aria-hidden="true" />
                      </Link>
                    )}
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
              {NAV_STRUCTURE.map((item, index) => (
                <li key={item.label}>
                  {item.dropdown ? (
                    // Mobile dropdown (accordion)
                    <div className={styles['mobile-dropdown-wrapper']}>
                      <button
                        className={`${styles['mobile-link']} ${
                          isDropdownActive(item.dropdown) ? styles['mobile-link--active'] : ''
                        }`}
                        onClick={() => toggleMobileDropdown(item.label)}
                        aria-expanded={expandedMobileDropdowns.has(item.label)}
                        style={{ transitionDelay: `${100 + index * 50}ms` }}
                      >
                        <span className={styles['mobile-link-text']}>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`${styles['mobile-dropdown-icon']} ${
                            expandedMobileDropdowns.has(item.label)
                              ? styles['mobile-dropdown-icon--open']
                              : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Mobile accordion items */}
                      <ul
                        className={`${styles['mobile-dropdown-list']} ${
                          expandedMobileDropdowns.has(item.label)
                            ? styles['mobile-dropdown-list--open']
                            : ''
                        }`}
                      >
                        {item.dropdown.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className={`${styles['mobile-dropdown-link']} ${
                                isActive(subitem.href) ? styles['mobile-dropdown-link--active'] : ''
                              }`}
                              onClick={closeMobileMenu}
                            >
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    // Regular mobile link
                    <Link
                      href={item.href!}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`${styles['mobile-link']} ${
                        isActive(item.href) ? styles['mobile-link--active'] : ''
                      }`}
                      onClick={closeMobileMenu}
                      style={{ transitionDelay: `${100 + index * 50}ms` }}
                    >
                      <span className={styles['mobile-link-text']}>{item.label}</span>
                    </Link>
                  )}
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
