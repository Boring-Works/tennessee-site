'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { logger } from '@/lib/logger'

interface ShareButtonProps {
  frontierLine?: string
  modernLine?: string
  temperature: number
  location: string
  condition?: string
  iconOnly?: boolean
}

export default function ShareButton({
  frontierLine,
  modernLine,
  temperature,
  location,
  condition,
  iconOnly = false,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })

    let text: string
    if (frontierLine) {
      text = modernLine
        ? `Today's Briefing from The 1775 Almanac\n${today} | ${location}\n\n1775: "${frontierLine}"\n2026: "${modernLine}"\n\nCurrently ${Math.round(temperature)}F\n\ntennessee-starts-here.vercel.app/almanac`
        : `Today's Briefing from The 1775 Almanac\n${today} | ${location}\n\n"${frontierLine}"\n\nCurrently ${Math.round(temperature)}F\n\ntennessee-starts-here.vercel.app/almanac`
    } else {
      text = `The 1775 Almanac\n${today} | ${location}\n\n${condition ? `${condition} - ` : ''}${Math.round(temperature)}F\n\ntennessee-starts-here.vercel.app/almanac`
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      logger.error('Failed to copy:', err)
    }
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleShare}
        className="p-1.5 rounded bg-almanac-gold/10 hover:bg-almanac-gold/20 text-almanac-parchment/50 hover:text-almanac-gold transition-colors"
        aria-label="Share today's briefing"
        title="Share today's briefing"
      >
        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      </button>
    )
  }

  return (
    <button
      type="button"
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
