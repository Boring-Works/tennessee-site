# FACT-CHECKING SYSTEM — Automated Enforcement

> **Architecture:** Build-time validation + Runtime surfacing
> **Created:** February 3, 2026
> **Status:** Production Ready

---

## OVERVIEW

This system **prevents bad content from being published** through three enforcement levels:

1. **Build-Time** — Zod schema blocks invalid documents at compile
2. **Pre-Commit** — Git hook blocks commits with fact errors
3. **Runtime** — UI surfaces verification status to users

---

## LEVEL 1: BUILD-TIME ENFORCEMENT

### Zod Schema Validation

**Location:** `lib/schemas/document.ts`

**Enforces:**
- ✅ Required fields (id, title, date, source, verification)
- ✅ "verified" status requires 2+ sources
- ✅ "nuance" status requires explanation notes
- ✅ Date format: YYYY-MM-DD
- ✅ Valid content types

**Example Error:**
```
VERIFICATION ERROR: "verified" status requires source_count >= 2.
Use "nuance" or "unverified" for single-sourced claims.
Path: verification.source_count
```

### Usage in Code

```typescript
import { DocumentFrontmatterSchema } from '@/lib/schemas/document'

// Validate during build
const result = DocumentFrontmatterSchema.safeParse(frontmatter)
if (!result.success) {
  throw new Error(result.error.message)
}
```

---

## LEVEL 2: PRE-COMMIT ENFORCEMENT

### Pre-Commit Fact-Checker

**Location:** `scripts/pre-commit-fact-check.ts`

**Runs automatically** before every `git commit` via Husky hook.

**Checks:**
1. ✅ New/modified markdown files against reference library
2. ✅ No wrong variants (e.g., "Blount arrived October 10" → BLOCKED)
3. ✅ Frontmatter passes Zod schema validation

**Example Output:**

```bash
🔍 Running pre-commit fact-check...

Checking 2 file(s):

  ✓ content/documents/blount-arrival-1790.md
  ✗ content/documents/jackson-claim.md

❌ FACT ERRORS DETECTED (1)

Error 1:
  File: content/documents/jackson-claim.md:15
  Pattern matched: "october 10, 1790"
  Correct: William Blount arrived at Rocky Mount on October 11, 1790
  Source: Letter to John Gray Blount, October 20, 1790 (State Archives of NC)

COMMIT BLOCKED
Fix the errors above and try again.
```

**The commit will NOT proceed** until errors are fixed.

---

## LEVEL 3: RUNTIME SURFACING

### VerificationBadge Component

**Location:** `components/VerificationBadge.tsx`

**Displays verification status** to website visitors.

### Usage

```tsx
import { VerificationBadge } from '@/components/VerificationBadge'

export function DocumentViewer({ document }) {
  return (
    <article>
      <h1>{document.title}</h1>

      <VerificationBadge
        status={document.verification.status}
        notes={document.verification.notes}
        sourceCount={document.verification.source_count}
        method={document.verification.method}
      />

      {/* Document content */}
    </article>
  )
}
```

### Visual Examples

**Verified (Green Badge):**
```
✓ Verified (2 sources)
```

**Nuance (Expandable Warning):**
```
⚠ Requires Context [Click for details ▼]

[Expanded:]
Important Context:
ORAL TRADITION ONLY - No primary documentation exists.
2006 dendrochronology study determined main house was built
1827-1830, decades after the claimed 1788 visit.

Verification method: Cross-referenced Tennessee Encyclopedia,
Rocky Mount Museum, Miller Center, The Hermitage
```

**Unverified (Blue Badge):**
```
ℹ Research in Progress
```

### Compact Version (for lists)

```tsx
import { VerificationBadgeCompact } from '@/components/VerificationBadge'

<VerificationBadgeCompact status="verified" />
// → ✓ Verified
```

---

## HOW IT WORKS: REFERENCE LIBRARY

**Location:** `lib/dredge/reference-library.ts`

**111 verified facts** with wrong variant detection.

### Example Fact

```typescript
{
  id: 'gov-001',
  category: 'governance',
  claim: 'William Blount arrived at Rocky Mount on October 11, 1790',
  source: 'Letter to John Gray Blount, October 20, 1790 (State Archives of NC)',
  sourceType: 'primary',
  confidence: 'verified',
  wrongVariants: [
    'october 10, 1790',          // Wrong day
    'october 12, 1790',
    'blount arrived.{0,20}1791', // Wrong year (regex)
  ],
}
```

**When you commit content containing "Blount arrived October 10":**
- Pre-commit hook matches the wrongVariant regex
- Commit is **BLOCKED**
- You see the correct fact and source

---

## MANUAL VALIDATION

### Full Repository Scan

**Run manually** to check all documents:

```bash
npm run validate:facts
# or
npm run check:facts
```

**Checks:**
- All markdown files in `content/documents/`
- All markdown files in `content/people/`
- All markdown files in `content/collections/`

**Output:**
```bash
🔍 Running fact validation on entire repository...

Found 45 document(s) to check

  ✗ content/documents/jackson-claim.md

VALIDATION SUMMARY
  Files checked: 45
  Fact errors: 1
  Schema errors: 0

❌ FACT ERRORS (1)
...
```

---

## CREATING NEW DOCUMENTS

### Document Template

```yaml
---
id: document-slug
title: "Document Title"
date: 1790-10-20
content_type: letter
source: "Primary source citation"
source_url: "https://..."
collection: collection-name
author: person-slug
recipient: person-slug
people_mentioned:
  - person-1
  - person-2
verification:
  status: verified
  source_count: 2
  method: "Cross-referenced with..."
  notes: "Optional context"
description: "Brief summary (min 10 chars)"
---

Document content here...

<passage id="key-quote">
Important quotation from primary source
</passage>

## Historical Context
...

## Source Notes
...
```

### Verification Status Guide

| Status | When to Use | Requirements |
|--------|-------------|--------------|
| **verified** | Multiple primary sources confirm | `source_count >= 2` |
| **nuance** | True but complicated (oral tradition, contradictions) | `notes` explaining complication |
| **unverified** | Claimed but not yet confirmed | In research, pending sources |

---

## ADDING TO REFERENCE LIBRARY

### When to Add a Fact

Add to `lib/dredge/reference-library.ts` when:
- ✅ Verified by 2+ primary sources
- ✅ Fact is "atomic" (single, testable claim)
- ✅ Common errors exist that should be caught

### How to Add

```typescript
{
  id: 'gov-XXX', // Increment ID
  category: 'governance', // or people, treaty, timeline, etc.
  claim: 'Specific, testable claim',
  source: 'Primary source citation',
  sourceType: 'primary' | 'scholarly' | 'archaeological',
  confidence: 'verified',
  wrongVariants: [
    'common error pattern',
    'another.{0,10}error', // Regex patterns
  ],
}
```

### Categories

- `governance` — Territorial administration, capital operations
- `construction` — Building dates, dendrochronology
- `people` — Biographical facts, roles
- `treaty` — Treaty of Holston, negotiations
- `timeline` — Chronological events
- `cherokee` — Cherokee history, relations
- `administration` — Federal appointments, correspondence
- `violence` — Conflicts, battles
- `geography` — Locations, boundaries

---

## TESTING THE SYSTEM

### Test 1: Try to Commit a Wrong Fact

```bash
# Create a test file with wrong date
echo "Blount arrived October 10, 1790" > test.md
git add test.md
git commit -m "Test commit"

# Expected: COMMIT BLOCKED with error message
```

### Test 2: Verify Schema Enforcement

```yaml
# Missing source_count (should fail)
---
verification:
  status: verified
  method: "Some method"
---
```

```bash
git add document.md
git commit -m "Test"
# Expected: Schema validation error
```

### Test 3: Check VerificationBadge Display

```tsx
// pages/test-badge.tsx
import { VerificationBadge } from '@/components/VerificationBadge'

export default function TestPage() {
  return (
    <div className="space-y-4 p-8">
      <VerificationBadge
        status="verified"
        sourceCount={2}
      />

      <VerificationBadge
        status="nuance"
        notes="This is oral tradition only. No primary documentation exists."
      />

      <VerificationBadge
        status="unverified"
      />
    </div>
  )
}
```

---

## INTEGRATION CHECKLIST

### For Developers

- [ ] Install dependencies: `npm install`
- [ ] Run initial validation: `npm run validate:facts`
- [ ] Test pre-commit hook: Try committing a wrong fact
- [ ] Add VerificationBadge to document viewers

### For Content Creators

- [ ] Read verification status guide (above)
- [ ] Use document template for new content
- [ ] Check reference library before making claims
- [ ] Test commits to see fact-checking in action

### For Editors

- [ ] Review reference library (`lib/dredge/reference-library.ts`)
- [ ] Add new verified facts as research confirms them
- [ ] Update wrongVariants when common errors appear

---

## MAINTENANCE

### Regular Tasks

**Weekly:**
- Review "nuance" documents for new primary sources
- Check if oral traditions can be upgraded to "verified"

**Monthly:**
- Run full validation: `npm run validate:facts`
- Review reference library for completeness

**Quarterly:**
- Audit wrongVariants effectiveness
- Update schema requirements if needed

---

## TROUBLESHOOTING

### "Commit blocked but I fixed the error"

**Cause:** File still staged with old content

**Solution:**
```bash
git add path/to/fixed-file.md
git commit -m "Your message"
```

### "Pre-commit hook not running"

**Cause:** Husky not installed

**Solution:**
```bash
npm run prepare
chmod +x .husky/pre-commit
```

### "False positive on wrong variant"

**Cause:** Regex pattern too broad

**Solution:**
```typescript
// In reference-library.ts, narrow the pattern:
wrongVariants: [
  'blount arrived october 10, 1790', // More specific
  // Not: 'october 10' (too broad)
]
```

---

## ARCHITECTURE SUMMARY

```
┌─────────────────────────────────────────┐
│  Content Creator writes document        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  1. Zod Schema validates frontmatter    │
│     ├─ verified requires 2+ sources     │
│     ├─ nuance requires notes            │
│     └─ All required fields present      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. git commit triggers pre-commit hook │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Pre-commit script runs              │
│     ├─ Checks content vs wrongVariants  │
│     ├─ Validates frontmatter schema     │
│     └─ Blocks commit if errors found    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. Build succeeds (Next.js compiles)   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. VerificationBadge shows status      │
│     ├─ verified: Green checkmark        │
│     ├─ nuance: Warning + context        │
│     └─ unverified: Info badge           │
└─────────────────────────────────────────┘
```

---

## SUCCESS CRITERIA

**The system works when:**

✅ Cannot commit "Blount arrived October 10, 1790"
✅ Cannot commit "verified" with single source
✅ Cannot commit "nuance" without explanation
✅ Website shows verification badges
✅ `npm run validate:facts` passes on all content

---

**System Status:** ✅ Ready for Production

**Next Steps:**
1. Install dependencies: `npm install`
2. Run validation: `npm run validate:facts`
3. Test pre-commit: Try committing wrong fact
4. Integrate VerificationBadge into document viewer

---

_The system enforces itself. Content creators cannot publish bad facts._
