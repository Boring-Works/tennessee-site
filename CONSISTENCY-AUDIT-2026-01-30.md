# Tennessee Starts Here - Document Consistency Audit

## 2026-01-30

This audit checks for consistency across documents in the Tennessee Starts Here project, focusing on dates, names, Cherokee naming conventions, place names, and cross-references.

---

## Critical Inconsistencies Found

### 1. Blount Arrival Date Discrepancy

**SEVERITY: HIGH** - Core historical event has conflicting dates

| Source                               | Arrival Date | Detail                                                                         |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| **timeline-events.json** (line 58)   | 1790-10-10   | "Blount Arrives at Rocky Mount"                                                |
| **william-blount.md** (line 20)      | 1790-10-11   | "Blount arrived at Rocky Mount...on October 11, 1790"                          |
| **blount-arrival-1790.md** (line 33) | 1790-10-11   | "Arrival date: October 11, 1790 (the '11th instant' referenced in the letter)" |

**Issue:** Timeline JSON shows October 10, but both primary document and biography show October 11 (which matches the letter reference to "the 11th instant").

**Recommendation:** Update `timeline-events.json` line 58 to `"date": "1790-10-11"` to match the documented arrival date in the letter.

**Files to Update:**

- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/timeline-events.json` (line 58)

---

### 2. Doublehead Philadelphia Visit Date Inconsistency

**SEVERITY: MEDIUM** - Biographical account contains chronological contradiction

| Source                         | Year       | Detail                                                                                                                    |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **doublehead.md** (line 29)    | 1791       | "In 1791, he traveled to Philadelphia and met with President Washington"                                                  |
| **bloody-fellow.md** (line 20) | Early 1792 | "In early 1792, just months after signing the Treaty of Holston, Bloody Fellow led a Cherokee delegation to Philadelphia" |
| **black-fox.md**               | June 1792  | References grand council at Ustanali in June 1792 honoring Dragging Canoe's death on March 1, 1792                        |

**Issue:** Doublehead's biography says he traveled to Philadelphia in 1791, but the Treaty of Holston wasn't signed until July 2, 1791. Bloody Fellow's account indicates the Philadelphia delegation was in early 1792 (after the treaty). These could be two separate visits, but the doublehead.md entry is ambiguous.

**Context:** The treaty required ratification, and the Additional Article to the Treaty was signed on February 17, 1792, in Philadelphia. This was likely when Cherokee leaders visited Washington and received honors/name changes.

**Recommendation:** Clarify in doublehead.md whether the Philadelphia visit was in 1791 or early 1792. If it was after the treaty signing (more likely), update line 29 to specify "early 1792" or "1792."

**Files to Review:**

- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/people/doublehead.md` (line 29)
- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/people/bloody-fellow.md` (line 20)

---

### 3. Bloody Fellow/Iskagua Name Attribution Order

**SEVERITY: LOW** - Naming sequence is correct but could be clearer

| Document                              | Sequence                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| **bloody-fellow.md**                  | Nenetooyah (original Cherokee) → Iskagua (given by Washington in Philadelphia, early 1792) |
| **treaty-holston-1791.md**            | Shows "Nenetooyah" (Bloody Fellow) as signatory                                            |
| **treaty-holston-additional-1792.md** | Shows "Iskagua" (Clear Sky) as signatory of Feb 17, 1792 document                          |

**Status:** ✓ Correct. The additional article shows him as "Iskagua" because the name was given after he signed the original treaty but before the additional article. Bloody Fellow's biography correctly explains this sequence.

**Note:** This is actually a good example of accurate historical handling. The timeline shows: Nenetooyah (original name) → signed Treaty of Holston July 2, 1791 → visited Philadelphia → received name Iskagua → signed Additional Article February 17, 1792.

---

### 4. Jackson at Rocky Mount Date - Incomplete Date in Metadata

**SEVERITY: LOW** - Date format issue, not chronological inconsistency

| Source                                       | Date Format   | Issue                                   |
| -------------------------------------------- | ------------- | --------------------------------------- |
| **jackson-at-rocky-mount-1788.md** (line 4)  | `1788-04-00`  | Day of month is "00" (invalid ISO 8601) |
| **jackson-at-rocky-mount-1788.md** (line 43) | "Spring 1788" | Correctly noted as approximate in text  |

**Issue:** The metadata date uses 04-00 (April with day 00) which is invalid ISO 8601 format. The document correctly states "Spring 1788" in the narrative, but the YAML frontmatter is malformed.

**Recommendation:** Change line 4 from `date: '1788-04-00'` to either:

- `date: '1788-04-15'` (mid-April estimate), or
- `date_range: '1788-04 to 1788-05'` if the system supports range format

**Files to Update:**

- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/documents/jackson-at-rocky-mount-1788.md` (line 4)

---

### 5. Rocky Mount Inventory Date Metadata Inconsistency

**SEVERITY: LOW** - Collection metadata mismatch

| Source                            | Field      | Value          | Issue                                                         |
| --------------------------------- | ---------- | -------------- | ------------------------------------------------------------- |
| **rocky-mount-inventory-1791.md** | collection | `maps`         | Should be primary settlement/property docs, not cartography   |
| **rocky-mount-inventory-1791.md** | author     | `william-cobb` | Person mentioned; actual author may be assessor/administrator |

**Issue:** The inventory is filed in the "maps" collection, but it's a property inventory/assessment, not a map. This could cause discovery issues. The "author" as William Cobb is questionable—he owned the property but may not have authored the inventory document.

**Recommendation:** Consider adding a new collection for "Property Records" or moving to "blount-papers" collection (since it documents Rocky Mount while Blount was there).

**Files to Review:**

- `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/content/documents/rocky-mount-inventory-1791.md` (lines 7-8)

---

## Cross-Reference Verification

### Document Response Chain ✓ Verified Clean

All `responds_to` references point to existing documents:

- blount-arrival-1790.md → responds_to: knox-to-washington-1790-08 ✓
- blount-to-knox-1790-11.md → responds_to: blount-arrival-1790 ✓
- knox-to-washington-1790-08.md → responds_to: washington-to-knox-1790-08 ✓
- washington-proclamation-1791.md → responds_to: treaty-holston-1791 ✓
- treaty-holston-additional-1792.md → responds_to: treaty-holston-1791 ✓

**Status:** No broken document references found.

### People Mentioned References ✓ Verified Clean

All people mentioned in `people_mentioned` arrays exist as files:

- hanging-maw.md ✓
- bloody-fellow.md ✓
- doublehead.md ✓
- john-watts.md ✓
- black-fox.md ✓
- standing-turkey.md ✓
- the-boots.md ✓
- (all other referenced people verified)

**Status:** No broken people references found.

---

## Name Usage Consistency Analysis

### "William Blount" Naming Convention

All documents use one of these consistently:

1. **William Blount** (most common)
2. **Governor William Blount** (when context matters)
3. **Gov. Blount** (occasional abbreviation)

**Finding:** ✓ Consistent across all documents. No mixing of formal titles creates confusion.

### Cherokee Names - English vs. Cherokee

**Pattern Found:** Documents consistently show both names in the format:

```
**[English Name]** ([Cherokee Name])
```

Examples:

- Doublehead (Chuquilatague)
- Bloody Fellow (Nenetooyah / Iskagua)
- Standing Turkey (Kanetetoka)
- Black Fox (Enoleh)

**Issue:** One case of potential inconsistency:

- doublehead.md lists: `name_cherokee: 'Chuquilatague'` and `name_cherokee_alt: 'Tal-tsu-tsa, Dsugweladegi, Chaquelataque'`
- treaty-holston-1791.md lists signatory as: `**Chuquilatague** (Doublehead)`

This is actually correct - the treaty document shows the Cherokee name first (original document context), while the people file shows the English name first (modern convention). No error.

**Finding:** ✓ Cherokee names are handled appropriately with variations documented in alternate names fields.

---

## Place Name Consistency

### Rocky Mount References

**Variation Analysis:**

| Name Used                             | Count    | Context                                           |
| ------------------------------------- | -------- | ------------------------------------------------- |
| Rocky Mount                           | Dominant | Main territorial capital designation              |
| Rocky Mount, the home of William Cobb | 2        | Clarifying location details                       |
| William Cobb's Washington County...   | 1        | Descriptive context                               |
| Cobb's House                          | 0        | **NOT FOUND** - Good: no alternate name confusion |

**Finding:** ✓ Consistent. All references call it "Rocky Mount" (the property name), not alternate names like "Cobb's House."

---

## Timeline Verification Against Documents

**Timeline consistency check for key events:**

| Event                            | Timeline Date  | Document Date               | Match           |
| -------------------------------- | -------------- | --------------------------- | --------------- |
| Southwest Territory Created      | 1790-05-26     | (law document)              | ✓               |
| Blount Nominated                 | 1790-06-07     | (letter document)           | ✓               |
| Washington asks "Where Ought..." | 1790-08-13     | Washington-to-Knox doc      | ✓               |
| Knox Recommends Holston          | 1790-08-18     | Knox-to-Washington doc      | ✓               |
| **Blount Arrives**               | **1790-10-10** | **1790-10-11**              | ❌ **MISMATCH** |
| Glass Windows Letter             | 1790-10-20     | 1790-10-20                  | ✓               |
| Treaty of Holston                | 1791-07-02     | 1791-07-02                  | ✓               |
| Capital Moves                    | 1792-02-01     | 1791-10-15 (inventory date) | ✓               |
| Additional Treaty Article        | 1792-02-17     | 1792-02-17                  | ✓               |

---

## Summary of Required Corrections

### Must Fix (High Priority)

1. **timeline-events.json line 58**: Change arrival date from 1790-10-10 to 1790-10-11

### Should Review (Medium Priority)

2. **doublehead.md line 29**: Clarify whether Philadelphia visit was 1791 or early 1792
3. **jackson-at-rocky-mount-1788.md line 4**: Change `1788-04-00` to valid ISO date or use date range

### Should Consider (Low Priority)

4. **rocky-mount-inventory-1791.md lines 7-8**: Review collection assignment and author field accuracy

---

## Document Integrity Assessment

**Overall Assessment: GOOD**

- ✓ No broken cross-references
- ✓ People mentioned all exist with profiles
- ✓ Cherokee names handled appropriately with variations documented
- ✓ Place names consistent throughout
- ✓ Historical narrative coherent across documents
- ❌ One date inconsistency (Blount arrival)
- ⚠ One date ambiguity (Doublehead Philadelphia visit)
- ⚠ One date format error (Jackson 1788 date)

**Recommendation:** Apply the three fixes noted above, starting with the Blount arrival date correction as it affects a core historical event visible in the timeline.

---

_Audit conducted: 2026-01-30_
_Methodology: Cross-referencing dates, names, Cherokee naming conventions, place names, and checking responds_to/people_mentioned relationships_
