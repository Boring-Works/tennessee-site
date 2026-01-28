import type { Metadata } from 'next'
import Link from 'next/link'
import { PAGE_METADATA, PRIMARY_QUOTES } from '@/lib/copy'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: PAGE_METADATA.evidence.title,
  description: PAGE_METADATA.evidence.description,
  openGraph: {
    title: PAGE_METADATA.evidence.ogTitle,
    description: PAGE_METADATA.evidence.ogDescription,
    url: 'https://tennesseestartshere.com/evidence',
  },
}

// External source links
const SOURCE_LINKS = {
  foundersOnline: 'https://founders.archives.gov/',
  tennesseeEncyclopedia: 'https://tennesseeencyclopedia.net/',
  digiTreaties: 'https://digitreaties.org/',
  digiTreatiesHolston: 'https://digitreaties.org/treaties/treaty/88697242/',
  nationalArchives: 'https://www.archives.gov/',
  blountMansion: 'https://blountmansion.org/',
} as const

// Treaty of Holston signatories - Cherokee leaders
const TREATY_SIGNERS = [
  {
    cherokeeName: 'Squollecuttah',
    englishName: 'Hanging Maw',
    role: 'Principal Chief of the Overhill Cherokee',
  },
  {
    cherokeeName: 'Nenetooyah',
    englishName: 'Bloody Fellow',
    role: 'War chief, given name "Clear Sky" by President Washington',
  },
  {
    cherokeeName: 'Kunoskeskie',
    englishName: 'John Watts',
    role: 'Succeeded Dragging Canoe as head of the war council',
  },
  {
    cherokeeName: 'Chuquilatague',
    englishName: 'Doublehead',
    role: 'One of the most feared warriors of the Cherokee-American wars',
  },
  {
    cherokeeName: 'Enoleh',
    englishName: 'Black Fox',
    role: 'Later served as Principal Chief, 1801–1811',
  },
] as const

// Signer card component
function SignerCard({
  cherokeeName,
  englishName,
  role,
}: {
  cherokeeName: string
  englishName: string
  role: string
}) {
  return (
    <div className={styles.signerCard}>
      <p className={styles.signerCherokeeName}>{cherokeeName}</p>
      <p className={styles.signerEnglishName}>{englishName}</p>
      <p className={styles.signerRole}>{role}</p>
    </div>
  )
}

// Quote card component
function QuoteCard({
  quote,
  attribution,
  source,
  context,
  sourceUrl,
  featured,
}: {
  quote: string
  attribution: string
  source: string
  context?: string
  sourceUrl?: string
  featured?: boolean
}) {
  return (
    <article className={`${styles.quoteCard} ${featured ? styles.quoteCardFeatured : ''}`}>
      <blockquote className={styles.quoteText}>
        <span className={styles.quoteOpen}>&ldquo;</span>
        {quote}
        <span className={styles.quoteClose}>&rdquo;</span>
      </blockquote>

      <footer className={styles.quoteFooter}>
        <cite className={styles.quoteAttribution}>— {attribution}</cite>
        <p className={styles.quoteSource}>{source}</p>
        {context && <p className={styles.quoteContext}>{context}</p>}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
          >
            View Original Source →
          </a>
        )}
      </footer>
    </article>
  )
}

// Timeline event component
function TimelineEvent({
  date,
  event,
  sourceUrl,
  featured,
  manuscriptUrl,
  manuscriptLabel,
}: {
  date: string
  event: string
  sourceUrl?: string
  featured?: boolean
  manuscriptUrl?: string
  manuscriptLabel?: string
}) {
  return (
    <div className={`${styles.timelineEvent} ${featured ? styles.timelineEventFeatured : ''}`}>
      <div className={styles.timelineDate}>{date}</div>
      <div
        className={`${styles.timelineDot} ${featured ? styles.timelineDotFeatured : ''}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.timelineContent} ${featured ? styles.timelineContentFeatured : ''}`}
      >
        <p className={styles.timelineText}>{event}</p>
        {manuscriptUrl && (
          <a
            href={manuscriptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.timelineManuscriptLink}
          >
            {manuscriptLabel || 'View original manuscript →'}
          </a>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.timelineLink}
          >
            Source →
          </a>
        )}
      </div>
    </div>
  )
}

// Section divider
const SectionDivider = () => (
  <div className={styles.sectionDivider} aria-hidden="true">
    <span className={styles.dividerLine} />
    <span className={styles.dividerOrnament}>✦</span>
    <span className={styles.dividerLine} />
  </div>
)

export default function EvidencePage() {
  return (
    <div className={styles.evidencePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroBadge}>Digital Archive</p>
          <h1 className={styles.heroTitle}>The Evidence Room</h1>
          <p className={styles.heroSubtitle}>
            Primary source documents from the founding of Tennessee&apos;s government. Every quote
            verified. Every claim sourced.
          </p>
        </div>
      </section>

      {/* Featured Quote */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The Hero Quote</h2>
          <p className={styles.sectionSubtitle}>
            Governor Blount&apos;s first letter from Rocky Mount
          </p>
          <QuoteCard
            quote={PRIMARY_QUOTES.glassWindowsFull.text}
            attribution={PRIMARY_QUOTES.glassWindowsFull.attribution}
            source={PRIMARY_QUOTES.glassWindowsFull.source}
            context="Glass windows were a status symbol on the frontier. This detail proves Rocky Mount was no rough cabin."
            sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
            featured
          />
        </div>
      </section>

      <SectionDivider />

      {/* The Question */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The Question</h2>
          <p className={styles.sectionSubtitle}>Washington asked. Rocky Mount was the answer.</p>
          <QuoteCard
            quote={PRIMARY_QUOTES.washingtonsQuestion.text}
            attribution={PRIMARY_QUOTES.washingtonsQuestion.attribution}
            source={PRIMARY_QUOTES.washingtonsQuestion.source}
            context={PRIMARY_QUOTES.washingtonsQuestion.context}
            sourceUrl="https://founders.archives.gov/documents/Washington/05-06-02-0135"
          />
        </div>
      </section>

      <SectionDivider />

      {/* The Appointment */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The Appointment</h2>
          <p className={styles.sectionSubtitle}>Why Washington chose Blount for the frontier</p>
          <QuoteCard
            quote={PRIMARY_QUOTES.williamsonRecommendation.text}
            attribution={PRIMARY_QUOTES.williamsonRecommendation.attribution}
            source={PRIMARY_QUOTES.williamsonRecommendation.source}
            context="Hugh Williamson's endorsement persuaded Washington that Blount was uniquely qualified to unite factional divisions."
            sourceUrl="https://founders.archives.gov/documents/Washington/05-05-02-0277"
          />
        </div>
      </section>

      <SectionDivider />

      {/* The Authority */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Federal Authority</h2>
          <p className={styles.sectionSubtitle}>The Treaty of Holston became binding law</p>
          <QuoteCard
            quote={PRIMARY_QUOTES.treatyProclamation.text}
            attribution={PRIMARY_QUOTES.treatyProclamation.attribution}
            source={PRIMARY_QUOTES.treatyProclamation.source}
            context="Washington's proclamation made the Treaty of Holston—negotiated by Blount during the Rocky Mount capital period—binding federal law."
            sourceUrl="https://founders.archives.gov/"
          />
        </div>
      </section>

      <SectionDivider />

      {/* Treaty Signers Section */}
      <section className={styles.signersSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Those Who Signed</h2>
          <p className={styles.sectionSubtitle}>
            Forty Cherokee leaders put their names to the Treaty of Holston
          </p>

          <div className={styles.signersIntro}>
            <p>
              On July 2, 1791, after weeks of negotiation at White&apos;s Fort, these leaders signed
              on behalf of the Cherokee Nation. Their names are preserved in the treaty record.
            </p>
          </div>

          <div className={styles.signersList}>
            {TREATY_SIGNERS.map((signer) => (
              <SignerCard
                key={signer.cherokeeName}
                cherokeeName={signer.cherokeeName}
                englishName={signer.englishName}
                role={signer.role}
              />
            ))}
          </div>

          <div className={styles.signersFooter}>
            <a
              href={SOURCE_LINKS.digiTreatiesHolston}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.signersLink}
            >
              View all 40 signatories at DigiTreaties →
            </a>

            <p className={styles.signersDescendants}>
              The Cherokee Nation, Eastern Band of Cherokee Indians, and United Keetoowah Band carry
              these names forward today.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Verified Timeline</h2>
          <p className={styles.sectionSubtitle}>Key dates confirmed by primary sources</p>

          <div className={styles.timeline}>
            <TimelineEvent
              date="May 28, 1790"
              event="Hugh Williamson recommends Blount to Washington"
              sourceUrl="https://founders.archives.gov/documents/Washington/05-05-02-0268"
            />
            <TimelineEvent date="Jun 7, 1790" event="Washington nominates Blount as Governor" />
            <TimelineEvent date="Jun 8, 1790" event="Senate confirms Blount's appointment" />
            <TimelineEvent
              date="Aug 13, 1790"
              event="Washington asks Knox: 'Where ought the Governor to reside?'"
              sourceUrl="https://founders.archives.gov/documents/Washington/05-06-02-0076"
            />
            <TimelineEvent
              date="Oct 11, 1790"
              event="Blount arrives at Rocky Mount"
              sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
            />
            <TimelineEvent
              date="Oct 20, 1790"
              event="Blount writes 'Glass Windows' letter describing his accommodations"
              sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
            />
            <TimelineEvent
              date="Jul 2, 1791"
              event="Treaty of Holston signed with Cherokee Nation"
              sourceUrl="https://avalon.law.yale.edu/18th_century/chr1791.asp"
              featured
              manuscriptUrl="https://digitreaties.org/treaties/treaty/88697242/"
              manuscriptLabel="View the original 23-page manuscript →"
            />
            <TimelineEvent
              date="Nov 5, 1791"
              event="Knoxville Gazette becomes first Tennessee newspaper"
              sourceUrl="https://tennesseeencyclopedia.net/entries/knoxville-gazette/"
            />
            <TimelineEvent
              date="Nov 11, 1791"
              event="Washington proclaims Treaty of Holston as law"
              sourceUrl="https://founders.archives.gov/documents/Washington/05-09-02-0100"
            />
            <TimelineEvent
              date="Late 1791"
              event="Blount family arrives in territory"
              sourceUrl="https://www.blountmansion.org/"
            />
            <TimelineEvent
              date="Early 1792"
              event="Capital moves to Knoxville"
              sourceUrl="https://tennesseeencyclopedia.net/entries/southwest-territory/"
            />
            <TimelineEvent
              date="Jun 1, 1796"
              event="Tennessee admitted to the Union as 16th state"
              sourceUrl="https://tennesseeencyclopedia.net/entries/statehood/"
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Source Repositories */}
      <section className={styles.sourcesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Sources</h2>
          <p className={styles.sectionSubtitle}>Where we verify our history</p>

          <div className={styles.sourcesGrid}>
            <a
              href={SOURCE_LINKS.foundersOnline}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceCard}
            >
              <h3 className={styles.sourceCardTitle}>Founders Online</h3>
              <p className={styles.sourceCardDescription}>
                National Archives collection of correspondence from Washington, Jefferson, and the
                Founding Fathers.
              </p>
            </a>

            <a
              href={SOURCE_LINKS.tennesseeEncyclopedia}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceCard}
            >
              <h3 className={styles.sourceCardTitle}>Tennessee Encyclopedia</h3>
              <p className={styles.sourceCardDescription}>
                Scholarly reference for Tennessee history, including Rocky Mount and Southwest
                Territory articles.
              </p>
            </a>

            <a
              href={SOURCE_LINKS.digiTreaties}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceCard}
            >
              <h3 className={styles.sourceCardTitle}>DigiTreaties</h3>
              <p className={styles.sourceCardDescription}>
                Digitized treaty manuscripts including the full 23-page Treaty of Holston.
              </p>
            </a>

            <a
              href={SOURCE_LINKS.blountMansion}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceCard}
            >
              <h3 className={styles.sourceCardTitle}>Blount Mansion</h3>
              <p className={styles.sourceCardDescription}>
                Governor Blount&apos;s later residence in Knoxville, with family history and primary
                documents.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Stand Where They Stood</h2>
          <p className={styles.ctaText}>
            The documents prove it. The ground remains. Come see for yourself.
          </p>
          <Link href="/visit" className={styles.ctaButton}>
            Plan Your Visit
          </Link>
        </div>
      </section>
    </div>
  )
}
