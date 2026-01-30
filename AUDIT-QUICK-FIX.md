# Collection Audit - Quick Fix Guide

## Quick Stats

- 38 documents in 5 collections
- **4 collections have issues** (80%)
- **8 total issues to fix**

---

## Issue 1: blount-papers.md - Document Count (HIGH)

**Current:** `document_count: 9`
**Should be:** `document_count: 10`
**Why:** jackson-at-rocky-mount-1788.md is in this collection

---

## Issue 2: blount-papers.md - Jackson Doc Thematic Mismatch (HIGH)

**Problem:** jackson-at-rocky-mount-1788.md (1788) predates Blount's appointment (1790) by 2 years

**Action needed:**

- Option A: Move jackson-at-rocky-mount-1788.md to a new "Rocky Mount Early History" collection
- Option B: Remove from blount-papers if a different collection exists
- Option C: Keep and update blount-papers description to include "early Rocky Mount history"

**Recommended:** Option A (best separation of concerns)

---

## Issue 3: blount-papers.md - Key Figures Wrong (MEDIUM)

**Current:**

```yaml
key_figures:
  - william-blount
  - henry-knox
```

**Should be:**

```yaml
key_figures:
  - william-blount
  - bloody-fellow
  - doublehead
  - hanging-maw
  - john-watts
```

**Why:** These are the people actually mentioned in Blount's letters in this collection

---

## Issue 4: federal-correspondence.md - Key Figures Wrong (MEDIUM)

**Current:**

```yaml
key_figures:
  - george-washington
  - henry-knox
  - thomas-jefferson
  - william-blount
```

**Should be:**

```yaml
key_figures:
  - george-washington
  - william-blount
```

**Why:** Only Washington and Blount are mentioned in these documents; Knox and Jefferson are in other collections

---

## Issue 5: knoxville-gazette.md - Key Figures Wrong (MEDIUM)

**Current:**

```yaml
key_figures:
  - george-roulstone
  - william-blount
```

**Should be:**

```yaml
key_figures:
  - william-blount
  - george-washington
  - bloody-fellow
```

**Why:** Roulstone (editor) isn't in the documents themselves; Washington and Bloody Fellow are

---

## Issue 6: maps.md - Key Figures Wrong (MEDIUM)

**Current:**

```yaml
key_figures:
  - william-cobb
```

**Should be:**

```yaml
key_figures:
  - william-blount
```

**Why:** The Rocky Mount inventory mentions Blount, not Cobb

---

## Issue 7: treaties.md - Key Figures Wrong (MEDIUM)

**Current:**

```yaml
key_figures:
  - george-washington
  - william-blount
  - hanging-maw
  - bloody-fellow
```

**Should be:**

```yaml
key_figures:
  - george-washington
  - william-blount
  - bloody-fellow
  - thomas-jefferson
```

**Why:** Hanging Maw is not in actual treaties; Jefferson is (in treaty correspondence)

---

## Issue 8: treaty-holston-1791.md - Missing Reciprocal Links (MEDIUM)

**Current:** No `responses` field

**Should add:**

```yaml
responses:
  - washington-proclamation-1791
  - treaty-holston-additional-1792
```

**Why:** These documents refer back to this treaty; the relationship should be bidirectional

---

## Estimated Effort

| Task      | Effort      | Notes                                                  |
| --------- | ----------- | ------------------------------------------------------ |
| Issue 1   | 1 min       | Change one number                                      |
| Issue 2   | 15 min      | Decide if keeping Jackson doc, then move/delete/update |
| Issue 3   | 2 min       | Copy-paste new key_figures list                        |
| Issue 4   | 1 min       | Remove 2 lines                                         |
| Issue 5   | 2 min       | Replace with 3-person list                             |
| Issue 6   | 1 min       | Replace william-cobb with william-blount               |
| Issue 7   | 2 min       | Swap 1 name                                            |
| Issue 8   | 2 min       | Add responses field                                    |
| **TOTAL** | **~25 min** | All together: maybe 15 min of focused work             |

---

## File-by-File Checklist

- [ ] `/content/collections/blount-papers.md` (Issues 1, 2, 3)
- [ ] `/content/collections/federal-correspondence.md` (Issue 4)
- [ ] `/content/collections/knoxville-gazette.md` (Issue 5)
- [ ] `/content/collections/maps.md` (Issue 6)
- [ ] `/content/collections/treaties.md` (Issue 7)
- [ ] `/content/documents/treaty-holston-1791.md` (Issue 8)

---

## What's Working Well ✓

- All 38 documents are properly tagged to a collection
- All cross-references point to real documents
- Collection descriptions are accurate and complete
- Date ranges are correct (except blount-papers due to Jackson)
- No orphaned documents

---

## Full Details

See `COLLECTION-AUDIT.md` for complete findings and analysis.
