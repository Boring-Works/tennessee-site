# People Profiles Formatting Audit Report

**Project:** Tennessee Starts Here
**Directory:** `/content/people/`
**Audit Date:** 2026-01-30
**Total Files Audited:** 50

---

## Executive Summary

The audit found **2 critical issues** and **1 minor inconsistency** across all 50 people profiles. Most files are well-formatted with consistent structure and proper frontmatter.

| Metric                        | Count | Status |
| ----------------------------- | ----- | ------ |
| Total Files                   | 50    | ✓      |
| Critical Issues               | 2     | ❌     |
| Minor Inconsistencies         | 1     | ⚠️     |
| Files with Proper Frontmatter | 50    | ✓      |
| Files Missing Required Fields | 0     | ✓      |

---

## Critical Issues (Must Fix)

### Issue #1: Missing `name_cherokee` Field

**Files Affected:** 2

| File                 | Line | Details                                              |
| -------------------- | ---- | ---------------------------------------------------- |
| `long-will.md`       | 2    | `is_cherokee=true` but missing `name_cherokee` field |
| `robin-mcclemore.md` | 2    | `is_cherokee=true` but missing `name_cherokee` field |

**Current State (long-will.md):**

```yaml
---
id: long-will
name: 'Long Will'
role: 'Signatory'
bio_type: basic
is_cherokee: true
is_signatory: true
signature_url: 'https://digitreaties.org/treaties/treaty/88697242/'
documents: ['treaty-holston-1791']
---
```

**Fix:** Add the `name_cherokee` field with the Cherokee name or transliteration. Example from similar profiles:

```yaml
name_cherokee: '[Cherokee name or transliteration]'
```

**Note:** These appear to be individuals with English names who lack documented Cherokee names. Options:

1. Research and add the Cherokee name/transliteration if available
2. Add `name_cherokee_note: 'No Cherokee name documented'` to indicate research was done
3. Set `is_cherokee: false` if reassessment determines they are not Cherokee

---

## Minor Inconsistencies

### Issue #2: Inconsistent ID Field Naming

**Severity:** Low (functional but inconsistent)

| Metric              | Value |
| ------------------- | ----- |
| Files using `id:`   | 49    |
| Files using `slug:` | 1     |
| Files with both     | 0     |

**Affected File:**

- `andrew-jackson.md:2` - Uses `slug: andrew-jackson` instead of `id: andrew-jackson`

**Current State:**

```yaml
---
slug: andrew-jackson
name: Andrew Jackson
birth_date: '1767-03-15'
death_date: '1845-06-08'
is_cherokee: false
is_signatory: false
dignitary_title: '7th President of the United States'
---
```

**Recommendation:** Change to use `id` field for consistency with all other profiles:

```yaml
---
id: andrew-jackson
name: Andrew Jackson
...
```

---

## Detailed Audit Findings

### 1. YAML Frontmatter Structure

**Status:** ✓ PASS

- All 50 files properly delimited with `---` markers
- All frontmatter is valid YAML
- No parsing errors detected

**Required Fields Check:**
| Field | Status | Count |
|-------|--------|-------|
| `name` | ✓ Present in all | 50/50 |
| `is_cherokee` | ✓ Present in all | 50/50 |
| `is_signatory` | ✓ Present in all | 50/50 |

### 2. Cherokee Names Formatting

**Status:** ✓ MOSTLY PASS (2 exceptions)

**Statistics:**

- Total Cherokee profiles: 42
- With `name_cherokee` field: 40
- Missing `name_cherokee`: 2 (long-will.md, robin-mcclemore.md)

**Formatting Examples (Correct):**

**Basic format:**

```yaml
name: 'Rising Fawn'
name_cherokee: 'Kenotetah'
```

**Extended format (with alternatives):**

```yaml
name: 'John Watts'
name_cherokee: 'Kunoskeskie'
name_cherokee_alt: 'Ganodisgi, Kunokeski'
name_meaning: 'Also known as Young Tassel'
```

**All present Cherokee name patterns are properly quoted and formatted.**

### 3. Verification/Sources Sections

**Status:** ✓ PASS

- Sections use consistent `## Sources` or `## Verification` heading
- All sections contain proper list formatting
- No incomplete sections found
- Example from andrew-jackson.md (lines 36-41):

  ```markdown
  ## Sources

  - Tennessee Encyclopedia
  - Miller Center, University of Virginia
  - Andrew Jackson's Hermitage
  - Library of Congress, Andrew Jackson Papers
  ```

### 4. HTML Artifacts & Copy/Paste Issues

**Status:** ✓ PASS - No artifacts detected

- No `<div>`, `<p>`, `<span>`, `<script>`, `<style>` tags found
- No HTML entity references (e.g., `&nbsp;`, `&lt;`) detected
- No unescaped special characters
- All content uses proper Markdown syntax
- No malformed HTML tags

### 5. Markdown Heading Hierarchy

**Status:** ✓ PASS

**Heading Structure Analysis:**

- First body heading: All use `##` (h2) correctly
- No hierarchy jumps (e.g., h2 to h4)
- Proper nesting when subsections present

**Typical Structure:**

```markdown
## [Person Name] (dates)

[Introduction paragraph]

### [Subsection Title]

[Content]

### [Another Subsection]

[Content]

## Sources

- List items
```

**All 50 files follow proper h2→h3 hierarchy.**

---

## Field Consistency Report

### Standard Field Sets by Profile Type

**Type 1: Basic Cherokee Signatory (Most Common - ~30 files)**

```yaml
id: [filename-slug]
name: '[Full Name]'
name_cherokee: '[Cherokee Name]'
role: 'Signatory'
bio_type: basic
is_cherokee: true
is_signatory: true
signature_url: 'https://digitreaties.org/treaties/...'
documents: ['treaty-holston-1791']
```

**Type 2: Historical Figure (Non-Cherokee - ~8 files)**

```yaml
id: [filename-slug]
name: '[Full Name]'
birth_date: '[YYYY-MM-DD]'
death_date: '[YYYY-MM-DD]'
is_cherokee: false
is_signatory: false
dignitary_title: '[Optional Title]'
```

**Type 3: Full Cherokee Profile (~12 files)**

```yaml
id: [filename-slug]
name: '[Full Name]'
name_cherokee: '[Cherokee Name]'
name_cherokee_alt: '[Alternatives]'
name_meaning: '[Meaning/Notes]'
role: '[Title]'
town: '[Settlement]'
birth_year: [Year]
death_year: [Year]
bio_type: full
is_cherokee: true
is_signatory: [true/false]
```

**Field Consistency:**

- 49 files use `id:` field ✓
- 1 file uses `slug:` field ⚠️
- No conflicts or duplicates detected

---

## Checklist: Audit Criteria Met

| Criteria                          | Result         | Notes                      |
| --------------------------------- | -------------- | -------------------------- |
| YAML frontmatter structure        | ✓ PASS         | All 50 files valid         |
| Cherokee names properly formatted | ⚠️ MOSTLY PASS | 2 missing name_cherokee    |
| Required fields present           | ✓ PASS         | 100% compliance            |
| Verification sections consistent  | ✓ PASS         | All properly formatted     |
| Copy/paste HTML artifacts         | ✓ PASS         | None detected              |
| Markdown heading hierarchy        | ✓ PASS         | All proper h2→h3 nesting   |
| Field naming consistency          | ⚠️ MOSTLY PASS | 1 file uses 'slug' vs 'id' |

---

## Action Items

### Priority 1 (Critical - Blocks data integrity)

1. **Add missing `name_cherokee` fields**
   - [ ] long-will.md - Add Cherokee name or note explaining absence
   - [ ] robin-mcclemore.md - Add Cherokee name or note explaining absence

### Priority 2 (Minor - Style consistency)

1. **Standardize ID field in andrew-jackson.md**
   - [ ] Change `slug:` to `id:` to match other 49 files

---

## Recommendations for Future Profiles

1. **Create template** in project docs for new profile creation
2. **Enforce validation** - Consider schema validation on commit
3. **Field checklist** - Before committing:
   - ✓ Proper YAML delimiters
   - ✓ `id` field (not `slug`)
   - ✓ `name_cherokee` if `is_cherokee: true`
   - ✓ Proper heading hierarchy (## for main, ### for subsections)
   - ✓ Sources section at end

---

## Technical Details

**Audit Method:**

- Automated shell script analysis
- Manual verification of samples
- Regex validation for field names and values
- Structure pattern matching

**Files Checked:**

- andrew-jackson.md, auknah.md, bear-at-home.md, big-acorn.md, black-fox.md, bloody-fellow.md, bold-hunter.md, cabin.md, chickasaw-killer.md, common-disturber.md, doublehead.md, george-miller.md, george-roulstone.md, george-washington.md, hanging-maw.md, henry-knox.md, hugh-williamson.md, john-watts.md, kateh.md, king-fisher.md, kulsatehe.md, little-turkeys-son.md, long-will.md, middle-striker.md, oosenaleh.md, otter-lifter.md, rising-fawn.md, robin-mcclemore.md, she-reigns.md, skyuka.md, slave-catcher.md, standing-turkey.md, stopt-still.md, tekakiska.md, terrapin.md, the-badger.md, the-boots.md, the-crane.md, the-northward.md, the-prince.md, the-thigh.md, thomas-jefferson.md, tinkshalene.md, toonaunailoh.md, tuskega-killer.md, two-killer.md, upsetter.md, william-blount.md, william-cobb.md, yellow-bird.md

---

**Report Generated:** 2026-01-30
**Audit Tool:** Custom shell script analyzer
**Status:** Ready for publication after fixes applied
