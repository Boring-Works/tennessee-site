'use client'

import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal'

/**
 * ConsolidatedStory Section
 * Merges: MysteryHook + ExperimentSection + ScrollTimeline + ContrastStatement
 *
 * Content preserved:
 * - "Before there was a Tennessee, there was this ground."
 * - "Could democracy survive beyond the Appalachians?"
 * - 1770/1780/1790 timeline with full details
 * - "This is not where they gathered... This is where they governed."
 */

const timelineData = [
  {
    year: '1770',
    text: 'The Cobbs settled this ground.',
    detail: 'Three generations would call it home.',
  },
  {
    year: '1780',
    text: 'They armed the Revolution.',
    detail: 'Supplied the Overmountain Men at Kings Mountain.',
  },
  {
    year: '1790',
    text: 'Governor Blount made it the seat of federal power.',
    detail: 'The first capital of the Southwest Territory.',
  },
]

const contrastLines = [
  { text: 'This is not where they gathered.', highlight: false, emphasis: false },
  { text: 'This is not where they farmed.', highlight: false, emphasis: false },
  { text: 'This is where they governed.', highlight: true, emphasis: true },
]

export function ConsolidatedStory() {
  const { ref: hookRef, isVisible: hookVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })
  const { ref: questionRef, isVisible: questionVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })
  const { refs: timelineRefs, isVisible: timelineVisible } = useStaggeredReveal<HTMLDivElement>(
    timelineData.length,
    { threshold: 0.4 }
  )
  const { refs: contrastRefs, isVisible: contrastVisible } =
    useStaggeredReveal<HTMLParagraphElement>(contrastLines.length, { threshold: 0.5 })

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Gradient background for entire section */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #0a1628 0%, #0d1f35 25%, #050d18 50%, #0a1628 75%, #0d1f35 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Part 1: Mystery Hook */}
      <div ref={hookRef} className="relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p
            className={`font-serif-elegant text-[clamp(1.75rem,5vw,3rem)] text-white/90 leading-relaxed italic fade-in-up ${hookVisible ? 'visible' : ''}`}
          >
            Before there was a Tennessee,
            <br />
            <span className="text-accent">there was this ground.</span>
          </p>
        </div>
      </div>

      {/* Part 2: The Bold Experiment */}
      <div ref={questionRef} className="relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className={`text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-8 fade-in-up ${questionVisible ? 'visible' : ''}`}
          >
            The Bold Experiment
          </p>

          <p
            className={`font-serif text-[clamp(1.25rem,3vw,1.75rem)] text-white/80 leading-relaxed mb-6 fade-in-up stagger-1 ${questionVisible ? 'visible' : ''}`}
          >
            In 1790, a question hung over the young republic:
          </p>

          <p
            className={`font-serif-elegant text-[clamp(1.5rem,4vw,2.25rem)] text-white/90 leading-relaxed italic fade-in-up stagger-2 ${questionVisible ? 'visible' : ''}`}
          >
            Could American democracy survive beyond the Appalachians?
          </p>

          <p
            className={`text-sm text-white/50 mt-4 fade-in-up stagger-2 ${questionVisible ? 'visible' : ''}`}
          >
            600 miles from Philadelphia. Three weeks by horse.
          </p>

          <div
            className={`w-16 h-px bg-accent/40 mx-auto my-10 fade-in-up stagger-3 ${questionVisible ? 'visible' : ''}`}
          />

          <p
            className={`font-serif text-[clamp(1.25rem,3vw,1.5rem)] text-accent leading-relaxed fade-in-up stagger-4 ${questionVisible ? 'visible' : ''}`}
          >
            Rocky Mount provided the answer.
          </p>
        </div>
      </div>

      {/* Part 3: Timeline */}
      <div className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-accent/20 transform md:-translate-x-1/2"
              aria-hidden="true"
            />

            {/* Timeline items */}
            <div className="space-y-12 md:space-y-20">
              {timelineData.map((item, index) => (
                <div
                  key={item.year}
                  ref={timelineRefs[index]}
                  className={`relative pl-20 md:pl-0 md:grid md:grid-cols-2 md:gap-12 fade-in-up ${timelineVisible[index] ? 'visible' : ''}`}
                >
                  {/* Year marker */}
                  <div
                    className="absolute left-0 md:left-1/2 w-16 h-16 rounded-full bg-primary border-2 border-accent/40 flex items-center justify-center transform md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="text-accent/80 font-serif text-lg font-bold">
                      {item.year.slice(-2)}
                    </span>
                  </div>

                  {/* Content - alternating sides on desktop */}
                  <div
                    className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}
                  >
                    <span className="block text-[clamp(2.5rem,8vw,4rem)] font-serif font-bold text-white/10 leading-none mb-2">
                      {item.year}
                    </span>
                    <p className="font-serif text-[clamp(1.25rem,3vw,1.75rem)] text-white/90 leading-relaxed mb-2">
                      {item.text}
                    </p>
                    <p className="text-sm text-white/50">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Part 4: Contrast Statement */}
      <div className="relative z-10 py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 100% 80% at 50% 50%, #0d1f35 0%, #050d18 100%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6 md:space-y-8">
            {contrastLines.map((line, index) => (
              <p
                key={index}
                ref={contrastRefs[index]}
                className={`font-serif-elegant leading-relaxed reveal-line ${
                  contrastVisible[index] ? 'visible' : ''
                } ${
                  line.emphasis
                    ? 'text-[clamp(1.75rem,5vw,3rem)] text-accent italic font-semibold mt-2'
                    : line.highlight
                      ? 'text-[clamp(1.5rem,4vw,2.5rem)] text-accent italic font-semibold'
                      : 'text-[clamp(1.5rem,4vw,2.5rem)] text-white/70'
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
