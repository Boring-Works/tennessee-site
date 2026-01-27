'use client'

import { Leaf, Flower2, Snowflake, Sun } from 'lucide-react'
import { getPhenologyData, getSpringStatusInfo } from '@/lib/almanac/phenology'

const statusIcons = {
  dormant: Snowflake,
  approaching: Leaf,
  spring: Flower2,
  summer: Sun,
}

export default function SpringIndex() {
  const phenology = getPhenologyData()
  const statusInfo = getSpringStatusInfo(phenology.springStatus)
  const StatusIcon = statusIcons[phenology.springStatus]

  // Anomaly display
  const anomalyText =
    phenology.anomaly === 'on-schedule'
      ? 'Spring is on schedule'
      : phenology.anomaly === 'early'
        ? `Spring is ~${phenology.anomalyDays} days early`
        : `Spring is ~${phenology.anomalyDays} days late`

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 h-full">
      <div className="flex items-center gap-2 mb-3">
        <Leaf className="w-4 h-4 text-almanac-gold" />
        <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
          Spring Index
        </h3>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
        <span className={`text-lg font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
      </div>

      {/* Days to events */}
      <div className="space-y-2 mb-3">
        {phenology.daysToFirstLeaf !== null && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-almanac-parchment/60 flex items-center gap-1">
              <Leaf className="w-3 h-3" /> First Leaf
            </span>
            <span className="text-almanac-parchment font-medium">
              ~{phenology.daysToFirstLeaf} days
            </span>
          </div>
        )}
        {phenology.daysToFirstBloom !== null && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-almanac-parchment/60 flex items-center gap-1">
              <Flower2 className="w-3 h-3" /> First Bloom
            </span>
            <span className="text-almanac-parchment font-medium">
              ~{phenology.daysToFirstBloom} days
            </span>
          </div>
        )}
        {phenology.daysToFirstLeaf === null && phenology.daysToFirstBloom === null && (
          <p className="text-xs text-almanac-parchment/50 text-center">
            Spring phenology events have passed
          </p>
        )}
      </div>

      {/* Anomaly */}
      <div
        className={`text-center text-xs px-2 py-1 rounded ${
          phenology.anomaly === 'early'
            ? 'bg-green-500/20 text-green-400'
            : phenology.anomaly === 'late'
              ? 'bg-orange-500/20 text-orange-400'
              : 'bg-white/5 text-almanac-parchment/60'
        }`}
      >
        {anomalyText}
      </div>

      {/* Description */}
      <p className="text-xs text-almanac-parchment/50 text-center mt-3">{statusInfo.description}</p>
    </div>
  )
}
