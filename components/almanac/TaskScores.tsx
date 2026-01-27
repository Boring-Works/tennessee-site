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
}: {
  scoreKey: string
  title: string
  subtitle: string
  score: TaskScore
  index: number
}) {
  const isCritical = isCriticalScore(score.score)
  const cardStyle = getCardStyle(score.score)
  // Staggered count-up animation: each card starts 100ms after the previous
  const animatedScore = useCountUp(score.score, { duration: 600, delay: index * 100 })

  return (
    <div
      className={`rounded-sm p-4 border transition-all card-hover ${cardStyle}`}
      role="article"
      aria-label={`${title}: ${score.score} out of 10, ${score.label}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-2">
          <div>
            <h3 className="font-serif text-lg text-gold-leaf">{title}</h3>
            <p className="text-xs text-almanac-parchment/50">{subtitle}</p>
          </div>
          <InfoButton scoreKey={scoreKey} />
        </div>
        <div className="text-right">
          <span
            className={`text-3xl font-sans font-bold ${SCORE_COLORS[score.label]} ${isCritical ? 'animate-pulse' : ''}`}
          >
            {animatedScore}
          </span>
          <span className="text-almanac-parchment/50 text-sm">/10</span>
        </div>
      </div>

      {/* Label badge */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${
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
        {isCritical && <span className="text-xs text-red-400 font-medium">⚠ Unfavorable</span>}
      </div>

      <p className="text-sm text-almanac-parchment/70 leading-relaxed">{score.instruction}</p>
    </div>
  )
}

export function TaskScores({ sower, shepherd, keeper, builder, aqi }: TaskScoresProps) {
  // Apply AQI adjustment to Outdoor Alert (shepherd) score
  const adjustedShepherd = adjustScoreForAQI(shepherd, aqi ?? null)
  const scores = { sower, shepherd: adjustedShepherd, keeper, builder }

  return (
    <section className="py-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <h2 className="font-serif text-2xl text-gold-leaf text-center">Today&apos;s Workability</h2>
        <WorkabilityExplainer />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {SCORE_CARDS.map(({ key, title, subtitle }, index) => (
          <ScoreCard
            key={key}
            scoreKey={key}
            title={title}
            subtitle={subtitle}
            score={scores[key]}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
