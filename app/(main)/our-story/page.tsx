import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Our Story | Tennessee Starts Here',
  description:
    "The story of Rocky Mount — from the Cobb family settlement through the territorial capital to statehood. Tennessee's origin story.",
  openGraph: {
    title: 'Our Story | Tennessee Starts Here',
    description:
      'The story of Rocky Mount — from the Cobb family settlement through the territorial capital to statehood.',
    url: 'https://tennesseestartshere.com/our-story',
  },
}

export default function OurStoryPage() {
  return (
    <section className={styles.stub}>
      <div className={styles['stub-content']}>
        <p className={styles.eyebrow}>Our Story</p>
        <h1 className={styles.headline}>Before There Was a Tennessee</h1>

        <div className={styles.message}>
          <p>
            The complete story of Rocky Mount—from the Cobb family settlement through the
            territorial capital to statehood—is coming soon.
          </p>
          <p>
            For now, explore our Evidence Room to see the primary documents that prove this history.
          </p>
        </div>

        <div className={styles.ctas}>
          <Link href="/evidence" className={styles['cta-primary']}>
            See the Original Documents →
          </Link>
          <Link href="/visit" className={styles['cta-secondary']}>
            Plan Your Visit →
          </Link>
        </div>
      </div>
    </section>
  )
}
