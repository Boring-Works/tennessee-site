# Evidence Data Loading System - Robustness Review

**Review Date:** January 30, 2026
**Files Reviewed:**

- `/lib/evidence/loader.ts` (532 lines)
- `/lib/evidence/types.ts` (329 lines)
- Document samples from `/content/documents/`, `/content/people/`, `/content/collections/`

**Summary:** The data loading system has solid foundations with good error handling for missing files, but contains several issues around null/undefined handling, type safety, and potential edge case failures.

---

## Issues Found

### 1. **CRITICAL: Unsafe Type Assertions Without Validation**

**Location:** `loader.ts` lines 120, 293, 407

```typescript
const frontmatter = parsed.data as DocumentFrontmatter
const frontmatter = parsed.data as PersonFrontmatter
const frontmatter = parsed.data as CollectionFrontmatter
```

**Problem:**

- Type assertions (`as`) without validation assume the YAML frontmatter matches the expected schema
- If a file is missing required fields (e.g., `id`, `title`, `author` missing from Person), the code will create an object with `undefined` values
- These undefined values can then crash downstream code that doesn't expect them

**Example Failure:**

```yaml
# Malformed person file
---
id: john-doe
name: John Doe
# Missing: bio_type, is_cherokee, is_signatory
---
```

This creates a `Person` object with `bio_type: undefined`, violating the type contract.

**Impact:** High - Can cause runtime errors in components that expect required fields
**Fix:** Use a validation library (Zod, Yup) or manual validation before type assertion

---

### 2. **HIGH: Unsafe Optional Field Access with No Defaults**

**Location:** `loader.ts` lines 145, 147

```typescript
people_mentioned: frontmatter.people_mentioned || [],
responds_to: frontmatter.responds_to,  // Could be undefined
responses: frontmatter.responses,      // Could be undefined
```

**Problem:**

- Some fields get default values (`people_mentioned: []`)
- But optional fields like `responds_to`, `responses`, `author`, `recipient` are passed through as `undefined`
- This is inconsistent and can cause issues if code assumes these fields exist

**Impact:** Medium - Depends on downstream usage
**Better Pattern:**

```typescript
const document: Document = {
  // ... other fields ...
  author: frontmatter.author, // OK - optional in type
  responds_to: frontmatter.responds_to, // OK - optional in type
  responses: frontmatter.responses ?? [], // Consistent default
}
```

---

### 3. **HIGH: Unsafe Empty Passage Text Handling**

**Location:** `loader.ts` line 52

```typescript
const text = match[2].trim() // Could be empty string
```

**Problem:**

- After regex match, `match[2]` could be whitespace-only or empty
- `.trim()` returns empty string for whitespace-only content
- A passage with only whitespace creates a `Passage` object with `text: ""`
- This is technically valid but semantically wrong (empty passage)

**Example:**

```xml
<passage id="empty">

</passage>
```

Results in: `{ id: "...", text: "", line_range: [...] }`

**Impact:** Medium - Creates invalid data that wastes storage and confuses UI
**Fix:**

```typescript
const text = match[2].trim()
if (!text) {
  // Skip empty passages or log warning
  continue
}
passages.push({ ... })
```

---

### 4. **MEDIUM: Missing Empty Array/Collection Validation**

**Location:** Multiple functions use simple filtering:

```typescript
// getDocumentsByCollection, getDocumentsByAuthor, etc.
return allDocs.filter((doc) => doc.collection === collection)
```

**Problem:**

- If no documents match, returns empty array with no indication
- No logging or warning if a collection/author has no documents
- Hard to detect if data was corrupted or if a filter simply matched nothing

**Example:**

```typescript
const docs = await getDocumentsByAuthor('nonexistent-person')
// Returns [] with no indication whether the person exists
```

**Impact:** Low-Medium - More of a UX/debugging issue
**Fix:** Callers should validate results, or add debug logging:

```typescript
const docs = await getDocumentsByCollection(collection)
if (docs.length === 0) {
  logger.warn(`No documents found for collection: ${collection}`)
}
```

---

### 5. **MEDIUM: Date Parsing Not Validated**

**Location:** `loader.ts` line 138 and `getDocumentNavigation` line 492

```typescript
date: String(frontmatter.date),  // No format validation
// Later used in:
const dateA = new Date(a.date)
const dateB = new Date(b.date)
```

**Problem:**

- Frontmatter date is cast to string without validating format
- If someone enters `date: "10/20/1790"` (wrong format), `new Date()` may parse it incorrectly or return `Invalid Date`
- Silent failures in sorting if dates are invalid

**Example Failure:**

```yaml
date: "October 20, 1790"  # Wrong format
# Later: new Date("October 20, 1790") works but inconsistent
date: "20-10-1790"        # Wrong format
# Later: new Date("20-10-1790") might be undefined date, breaks sorting
```

**Impact:** Medium - Silent failures in sorting could appear as random ordering
**Expected Format:** ISO 8601 `YYYY-MM-DD` (used correctly in actual data)
**Fix:**

```typescript
if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date)) {
  throw new Error(`Invalid date format: ${frontmatter.date}`)
}
date: frontmatter.date,
```

---

### 6. **MEDIUM: Unchecked Required Fields Could Be Undefined**

**Location:** `loader.ts` lines 136-148

```typescript
const document: Document = {
  id: frontmatter.id, // No check for undefined
  title: frontmatter.title, // No check for undefined
  date: String(frontmatter.date), // No check for undefined
  content_type: frontmatter.content_type as DocumentContentType, // Cast without validation
  source: frontmatter.source, // No check for undefined
  collection: frontmatter.collection, // No check for undefined
  // ...
}
```

**Problem:**

- If a document file is missing required fields, these become `undefined`
- TypeScript believes they're valid because of the unsafety of `as` assertions
- Component code that expects `document.title` to exist will crash or show `undefined`

**Real Example From Data:**
The actual data is well-formed, but code has no protection if someone adds a malformed document.

**Impact:** High - Can cause crashes in components
**Fix:**

```typescript
if (!frontmatter.id || !frontmatter.title) {
  throw new Error(`Document ${filePath} missing required fields`)
}
```

---

### 7. **LOW: Inefficient Line Counting**

**Location:** `loader.ts` lines 59-64

```typescript
const textBeforeStart = content.slice(0, startIndex)
const startLine = textBeforeStart.split('\n').length

const textBeforeEnd = content.slice(0, endIndex)
const endLine = textBeforeEnd.split('\n').length
```

**Problem:**

- Splits entire string twice per passage
- For large documents with many passages, this is O(n\*m) where n=document size, m=passage count
- Could be optimized to single pre-computed line map

**Impact:** Low - Only affects performance with many large passages (not current issue)
**Fix (if needed later):**

```typescript
// Pre-compute line positions once
const linePositions = [0]
for (let i = 0; i < content.length; i++) {
  if (content[i] === '\n') linePositions.push(i + 1)
}

const startLine = linePositions.filter((pos) => pos < startIndex).length
const endLine = linePositions.filter((pos) => pos < endIndex).length
```

---

### 8. **LOW: Regex Performance Edge Case**

**Location:** `loader.ts` line 47

```typescript
const passageRegex = /<passage\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/passage>/g
```

**Problem:**

- Uses `[\s\S]*?` for multiline matching (non-greedy, which is good)
- Pattern is fine for normal use, but `[^"]+` requires at least 1 char in id
- Empty ID like `id=""` won't match (this is actually a feature, not a bug)

**Actually Good:** Empty IDs are correctly rejected
**Edge Case:** Passage IDs with special characters:

```xml
<passage id="test-123_v2">text</passage>  ✓ Works
<passage id="test:colon">text</passage>  ✓ Works
<passage id="test\"quote">text</passage> ✗ Breaks regex
```

**Impact:** Very Low - Only if someone uses quotes in passage IDs (unlikely)

---

### 9. **MEDIUM: getAllDocuments/People/Collections Silent Failures**

**Location:** `loader.ts` lines 174-182

```typescript
const documents = await Promise.all(
  slugs.map(async (slug) => {
    const doc = await getDocument(slug)
    return doc // Could be null
  })
)

return documents.filter((doc): doc is Document => doc !== null)
```

**Problem:**

- If a document fails to load (parsing error), it returns `null`
- Error is swallowed silently
- No logging of which file failed or why
- Users see incomplete data without knowing some documents were skipped

**Example Failure:**
If a document's YAML is malformed:

```yaml
---
id: test
title: Test
date: invalid-date
author:
  - not: valid # YAML error
---
```

The file would fail to parse, but you'd never know which file or why.

**Impact:** High - Corrupted data goes unnoticed
**Fix:**

```typescript
const documents = await Promise.all(
  slugs.map(async (slug) => {
    try {
      const doc = await getDocument(slug)
      return doc
    } catch (error) {
      logger.error(`Failed to load document: ${slug}`, error)
      return null
    }
  })
)

const loaded = documents.filter((doc): doc is Document => doc !== null)
const failed = slugs.length - loaded.length
if (failed > 0) {
  logger.warn(`Loaded ${loaded.length}/${slugs.length} documents (${failed} failed)`)
}
return loaded
```

---

### 10. **MEDIUM: No Verification of Person/Collection References**

**Location:** Various filtering functions

```typescript
export async function getDocumentsByAuthor(authorId: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter((doc) => doc.author === authorId)
}
```

**Problem:**

- No validation that the `authorId` exists as a real person
- Document can reference non-existent people
- Dead links in UI if person doesn't exist

**Example:**

```yaml
# In document
author: 'nonexistent-person-id'
```

This creates a valid document with an invalid person reference.

**Impact:** Medium - Can create dead links
**Fix:** Add validation (only if implementing referential integrity):

```typescript
export async function validateDocumentReferences(): Promise<string[]> {
  const docs = await getAllDocuments()
  const people = await getAllPeople()
  const personIds = new Set(people.map((p) => p.id))

  const errors: string[] = []
  for (const doc of docs) {
    if (doc.author && !personIds.has(doc.author)) {
      errors.push(`Document ${doc.id} references non-existent author: ${doc.author}`)
    }
    // ... check recipient, people_mentioned, collection, etc.
  }
  return errors
}
```

---

## Code Quality Observations

### What's Good ✓

1. **File Not Found Handling** - Properly catches `ENOENT` and returns null
2. **Extension Flexibility** - Tries both `.md` and `.mdx` extensions
3. **Re-throw Pattern** - Non-ENOENT errors are properly re-thrown
4. **Type Exports** - Types are well-documented with comments
5. **Passage Extraction** - Regex correctly handles multi-line passages
6. **Navigation Data** - Chronological sorting works correctly (if dates are valid)
7. **Filter Type Guards** - Uses proper TypeScript type guards for null filtering

### What Needs Attention ⚠️

1. No runtime validation of required fields
2. Unsafe type assertions without schema validation
3. Silent failures in batch operations
4. No logging of data loading issues
5. No referential integrity checks
6. Date format not validated before parsing
7. Empty passages not filtered out

---

## Recommendations

### Immediate (Before Production Use)

1. **Add Schema Validation** - Use Zod to validate frontmatter before type assertion:

```typescript
import { z } from 'zod'

const DocumentFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  content_type: z.enum(['letter', 'treaty', ...]),
  source: z.string().min(1),
  // ... other required fields
})

const frontmatter = DocumentFrontmatterSchema.parse(parsed.data)
```

2. **Add Error Logging** - Catch and log failures in batch operations:

```typescript
const result = await getDocument(slug).catch((error) => {
  logger.error(`Failed to load ${slug}`, error)
  return null
})
```

3. **Filter Empty Passages** - Skip whitespace-only passages:

```typescript
if (text) {  // Only add if non-empty
  passages.push({ ... })
}
```

### Short Term (Next Sprint)

4. **Add Data Validation Script** - Create a build-time validation:

```bash
npm run validate:evidence
```

5. **Add Type-Safe Filtering** - Create helper functions that validate references exist

6. **Add Logging Integration** - Use your existing logger for data issues

### Long Term (Consider)

7. **Database Layer** - Move to database with proper constraints instead of file-based
8. **Referential Integrity** - Enforce that all person/collection references exist
9. **Schema Migration** - Support versioning if schema changes over time

---

## Testing Recommendations

### Unit Tests to Add

```typescript
describe('extractPassages', () => {
  it('handles empty passages', () => {
    const result = extractPassages('<passage id="empty">  </passage>', 'doc1')
    expect(result).toEqual([]) // Should filter empty
  })

  it('handles consecutive passages', () => {
    const content = '<passage id="a">text1</passage><passage id="b">text2</passage>'
    const result = extractPassages(content, 'doc1')
    expect(result).toHaveLength(2)
  })

  it('ignores unclosed passages', () => {
    const result = extractPassages('<passage id="test">unclosed', 'doc1')
    expect(result).toEqual([])
  })
})

describe('getDocument', () => {
  it('throws on invalid date format', async () => {
    // Create mock file with invalid date
    expect(() => parseDocument(invalidYaml)).toThrow()
  })

  it('throws on missing required fields', async () => {
    // Create mock file with missing id
    expect(() => parseDocument(missingIdYaml)).toThrow()
  })
})
```

### Integration Tests

```typescript
describe('Evidence Loading Integration', () => {
  it('validates all documents load correctly', async () => {
    const docs = await getAllDocuments()
    expect(docs.length).toBeGreaterThan(0)

    for (const doc of docs) {
      expect(doc.id).toBeDefined()
      expect(doc.title).toBeDefined()
      expect(/^\d{4}-\d{2}-\d{2}$/.test(doc.date)).toBe(true)
    }
  })

  it('validates all references exist', async () => {
    const docs = await getAllDocuments()
    const people = await getAllPeople()
    const personIds = new Set(people.map((p) => p.id))

    for (const doc of docs) {
      if (doc.author) expect(personIds.has(doc.author)).toBe(true)
      if (doc.recipient) expect(personIds.has(doc.recipient)).toBe(true)
    }
  })
})
```

---

## Current Data Quality Assessment

The actual data files in `/content/` are **well-formed**:

- ✓ All required fields present
- ✓ Dates in correct ISO format
- ✓ Person references exist
- ✓ Passages properly formatted
- ✓ No empty passages
- ✓ Collections referenced correctly

**But:** The code has no protection if someone adds malformed data in the future.

---

## Summary Table

| Issue                      | Severity | Type            | Fix Effort |
| -------------------------- | -------- | --------------- | ---------- |
| Unsafe type assertions     | HIGH     | Type Safety     | 2-3 hours  |
| Silent batch failures      | HIGH     | Error Handling  | 1-2 hours  |
| Missing field validation   | HIGH     | Data Validation | 2-3 hours  |
| Empty passage handling     | MEDIUM   | Edge Case       | 30 mins    |
| Date format validation     | MEDIUM   | Data Validation | 30 mins    |
| No referential integrity   | MEDIUM   | Data Quality    | 3-4 hours  |
| Inconsistent defaults      | MEDIUM   | Code Quality    | 1 hour     |
| Line counting inefficiency | LOW      | Performance     | Not urgent |
| Empty collection handling  | LOW      | UX/Debugging    | 1 hour     |
| Regex edge case            | VERY LOW | Robustness      | < 30 mins  |

---

## Conclusion

The evidence loading system works well for the current, well-formed dataset but lacks defensive programming. Adding schema validation with Zod and proper error logging would significantly improve robustness without major refactoring.

**Priority:** Add Zod schema validation before the system is used with user-generated content or external data sources.
