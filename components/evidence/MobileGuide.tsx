'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Section {
  id: string
  label: string
}

interface MobileGuideProps {
  sections: Section[]
}

export function MobileGuide({ sections }: MobileGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Show guide after scrolling past hero (300px)
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    // Track active section with Intersection Observer
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      // Clear any pending scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [sections])

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false)
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    // Small delay to allow menu close animation
    scrollTimeoutRef.current = setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <>
      {/* Guide Button - only visible on mobile/tablet */}
      <div
        className={`fixed bottom-6 right-6 z-[50] lg:hidden transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        {/* Expanded Menu */}
        <div
          className={`absolute bottom-full right-0 mb-3 w-48 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <nav
            className="bg-[#faf7f0] border border-[#c9a227]/30 rounded-sm shadow-lg overflow-hidden"
            aria-label="Page sections"
          >
            <div className="px-3 py-2 border-b border-[#c9a227]/20 flex items-center justify-between">
              <span className="text-xs font-serif text-[#c9a227] uppercase tracking-wider">
                Guide
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#3d3229]/50 hover:text-[#3d3229] p-1"
                aria-label="Close guide"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
            <ul className="py-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 text-sm font-serif transition-colors flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'text-[#c9a227] bg-[#c9a227]/10'
                        : 'text-[#3d3229] hover:bg-[#3d3229]/5'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        activeSection === section.id ? 'bg-[#c9a227]' : 'bg-[#3d3229]/20'
                      }`}
                    />
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-3 py-2 border-t border-[#c9a227]/20">
              <Link
                href="/evidence/library"
                className="flex items-center gap-2 text-xs text-[#8b4513] hover:text-[#c9a227] transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Full Document Library
              </Link>
            </div>
          </nav>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-sm shadow-lg transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? 'bg-[#c9a227] text-[#2a1f1a]'
              : 'bg-[#2a1f1a] text-[#c9a227] border border-[#c9a227]/50'
          }`}
          aria-expanded={isOpen}
          aria-label="Toggle navigation guide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </>
  )
}
