# Timeline Events - Corrections Required

**File:** `content/timeline-events.json`
**Corrections Needed:** 4 dates + 3 documentation updates

---

## Quick Reference: Required Changes

| Entry ID                | Current Date | Correct Date | Line #  | Change  |
| ----------------------- | ------------ | ------------ | ------- | ------- |
| knox-recommends-holston | 1790-08-18   | 1790-08-17   | 48-49   | -1 day  |
| blount-to-knox-dec      | 1790-12-14   | 1790-12-15   | 84-85   | +1 day  |
| blount-to-knox-jan      | 1791-01-12   | 1791-01-08   | 93-94   | -4 days |
| blount-to-knox-sep      | 1791-09-10   | 1791-09-12   | 156-157 | +2 days |

---

## Detailed Corrections

### Correction 1: Knox Recommends Holston Settlements

**Location:** Lines 48-49
**Entry ID:** `knox-recommends-holston`

**Current:**

```json
{
  "id": "knox-recommends-holston",
  "date": "1790-08-18",
```

**Corrected:**

```json
{
  "id": "knox-recommends-holston",
  "date": "1790-08-17",
```

**Verification:**

- Document: `/content/documents/knox-to-washington-1790-08.md`
- Document line 4: `date: '1790-08-17'`
- Passage: "August 17, 1790"

---

### Correction 2: Frontier Security Report (December)

**Location:** Lines 84-85
**Entry ID:** `blount-to-knox-dec`

**Current:**

```json
{
  "id": "blount-to-knox-dec",
  "date": "1790-12-14",
```

**Corrected:**

```json
{
  "id": "blount-to-knox-dec",
  "date": "1790-12-15",
```

**Verification:**

- Document: `/content/documents/blount-to-knox-1790-12.md`
- Document line 4: `date: '1790-12-15'`
- Passage: "December 15, 1790"

---

### Correction 3: Treaty Preparations Begin (January)

**Location:** Lines 93-94
**Entry ID:** `blount-to-knox-jan`

**Current:**

```json
{
  "id": "blount-to-knox-jan",
  "date": "1791-01-12",
```

**Corrected:**

```json
{
  "id": "blount-to-knox-jan",
  "date": "1791-01-08",
```

**Verification:**

- Document: `/content/documents/blount-to-knox-1791-01.md`
- Document line 4: `date: '1791-01-08'`
- Passage: "January 8, 1791"

---

### Correction 4: Post-Treaty Report (September)

**Location:** Lines 156-157
**Entry ID:** `blount-to-knox-sep`

**Current:**

```json
{
  "id": "blount-to-knox-sep",
  "date": "1791-09-10",
```

**Corrected:**

```json
{
  "id": "blount-to-knox-sep",
  "date": "1791-09-12",
```

**Verification:**

- Document: `/content/documents/blount-to-knox-1791-09.md`
- Document line 4: `date: '1791-09-12'`
- Passage: "September 12, 1791"

---

## Documentation Updates (Optional but Recommended)

### Update 1: Link Senate Confirmation to Commission Document

**Location:** Lines 30-37
**Entry ID:** `blount-confirmed`

**Current:**

```json
{
  "id": "blount-confirmed",
  "date": "1790-06-08",
  "title": "Senate Confirms Blount",
  "description": "The United States Senate confirms William Blount's appointment as territorial governor.",
  "documentId": null,
```

**Recommended Update:**

```json
{
  "id": "blount-confirmed",
  "date": "1790-06-08",
  "title": "Senate Confirms Blount",
  "description": "The United States Senate confirms William Blount's appointment as territorial governor.",
  "documentId": "blount-commission-1790",
```

**Rationale:** The formal commission document (`blount-commission-1790`) was issued on June 8, 1790, the same day as Senate confirmation. The commission itself serves as the document proof of confirmation.

---

### Update 2: Add Missing Rocky Mount Inventory Entry

**Location:** After line 225 (after "capital-moves" entry), before "treaty-additional" entry

**New Entry to Add:**

```json
{
  "id": "rocky-mount-inventory",
  "date": "1791-10-15",
  "title": "Rocky Mount Property Inventoried",
  "description": "An official inventory documents the Rocky Mount property's buildings, grounds, and improvements as Governor Blount prepared to relocate the capital to Knoxville.",
  "documentId": "rocky-mount-inventory-1791",
  "type": "event",
  "featured": false
},
```

**Rationale:** This document provides important material evidence about Rocky Mount during its peak use as territorial capital. October 15, 1791 is the appropriate chronological placement.

---

### Update 3: Add Blount Commission as Timeline Entry (Optional)

**Location:** After line 27 (after "blount-nominated"), before "washington-asks-where"

**Optional New Entry:**

```json
{
  "id": "blount-commission-issued",
  "date": "1790-06-08",
  "title": "Blount Receives His Commission",
  "description": "President Washington issues the formal commission to William Blount, granting him authority as Governor of the Southwest Territory and Superintendent of Indian Affairs.",
  "documentId": "blount-commission-1790",
  "type": "proclamation",
  "featured": false
},
```

**Rationale:** This separates the nomination (June 7) from the actual conferral of authority (June 8). However, since "blount-confirmed" already covers June 8, this creates redundancy. **Recommendation: Skip this and just update blount-confirmed's documentId** (see Update 1 above).

---

## Statehood Event Note

The "statehood" entry currently has `documentId: null`. While Tennessee's statehood date (June 1, 1796) is correct and well-documented historically, there's no single primary document in the collection that directly documents the statehood act itself.

**Options:**

1. Leave as-is (it's a well-known historical fact)
2. Add reference to `knoxville-gazette-1796-06-06` which reports on the statehood event
3. Create a new document for Tennessee statehood legislation

**Recommendation:** Add gazette reference for consistency.

**Suggested Update:**

```json
{
  "id": "statehood",
  "date": "1796-06-01",
  "title": "Tennessee Becomes 16th State",
  "description": "Tennessee is admitted to the Union as the sixteenth state, completing the journey from territory to statehood.",
  "documentId": "knoxville-gazette-1796-06-06",
  "type": "event",
  "featured": true
}
```

---

## Implementation Checklist

- [ ] Correct knox-recommends-holston date: 1790-08-18 → 1790-08-17
- [ ] Correct blount-to-knox-dec date: 1790-12-14 → 1790-12-15
- [ ] Correct blount-to-knox-jan date: 1791-01-12 → 1791-01-08
- [ ] Correct blount-to-knox-sep date: 1791-09-10 → 1791-09-12
- [ ] Update blount-confirmed documentId: null → "blount-commission-1790"
- [ ] Add rocky-mount-inventory entry (October 15, 1791)
- [ ] Update statehood documentId: null → "knoxville-gazette-1796-06-06" (optional)
- [ ] Run `npm run validate:data` to confirm JSON validity
- [ ] Verify all dates are in YYYY-MM-DD format

---

## Testing After Corrections

After making changes, verify:

1. **JSON Validity:** The file should parse without errors
2. **Date Order:** Check that events remain chronological
3. **Format Consistency:** All dates should be YYYY-MM-DD
4. **References:** All documentId values should match actual document filenames (without .md extension)

**Validation Command:**

```bash
npm run validate:data
```

This will check the timeline against all data standards and report any issues.
