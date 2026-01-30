# Typography Overflow Audit & Remediation Plan

**Lead:** Professor Marcus Webb, PhD - Typography Standards
**Date:** January 30, 2026
**Mission:** Ensure every character can be read, regardless of content length

---

## Executive Summary

### Current State

The codebase has **partial overflow protection**. Some critical text containers already use `word-wrap: break-word` and `overflow-wrap: break-word`, but many do not. This creates inconsistent behavior when encountering:

- Long Cherokee names (e.g., "ᏓᏓᏬᏙᎯ" / Tutuwodi)
- Long English names (e.g., "Colonel Benjamin Franklin Griffin")
- Long event titles (e.g., "Special Evening Lecture: The Constitutional Conventions of Tennessee")
- Multi-word library card titles and descriptions

### Risk Assessment

**HIGH RISK** - Text overflow can cause:

- Horizontal scrolling on mobile devices
- Hidden content that users cannot access
- Layout breakage in narrow containers
- Poor accessibility for screen readers

---

## ✅ Already Protected Components

These files ALREADY have proper overflow protection and **do not need changes**:

| File                                           | Protected Classes                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `app/(main)/events/page.module.css`            | `.calendar-event-title` (lines 861-862)<br>`.calendar-event-desc` (lines 902-903)     |
| `app/(main)/evidence/people/people.css`        | `.personCardCherokeeName` (lines 196-197)<br>`.personCardEnglishName` (lines 206-207) |
| `app/(main)/evidence/people/[slug]/person.css` | `.personCherokeeName` (lines 119-120)<br>`.personEnglishName` (lines 129-130)         |
| `app/(main)/evidence/library/library.css`      | `.documentCardTitle` (lines 173-174)                                                  |
| `components/evidence/Timeline.module.css`      | `.eventTitle` (lines 415-416)<br>`.eventDescription` (lines 425-426)                  |

---

## 🚨 NEEDS PROTECTION - Critical Fixes

### Priority 1: Names (Cherokee & English)

**File:** `components/evidence/CherokeeSignatories.css`

**Issue:** Names can overflow in featured and signatory cards

**Classes to fix:**

```css
/* Lines 113-120 - Featured Cherokee Name */
.featuredCherokeeName {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--cream);
  letter-spacing: 0.02em;
  line-height: 1.2;
  margin-bottom: 0.25rem;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Lines 122-127 - Featured English Name */
.featuredEnglishName {
  font-family: var(--serif);
  font-size: 1rem;
  color: var(--cream-muted);
  font-style: italic;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Lines 222-228 - Signatory Cherokee Name */
.signatoryCherokeeName {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  color: var(--cream);
  line-height: 1.3;
  margin-bottom: 0.125rem;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Lines 230-235 - Signatory English Name */
.signatoryEnglishName {
  font-family: var(--serif);
  font-size: 0.8125rem;
  color: var(--cream-muted);
  font-style: italic;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Lines 237-242 - Signatory Primary Name */
.signatoryPrimaryName {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  color: var(--cream);
  line-height: 1.3;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

---

### Priority 2: Event Titles

**File:** `components/EventsShowcase/EventsShowcase.module.css`

**Issue:** Showcase event titles can overflow, especially on mobile

**Classes to fix:**

```css
/* Lines 256-262 - Showcase Title */
.showcase-title {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.25;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Lines 340-345 - Category Title */
.showcase-category-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

---

### Priority 3: Library Cards

**File:** `app/(main)/evidence/library/library.css`

**Issue:** Description text can overflow in narrow containers

**Classes to fix:**

```css
/* Lines 175-180 - Document Card Description */
.documentCardDescription {
  font-family: var(--library-serif);
  font-size: 0.9375rem;
  color: var(--library-brown-light);
  line-height: 1.6;
  margin-bottom: 0.75rem;
  /* ADD THESE TWO LINES: */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

---

### Priority 4: Additional Text Containers

**File:** `app/(main)/home/page.module.css`

**Classes to review and fix:**

```css
/* Line 1677 - Blount Title */
.blount-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 2721 - Experience Title */
.experience-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 3040 - Showcase Title */
.showcase-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 3141 - Showcase Category Title */
.showcase-category-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 4031 - Gathering Title */
.gathering-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 4256 - Gathering Event Title */
.gathering-event-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 4392 - Decision Card Title */
.decision-card-title {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Line 4871 - Homecoming Location Name */
.homecoming-location-name {
  /* ADD overflow protection */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

---

## Typography Safety Standard

### The Pattern

**Every text container that displays user-generated or variable-length content MUST include:**

```css
.text-container-class {
  /* Existing styles... */

  /* Typography Safety - REQUIRED */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

### When to Apply

Apply this pattern to:

- **Titles** - Event titles, person names, section headers
- **Names** - Cherokee names, English names, location names
- **Descriptions** - Event descriptions, card descriptions, intro text
- **Multi-word content** - Anything that could be 3+ words

### When NOT to Apply

Do NOT apply to:

- **Fixed labels** - Static UI labels like "Date:", "Time:", "Location:"
- **Single words** - Category names that are always 1 word
- **Icons** - SVG text or icon labels
- **Badges** - Small fixed-width badges with uppercase text

### Optional: Hyphenation

For body text (descriptions, paragraphs), consider adding:

```css
hyphens: auto;
```

**Only use when:**

- Text is longer than 2 lines
- Container is narrow (< 400px)
- Language is set correctly in HTML (`lang="en"`)

---

## Testing Checklist

Before marking any fix as complete, test with:

### Long Name Tests

```
Cherokee: ᏓᏓᏬᏙᎯᎥᏍᎩᎾᎵᎢᏍᏗ
English: Colonel Benjamin Franklin Griffin III Esq.
```

### Long Event Title Test

```
Special Evening Lecture Series Presentation: The Constitutional Conventions of Tennessee and Their Historical Significance for Modern Democracy
```

### Small Screen Test

- iPhone SE (375px width)
- Zoom to 200%
- Portrait orientation

### Expected Behavior

✅ Text wraps to multiple lines
✅ No horizontal scrolling
✅ All text visible and readable
✅ No text cut off by container edges

---

## Work Instructions for Haiku Agents

### Task Assignment Format

```
FILE: [exact file path]
CLASS: [CSS class name]
LINE: [approximate line number]
ACTION: Add typography safety (word-wrap + overflow-wrap)
```

### Standard Response Template

```css
/* Before */
.className {
  font-size: 1.25rem;
  color: var(--color);
}

/* After */
.className {
  font-size: 1.25rem;
  color: var(--color);
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

### Verification Commands

After making changes:

```bash
npm run lint    # Check for syntax errors
npm run build   # Verify production build
```

---

## Implementation Phases

### Phase 1: Critical Path (Priority 1-2)

- Cherokee names in all contexts
- Event titles in calendar and showcases
- **Est. Time:** 30 minutes
- **Impact:** HIGH

### Phase 2: Secondary Elements (Priority 3)

- Library card descriptions
- Visit page figure names
- Lecture speaker names
- **Est. Time:** 20 minutes
- **Impact:** MEDIUM

### Phase 3: Homepage Elements (Priority 4)

- All homepage section titles
- Gathering event titles
- Decision card titles
- **Est. Time:** 25 minutes
- **Impact:** MEDIUM

### Phase 4: Audit & Verify

- Visual regression testing
- Long content testing
- Mobile device testing
- **Est. Time:** 15 minutes
- **Impact:** HIGH

**Total Estimated Time:** 90 minutes

---

## Edge Cases & Considerations

### Cherokee Language

- Cherokee syllabary characters (ᎠᏍᏆᏂ) can be wider than Latin characters
- Some Cherokee names are 4-6 syllables (20+ characters)
- Test with longest known names in dataset

### Narrow Containers

- Calendar cards on mobile (< 320px)
- Sidebar elements
- Grid layouts at breakpoints

### Accessibility

- Screen readers benefit from proper wrapping
- Magnification users (200%+ zoom) need wrapping
- High contrast mode should not hide overflow

---

## Success Criteria

✅ Zero horizontal scrolling on mobile devices
✅ All Cherokee names fully visible in all contexts
✅ All event titles wrap gracefully
✅ No text cut off at container edges
✅ Consistent behavior across all browsers
✅ Passes WCAG 2.1 AA reflow criteria (1.4.10)

---

## Notes from Professor Webb

> "Text overflow is not a cosmetic issue—it's an accessibility crisis. When text disappears off-screen, we've failed our users. Every Cherokee name deserves to be seen in full. Every event title deserves to wrap naturally. This is non-negotiable."

> "The standard is simple: `word-wrap: break-word` + `overflow-wrap: break-word`. Two lines. No excuses. If it contains words, it needs wrapping."

---

**Next Steps:**

1. Assign Phase 1 tasks to Haiku workers
2. Review and approve changes
3. Run visual regression tests
4. Deploy fixes incrementally
5. Document in project standards

---

_"Every character deserves to be read." - Professor Webb_
