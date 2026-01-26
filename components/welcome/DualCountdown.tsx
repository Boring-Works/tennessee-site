'use client'

import { useEffect, useState } from 'react'

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function DualCountdown() {
  const [daysAmerica, setDaysAmerica] = useState<number>(getDaysUntil('2026-07-04'))
  const [daysTennessee, setDaysTennessee] = useState<number>(getDaysUntil('2026-06-01'))

  useEffect(() => {
    // Update at midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeout = setTimeout(() => {
      setDaysAmerica(getDaysUntil('2026-07-04'))
      setDaysTennessee(getDaysUntil('2026-06-01'))
    }, msUntilMidnight)

    return () => clearTimeout(timeout)
  }, [daysAmerica, daysTennessee])

  return (
    <div className="dual-countdown">
      <div className="countdown-item">
        <span className="countdown-label">AMERICA 250</span>
        <span className="countdown-days">{daysAmerica} days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-label">TENNESSEE 230</span>
        <span className="countdown-days">{daysTennessee} days</span>
      </div>
    </div>
  )
}
