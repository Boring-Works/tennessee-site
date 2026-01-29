'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

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

export function SiteHeader() {
  // Initialize with current operating status
  const [status, setStatus] = useState<OperatingStatus | null>(() => getOperatingStatus())

  useEffect(() => {
    // Update status every minute to catch opening/closing transitions
    const interval = setInterval(() => {
      setStatus(getOperatingStatus())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Show static version during SSR to avoid hydration mismatch
  if (!status) {
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
