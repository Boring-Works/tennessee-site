import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPeople } from '@/lib/evidence/loader'
import { CherokeeSignatories } from '@/components/evidence'
import { EvidenceNav } from '@/components/evidence/EvidenceNav'
import './people.css'

export const metadata: Metadata = {
  title: 'People | Evidence Room | Rocky Mount',
  description:
    'Cherokee leaders and historical figures connected to the Treaty of Holston and the founding of Tennessee.',
  openGraph: {
    title: 'People | Evidence Room',
    description: "Cherokee leaders and historical figures from Tennessee's founding era.",
    url: 'https://tennesseestartshere.com/evidence/people',
  },
}

export default async function PeoplePage() {
  const allPeople = await getAllPeople()

  // Group people by category
  const cherokeeSignatories = allPeople.filter((p) => p.is_cherokee && p.is_signatory)

  const otherFigures = allPeople
    .filter((p) => !p.is_signatory)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="peoplePage">
      <EvidenceNav />
      <div className="peopleContainer">
        <main className="peopleContent">
          {/* Header */}
          <header className="peopleHeader">
            <h1 className="peopleTitle">Historical Figures</h1>
            <p className="peopleSubtitle">The people who shaped Tennessee&apos;s founding era</p>
          </header>

          {/* Cherokee Signatories Memorial */}
          <CherokeeSignatories signatories={cherokeeSignatories} />

          {/* Other Historical Figures Section (if any) */}
          {otherFigures.length > 0 ? (
            <section className="peopleSection">
              <h2 className="peopleSectionTitle">
                <span>Other Historical Figures</span>
                <span className="peopleSectionCount">{otherFigures.length}</span>
              </h2>

              <div className="peopleGrid">
                {otherFigures.map((person) => (
                  <Link
                    key={person.id}
                    href={`/evidence/people/${person.id}`}
                    className="personCard"
                  >
                    <div className="personCardNames">
                      {person.name_cherokee && (
                        <span className="personCardCherokeeName">{person.name_cherokee}</span>
                      )}
                      <span
                        className={
                          person.name_cherokee ? 'personCardEnglishName' : 'personCardPrimaryName'
                        }
                      >
                        {person.name}
                      </span>
                    </div>
                    {person.role && <span className="personCardRole">{person.role}</span>}
                    <span className="personCardArrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-8" style={{ color: 'var(--cream-faded, #a89f8c)' }}>
              <p>
                The records here focus on the Cherokee leaders who shaped Tennessee&apos;s founding.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
