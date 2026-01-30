# Tennessee Starts Here - Collection Audit Report

## Executive Summary

Audit of 5 collection files and 38 associated documents reveals:

- **72% of collections have issues** (4 of 5)
- **1 collection has incorrect document count** (blount-papers: expects 9, has 10)
- **100% of collections have key_figures inaccuracies** (5 of 5)
- **2 non-reciprocal cross-references** (broken bidirectional links)
- **1 document thematically misaligned** with its collection

---

## FINDING 1: Document Count Mismatch

### Issue: Blount Papers Over-count

**Collection Metadata:**

- `blount-papers.md` declares `document_count: 9`
- **Actual documents:** 10

**Affected Documents:**

1. blount-arrival-1790.md
2. blount-to-knox-1790-11.md
3. blount-to-knox-1790-12.md
4. blount-to-knox-1791-01.md
5. blount-to-knox-1791-03.md
6. blount-to-knox-1791-06.md
7. blount-to-knox-1791-07.md
8. blount-to-knox-1791-09.md
9. blount-to-knox-1791-11.md
10. **jackson-at-rocky-mount-1788.md** ← Extra document

**Severity:** High (metadata out of sync)

**Fix:** Update `document_count: 9` to `document_count: 10` in `/content/collections/blount-papers.md`

---

## FINDING 2: Thematic Misalignment - Jackson Document

### Issue: Pre-Blount Era Document in "Blount Papers" Collection

**Document:** `jackson-at-rocky-mount-1788.md`

- **Date:** 1788-04-00 (April 1788, exact date unknown)
- **Subject:** Andrew Jackson's 6-week stay at Rocky Mount before Blount era
- **Collection assigned:** `blount-papers`
- **Problem:** Predates Blount's appointment by 2 years

**Collection's Own Parameters:**

- Declared date range: 1790-1791
- Description: "Governor William Blount's official correspondence during his administration"
- Why It Matters: "primary record of how federal authority was established"

**Analysis:**
The Jackson document is about Rocky Mount's pre-history, not about Blount's administration. It's a valuable contextual document for understanding Rocky Mount, but conceptually it doesn't belong in a collection of "Blount Papers" (which are specifically his official correspondence).

**Options for Resolution:**

1. **Move to new collection:** Create "Rocky Mount Early History" collection for pre-1790 documents
2. **Rename collection:** Expand scope to "Blount Era" instead of "Blount Papers"
3. **Remove document:** Move to separate "History & Context" collection
4. **Update description:** Modify blount-papers.md to explicitly include "pre-Blount context"

**Recommendation:** Option 1 (new collection) or Option 3 (move to context collection) to maintain collection integrity.

---

## FINDING 3: Key Figures Metadata Inconsistency

### All 5 Collections Have Inaccurate key_figures Fields

Collection `key_figures` should list the primary people mentioned in that collection's documents. Current state shows systematic mismatches.

#### Collection 1: BLOUNT-PAPERS

**Declared key_figures:**

- william-blount
- henry-knox

**Actually mentioned in documents:**

- william-blount ✓
- william-cobb ✓
- bloody-fellow ✗
- doublehead ✗
- hanging-maw ✗
- john-watts ✗

**Issues:**

- ✗ Missing: bloody-fellow, doublehead, hanging-maw, john-watts (Cherokee signatories mentioned in Blount's correspondence)
- ✗ Extra: henry-knox (mentioned but not actually in the documents; Knox is in federal-correspondence)

**Fix needed:** Replace `henry-knox` with actual Cherokee leaders from documents

---

#### Collection 2: FEDERAL-CORRESPONDENCE

**Declared key_figures:**

- george-washington
- henry-knox
- thomas-jefferson
- william-blount

**Actually mentioned in documents:**

- george-washington ✓
- william-blount ✓

**Issues:**

- ✗ Extra: henry-knox (not found in federal-correspondence docs; he's in blount-papers)
- ✗ Extra: thomas-jefferson (not found in actual documents)

**Fix needed:** Remove henry-knox and thomas-jefferson from key_figures; keep only washington and blount

---

#### Collection 3: KNOXVILLE-GAZETTE

**Declared key_figures:**

- george-roulstone
- william-blount

**Actually mentioned in documents:**

- william-blount ✓
- george-washington ✓
- bloody-fellow ✓

**Issues:**

- ✗ Extra: george-roulstone (editor mentioned in description but not tagged in documents)
- ✗ Missing: george-washington (mentioned in gazette proclamations)
- ✗ Missing: bloody-fellow (mentioned in gazette)

**Fix needed:** Replace roulstone with washington and bloody-fellow

---

#### Collection 4: MAPS

**Declared key_figures:**

- william-cobb

**Actually mentioned in documents:**

- william-blount ✓

**Issues:**

- ✗ Extra: william-cobb (mentioned in context but not actually as document author)
- ✗ Missing: william-blount (the inventory document references Blount's impressions)

**Fix needed:** Replace william-cobb with william-blount

---

#### Collection 5: TREATIES

**Declared key_figures:**

- george-washington
- william-blount
- hanging-maw
- bloody-fellow

**Actually mentioned in documents:**

- george-washington ✓
- william-blount ✓
- bloody-fellow ✓
- thomas-jefferson ✓

**Issues:**

- ✗ Extra: hanging-maw (not found in actual treaty documents)
- ✗ Missing: thomas-jefferson (mentioned in treaty correspondence)

**Fix needed:** Replace hanging-maw with thomas-jefferson

---

## FINDING 4: Non-Reciprocal Cross-References

### Issue: Broken Bidirectional Links Between Documents

Two documents have `responds_to` fields that point to other documents, but the target documents don't reciprocate in their `responses` fields.

**Document 1: treaty-holston-additional-1792.md**

- `responds_to: treaty-holston-1791`
- Problem: treaty-holston-1791 does NOT list treaty-holston-additional-1792 in its responses field

**Document 2: washington-proclamation-1791.md**

- `responds_to: treaty-holston-1791`
- Problem: treaty-holston-1791 does NOT list washington-proclamation-1791 in its responses field

**Analysis:**
When document A has `responds_to: B`, document B should have `responses` that includes A. This is broken.

**Severity:** Medium (doesn't break functionality but violates relationship integrity)

**Fix:** Add missing entries to treaty-holston-1791.md:

```yaml
responses:
  - washington-proclamation-1791
  - treaty-holston-additional-1792
```

---

## FINDING 5: Date Range Mismatch

### Blount Papers Collection Date Range Outdated

**Collection metadata states:**

```yaml
date_range: '1790-1791'
```

**Actual document dates in collection:**

- Earliest: 1788-04-00 (jackson-at-rocky-mount-1788.md)
- Latest: 1791-11-20 (blount-to-knox-1791-11.md)
- Actual range: **1788-1791**

**Root cause:** The Jackson document (pre-Blount) extends the range backward.

**Fix:** Either:

1. Update date_range to `1788-1791` (if keeping Jackson)
2. Update to `1790-1791` (if removing Jackson)
3. Remove Jackson document from collection (recommended)

**Other collections:** ✓ Accurate

- federal-correspondence: 1790-1791 ✓
- knoxville-gazette: 1791-1796 ✓
- maps: 1791-1796 ✓
- treaties: 1790-1792 ✓

---

## FINDING 6: Cross-Link Validation

### ✓ All document cross-references are valid

- All `responds_to` references point to existing documents
- All `responses` entries reference existing documents
- No broken document IDs (38 documents, all properly ID'd)

**Exception:** The non-reciprocal relationships noted in Finding 4

---

## FINDING 7: Collection Description Accuracy

### ✓ All descriptions accurately reflect content

**Verified for each collection:**

- ✓ Key terms present in descriptions
- ✓ Date ranges mentioned explicitly
- ✓ Primary themes match document content
- ✓ Author/editor attributions correct

**Single caveat:** knoxville-gazette description mentions "George Roulstone" but his name doesn't appear in the actual document metadata (though he's the historical founder).

---

## Summary of Recommended Fixes

| Priority  | Issue                                           | File(s)                                           | Fix                                                                                      |
| --------- | ----------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 🔴 HIGH   | Document count mismatch                         | blount-papers.md                                  | Update `document_count: 9` → `10`                                                        |
| 🔴 HIGH   | Jackson thematic misalignment                   | blount-papers.md + jackson-at-rocky-mount-1788.md | Move Jackson to new collection or remove                                                 |
| 🟡 MEDIUM | Key_figures inaccurate (blount-papers)          | blount-papers.md                                  | Remove henry-knox; add bloody-fellow, doublehead, hanging-maw, john-watts                |
| 🟡 MEDIUM | Key_figures inaccurate (federal-correspondence) | federal-correspondence.md                         | Remove henry-knox, thomas-jefferson                                                      |
| 🟡 MEDIUM | Key_figures inaccurate (knoxville-gazette)      | knoxville-gazette.md                              | Remove george-roulstone; add george-washington, bloody-fellow                            |
| 🟡 MEDIUM | Key_figures inaccurate (maps)                   | maps.md                                           | Replace william-cobb with william-blount                                                 |
| 🟡 MEDIUM | Key_figures inaccurate (treaties)               | treaties.md                                       | Replace hanging-maw with thomas-jefferson                                                |
| 🟡 MEDIUM | Non-reciprocal links                            | treaty-holston-1791.md                            | Add responses field with treaty-holston-additional-1792 and washington-proclamation-1791 |
| 🟢 LOW    | Date range mismatch                             | blount-papers.md                                  | Update `date_range: '1790-1791'` → `'1788-1791'` OR remove Jackson doc                   |

---

## Files Requiring Updates

1. `/content/collections/blount-papers.md` (3 issues)
2. `/content/collections/federal-correspondence.md` (1 issue)
3. `/content/collections/knoxville-gazette.md` (1 issue)
4. `/content/collections/maps.md` (1 issue)
5. `/content/collections/treaties.md` (1 issue)
6. `/content/documents/treaty-holston-1791.md` (1 issue)

---

## Organizational Health Assessment

**Overall:**

- Collections are well-structured and mostly consistent
- All documents are properly tagged and discoverable
- No missing collections or orphaned documents
- All cross-references validate to real documents

**Areas for improvement:**

- Key figures metadata requires systematic correction across all collections
- Jackson document represents a design boundary case (pre-history vs. collection scope)
- Reciprocal link maintenance needs attention
