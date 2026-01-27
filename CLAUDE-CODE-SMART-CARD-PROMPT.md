# Claude Code Prompt: SmartCommemorativeCard

## Project
`/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

## Task
Create a SmartCommemorativeCard component that automatically displays the next upcoming event with countdown, a "From Fleece to Flag" progress bar, and persistent TN 230 / USA 250 countdowns. This replaces the existing hero year block.

---

## FILES TO CREATE

### 1. `/lib/eventUtils.ts`

```typescript
// Event display configuration - maps event IDs to display info
// This overrides events.json titles/descriptions for card display

export interface EventDisplayConfig {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const EVENT_DISPLAY_CONFIG: EventDisplayConfig[] = [
  { id: 'road-to-250', title: 'Season Opening', icon: '🎬', tagline: 'Launch of the commemorative year' },
  { id: 'woolly-days', title: 'Woolly Days', icon: '🐑', tagline: 'From the flock to the loom' },
  { id: 'early-frontier-days', title: 'Early Frontier Days', icon: '⚔️', tagline: 'Three days of frontier life' },
  { id: 'tn-230-birthday', title: "Tennessee's 230th", icon: '🏛️', tagline: 'The 16th state turns 230' },
  { id: 'flag-weekend', title: 'Stitching Independence', icon: '🧵', tagline: 'The flag that stitched a nation' },
  { id: 'colonial-independence-day', title: 'Colonial Independence Day', icon: '🇺🇸', tagline: "America's 250th birthday" },
  { id: 'cherokee-heritage', title: 'Cherokee Heritage', icon: '🪶', tagline: 'Honoring the first Tennesseans' },
  { id: 'first-families-reunion', title: 'First Families Reunion', icon: '👨‍👩‍👧‍👦', tagline: 'A gathering of descendants', ctaText: 'Register Your Family', ctaUrl: '/events/first-families-reunion' },
  { id: 'harvest-fest', title: 'Harvest Fest', icon: '🎃', tagline: 'Colonial harvest traditions' },
  { id: 'haunting', title: 'Haunting on the Mount', icon: '👻', tagline: 'Spooky frontier tales' },
  { id: 'frontier-christmas', title: 'Frontier Christmas', icon: '🎄', tagline: 'Holiday traditions from 1790' },
  { id: 'candlelight-christmas', title: 'Candlelight Christmas', icon: '🕯️', tagline: 'Rocky Mount by candlelight' },
];

// IDs of events to EXCLUDE from "Coming Next" rotation (lectures, etc)
export const EXCLUDED_EVENT_IDS = [
  'lecture-byrd',
  'lecture-patton', 
  'lecture-bachelor',
  'lecture-whitfield',
  'lecture-doan',
];

// Progress bar events (textile narrative + reunion finale)
export const PROGRESS_BAR_EVENTS = [
  { id: 'woolly-days', label: 'Woolly', shortLabel: 'Woolly' },
  { id: 'flag-weekend', label: 'Stitching', shortLabel: 'Stitch' },
  { id: 'colonial-independence-day', label: 'July 4', shortLabel: 'Jul 4' },
  { id: 'first-families-reunion', label: 'Reunion', shortLabel: 'Reunion' },
];

// Calculate days until a date
export function daysUntil(targetDate: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// Format countdown with urgency messaging
export function formatCountdown(days: number): string {
  if (days < 0) return 'Completed';
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow!';
  if (days <= 3) return `${days} days · This week!`;
  if (days <= 7) return `${days} days`;
  if (days <= 14) return `${days} days`;
  return `${days} days`;
}

// Get event status
export type EventStatus = 'upcoming' | 'happening' | 'passed';

export function getEventStatus(startDate: string, endDate: string | null): EventStatus {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = endDate ? new Date(endDate) : start;
  end.setHours(23, 59, 59, 999);
  
  if (now < start) return 'upcoming';
  if (now <= end) return 'happening';
  return 'passed';
}

// Get display config for an event
export function getEventDisplayConfig(eventId: string): EventDisplayConfig | undefined {
  return EVENT_DISPLAY_CONFIG.find(e => e.id === eventId);
}

// Milestone dates
export const TN_230_DATE = '2026-06-01';
export const USA_250_DATE = '2026-07-04';
```

---

### 2. `/components/SmartCommemorativeCard.tsx`

```typescript
"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styles from './SmartCommemorativeCard.module.css';
import eventsData from '@/data/events.json';
import {
  EVENT_DISPLAY_CONFIG,
  EXCLUDED_EVENT_IDS,
  PROGRESS_BAR_EVENTS,
  daysUntil,
  formatCountdown,
  getEventStatus,
  getEventDisplayConfig,
  TN_230_DATE,
  USA_250_DATE,
  type EventStatus,
} from '@/lib/eventUtils';

interface Event {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
  // ... other fields from events.json
}

interface ProcessedEvent {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  date: string;
  endDate: string | null;
  days: number;
  status: EventStatus;
  ctaText: string;
  ctaUrl: string;
}

export default function SmartCommemorativeCard() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    
    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      setCurrentDate(new Date());
    }, msUntilMidnight);
    
    return () => clearTimeout(timeout);
  }, [currentDate]);

  // Filter and process events
  const nextEvent = useMemo((): ProcessedEvent | null => {
    const eligibleEvents = (eventsData.events as Event[])
      .filter(e => !EXCLUDED_EVENT_IDS.includes(e.id))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    for (const event of eligibleEvents) {
      const status = getEventStatus(event.date, event.endDate);
      if (status === 'passed') continue;
      
      const displayConfig = getEventDisplayConfig(event.id);
      const days = daysUntil(event.date);
      
      return {
        id: event.id,
        title: displayConfig?.title || event.title,
        icon: displayConfig?.icon || '📅',
        tagline: displayConfig?.tagline || '',
        date: event.date,
        endDate: event.endDate,
        days,
        status,
        ctaText: displayConfig?.ctaText || (status === 'happening' ? 'Get Tickets' : 'Plan Your Visit'),
        ctaUrl: displayConfig?.ctaUrl || (status === 'happening' ? `/events/${event.id}` : '/visit'),
      };
    }
    
    return null;
  }, [currentDate]);

  // Progress bar status
  const progressStatus = useMemo(() => {
    return PROGRESS_BAR_EVENTS.map(pe => {
      const event = (eventsData.events as Event[]).find(e => e.id === pe.id);
      if (!event) return { ...pe, status: 'upcoming' as EventStatus };
      return {
        ...pe,
        status: getEventStatus(event.date, event.endDate),
      };
    });
  }, [currentDate]);

  // Milestone countdowns
  const tn230Days = daysUntil(TN_230_DATE);
  const usa250Days = daysUntil(USA_250_DATE);
  const tn230Status = getEventStatus(TN_230_DATE, null);
  const usa250Status = getEventStatus(USA_250_DATE, null);

  // Format date for display
  const formatEventDate = (date: string, endDate: string | null): string => {
    const start = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (endDate) {
      const end = new Date(endDate);
      return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
    }
    return start.toLocaleDateString('en-US', options);
  };

  if (!nextEvent) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>2026 · From Fleece to Flag</span>
        </div>
        <div className={styles.featured}>
          <span className={styles.featuredIcon}>🌅</span>
          <h3 className={styles.featuredTitle}>2027 Season</h3>
          <p className={styles.featuredTagline}>Coming Soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Corner accents */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>2026 · From Fleece to Flag</span>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        {progressStatus.map((event, index) => (
          <div key={event.id} className={styles.progressItem}>
            {index > 0 && (
              <span className={`${styles.progressLine} ${
                event.status !== 'upcoming' ? styles.progressLineActive : ''
              }`} />
            )}
            <span className={`${styles.progressDot} ${
              event.status === 'happening' ? styles.progressDotCurrent :
              event.status === 'passed' ? styles.progressDotComplete : ''
            }`}>
              {event.status === 'passed' ? '✓' : 
               event.status === 'happening' ? '●' : '○'}
            </span>
            <span className={`${styles.progressLabel} ${
              event.status === 'happening' ? styles.progressLabelCurrent : ''
            }`}>
              <span className={styles.progressLabelFull}>{event.label}</span>
              <span className={styles.progressLabelShort}>{event.shortLabel}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Featured Event */}
      <div className={`${styles.featured} ${
        nextEvent.status === 'happening' ? styles.featuredHappening : ''
      }`}>
        <span className={styles.featuredStatus}>
          {nextEvent.status === 'happening' ? '🔴 Happening Now' : 'Coming Next'}
        </span>
        <span className={styles.featuredIcon}>{nextEvent.icon}</span>
        <h3 className={styles.featuredTitle}>{nextEvent.title}</h3>
        <p className={styles.featuredDate}>
          {formatEventDate(nextEvent.date, nextEvent.endDate)}
          {nextEvent.status === 'happening' && nextEvent.endDate && ' · Through tomorrow'}
        </p>
        <p className={styles.featuredTagline}>{nextEvent.tagline}</p>
        <p className={styles.featuredCountdown}>
          {mounted ? (
            nextEvent.status === 'happening' ? 'Today!' : formatCountdown(nextEvent.days)
          ) : '—'}
        </p>
      </div>

      {/* Milestone Countdowns */}
      <div className={styles.milestones}>
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>
            {tn230Status === 'passed' ? '✓ ' : ''}TN 230
          </span>
          <span className={styles.milestoneDays}>
            {mounted ? (
              tn230Status === 'passed' ? 'Celebrated' : `${tn230Days}d`
            ) : '—'}
          </span>
        </div>
        <span className={styles.milestoneDivider}>·</span>
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>
            {usa250Status === 'passed' ? '✓ ' : ''}USA 250
          </span>
          <span className={styles.milestoneDays}>
            {mounted ? (
              usa250Status === 'passed' ? 'Celebrated' : `${usa250Days}d`
            ) : '—'}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaWrapper}>
        <Link href={nextEvent.ctaUrl} className={styles.cta}>
          {nextEvent.ctaText}
        </Link>
      </div>
    </div>
  );
}
```

---

### 3. `/components/SmartCommemorativeCard.module.css`

```css
.card {
  position: relative;
  background: rgba(10, 22, 40, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: 0.5rem;
  padding: 1.25rem;
  max-width: 28rem;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .card {
    padding: 1.5rem;
    max-width: 32rem;
  }
}

/* Corner accents */
.cornerTL,
.cornerBR {
  position: absolute;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
}

.cornerTL {
  top: 0;
  left: 0;
  border-top: 2px solid var(--accent, #c9a227);
  border-left: 2px solid var(--accent, #c9a227);
}

.cornerBR {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--accent, #c9a227);
  border-right: 2px solid var(--accent, #c9a227);
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 0.75rem;
}

.eyebrow {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent, #c9a227);
}

/* Progress Bar */
.progressBar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.625rem;
}

.progressItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.progressLine {
  position: absolute;
  top: 0.5rem;
  right: 100%;
  width: 1.5rem;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
}

.progressLineActive {
  background: var(--accent, #c9a227);
}

.progressDot {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1;
}

.progressDotComplete {
  color: #22c55e;
}

.progressDotCurrent {
  color: var(--accent, #c9a227);
}

.progressLabel {
  margin-top: 0.25rem;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

.progressLabelCurrent {
  color: var(--accent, #c9a227);
  font-weight: 600;
}

.progressLabelFull {
  display: none;
}

.progressLabelShort {
  display: inline;
}

@media (min-width: 480px) {
  .progressLabelFull {
    display: inline;
  }
  .progressLabelShort {
    display: none;
  }
  .progressLine {
    width: 2rem;
  }
}

/* Featured Event */
.featured {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.75rem;
}

.featuredHappening {
  background: rgba(201, 162, 39, 0.15);
  border-color: var(--accent, #c9a227);
}

.featuredStatus {
  display: block;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
}

.featuredHappening .featuredStatus {
  color: var(--accent, #c9a227);
}

.featuredIcon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.25rem;
}

.featuredTitle {
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.featuredDate {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0.25rem 0;
}

.featuredTagline {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  margin: 0 0 0.5rem 0;
}

.featuredCountdown {
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent, #c9a227);
  margin: 0;
  font-variant-numeric: tabular-nums;
}

/* Milestones */
.milestones {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.6875rem;
}

.milestone {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.milestoneLabel {
  color: rgba(255, 255, 255, 0.5);
}

.milestoneDays {
  color: var(--accent, #c9a227);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.milestoneDivider {
  color: rgba(255, 255, 255, 0.2);
}

/* CTA */
.ctaWrapper {
  text-align: center;
}

.cta {
  display: inline-block;
  background: var(--accent, #c9a227);
  color: var(--primary, #0a1628);
  padding: 0.5rem 1.25rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background 0.2s ease;
}

.cta:hover {
  background: #d4af37;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .cta {
    transition: none;
  }
}
```

---

## FILES TO MODIFY

### 4. `/app/(main)/home/page.tsx`

**Add import at top:**
```typescript
import SmartCommemorativeCard from "@/components/SmartCommemorativeCard";
```

**Find and replace:**

FIND:
```tsx
{/* Commemorative Year Block - Broader framing */}
<div className={`${styles["hero-year-block"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.7s' } as React.CSSProperties}>
  <span className={styles["hero-year-badge"]}>2026</span>
  <span className={styles["hero-year-label"]}>The Commemorative Year</span>
  <p className={styles["hero-milestones"]}>
    America&apos;s 250th · Tennessee&apos;s 230th
  </p>
</div>
```

REPLACE WITH:
```tsx
{/* Smart Commemorative Card */}
<div className={styles["hero-animate"]} style={{ '--delay': '0.7s' } as React.CSSProperties}>
  <SmartCommemorativeCard />
</div>
```

---

### 5. `/components/Navigation.tsx`

**Update NAV_LINKS array:**
```typescript
const NAV_LINKS = [
  { href: "/", label: "Our Story" },
  { href: "/events", label: "Events" },
  { href: "/lectures", label: "Lectures" },
  { href: "/visit", label: "Visit" },
  { href: "/almanac", label: "Almanac" },
];
```

**Update desktop CTA (around line 95):**
- Change `href="/first-250"` to `href="/visit"`
- Change text from "Join First 250" to "Plan Your Visit"

**Update mobile CTA (around line 130):**
- Change `href="/first-250"` to `href="/visit"`  
- Change text from "Join First 250" to "Plan Your Visit"

---

## VERIFICATION CHECKLIST

After implementation:

1. `npm run dev` - Card renders without errors
2. Check card fits in hero viewport without scrolling
3. Progress bar shows correct dots (all should be ○ except passed events)
4. "Coming Next" shows Road to 250 Season Opening (Mar 4)
5. TN 230 countdown: Should show ~126 days
6. USA 250 countdown: Should show ~159 days
7. Mobile layout: Progress bar uses short labels, card is narrower
8. Navigation: Shows "Almanac" link, CTA says "Plan Your Visit"
9. `npm run build` passes without errors
10. Click CTA button - goes to /visit

---

## EVENT ID REFERENCE

These IDs must match events.json exactly:

| Display Name | events.json ID |
|--------------|----------------|
| Season Opening | road-to-250 |
| Woolly Days | woolly-days |
| Early Frontier Days | early-frontier-days |
| Tennessee's 230th | tn-230-birthday |
| Stitching Independence | flag-weekend |
| Colonial Independence Day | colonial-independence-day |
| Cherokee Heritage | cherokee-heritage |
| First Families Reunion | first-families-reunion |
| Harvest Fest | harvest-fest |
| Haunting on the Mount | haunting |
| Frontier Christmas | frontier-christmas |
| Candlelight Christmas | candlelight-christmas |

---

## NOTES

- The component uses "use client" because it needs useState/useEffect for hydration-safe countdowns
- Countdowns update at midnight automatically
- Progress bar shows: Woolly → Stitching → July 4 → Reunion (4 events)
- Lectures are excluded from "Coming Next" rotation
- "flag-weekend" in events.json displays as "Stitching Independence"
- CTA changes to "Get Tickets" during active events
- First Families has custom CTA: "Register Your Family"
