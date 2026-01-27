# Claude Code Prompt: 60/40 Hero Redesign

## Project
`/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

## Task
Restructure the hero section from vertical stacking to a 60/40 horizontal split. Brand content on left (60%), simplified smart card on right (40%). Remove progress bar from card, move CTAs to left column only.

---

## OVERVIEW

### Current Problem
- Vertical stacking stretches page too long
- Text forced too small to fit
- Duplicate "Plan Your Visit" buttons (card + hero)
- Progress bar cramped in card
- Nothing breathes

### Solution
- 60/40 grid layout (desktop)
- Left: Brand, tagline, location, CTAs
- Right: Simplified event card (no progress bar, no CTA)
- Single column stack on mobile (<1024px)

---

## FILE 1: Simplify SmartCommemorativeCard

**File:** `/components/SmartCommemorativeCard.tsx`

### Changes:
1. **Remove progress bar entirely** (moves to /events page later)
2. **Remove CTA button** (hero handles CTAs)
3. **Remove event tagline** (keep it minimal)
4. **Change header** from "From Fleece to Flag" to "2026 Commemorative Year"
5. **Skip digital-only events** - First event shown should be Woolly Days, not Season Opening

### Add to excluded events:
```typescript
// Add to EXCLUDED_EVENT_IDS or create new constant
const DIGITAL_ONLY_EVENT_IDS = ['road-to-250'];
```

### Simplified card structure:
```tsx
<div className={styles.card}>
  {/* Corner accents */}
  <div className={styles.cornerTL} />
  <div className={styles.cornerBR} />

  {/* Header */}
  <div className={styles.header}>
    <span className={styles.eyebrow}>2026 Commemorative Year</span>
  </div>

  {/* Featured Event - NO tagline */}
  <div className={styles.featured}>
    <span className={styles.featuredStatus}>Coming Next</span>
    <span className={styles.featuredIcon}>{nextEvent.icon}</span>
    <h3 className={styles.featuredTitle}>{nextEvent.title}</h3>
    <p className={styles.featuredDate}>{formatEventDate(nextEvent.date, nextEvent.endDate)}</p>
    <p className={styles.featuredCountdown}>{mounted ? formatCountdown(nextEvent.days) : '—'}</p>
  </div>

  {/* Milestone Countdowns */}
  <div className={styles.milestones}>
    <div className={styles.milestone}>
      <span className={styles.milestoneLabel}>TN 230</span>
      <span className={styles.milestoneDays}>{mounted ? `${tn230Days}d` : '—'}</span>
    </div>
    <span className={styles.milestoneDivider}>·</span>
    <div className={styles.milestone}>
      <span className={styles.milestoneLabel}>USA 250</span>
      <span className={styles.milestoneDays}>{mounted ? `${usa250Days}d` : '—'}</span>
    </div>
  </div>

  {/* NO CTA BUTTON - hero handles this */}
</div>
```

### Remove from component:
- Progress bar JSX
- Progress bar state/useMemo
- CTA wrapper and Link
- Event tagline (`featuredTagline`)
- PROGRESS_BAR_EVENTS import (if not used elsewhere)

---

## FILE 2: Update SmartCommemorativeCard.module.css

**File:** `/components/SmartCommemorativeCard.module.css`

### Remove these classes:
- `.progressBar`
- `.progressItem`
- `.progressLine`
- `.progressLineActive`
- `.progressDot`
- `.progressDotComplete`
- `.progressDotCurrent`
- `.progressLabel`
- `.progressLabelCurrent`
- `.progressLabelFull`
- `.progressLabelShort`
- `.ctaWrapper`
- `.cta`
- `.featuredTagline`

### Update card styles:
```css
.card {
  position: relative;
  background: rgba(10, 22, 40, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: 0.5rem;
  padding: 1.25rem;
  width: 100%;
  max-width: 20rem; /* 320px - more compact */
}

/* Remove media query that increased max-width */
```

---

## FILE 3: Create New Hero Layout

**File:** `/app/(main)/home/page.tsx`

### Replace the entire hero section with 60/40 grid layout:

```tsx
{/* HERO SECTION - 60/40 Split */}
<section className={styles.hero}>
  {/* Background layers (keep existing) */}
  <div className={styles["hero-bg"]} />
  <div className={styles["hero-overlay"]} />
  
  {/* Content Grid */}
  <div className={styles["hero-content"]}>
    <div className={styles["hero-grid"]}>
      
      {/* LEFT COLUMN - 60% - Brand */}
      <div className={styles["hero-brand"]}>
        <p className={`${styles["hero-eyebrow"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.1s' } as React.CSSProperties}>
          Tennessee State Historic Site
        </p>
        
        <h1 className={`${styles["hero-headline"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.2s' } as React.CSSProperties}>
          TENNESSEE
        </h1>
        
        <p className={`${styles["hero-subhead"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.3s' } as React.CSSProperties}>
          starts here
        </p>
        
        <div className={`${styles["hero-divider"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.4s' } as React.CSSProperties} />
        
        <p className={`${styles["hero-tagline"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.5s' } as React.CSSProperties}>
          The first capital of the Southwest Territory · Est. 1770
        </p>
        
        <p className={`${styles["hero-location"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.6s' } as React.CSSProperties}>
          <span className={styles["hero-location-icon"]}>📍</span>
          Piney Flats, Tennessee
        </p>
        
        <div className={`${styles["hero-ctas"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.7s' } as React.CSSProperties}>
          <Link href="/visit" className={styles["hero-cta-primary"]}>
            <span className={styles["hero-cta-icon"]}>★</span>
            Plan Your Visit
          </Link>
          <Link href="/events" className={styles["hero-cta-secondary"]}>
            Explore Events
          </Link>
        </div>
      </div>
      
      {/* RIGHT COLUMN - 40% - Card */}
      <div className={`${styles["hero-card-wrapper"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.5s' } as React.CSSProperties}>
        <SmartCommemorativeCard />
      </div>
      
    </div>
  </div>
  
  {/* Footer line (keep existing) */}
  <div className={styles["hero-footer"]}>
    <p>Part of the America 250 National Commemoration</p>
  </div>
</section>
```

---

## FILE 4: Add Hero Grid Styles

**File:** `/app/(main)/home/page.module.css`

### Add these new styles (keep existing hero-bg, hero-overlay, hero-animate):

```css
/* HERO GRID - 60/40 Split */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 3fr 2fr; /* 60/40 split */
    gap: 3rem;
    padding: 3rem 2rem;
  }
}

/* LEFT COLUMN - Brand */
.hero-brand {
  text-align: center;
}

@media (min-width: 1024px) {
  .hero-brand {
    text-align: left;
  }
}

.hero-eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
}

.hero-headline {
  font-family: var(--font-display), serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 0.9;
  margin: 0;
}

.hero-subhead {
  font-family: var(--font-display), serif;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-style: italic;
  color: var(--accent, #c9a227);
  margin: 0 0 1rem 0;
}

.hero-divider {
  width: 4rem;
  height: 2px;
  background: rgba(201, 162, 39, 0.5);
  margin: 0 auto 1rem;
}

@media (min-width: 1024px) {
  .hero-divider {
    margin: 0 0 1rem 0;
  }
}

.hero-tagline {
  font-size: 0.875rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0.5rem 0;
}

.hero-location {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  .hero-location {
    justify-content: flex-start;
  }
}

.hero-location-icon {
  font-size: 0.875rem;
}

/* CTAs */
.hero-ctas {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .hero-ctas {
    flex-direction: row;
    justify-content: center;
  }
}

@media (min-width: 1024px) {
  .hero-ctas {
    justify-content: flex-start;
  }
}

.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--accent, #c9a227);
  color: var(--primary, #0a1628);
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background 0.2s ease;
}

.hero-cta-primary:hover {
  background: #d4af37;
}

.hero-cta-icon {
  font-size: 1rem;
}

.hero-cta-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.hero-cta-secondary:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

/* RIGHT COLUMN - Card Wrapper */
.hero-card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1024px) {
  .hero-card-wrapper {
    justify-content: flex-end;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-cta-primary,
  .hero-cta-secondary {
    transition: none;
  }
}
```

### Remove these old styles (no longer needed):
- `.hero-year-block`
- `.hero-year-badge`
- `.hero-year-label`
- `.hero-milestones`
- Any duplicate CTA styles that were inside the old year block

---

## FILE 5: Update eventUtils.ts

**File:** `/lib/eventUtils.ts`

### Add digital-only filter:

```typescript
// IDs of digital-only events to skip in "Coming Next" display
// These are events visitors can't physically attend
export const DIGITAL_ONLY_EVENT_IDS = ['road-to-250'];
```

### Update the SmartCommemorativeCard to use this:

In the `nextEvent` useMemo, change the filter to also exclude digital-only events:

```typescript
const eligibleEvents = (eventsData.events as Event[])
  .filter(e => !EXCLUDED_EVENT_IDS.includes(e.id))
  .filter(e => !DIGITAL_ONLY_EVENT_IDS.includes(e.id)) // Skip digital-only
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
```

---

## VERIFICATION CHECKLIST

After implementation, verify:

1. **Desktop (>1024px):**
   - [ ] 60/40 grid layout is visible
   - [ ] Brand content is on left, left-aligned
   - [ ] Card is on right, vertically centered
   - [ ] CTAs are in left column only
   - [ ] No CTA button in card
   - [ ] No progress bar in card
   - [ ] Card shows "2026 Commemorative Year" header
   - [ ] Card shows Woolly Days (not Season Opening)

2. **Tablet (640-1024px):**
   - [ ] Single column, centered content
   - [ ] Card below brand content
   - [ ] CTAs side-by-side

3. **Mobile (<640px):**
   - [ ] Single column, centered content
   - [ ] CTAs stacked full-width
   - [ ] Card fits without horizontal scroll

4. **Functionality:**
   - [ ] Countdowns display correctly (89 days to Woolly Days)
   - [ ] TN 230 and USA 250 countdowns visible
   - [ ] Primary CTA goes to /visit
   - [ ] Secondary CTA goes to /events
   - [ ] `npm run build` passes

---

## SUMMARY OF REMOVALS

### From SmartCommemorativeCard.tsx:
- Progress bar JSX and logic
- CTA button and wrapper
- Event tagline display
- "From Fleece to Flag" text

### From SmartCommemorativeCard.module.css:
- All `.progress*` classes
- `.ctaWrapper` and `.cta` classes
- `.featuredTagline` class

### From home/page.tsx:
- Old vertical year block
- Duplicate CTA structure

### From home/page.module.css:
- `.hero-year-block` and related classes

---

## WHAT STAYS THE SAME

- Navigation component (already updated)
- Event data structure
- Countdown calculation logic
- Corner accent styling
- Hero background/overlay
- Animation delays
- America 250 footer line
