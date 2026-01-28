'use client'

import Link from 'next/link'
import styles from './welcome.module.css'

interface UtilityCard {
  title: string
  subtitle: string
  href?: string
  disabled?: boolean
  disabledText?: string
}

interface UtilityCardsProps {
  cards: UtilityCard[]
}

export function UtilityCards({ cards }: UtilityCardsProps) {
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card, index) => {
        if (card.disabled || !card.href) {
          return (
            <div
              key={index}
              className={`${styles.utilityCard} ${styles.utilityCardDisabled}`}
              aria-disabled="true"
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardSubtitle}>{card.subtitle}</p>
              {card.disabledText && <p className={styles.cardComingSoon}>{card.disabledText}</p>}
            </div>
          )
        }

        return (
          <Link key={index} href={card.href} className={styles.utilityCard}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardSubtitle}>{card.subtitle}</p>
            <span className={styles.cardCta} aria-hidden="true">
              Open →
            </span>
          </Link>
        )
      })}
    </div>
  )
}
