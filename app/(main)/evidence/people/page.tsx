import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPeople } from '@/lib/evidence/loader'
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
  const cherokeeSignatories = allPeople
    .filter((p) => p.is_cherokee && p.is_signatory)
    .sort((a, b) => {
      // Sort by bio_type (full first), then alphabetically by name
      if (a.bio_type === 'full' && b.bio_type !== 'full') return -1
      if (a.bio_type !== 'full' && b.bio_type === 'full') return 1
      return a.name.localeCompare(b.name)
    })

  const otherFigures = allPeople
    .filter((p) => !p.is_signatory)
    .sort((a, b) => a.name.localeCompare(b.name))

  // Count full bios vs basic
  const fullBioCount = cherokeeSignatories.filter((p) => p.bio_type === 'full').length

  return (
    <div className="peoplePage">
      <div className="peopleContainer">
        <main className="peopleContent">
          {/* Header */}
          <header className="peopleHeader">
            <h1 className="peopleTitle">Historical Figures</h1>
            <p className="peopleSubtitle">The people who shaped Tennessee&apos;s founding era</p>
          </header>

          {/* Introduction */}
          <p className="peopleIntro">
            On July 2, 1791, forty Cherokee leaders gathered at White&apos;s Fort to sign the Treaty
            of Holston with Governor William Blount. Their names, transliterated from the original
            manuscript, are preserved here alongside the stories we have been able to recover.
          </p>

          {/* Cherokee Signatories Section */}
          <section className="peopleSection">
            <h2 className="peopleSectionTitle">
              <span>Cherokee Signatories</span>
              <span className="peopleSectionCount">{cherokeeSignatories.length}</span>
            </h2>

            <p className="peopleSectionIntro">
              Leaders who signed the Treaty of Holston on behalf of the Cherokee Nation.
              {fullBioCount > 0 && (
                <span className="peopleSectionNote">
                  {' '}
                  Featured profiles ({fullBioCount}) appear first.
                </span>
              )}
            </p>

            <div className="peopleGrid">
              {cherokeeSignatories.map((person) => (
                <Link
                  key={person.id}
                  href={`/evidence/people/${person.id}`}
                  className={`personCard ${person.bio_type === 'full' ? 'personCardFeatured' : ''}`}
                >
                  {person.bio_type === 'full' && (
                    <span className="personCardBadge">Full Profile</span>
                  )}
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
                  {person.role && person.role !== 'Signatory' && (
                    <span className="personCardRole">{person.role}</span>
                  )}
                  {person.town && <span className="personCardTown">{person.town}</span>}
                  <span className="personCardArrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>

            {/* DigiTreaties Link */}
            <div className="peopleTreatyLink">
              <a
                href="https://digitreaties.org/treaties/treaty/88697242/"
                target="_blank"
                rel="noopener noreferrer"
                className="peopleTreatyLinkButton"
              >
                <span className="peopleTreatyIcon">&#x1F4DC;</span>
                <span className="peopleTreatyText">
                  <strong>View the Treaty Manuscript</strong>
                  <span>See all signatures on the original document at DigiTreaties</span>
                </span>
                <span className="peopleTreatyArrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </section>

          {/* Other Historical Figures Section (if any) */}
          {otherFigures.length > 0 && (
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
          )}

          {/* Back Link */}
          <Link href="/evidence" className="peopleBackLink">
            <span aria-hidden="true">&larr;</span> Back to Evidence Room
          </Link>
        </main>
      </div>
    </div>
  )
}
