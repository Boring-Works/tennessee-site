'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { logger } from '@/lib/logger'

interface ShareButtonProps {
  frontierLine: string
  modernLine?: string
  temperature: number
  location: string
}

export default function ShareButton({
  frontierLine,
  modernLine,
  temperature,
  location,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })

    const text = modernLine
      ? `Today's Briefing from The 1775 Almanac\n${today} | ${location}\n\n1775: "${frontierLine}"\n2026: "${modernLine}"\n\nCurrently ${Math.round(temperature)}F\n\ntennessee-starts-here.vercel.app/almanac`
      : `Today's Briefing from The 1775 Almanac\n${today} | ${location}\n\n"${frontierLine}"\n\nCurrently ${Math.round(temperature)}F\n\ntennessee-starts-here.vercel.app/almanac`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      logger.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs text-almanac-parchment/40 hover:text-almanac-gold transition-colors mt-3"
      aria-label="Share today's briefing"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>Share today&apos;s briefing</span>
        </>
      )}
    </button>
  )
}
