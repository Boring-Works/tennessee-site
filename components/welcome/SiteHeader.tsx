'use client'

import Link from 'next/link'
import { useEffect, useSyncExternalStore } from 'react'
import { getSiteStatus } from '@/lib/siteHours'

interface DisplayStatus {
  isOpen: boolean
  message: string
  cta: string
}

/**
 * Transform site status into positive, inviting display messages
 * Never says "Closed" - focuses on when you CAN visit
 */
function getDisplayStatus(): DisplayStatus {
  const status = getSiteStatus()

  // Currently open - celebrate it
  if (status.isOpen) {
    const closeTime = status.message.match(/(\d+:\d+ [AP]M)/)?.[1] || '5:00 PM'
    return {
      isOpen: true,
      message: `Open until ${closeTime}`,
      cta: 'Visit today',
    }
  }

  // Off-season - focus on season opening
  if (status.reason === 'Before operating season' || status.reason === 'After operating season') {
    if (status.nextOpen) {
      const openDate = status.nextOpen.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
      return {
        isOpen: false,
        message: `Opens ${openDate}`,
        cta: 'Start planning',
      }
    }
    return {
      isOpen: false,
      message: 'Seasonal site',
      cta: 'Plan ahead',
    }
  }

  // Not an open day (Sun-Tue) - show regular hours
  if (status.reason === 'Not an open day') {
    return {
      isOpen: false,
      message: 'Wed–Sat 10am–5pm',
      cta: 'Plan your visit',
    }
  }

  // Special event prep - show the event info
  if (status.reason.includes('Preparing')) {
    return {
      isOpen: false,
      message: status.specialHours?.eventTitle || 'Special event tonight',
      cta: 'See details',
    }
  }

  // Default: show hours info positively
  return {
    isOpen: false,
    message: 'Wed–Sat 10am–5pm',
    cta: 'Plan your visit',
  }
}

// Store for display status - allows use with useSyncExternalStore
let currentDisplay: DisplayStatus | null = null
const statusListeners = new Set<() => void>()

function subscribeToStatus(callback: () => void) {
  statusListeners.add(callback)
  return () => statusListeners.delete(callback)
}

function getStatusSnapshot(): DisplayStatus | null {
  return currentDisplay
}

function getServerStatusSnapshot(): DisplayStatus | null {
  return null // Return null on server to avoid hydration mismatch
}

// Use useSyncExternalStore for client detection
const emptySubscribe = () => () => {}

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function SiteHeader() {
  const isClient = useIsClient()
  const display = useSyncExternalStore(
    subscribeToStatus,
    getStatusSnapshot,
    getServerStatusSnapshot
  )

  // Initialize status on mount and set up interval for updates
  useEffect(() => {
    // Initialize the status store
    currentDisplay = getDisplayStatus()
    statusListeners.forEach((listener) => listener())

    // Update every minute to catch opening/closing transitions
    const interval = setInterval(() => {
      currentDisplay = getDisplayStatus()
      statusListeners.forEach((listener) => listener())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Show static version during SSR or before client hydration
  if (!isClient || !display) {
    return (
      <Link
        href="/visit"
        className="site-header"
        aria-label="View visiting information for Rocky Mount"
      >
        <span className="site-header-content">
          <span className="site-header-location">Sullivan County</span>
        </span>
        <span className="site-header-cta">Plan your visit &rarr;</span>
      </Link>
    )
  }

  return (
    <Link
      href="/visit"
      className="site-header"
      aria-label="View visiting information for Rocky Mount"
    >
      <span className="site-header-content">
        <span className="site-header-location">Sullivan County</span>
        <span className="site-header-separator" aria-hidden="true">
          ·
        </span>
        <span className={`site-header-status ${display.isOpen ? 'site-header-status--open' : ''}`}>
          {display.message}
        </span>
      </span>
      <span className="site-header-cta">{display.cta} &rarr;</span>
    </Link>
  )
}
