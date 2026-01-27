# Claude Code Prompt: Rocky Mount Hero Card v2

## Project
`/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

## Task
Replace the existing hero year block in `app/(main)/home/page.tsx` with a new "From Fleece to Flag" commemorative card that tells Rocky Mount's 2026 textile narrative arc.

## What to Build

Create a new component `components/CommemorativeCard.tsx` with this structure:

```
┌───────────────────────────────────────────────────────────────┐
│           Rocky Mount State Historic Site                     │
│           2026 COMMEMORATIVE YEAR                             │
│           "Where Tennessee Began"                             │
│                                                               │
│   🐑 Woolly Days  →  🧵 Stitching Independence  →  🇺🇸 America 250
│      Apr 25-26           Jun 13-14                  Jul 4     │
│                                                               │
│   ┌─────────────────┐     ┌─────────────────┐                │
│   │ TENNESSEE 230   │     │ AMERICA 250     │                │
│   │ Statehood Day   │     │ Birthday        │                │
│   │ June 1          │     │ July 4          │                │
│   │ [X] days        │     │ [X] days        │                │
│   └─────────────────┘     └─────────────────┘                │
│                                                               │
│   ─────────────────── ✦ ───────────────────                  │
│                                                               │
│   FIRST FAMILIES OF TENNESSEE REUNION                         │
│   September 11-13 · A Gathering of Descendants                │
│   [ Register Your Family ]                                    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Design Requirements

1. **Header**
   - Eyebrow: "Rocky Mount State Historic Site" (uppercase, tracked, amber)
   - Title: "2026 Commemorative Year" (large, white, serif)
   - Tagline: "Where Tennessee Began" (italic, slate-400)

2. **Textile Journey Row**
   - Three events connected by arrows (→)
   - Woolly Days: 🐑 icon, "Apr 25-26", muted styling
   - Stitching Independence: 🧵 icon, "Jun 13-14", highlighted with amber border/background
   - America 250: 🇺🇸 icon, "Jul 4", muted styling
   - Center event (Stitching) should be visually emphasized

3. **Dual Countdown Section**
   - Two side-by-side countdown boxes
   - Left: Tennessee 230 / Statehood Day / June 1 / [X] days
   - Right: America 250 / Birthday / July 4 / [X] days
   - Days should be calculated dynamically and update daily
   - Use `font-variant-numeric: tabular-nums` for numbers

4. **Divider**
   - Horizontal line with centered ornament (✦)
   - Gradient fade on both sides

5. **First Families Section**
   - Eyebrow: "First Families of Tennessee" (amber)
   - Title: "Reunion"
   - Subtitle: "September 11-13 · A Gathering of Descendants"
   - CTA Button: "Register Your Family" → links to `/events/first-families`

6. **Card Styling**
   - Background: `rgba(10, 22, 40, 0.6)` with `backdrop-filter: blur(4px)`
   - Border: `1px solid rgba(201, 162, 39, 0.3)`
   - Corner accents (top-left, bottom-right) using 2px amber borders
   - Padding: `2rem` mobile, `2.5rem` desktop
   - Max-width: `42rem`, centered

## Files to Create/Modify

### Create: `components/CommemorativeCard.tsx`
- "use client" directive (needs useState, useEffect for countdowns)
- Import Link from next/link
- Import styles from `./CommemorativeCard.module.css`
- Calculate days until June 1, 2026 (Tennessee 230)
- Calculate days until July 4, 2026 (America 250)
- Use `mounted` state to avoid hydration mismatch

### Create: `components/CommemorativeCard.module.css`
- Match existing site design language (see `app/(main)/home/page.module.css`)
- Use CSS variables: `var(--accent)`, `var(--primary)`, `var(--font-serif)`
- Include `prefers-reduced-motion` media query
- Mobile responsive (stack elements on small screens)

### Modify: `app/(main)/home/page.tsx`
- Add import: `import CommemorativeCard from "@/components/CommemorativeCard";`
- Find and replace the existing year block:

**Find:**
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

**Replace with:**
```tsx
{/* 2026 Commemorative Card */}
<div className={styles["hero-animate"]} style={{ '--delay': '0.7s' } as React.CSSProperties}>
  <CommemorativeCard />
</div>
```

## Color Palette Reference
- Amber/Gold: `#c9a227` or `var(--accent)`
- Primary dark: `#0a1628` or `var(--primary)`
- Text white: `#ffffff`
- Text muted: `rgba(255, 255, 255, 0.6)`
- Border accent: `rgba(201, 162, 39, 0.3)`

## Target Dates for Countdown
- Tennessee 230: `2026-06-01T00:00:00-04:00`
- America 250: `2026-07-04T00:00:00-04:00`

## Accessibility
- Use semantic HTML (header for top section, nav or section for journey)
- Include aria-label on countdown: "X days until Tennessee's 230th birthday"
- Button should be a Link component with proper focus states
- Ensure sufficient color contrast

## After Implementation
1. Run `npm run dev` and verify the card renders correctly
2. Check mobile responsiveness (stack journey items vertically below 640px)
3. Verify countdowns calculate correctly
4. Test the "Register Your Family" link
5. Confirm reduced motion preferences are respected
