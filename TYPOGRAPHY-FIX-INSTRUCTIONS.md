# Typography Overflow Fix - Quick Instructions

**For:** Haiku Worker Agents
**Standard:** Add overflow protection to text containers

---

## The Fix (Standard Pattern)

Add these two lines to every text class listed below:

```css
word-wrap: break-word;
overflow-wrap: break-word;
```

---

## Phase 1: Critical Fixes (Do First)

### File: `components/evidence/CherokeeSignatories.css`

Add to 5 classes:

1. **Line 113** - `.featuredCherokeeName`
2. **Line 122** - `.featuredEnglishName`
3. **Line 222** - `.signatoryCherokeeName`
4. **Line 230** - `.signatoryEnglishName`
5. **Line 237** - `.signatoryPrimaryName`

### File: `components/EventsShowcase/EventsShowcase.module.css`

Add to 2 classes:

1. **Line 256** - `.showcase-title`
2. **Line 340** - `.showcase-category-title`

---

## Phase 2: Library & Descriptions

### File: `app/(main)/evidence/library/library.css`

Add to 1 class:

1. **Line 175** - `.documentCardDescription`

---

## Phase 3: Homepage Elements

### File: `app/(main)/home/page.module.css`

Add to 8 classes:

1. **Line 1677** - `.blount-title`
2. **Line 2721** - `.experience-title`
3. **Line 3040** - `.showcase-title`
4. **Line 3141** - `.showcase-category-title`
5. **Line 4031** - `.gathering-title`
6. **Line 4256** - `.gathering-event-title`
7. **Line 4392** - `.decision-card-title`
8. **Line 4871** - `.homecoming-location-name`

---

## Example Before/After

### Before

```css
.showcase-title {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.25;
}
```

### After

```css
.showcase-title {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.25;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

---

## Verification

After each file change:

```bash
npm run lint
```

Expected: No errors

---

## Test Data

Use this to verify your changes work:

**Long Cherokee Name:**

```
ᏓᏓᏬᏙᎯᎥᏍᎩᎾᎵᎢᏍᏗ
```

**Long English Name:**

```
Colonel Benjamin Franklin Griffin III Esq.
```

**Long Event Title:**

```
Special Evening Lecture Series Presentation: The Constitutional Conventions of Tennessee
```

---

## Questions?

Refer to `TYPOGRAPHY-OVERFLOW-AUDIT.md` for detailed explanations.

---

**Total Classes to Fix:** 16
**Total Files:** 4
**Estimated Time:** 60 minutes
