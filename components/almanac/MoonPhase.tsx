'use client'

import type { MoonData } from '@/lib/almanac/types'

interface MoonPhaseProps {
  moon: MoonData
}

export function MoonPhase({ moon }: MoonPhaseProps) {
  const illuminationPercent = Math.round(moon.illumination * 100)

  return (
    <div className="bg-white/5 border border-white/10 rounded-sm p-4 text-center">
      <span className="text-4xl">{moon.emoji}</span>
      <p className="font-serif text-lg text-gold-leaf mt-2">{moon.phaseName}</p>
      <p className="text-sm text-almanac-parchment/50">{illuminationPercent}% illuminated</p>
    </div>
  )
}
