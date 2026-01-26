'use client'

import type { TaskScore } from '@/lib/almanac/types'

interface TaskScoresProps {
  sower: TaskScore
  shepherd: TaskScore
  keeper: TaskScore
  builder: TaskScore
}

const SCORE_COLORS: Record<TaskScore['label'], string> = {
  Perfect: 'text-almanac-success',
  Good: 'text-almanac-success',
  Fair: 'text-almanac-warning',
  Poor: 'text-almanac-warning',
  Avoid: 'text-almanac-danger',
}

// Determine if score is critical (1-3) and needs visual urgency
function isCriticalScore(score: number): boolean {
  return score <= 3
}

// Get card styling based on score urgency
function getCardStyle(score: number): string {
  if (score <= 2) {
    // Danger: scores 1-2
    return 'bg-red-900/20 border-red-500/40 shadow-lg shadow-red-900/20'
  }
  if (score <= 3) {
    // Warning: score 3
    return 'bg-orange-900/15 border-orange-500/30'
  }
  if (score >= 9) {
    // Excellent: scores 9-10
    return 'bg-green-900/10 border-green-500/20'
  }
  // Normal
  return 'bg-white/5 border-white/10'
}

function ScoreCard({
  title,
  subtitle,
  score,
}: {
  title: string
  subtitle: string
  score: TaskScore
}) {
  const isCritical = isCriticalScore(score.score)
  const cardStyle = getCardStyle(score.score)

  return (
    <div
      className={`rounded-sm p-4 border transition-all ${cardStyle}`}
      role="article"
      aria-label={`${title}: ${score.score} out of 10, ${score.label}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-serif text-lg text-gold-leaf">{title}</h3>
          <p className="text-xs text-almanac-parchment/50">{subtitle}</p>
        </div>
        <div className="text-right">
          <span
            className={`text-3xl font-sans font-bold ${SCORE_COLORS[score.label]} ${isCritical ? 'animate-pulse' : ''}`}
          >
            {score.score}
          </span>
          <span className="text-almanac-parchment/50 text-sm">/10</span>
        </div>
      </div>
      {isCritical && (
        <p className="text-xs text-red-400 mb-2 font-medium">
          ⚠ Conditions unfavorable
        </p>
      )}
      <p className="font-serif-elegant italic text-sm text-almanac-parchment/70 leading-relaxed">
        {score.instruction}
      </p>
    </div>
  )
}

export function TaskScores({ sower, shepherd, keeper, builder }: TaskScoresProps) {
  return (
    <section className="py-8">
      <h2 className="font-serif text-2xl text-gold-leaf text-center mb-6">
        Today's Workability
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <ScoreCard
          title="Sower's Index"
          subtitle="Planting & Gardening"
          score={sower}
        />
        <ScoreCard
          title="Shepherd's Alert"
          subtitle="Livestock Care"
          score={shepherd}
        />
        <ScoreCard
          title="Keeper's Gauge"
          subtitle="Property Maintenance"
          score={keeper}
        />
        <ScoreCard
          title="Builder's Grade"
          subtitle="Construction & Heavy Work"
          score={builder}
        />
      </div>
    </section>
  )
}
