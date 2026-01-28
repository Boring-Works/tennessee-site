import type { Metadata } from 'next'
import {
  ConsolidatedStory,
  ConsolidatedProof,
  ConsolidatedExperience,
  ConsolidatedClose,
} from '@/components/home'
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

      {/* The Proof - Historical figures and primary sources */}
      <ConsolidatedProof />

      {/* The Experience - What visitors will see */}
      <ConsolidatedExperience />

      {/* Close with Indigenous acknowledgment */}
      <ConsolidatedClose />
    </>
  )
}
