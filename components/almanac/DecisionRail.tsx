'use client'

import { useMemo } from 'react'
import {
  AlertTriangle,
  Flame,
  TrendingUp,
  TrendingDown,
  Snowflake,
  ThermometerSnowflake,
} from 'lucide-react'

interface DecisionCard {
  id: string
  priority: number // lower = more urgent
  title: string
  value: string
  icon: React.ReactNode
  color: 'red' | 'amber' | 'blue' | 'green' | 'gray'
  show: boolean
}

interface DecisionRailProps {
  // Alerts
  hasActiveAlert?: boolean
  alertTitle?: string

  // Burn day
  burnDayStatus?: 'burn' | 'no-burn' | 'unknown'

  // Temperature anomaly
  tempAnomaly?: {
    diff: number
    description: string
  }

  // Freeze/frost info
  freezeInfo?: {
    isBelow32: boolean
    nextFreezeHours?: number
    frostRisk: boolean
  }
}

export function DecisionRail({
  hasActiveAlert,
  alertTitle,
  burnDayStatus,
  tempAnomaly,
  freezeInfo,
}: DecisionRailProps) {
  const cards = useMemo(() => {
    const allCards: DecisionCard[] = []

    // 1. Active NWS Alert (highest priority)
    if (hasActiveAlert && alertTitle) {
      allCards.push({
        id: 'alert',
        priority: 1,
        title: 'Active Alert',
        value: alertTitle,
        icon: <AlertTriangle className="w-4 h-4" />,
        color: 'red',
        show: true,
      })
    }

    // 2. Freeze/Frost Warning
    if (freezeInfo?.isBelow32) {
      allCards.push({
        id: 'freeze',
        priority: 2,
        title: 'Below Freezing',
        value: 'Protect plants & pipes',
        icon: <Snowflake className="w-4 h-4" />,
        color: 'blue',
        show: true,
      })
    } else if (freezeInfo?.frostRisk) {
      allCards.push({
        id: 'frost',
        priority: 3,
        title: 'Frost Risk',
        value: 'Cover tender plants tonight',
        icon: <ThermometerSnowflake className="w-4 h-4" />,
        color: 'blue',
        show: true,
      })
    } else if (freezeInfo?.nextFreezeHours && freezeInfo.nextFreezeHours <= 12) {
      allCards.push({
        id: 'freeze-coming',
        priority: 3,
        title: `Freeze in ${freezeInfo.nextFreezeHours}h`,
        value: 'Prepare for cold',
        icon: <Snowflake className="w-4 h-4" />,
        color: 'blue',
        show: true,
      })
    }

    // 3. Burn Day Status (only if relevant - during burn season)
    if (burnDayStatus === 'no-burn') {
      allCards.push({
        id: 'burn',
        priority: 4,
        title: 'No Burn Day',
        value: 'Outdoor burning prohibited',
        icon: <Flame className="w-4 h-4" />,
        color: 'red',
        show: true,
      })
    } else if (burnDayStatus === 'burn') {
      allCards.push({
        id: 'burn',
        priority: 8,
        title: 'Burn Day',
        value: 'Burning permitted with permit',
        icon: <Flame className="w-4 h-4" />,
        color: 'green',
        show: true,
      })
    }

    // 4. Temperature anomaly (if significant)
    if (tempAnomaly && Math.abs(tempAnomaly.diff) >= 5) {
      const isWarmer = tempAnomaly.diff > 0
      allCards.push({
        id: 'anomaly',
        priority: 6,
        title: 'Today vs Normal',
        value: tempAnomaly.description,
        icon: isWarmer ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />,
        color: isWarmer ? 'amber' : 'blue',
        show: true,
      })
    }

    // Sort by priority and take top 3
    return allCards
      .filter((c) => c.show)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3)
  }, [hasActiveAlert, alertTitle, burnDayStatus, tempAnomaly, freezeInfo])

  const colorClasses = {
    red: 'bg-red-900/30 border-red-500/40 text-red-300',
    amber: 'bg-amber-900/20 border-amber-500/30 text-amber-300',
    blue: 'bg-blue-900/20 border-blue-500/30 text-blue-300',
    green: 'bg-green-900/20 border-green-500/30 text-green-300',
    gray: 'bg-white/5 border-white/10 text-almanac-parchment/70',
  }

  if (cards.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex items-center justify-center">
        <p className="text-sm text-almanac-parchment/50 text-center">No urgent conditions</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`rounded-lg border p-3 flex items-start gap-2 ${colorClasses[card.color]}`}
        >
          <div className="flex-shrink-0 mt-0.5">{card.icon}</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{card.title}</p>
            <p className="text-sm mt-0.5 leading-tight">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
