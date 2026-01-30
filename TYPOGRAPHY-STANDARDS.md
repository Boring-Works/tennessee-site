# Typography Standards - Tennessee Starts Here

**Maintained by:** Professor Marcus Webb, PhD
**Purpose:** Prevent text overflow and ensure readability across all devices

---

## The Golden Rule

> **Every text container displaying variable-length content MUST include overflow protection.**

```css
word-wrap: break-word;
overflow-wrap: break-word;
```

---

## Standard Patterns

### Pattern 1: Title/Name (Required)

Use for: Event titles, person names, section headers, card titles

```css
.title-class {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;

  /* Typography Safety - REQUIRED */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

**Why:** Titles can be unpredictably long (e.g., "Special Evening Lecture Series Presentation...")

---

### Pattern 2: Description/Body Text (Required + Optional)

Use for: Event descriptions, card descriptions, paragraph text

```css
.description-class {
  font-size: 0.9375rem;
  line-height: 1.6;

  /* Typography Safety - REQUIRED */
  word-wrap: break-word;
  overflow-wrap: break-word;

  /* Optional: For long paragraphs in narrow containers */
  hyphens: auto;
}
```

**Why:** Descriptions often span multiple lines and need graceful wrapping

---

### Pattern 3: Cherokee Names (Required + Specialty)

Use for: Cherokee syllabary text (ᎠᏍᏆᏂ)

```css
.cherokee-name {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.3;

  /* Typography Safety - REQUIRED */
  word-wrap: break-word;
  overflow-wrap: break-word;

  /* Cherokee-specific: Prevent awkward breaks */
  word-break: normal; /* NOT break-all */
}
```

**Why:** Cherokee characters can be wider than Latin. Long names (ᏓᏓᏬᏙᎯᎥᏍᎩᎾᎵᎢᏍᏗ) must wrap.

---

### Pattern 4: Fixed Labels (Not Required)

Use for: Static UI labels, single-word categories, icons

```css
.label-class {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  /* NO overflow protection needed - content is fixed */
}
```

**Why:** Labels like "Date:", "Location:", "NEW" are predictable and short.

---

## When to Apply

### ✅ Always Apply To:

- Event titles
- Person names (Cherokee and English)
- Location names
- Section titles
- Card titles
- Event descriptions
- Card descriptions
- Speaker names and titles
- Document titles
- Collection titles
- Any user-generated content
- Any content from CMS/JSON data

### ❌ Never Apply To:

- Static labels ("Date:", "Time:")
- Single-word categories ("Tours", "Events")
- Icon labels
- Badge text (< 10 characters)
- Button text
- Navigation menu items
- Fixed-width UI elements

### ⚠️ Use Judgment For:

- Short names (< 20 characters) - Apply if unsure
- Category headers - Apply if multi-word
- Metadata labels - Skip if truly fixed

---

## Testing Requirements

Before merging any new text component, test with:

### 1. Long Content Test

```
Title: Special Evening Lecture Series Presentation: The Constitutional Conventions of Tennessee and Their Historical Significance for Modern Democracy
Name: Colonel Benjamin Franklin Griffin III Esq.
Cherokee: ᏓᏓᏬᏙᎯᎥᏍᎩᎾᎵᎢᏍᏗ (Tutuwodi Tsiganigatlisgv)
```

### 2. Small Screen Test

- iPhone SE (375px)
- Portrait orientation
- Zoom to 200%

### 3. Container Width Test

- Minimum: 280px (narrow cards)
- Medium: 400px (standard mobile)
- Maximum: 640px (desktop single column)

### 4. Browser Test

- Safari iOS (primary)
- Chrome Android (secondary)
- Desktop Safari/Chrome (tertiary)

---

## Common Mistakes

### ❌ Mistake 1: Using `text-overflow: ellipsis` alone

```css
/* BAD - Hides content without indication */
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Why bad:** Users can't see full content, especially on touch devices.

**Fix:** Only use ellipsis for truly constrained UI (breadcrumbs, nav). Never for primary content.

---

### ❌ Mistake 2: Using `word-break: break-all`

```css
/* BAD - Breaks words mid-character */
.title {
  word-break: break-all;
}
```

**Why bad:** Creates unreadable breaks like "Constit|utional" or "ᏣᎳ|Ꭹ".

**Fix:** Use `word-wrap: break-word` instead. It breaks at word boundaries.

---

### ❌ Mistake 3: Forgetting `overflow-wrap`

```css
/* INCOMPLETE - Missing fallback */
.title {
  word-wrap: break-word;
}
```

**Why incomplete:** Older browsers may not support `word-wrap` alone.

**Fix:** Always pair with `overflow-wrap: break-word` for cross-browser support.

---

### ❌ Mistake 4: Fixed `width` without wrapping

```css
/* BAD - Text will overflow */
.card-title {
  width: 300px;
  font-size: 1.25rem;
}
```

**Fix:**

```css
/* GOOD - Text wraps to fit */
.card-title {
  max-width: 300px; /* Use max-width, not width */
  font-size: 1.25rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

---

## Browser Support

| Property                    | Support                 | Notes                     |
| --------------------------- | ----------------------- | ------------------------- |
| `word-wrap: break-word`     | IE 5.5+                 | Legacy name               |
| `overflow-wrap: break-word` | All modern              | Standard name             |
| `hyphens: auto`             | Safari 5.1+, Chrome 55+ | Requires `lang` attribute |

**Strategy:** Use both `word-wrap` and `overflow-wrap` for maximum compatibility.

---

## Accessibility Considerations

### WCAG 2.1 Compliance

**1.4.4 Resize Text (AA)**

- Text must be readable at 200% zoom
- Wrapping prevents horizontal scrolling
- ✅ Overflow protection ensures compliance

**1.4.10 Reflow (AA)**

- Content must reflow at 320px width
- No two-dimensional scrolling
- ✅ Overflow protection ensures compliance

**1.4.12 Text Spacing (AA)**

- Users may adjust line-height and letter-spacing
- Text must not clip or disappear
- ✅ Overflow protection prevents clipping

---

## Performance Notes

**Q: Does `word-wrap: break-word` impact performance?**
**A:** No. It's a standard CSS property with zero performance cost.

**Q: Should I use `word-break: keep-all` for Cherokee?**
**A:** No. It prevents necessary wrapping. Use default `word-break: normal`.

**Q: Does hyphenation (`hyphens: auto`) slow rendering?**
**A:** Minimal impact (< 1ms). Only use for long paragraphs.

---

## Review Checklist

Before approving any PR touching text components:

- [ ] All titles have overflow protection
- [ ] All names (Cherokee & English) have overflow protection
- [ ] All descriptions have overflow protection
- [ ] Tested with long content examples
- [ ] Tested at 375px width (iPhone SE)
- [ ] Tested at 200% zoom
- [ ] No horizontal scrolling observed
- [ ] All text visible and readable
- [ ] No text cut off at container edges

---

## Quick Reference Card

```css
/* Copy-paste this for new text components */

/* For titles, names, headers */
.new-text-class {
  /* Your font styles here */

  /* Typography Safety */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* For long paragraphs/descriptions */
.new-description-class {
  /* Your font styles here */

  /* Typography Safety */
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto; /* Optional */
}
```

---

## Enforcement

### Pre-commit Hooks

Consider adding ESLint/Stylelint rule:

```js
// Future: Warn if title/name classes lack overflow protection
"typography/overflow-protection": "warn"
```

### Code Review

Reviewers should flag any PR that:

- Adds new text classes without overflow protection
- Modifies existing text classes to remove overflow protection
- Uses `text-overflow: ellipsis` on primary content

---

## Future Improvements

1. **Automated Testing**
   - Visual regression tests with long content
   - Automated small-screen tests
   - Overflow detection in CI/CD

2. **Typography Utility Classes**
   - `.text-safe` - Auto-applies overflow protection
   - `.text-hyphenate` - Adds hyphenation
   - Integrate with Tailwind CSS v4

3. **CMS Validation**
   - Max character limits for titles
   - Warning when content exceeds ideal length
   - Preview at multiple screen sizes

---

## Resources

- [MDN: word-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/word-wrap)
- [MDN: overflow-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)
- [WCAG 2.1: Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)
- [Cherokee Language Resources](https://en.wikipedia.org/wiki/Cherokee_syllabary)

---

## Changelog

| Date       | Change                     | Author     |
| ---------- | -------------------------- | ---------- |
| 2026-01-30 | Initial standards document | Prof. Webb |

---

_"Every character deserves to be read. No text left behind."_

**- Professor Marcus Webb, PhD**
**Typography Standards Lead**
