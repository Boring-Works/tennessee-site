'use client'

interface GovernorsBriefingProps {
  briefing: string
}

export function GovernorsBriefing({ briefing }: GovernorsBriefingProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-cream border-4 border-amber-900 rounded-lg p-8 shadow-2xl">
      {/* Wax seal decoration */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-800 to-red-950 shadow-lg flex items-center justify-center border-2 border-red-900">
            <div className="text-2xl text-amber-200 font-serif">G</div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-1">
            Governor&apos;s Intelligence Briefing
          </h2>
          <p className="text-sm text-amber-700">Southwest Territory · Weather Observations</p>
        </div>
      </div>

      {/* Briefing content */}
      <div className="prose prose-lg prose-amber max-w-none">
        <div className="font-serif leading-relaxed text-amber-900 whitespace-pre-wrap border-l-4 border-amber-300 pl-6 py-2">
          {briefing}
        </div>
      </div>

      {/* Signature line */}
      <div className="mt-8 pt-6 border-t-2 border-amber-200 flex justify-between items-end">
        <div className="text-xs text-amber-600 space-y-1">
          <p>Generated from atmospheric observations</p>
          <p>Rocky Mount, Capital of the Southwest Territory</p>
        </div>
        <div className="font-serif italic text-amber-700">— Intelligence Officer</div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 pt-4 border-t border-amber-200 text-xs text-amber-600">
        <strong>Note:</strong> This briefing uses period-appropriate language applied to modern
        meteorological data. Not an authentic historical document.
      </div>
    </div>
  )
}
