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

function ScoreCard({
  title,
  subtitle,
  score,
}: {
  title: string
  subtitle: string
  score: TaskScore
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-serif text-lg text-gold-leaf">{title}</h3>
          <p className="text-xs text-almanac-parchment/50">{subtitle}</p>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-sans font-bold ${SCORE_COLORS[score.label]}`}>
            {score.score}
          </span>
          <span className="text-almanac-parchment/50 text-sm">/10</span>
        </div>
      </div>
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
