'use client'

import Link from 'next/link'
import { useEffect, useSyncExternalStore } from 'react'

interface OperatingStatus {
  isOpen: boolean
  message: string
}

/**
 * Get current operating status for Rocky Mount
 * Open Wed-Sat 10am-5pm, Season: March 4 - mid-December
 */
function getOperatingStatus(): OperatingStatus {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday, 6 = Saturday
  const hour = now.getHours()

  // Check if we're open Wed-Sat (3-6)
  const isOpenDay = day >= 3 && day <= 6

  // Check if within operating hours (10am-5pm)
  const isOpenHours = hour >= 10 && hour < 17

  // Note: Season dates (March 4 - mid-December) not enforced in this component
  // as the site should handle closed season messaging at a higher level

  if (isOpenDay && isOpenHours) {
    return {
      isOpen: true,
      message: 'Open Today · Wed-Sat 10am-5pm',
    }
  }

  return {
    isOpen: false,
    message: 'Open Wed-Sat 10am-5pm',
  }
}

// Store for operating status - allows use with useSyncExternalStore
let currentStatus: OperatingStatus | null = null
const statusListeners = new Set<() => void>()

function subscribeToStatus(callback: () => void) {
  statusListeners.add(callback)
  return () => statusListeners.delete(callback)
}

function getStatusSnapshot(): OperatingStatus | null {
  return currentStatus
}

function getServerStatusSnapshot(): OperatingStatus | null {
  return null // Return null on server to avoid hydration mismatch
}

function updateStatusStore() {
  currentStatus = getOperatingStatus()
  statusListeners.forEach((listener) => listener())
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
  const status = useSyncExternalStore(subscribeToStatus, getStatusSnapshot, getServerStatusSnapshot)

  // Initialize status on mount and set up interval for updates
  useEffect(() => {
    // Initialize the status store
    updateStatusStore()

    // Update status every minute to catch opening/closing transitions
    const interval = setInterval(updateStatusStore, 60000)

    return () => clearInterval(interval)
  }, [])

  // Show static version during SSR or before client hydration
  if (!isClient || !status) {
    return (
      <Link
        href="/visit"
        className="site-header"
        aria-label="View visiting information for Rocky Mount"
      >
        <span className="site-header-content">
          <span className="site-header-location">Sullivan County, Tennessee</span>
        </span>
        <span className="site-header-cta">Plan Your Visit &rarr;</span>
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
        <span className="site-header-location">Sullivan County, Tennessee</span>
        <span className="site-header-separator" aria-hidden="true">
          &middot;
        </span>
        <span className={`site-header-status ${status.isOpen ? 'site-header-status--open' : ''}`}>
          {status.message}
        </span>
      </span>
      <span className="site-header-cta">Plan Your Visit &rarr;</span>
    </Link>
  )
}
