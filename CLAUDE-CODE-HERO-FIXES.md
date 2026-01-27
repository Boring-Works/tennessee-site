# Claude Code Prompt: Hero Layout Fixes

## Project
`/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

## Task
Fix visual issues with the 60/40 hero layout. Card alignment, header styling, countdown layout.

---

## FIXES NEEDED

### Fix 1: Card Header — Make "2026 COMMEMORATIVE YEAR" One Line

**File:** `/components/SmartCommemorativeCard.tsx`

Current header shows "2026" huge on its own line, then "COMMEMORATIVE YEAR" below.

Change the header JSX to:
```tsx
<div className={styles.header}>
  <span className={styles.eyebrow}>2026 Commemorative Year</span>
</div>
```

**File:** `/components/SmartCommemorativeCard.module.css`

Update `.eyebrow` to be a single-line treatment:
```css
.eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent, #c9a227);
  text-align: center;
  display: block;
}

.header {
  text-align: center;
  margin-bottom: 0.75rem;
}
```

Remove any separate `.year` or large "2026" styling if it exists.

---

### Fix 2: Milestones — Make Inline (Not Stacked)

**File:** `/components/SmartCommemorativeCard.module.css`

The TN 230 and USA 250 countdowns are stacking vertically. Force them inline:

```css
.milestones {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
  font-size: 0.75rem;
}

.milestone {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;
  white-space: nowrap;
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
```

---

### Fix 3: Card Vertical Alignment

**File:** `/app/(main)/home/page.module.css`

Ensure the card wrapper centers vertically with the brand content:

```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center; /* This is key */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 70vh; /* Ensure hero has height for centering */
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    padding: 3rem 2rem;
    min-height: 80vh;
  }
}

.hero-card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1024px) {
  .hero-card-wrapper {
    justify-content: center; /* Center, not flex-end */
  }
}
```

---

### Fix 4: Reduce Dead Space — Adjust Hero Height

**File:** `/app/(main)/home/page.module.css`

If there's too much empty space below content, constrain the hero:

```css
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  display: flex;
  flex-direction: column;
}

.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px; /* Account for fixed nav */
}

.hero-footer {
  padding: 1rem;
  text-align: center;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

### Fix 5: Card Width — Slightly Wider

**File:** `/components/SmartCommemorativeCard.module.css`

Card might be too narrow. Increase max-width slightly:

```css
.card {
  position: relative;
  background: rgba(10, 22, 40, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 22rem; /* Was 20rem, now 22rem (352px) */
}
```

---

## VERIFICATION

After fixes:

1. [ ] "2026 Commemorative Year" is ONE line, not two
2. [ ] TN 230 / USA 250 are side-by-side with dot separator
3. [ ] Card is vertically centered with "TENNESSEE starts here"
4. [ ] No excessive dead space below the content
5. [ ] Card is slightly wider (22rem)
6. [ ] Mobile still stacks correctly

---

## QUICK TEST

Resize browser window:
- **>1024px**: 60/40 split, both columns vertically centered
- **<1024px**: Single column, card below brand, everything centered
