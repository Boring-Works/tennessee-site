'use client'

import type { TaskScore } from '@/lib/almanac/types'
import { InfoButton, WorkabilityExplainer } from './ScoreExplainer'
import { useCountUp } from '@/lib/almanac/useCountUp'
import { adjustScoreForAQI } from '@/lib/almanac/taskScores'

interface TaskScoresProps {
  sower: TaskScore
  shepherd: TaskScore
  keeper: TaskScore
  builder: TaskScore
  /** AQI value to adjust Outdoor Alert score (optional) */
  aqi?: number | null
}

const SCORE_COLORS: Record<TaskScore['label'], string> = {
  Perfect: 'text-almanac-success',
  Good: 'text-almanac-success',
  Fair: 'text-almanac-warning',
  Poor: 'text-almanac-warning',
  Avoid: 'text-almanac-danger',
}

function isCriticalScore(score: number): boolean {
  return score <= 3
}

function getCardStyle(score: number): string {
  if (score <= 2) {
    return 'bg-red-900/20 border-red-500/40 shadow-lg shadow-red-900/20'
  }
  if (score <= 3) {
    return 'bg-orange-900/15 border-orange-500/30'
  }
  if (score >= 9) {
    return 'bg-green-900/10 border-green-500/20'
  }
  return 'bg-white/5 border-white/10'
}

// Score card configuration - note "shepherd" key maps to "Outdoor Alert" display
const SCORE_CARDS: {
  key: 'sower' | 'shepherd' | 'keeper' | 'builder'
  title: string
  subtitle: string
}[] = [
  { key: 'sower', title: "Sower's Index", subtitle: 'Gardening & Planting' },
  { key: 'shepherd', title: 'Outdoor Alert', subtitle: 'Pets, Kids & Livestock' },
  { key: 'keeper', title: "Keeper's Gauge", subtitle: 'Property Maintenance' },
  { key: 'builder', title: "Builder's Grade", subtitle: 'Construction & Heavy Work' },
]

function ScoreCard({
  scoreKey,
  title,
  subtitle,
  score,
  index,
  compact = false,
}: {
  scoreKey: string
  title: string
  subtitle: string
  score: TaskScore
  index: number
  compact?: boolean
}) {
  const isCritical = isCriticalScore(score.score)
  const cardStyle = getCardStyle(score.score)
  // Staggered count-up animation: each card starts 100ms after the previous
  const animatedScore = useCountUp(score.score, { duration: 600, delay: index * 100 })

  return (
    <div
      className={`rounded-sm border transition-all card-hover ${cardStyle} ${compact ? 'p-2' : 'p-2.5 lg:p-3'}`}
      role="article"
      aria-label={`${title}: ${score.score} out of 10, ${score.label}`}
    >
      <div className={`flex justify-between items-start ${compact ? 'mb-1' : 'mb-1.5'}`}>
        <div className="flex items-start gap-1">
          <div>
            <h3
              className={`font-serif text-gold-leaf ${compact ? 'text-sm' : 'text-sm lg:text-base'}`}
            >
              {title}
            </h3>
            <p className="text-[10px] lg:text-xs text-almanac-parchment/50">{subtitle}</p>
          </div>
          <InfoButton scoreKey={scoreKey} size="sm" />
        </div>
        <div className="text-right">
          <span
            className={`font-sans font-bold ${SCORE_COLORS[score.label]} ${isCritical ? 'animate-pulse' : ''} ${compact ? 'text-xl lg:text-2xl' : 'text-xl lg:text-2xl'}`}
          >
            {animatedScore}
          </span>
          <span className="text-almanac-parchment/50 text-xs">/10</span>
        </div>
      </div>

      {/* Label badge */}
      <div className={`flex items-center gap-1 flex-wrap ${compact ? 'mb-1' : 'mb-1.5'}`}>
        <span
          className={`text-[10px] lg:text-xs font-medium px-1.5 py-0.5 rounded ${
            score.label === 'Perfect' || score.label === 'Good'
              ? 'bg-green-900/30 text-green-400'
              : score.label === 'Fair'
                ? 'bg-yellow-900/30 text-yellow-400'
                : score.label === 'Poor'
                  ? 'bg-orange-900/30 text-orange-400'
                  : 'bg-red-900/30 text-red-400'
          }`}
        >
          {score.label}
        </span>
        {isCritical && (
          <span className="text-[10px] lg:text-xs text-red-400 font-medium">Unfavorable</span>
        )}
      </div>

      <p
        className={`text-almanac-parchment/70 leading-snug ${compact ? 'text-xs' : 'text-xs lg:text-sm'}`}
      >
        {score.instruction}
      </p>
    </div>
  )
}

export function TaskScores({
  sower,
  shepherd,
  keeper,
  builder,
  aqi,
  compact = false,
}: TaskScoresProps & { compact?: boolean }) {
  // Apply AQI adjustment to Outdoor Alert (shepherd) score
  const adjustedShepherd = adjustScoreForAQI(shepherd, aqi ?? null)
  const scores = { sower, shepherd: adjustedShepherd, keeper, builder }

  return (
    <section className={compact ? 'py-2' : 'py-3 lg:py-4'}>
      <div className={`flex items-center justify-center gap-3 ${compact ? 'mb-2' : 'mb-3'}`}>
        <h2
          className={`font-serif text-gold-leaf text-center ${compact ? 'text-lg' : 'text-xl lg:text-2xl'}`}
        >
          Today&apos;s Workability
        </h2>
        <WorkabilityExplainer />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
        {SCORE_CARDS.map(({ key, title, subtitle }, index) => (
          <ScoreCard
            key={key}
            scoreKey={key}
            title={title}
            subtitle={subtitle}
            score={scores[key]}
            index={index}
            compact={compact}
          />
        ))}
      </div>
    </section>
  )
}
