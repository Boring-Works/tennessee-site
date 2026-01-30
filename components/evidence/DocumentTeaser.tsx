import Link from 'next/link'

interface FeaturedDocument {
  id: string
  title: string
  date: string
  dateFormatted: string
  excerpt: string
  author: string
  authorTitle?: string
  linkHref: string
}

const FEATURED_DOCUMENTS: FeaturedDocument[] = [
  {
    id: 'blount-arrival-1790',
    title: "Blount's Arrival Letter",
    date: '1790-10-20',
    dateFormatted: 'October 20, 1790',
    excerpt:
      '"I am very well accommodated with a Room with Glass Windows, Fireplace, etc., etc., at this place."',
    author: 'William Blount',
    authorTitle: 'Governor, Southwest Territory',
    linkHref: '/evidence/documents/blount-arrival-1790#glass-windows',
  },
  {
    id: 'washington-proclamation-1791',
    title: "Washington's Treaty Proclamation",
    date: '1791-11-11',
    dateFormatted: 'November 11, 1791',
    excerpt:
      '"Now, therefore, be it known that I, George Washington, President of the United States... do accept, ratify and confirm the same."',
    author: 'George Washington',
    authorTitle: 'President of the United States',
    linkHref: '/evidence/documents/washington-proclamation-1791#treaty-ratified',
  },
]

export function DocumentTeaser() {
  return (
    <section
      className="relative py-20 md:py-28 bg-cream dark:bg-primary/95"
      aria-labelledby="evidence-heading"
    >
      {/* Subtle parchment texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="w-12 h-px bg-secondary/20 dark:bg-white/20" />
            <span className="text-secondary/40 dark:text-accent/60 text-sm tracking-[0.3em]">
              PRIMARY SOURCES
            </span>
            <span className="w-12 h-px bg-secondary/20 dark:bg-white/20" />
          </div>

          <h2
            id="evidence-heading"
            className="font-serif text-3xl md:text-4xl text-primary dark:text-white mb-4"
          >
            See the Evidence
          </h2>

          <p className="text-text-light dark:text-white/70 max-w-2xl mx-auto">
            The claims we make are backed by original documents. Read the words written by those who
            shaped Tennessee&apos;s founding.
          </p>
        </div>

        {/* Document Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {FEATURED_DOCUMENTS.map((doc) => (
            <article
              key={doc.id}
              className="group relative bg-[#f8f3e8] dark:bg-[#1a1510] border border-secondary/20 dark:border-accent/20 overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Decorative corner flourishes */}
              <span
                className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-secondary/30 dark:border-accent/30"
                aria-hidden="true"
              />
              <span
                className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary/30 dark:border-accent/30"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary/30 dark:border-accent/30"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary/30 dark:border-accent/30"
                aria-hidden="true"
              />

              {/* Card Content */}
              <div className="p-6 md:p-8">
                {/* Date Badge */}
                <time
                  dateTime={doc.date}
                  className="inline-block text-[10px] uppercase tracking-[0.2em] text-secondary dark:text-accent/80 font-semibold mb-4"
                >
                  {doc.dateFormatted}
                </time>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-primary dark:text-white mb-4 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                  {doc.title}
                </h3>

                {/* Excerpt */}
                <blockquote className="font-serif text-base md:text-lg italic text-primary/80 dark:text-white/80 leading-relaxed mb-4 border-l-2 border-secondary/30 dark:border-accent/30 pl-4">
                  {doc.excerpt}
                </blockquote>

                {/* Author Attribution */}
                <footer className="mb-6">
                  <cite className="not-italic text-sm text-text-light dark:text-white/60">
                    <span className="font-semibold text-primary dark:text-accent/90">
                      {doc.author}
                    </span>
                    {doc.authorTitle && (
                      <span className="block text-xs mt-0.5">{doc.authorTitle}</span>
                    )}
                  </cite>
                </footer>

                {/* Read Link */}
                <Link
                  href={doc.linkHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-secondary dark:text-accent hover:text-accent dark:hover:text-white transition-colors"
                >
                  Read the Original
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>

              {/* Aged paper effect - subtle gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/5 dark:to-accent/5 pointer-events-none"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/evidence"
            className="inline-flex items-center gap-3 bg-primary dark:bg-accent text-white dark:text-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-secondary dark:hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore the Evidence Room
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
