import type { Metadata } from 'next'
import {
  ConsolidatedStory,
  ConsolidatedProof,
  ConsolidatedExperience,
  ConsolidatedClose,
} from '@/components/home'
import { OriginalSevenMap } from '@/components/OriginalSevenMap'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Our Story | Tennessee Starts Here',
  description:
    "The story of Rocky Mount — from frontier settlement to territorial capital. Where the Constitution's promise was proven west of the Appalachians.",
  openGraph: {
    title: 'Our Story | Tennessee Starts Here',
    description:
      "The story of Rocky Mount — from frontier settlement to territorial capital. Where the Constitution's promise was proven.",
    url: 'https://tennesseestartshere.com/our-story',
  },
}

export default function OurStoryPage() {
  return (
    <>
      {/* Page Header */}
      <section className={styles['story-header']}>
        <div className={styles['story-header-content']}>
          <p className={styles['story-eyebrow']}>The Full Story</p>
          <h1 className={styles['story-headline']}>Before There Was a Tennessee</h1>
          <p className={styles['story-subhead']}>
            From frontier settlement to territorial capital — how one family&apos;s homestead became
            the birthplace of a state.
          </p>
        </div>
      </section>

      {/* The Story - Full narrative with timeline */}
      <ConsolidatedStory />

      {/* Governing the Territory - Original Seven Counties */}
      <section className={styles['story-governing']} aria-labelledby="governing-heading">
        <div className={styles['story-governing-inner']}>
          <header className={styles['story-governing-header']}>
            <h2 id="governing-heading" className={styles['story-governing-headline']}>
              Governing the Territory
            </h2>
            <p className={styles['story-governing-intro']}>
              In 1790, Congress organized the Southwest Territory from seven counties carved from
              North Carolina&apos;s western lands. Four of them—Washington, Sullivan, Greene, and
              Hawkins—surrounded Rocky Mount. Three more—Davidson, Sumner, and Tennessee—lay to the
              west in what would become Middle Tennessee.
            </p>
          </header>

          <div className={styles['story-governing-map']}>
            <OriginalSevenMap variant="inline" showDistances interactive />
          </div>

          <div className={styles['story-governing-content']}>
            <p>
              Governor William Blount administered all seven from this ground. Court records, land
              grants, militia commissions, and territorial correspondence flowed through Rocky Mount
              from 1790 to 1792. The patterns of governance established here—county courts, land
              distribution, militia organization—became the template for Tennessee statehood in
              1796.
            </p>
            <p>
              Of the original seven, only Sullivan, Washington, Greene, Hawkins, Davidson, and
              Sumner survive as counties today. Tennessee County was absorbed into what became
              Montgomery and Robertson counties. But the records of all seven passed through the
              hands of the territorial government at Rocky Mount.
            </p>
          </div>
        </div>
      </section>

      {/* The Proof - Historical figures and primary sources */}
      <ConsolidatedProof />

      {/* The Experience - What visitors will see */}
      <ConsolidatedExperience />

      {/* Close with Indigenous acknowledgment */}
      <ConsolidatedClose />
    </>
  )
}
