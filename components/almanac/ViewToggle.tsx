'use client'

interface ViewToggleProps {
  view: 'almanac' | 'governor'
  onViewChange: (view: 'almanac' | 'governor') => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-midnight/30 rounded-lg border border-gold-leaf/20">
      <button
        onClick={() => onViewChange('almanac')}
        className={`
          px-6 py-3 rounded-md font-medium transition-all duration-200
          ${
            view === 'almanac'
              ? 'bg-gold-leaf text-midnight shadow-lg'
              : 'text-cream/60 hover:text-cream hover:bg-midnight/50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">👨‍🌾</span>
          <span>Almanac View</span>
        </div>
      </button>

      <button
        onClick={() => onViewChange('governor')}
        className={`
          px-6 py-3 rounded-md font-medium transition-all duration-200
          ${
            view === 'governor'
              ? 'bg-gold-leaf text-midnight shadow-lg'
              : 'text-cream/60 hover:text-cream hover:bg-midnight/50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          <span>Governor&apos;s View</span>
        </div>
      </button>
    </div>
  )
}
