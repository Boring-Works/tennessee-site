'use client'

import type { DocumentVerification } from '@/lib/evidence/types'

interface VerificationBadgeProps {
  verification: DocumentVerification
  size?: 'sm' | 'md'
}

const BADGE_CONFIG = {
  verified: {
    label: 'Verified',
    icon: '✓',
    className: 'bg-green-900/30 text-green-400 border-green-500/30',
  },
  'single-source': {
    label: 'Single Source',
    icon: '○',
    className: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30',
  },
  nuance: {
    label: 'Nuance',
    icon: '⚠',
    className: 'bg-orange-900/20 text-orange-400 border-orange-500/30',
  },
  'under-review': {
    label: 'Under Review',
    icon: '…',
    className: 'bg-gray-900/30 text-gray-400 border-gray-500/30',
  },
}

export function VerificationBadge({ verification, size = 'md' }: VerificationBadgeProps) {
  const config = BADGE_CONFIG[verification.status]

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <div className="group relative">
      <span
        className={`
          inline-flex items-center gap-1.5 rounded-full border
          font-medium cursor-help
          ${config.className}
          ${sizeClasses}
        `}
        title={verification.method || `${config.label}: ${verification.source_count} source(s)`}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>

      {/* Hover tooltip with details */}
      <div className="absolute top-full right-0 mt-2 w-64 p-3 rounded-lg bg-midnight border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        <p className="text-xs text-almanac-parchment/80">
          {verification.source_count} source{verification.source_count !== 1 ? 's' : ''} verified
        </p>
        {verification.method && (
          <p className="text-xs text-almanac-parchment/60 mt-1">{verification.method}</p>
        )}
        {verification.notes && (
          <p className="text-xs text-orange-400/80 mt-2">Note: {verification.notes}</p>
        )}
      </div>
    </div>
  )
}
