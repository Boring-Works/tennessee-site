# Source Divergence Analysis

**Created:** January 30, 2026
**Purpose:** Identify which Level 3 content files have corresponding Level 2 verified sources

---

## Summary Statistics

| Metric                                   | Count |
| ---------------------------------------- | ----- |
| Level 2 files (`/Historical/processed/`) | 35    |
| Level 3 files (`/content/documents/`)    | 41    |
| Level 3 files WITH Level 2 source        | ~15   |
| Level 3 files WITHOUT Level 2 source     | ~26   |

**Concern Level:** HIGH - More than half of Level 3 documents have no corresponding Level 2 verified source.

---

## Mapping Analysis

### Level 3 Documents WITH Level 2 Correspondence

These Level 3 files have matching Level 2 verified sources (approximate mapping):

| Level 3 File                          | Level 2 File                                               | Status  |
| ------------------------------------- | ---------------------------------------------------------- | ------- |
| `treaty-holston-1791.md`              | `005-treaty-of-holston-1791-07-02.md`                      | MATCHED |
| `washington-proclamation-1791.md`     | `004-washington-proclamation-treaty-holston-1791-11-11.md` | MATCHED |
| `williamson-to-washington-1790-05.md` | `002-williamson-to-washington-1790-05-28.md`               | MATCHED |
| `washington-to-knox-1790-08.md`       | `003-washington-to-knox-1790-08-13.md`                     | MATCHED |
| `southwest-territory-act-1790.md`     | `013-southwest-territory-encyclopedia.md`                  | PARTIAL |

### Level 3 Documents WITHOUT Level 2 Source

These Level 3 documents appear to have been created directly without a corresponding Level 2 verified source:

| Level 3 File                               | Risk Level | Notes                                                |
| ------------------------------------------ | ---------- | ---------------------------------------------------- |
| `blount-arrival-1790.md`                   | MEDIUM     | Key document - needs Level 2 source                  |
| `blount-commission-1790.md`                | MEDIUM     | Needs verification                                   |
| `blount-to-knox-1790-11.md`                | MEDIUM     | Letter series - needs source                         |
| `blount-to-knox-1790-12.md`                | MEDIUM     | Letter series                                        |
| `blount-to-knox-1791-01.md`                | MEDIUM     | Letter series                                        |
| `blount-to-knox-1791-03.md`                | MEDIUM     | Letter series                                        |
| `blount-to-knox-1791-06.md`                | MEDIUM     | Letter series                                        |
| `blount-to-knox-1791-07.md`                | MEDIUM     | Letter series                                        |
| `blount-to-knox-1791-09.md`                | MEDIUM     | Letter series                                        |
| `blount-to-knox-1791-11.md`                | MEDIUM     | Letter series                                        |
| `bradley-map-1796.md`                      | LOW        | Map reference                                        |
| `cherokee-delegation-philadelphia-1792.md` | HIGH       | Cherokee voice - needs careful sourcing              |
| `jackson-at-rocky-mount-1788.md`           | HIGH       | Key claim - has verification notes but no Level 2    |
| `jefferson-to-blount-1791-08.md`           | MEDIUM     | Needs Founders Online source                         |
| `john-watts-boundary-speech-1796.md`       | HIGH       | Cherokee voice - needs careful sourcing              |
| `knox-to-blount-1791-04.md`                | MEDIUM     | Needs source                                         |
| `knoxville-gazette-*.md` (14 files)        | MEDIUM     | Newspaper transcriptions - 1 Level 2 source for many |
| `little-turkey-peace-efforts-1792.md`      | HIGH       | Cherokee voice - needs careful sourcing              |
| `rocky-mount-inventory-1791.md`            | MEDIUM     | Needs source verification                            |
| `treaty-holston-additional-1792.md`        | LOW        | Referenced in main treaty doc                        |
| `washington-to-blount-1790-06.md`          | MEDIUM     | Needs Founders Online source                         |
| `washington-to-senate-1790-06.md`          | MEDIUM     | Partially covered in Level 2                         |

### Level 2 Documents NOT in Level 3

These Level 2 verified sources are NOT used in the website:

| Level 2 File                                      | Content              | Why Not Used?                     |
| ------------------------------------------------- | -------------------- | --------------------------------- |
| `007-jefferson-report-public-lands-1791-11-08.md` | Public lands report  | Tangential to Rocky Mount         |
| `008-jefferson-to-washington-1792-11-02.md`       | Jefferson-Washington | Less relevant                     |
| `009-report-sw-territory-proceedings-*.md`        | Territory reports    | Could be added                    |
| `011-treaty-cherokee-1794.md`                     | 1794 treaty          | Outside focal period              |
| `014-blount-biography-ncpedia.md`                 | Biography            | Separate from documents           |
| `015-blount-biography-house-gov.md`               | Biography            | Separate                          |
| `016-blount-family-members.md`                    | Family info          | Used elsewhere                    |
| `021-cherokee-phoenix-treaty-analysis-1829.md`    | Cherokee analysis    | Could strengthen Cherokee section |
| Various biography files                           | Biographies          | In `/content/people/` instead     |

---

## Risk Assessment

### HIGH RISK Documents

Documents that make significant historical claims without Level 2 backing:

1. **`jackson-at-rocky-mount-1788.md`**
   - Claims: Jackson stayed 6 weeks in Spring 1788
   - Current status: Has verification notes in frontmatter saying "verified" but no Level 2 source exists
   - Mitigation: Create Level 2 source from cited references

2. **`cherokee-delegation-philadelphia-1792.md`**
   - Claims: Cherokee delegation met with Washington
   - Risk: Cherokee perspective needs careful, verified sourcing
   - Mitigation: Create Level 2 source from War Department Papers

3. **`john-watts-boundary-speech-1796.md`**
   - Claims: John Watts speech content
   - Risk: Direct Cherokee voice needs verified transcription
   - Mitigation: Locate original source, create Level 2

4. **`little-turkey-peace-efforts-1792.md`**
   - Claims: Little Turkey's peace efforts
   - Risk: Cherokee perspective needs verification
   - Mitigation: Create Level 2 from documented sources

### MEDIUM RISK Documents

Documents that are probably accurate but lack formal Level 2 backing:

- All `blount-to-knox-*.md` files (8 documents)
- All `knoxville-gazette-*.md` files (14 documents)
- `jefferson-to-blount-1791-08.md`
- `knox-to-blount-1791-04.md`

### LOW RISK Documents

Documents with partial Level 2 coverage or easily verifiable:

- `treaty-holston-additional-1792.md` (covered in main treaty)
- `bradley-map-1796.md` (map reference)

---

## Recommendations

### Immediate Actions

1. **Create Level 2 sources for HIGH RISK documents**
   - Jackson-at-Rocky-Mount needs Level 2 source from cited Tennessee Encyclopedia, Miller Center
   - Cherokee delegation needs Level 2 source from War Department Papers

2. **Add `source_document` field to Level 3 frontmatter**

   ```yaml
   source_document: '/Historical/processed/005-treaty-of-holston-1791-07-02.md'
   last_verified: '2026-01-30'
   ```

3. **Change verification status for documents lacking Level 2**
   - Documents without Level 2 source should be `status: in-review` not `verified`

### Short-Term Actions

1. **Create missing Level 2 sources for Blount letters**
   - Founders Online has these letters
   - Create verified transcriptions

2. **Consolidate Knoxville Gazette sources**
   - Level 2 has one gazette file
   - Level 3 has 14 gazette files
   - Reconcile or create proper Level 2 sources

### Long-Term Actions

1. **Automate Level 2 -> Level 3 generation**
2. **Add drift detection to CI/CD**
3. **Create validation script**

---

## Next Steps

For Cody to review and approve:

1. [ ] Confirm the hierarchy structure in `SOURCE-OF-TRUTH-HIERARCHY.md`
2. [ ] Decide priority for creating missing Level 2 sources
3. [ ] Approve changing verification status on undocumented files
4. [ ] Set timeline for implementing automated validation

---

_This analysis is based on file inventory comparison. Content comparison would require reading all files to check for factual divergence._
