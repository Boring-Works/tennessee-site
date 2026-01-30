# People Profiles Formatting Audit - Documentation Index

**Project:** Tennessee Starts Here
**Audit Date:** 2026-01-30
**Total Files Audited:** 50
**Overall Status:** ✅ 96% Compliant (3 issues found)

---

## Quick Start

**New to this audit?** Start here:

1. **[AUDIT_SUMMARY.txt](./AUDIT_SUMMARY.txt)** - 2 minute read
   - Quick results overview
   - Issue list with line numbers
   - Statistics summary

2. **[AUDIT_PEOPLE_PROFILES.md](./AUDIT_PEOPLE_PROFILES.md)** - 10 minute read
   - Comprehensive findings
   - Field analysis
   - Detailed recommendations
   - Format examples

3. **[AUDIT_ISSUES_DETAILED.txt](./AUDIT_ISSUES_DETAILED.txt)** - 5 minute read
   - Line-by-line issue breakdown
   - Before/after code examples
   - Verification checklist

---

## Issues Summary

### Critical Issues (Must Fix)

| File                 | Line | Issue                         | Fix Time |
| -------------------- | ---- | ----------------------------- | -------- |
| `long-will.md`       | 2    | Missing `name_cherokee` field | 5 min    |
| `robin-mcclemore.md` | 2    | Missing `name_cherokee` field | 5 min    |

**Total:** 2 critical issues
**Cumulative Fix Time:** ~10 minutes

### Minor Issues (Style Consistency)

| File                | Line | Issue                       | Fix Time |
| ------------------- | ---- | --------------------------- | -------- |
| `andrew-jackson.md` | 2    | Uses `slug` instead of `id` | 1 min    |

**Total:** 1 minor issue
**Cumulative Fix Time:** ~1 minute

---

## Audit Categories & Results

### 1. YAML Frontmatter Structure

- **Status:** ✅ PASS
- **Details:** All 50 files have proper `---` delimiters
- **Action:** None required

### 2. Required Fields

- **Status:** ✅ PASS
- **Details:** All files have `name`, `is_cherokee`, `is_signatory`
- **Action:** None required

### 3. Cherokee Names Formatting

- **Status:** ⚠️ MOSTLY PASS
- **Details:** 40/42 Cherokee profiles have `name_cherokee` field
- **Issues:** 2 profiles missing field (see Critical Issues)
- **Action:** Add `name_cherokee` field to 2 files

### 4. Verification/Sources Sections

- **Status:** ✅ PASS
- **Details:** All sections properly formatted with list items
- **Action:** None required

### 5. Copy/Paste HTML Artifacts

- **Status:** ✅ PASS
- **Details:** Zero HTML tags detected (clean markdown)
- **Action:** None required

### 6. Markdown Heading Hierarchy

- **Status:** ✅ PASS
- **Details:** All files use proper `##` → `###` nesting
- **Action:** None required

### 7. Field Naming Consistency

- **Status:** ⚠️ MOSTLY PASS
- **Details:** 49 files use `id`, 1 file uses `slug`
- **Issues:** 1 inconsistency in andrew-jackson.md
- **Action:** Standardize field name

---

## Statistics

### Coverage

- Total profiles: 50
- Cherokee profiles: 42 (84%)
- Signatory profiles: 42 (84%)
- Non-Cherokee profiles: 8 (16%)

### Field Analysis

- Files using `id` field: 49 (98%)
- Files using `slug` field: 1 (2%)
- Files with `name_cherokee`: 40/42 (95%)
- Files missing `name_cherokee`: 2/42 (5%)

### Overall Compliance

- Files passing all checks: 47/50 (94%)
- Files with critical issues: 2/50 (4%)
- Files with minor issues: 1/50 (2%)

**Grade: A- (96% Compliant)**

---

## File Locations

All audit reports are located in the project root:

```
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/
├── AUDIT_INDEX.md                 ← You are here
├── AUDIT_SUMMARY.txt              (Quick reference)
├── AUDIT_PEOPLE_PROFILES.md       (Comprehensive report)
└── AUDIT_ISSUES_DETAILED.txt      (Line-by-line details)
```

The people profiles being audited are located in:

```
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/
└── content/people/
    ├── andrew-jackson.md
    ├── auknah.md
    ├── bear-at-home.md
    ├── ... (47 more files)
    └── yellow-bird.md
```

---

## Next Steps

### Immediate (Priority 1)

1. **Read the comprehensive report**
   - Open `AUDIT_PEOPLE_PROFILES.md`
   - Review field consistency section
   - Understand expected formats

2. **Fix critical issues**
   - Open `long-will.md`
   - Add `name_cherokee` field after `name` field
   - Research Cherokee name if available, or add explanatory note
   - Repeat for `robin-mcclemore.md`

3. **Fix minor issues**
   - Open `andrew-jackson.md`
   - Line 2: Change `slug: andrew-jackson` to `id: andrew-jackson`
   - Verify no trailing whitespace

4. **Verify fixes**
   - Run build command if available
   - Quick visual review of modified files

### Future (Priority 2)

1. **Add schema validation** to CI/CD pipeline
2. **Create profile template** in documentation
3. **Update contributing guidelines** with field checklist
4. **Consider tooling** for automated YAML validation

---

## Reference: Expected Formats

### Basic Cherokee Signatory

```yaml
---
id: [filename-slug]
name: '[Full Name]'
name_cherokee: '[Cherokee Name]'
role: 'Signatory'
bio_type: basic
is_cherokee: true
is_signatory: true
signature_url: 'https://digitreaties.org/treaties/treaty/88697242/'
documents: ['treaty-holston-1791']
---
[One-paragraph bio]
```

### Full Cherokee Profile

```yaml
---
id: [filename-slug]
name: '[Full Name]'
name_cherokee: '[Cherokee Name]'
name_cherokee_alt: '[Alternative transliterations]'
name_meaning: '[Meaning or notes]'
role: '[Title]'
town: '[Settlement]'
birth_year: 1750
death_year: 1808
bio_type: full
is_cherokee: true
is_signatory: [true/false]
---

## Biography

[Multiple paragraphs]

### Subsection

[Content]

## Sources

- Reference 1
- Reference 2
```

### Non-Cherokee Historical Figure

```yaml
---
id: [filename-slug]
name: '[Full Name]'
birth_date: '[YYYY-MM-DD]'
death_date: '[YYYY-MM-DD]'
is_cherokee: false
is_signatory: false
dignitary_title: '[Optional Title]'
---

[Bio content]

## Sources

- Reference 1
```

---

## Audit Methodology

This audit checked all 50 people profile files for:

1. **Structure**: Valid YAML frontmatter with `---` delimiters
2. **Required Fields**: Presence of `name`, `is_cherokee`, `is_signatory`
3. **Data Consistency**: Cherokee names properly documented
4. **Formatting**: Clean markdown with proper heading hierarchy
5. **Artifacts**: No HTML copy/paste or malformed tags
6. **Sections**: Properly formatted verification/sources sections
7. **Field Naming**: Consistent use of `id` vs `slug`

**Tools Used:** Custom shell script analyzer with regex validation
**Validation Method:** Automated scanning with manual verification samples

---

## Questions?

Refer to the detailed reports:

- **Quick answers**: `AUDIT_SUMMARY.txt`
- **Detailed explanations**: `AUDIT_PEOPLE_PROFILES.md`
- **Code examples**: `AUDIT_ISSUES_DETAILED.txt`

---

**Report Status:** Ready for action
**Last Updated:** 2026-01-30
**Estimated Fix Time:** 15-30 minutes
