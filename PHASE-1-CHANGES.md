# Phase 1 Critical Data Architecture Changes

## Summary of Changes

This document outlines the critical data fixes completed for the Tennessee Starts Here project.

---

## 1. ✅ Pricing Conversion (Dollars to Cents)

### What Changed

All pricing fields across events and recurring programs have been converted from dollars to cents.

### Why

Storing prices in cents prevents floating-point precision errors and is a standard practice for financial data in databases and APIs.

### Examples

**Before:**

```json
{
  "pricing": {
    "adult": 12,
    "senior": 10,
    "child": 8
  }
}
```

**After:**

```json
{
  "pricing": {
    "adult": 1200,
    "senior": 1000,
    "child": 800
  }
}
```

### Impact

- **27 events** updated with pricing fields
- **5 recurring programs** updated with pricing fields
- All prices now stored as integers (cents)
- $180 camp → 18000 cents
- $12 admission → 1200 cents
- $0 free events → 0 cents

---

## 2. ✅ FareHarbor ID Format

### Current Status

The `fareHarborId` fields are **already correct** - they are strings containing FareHarbor's numeric item IDs.

### Format

```json
{
  "fareHarborId": "562803",
  "ticketUrl": "https://fareharbor.com/rockymountmuseum/items/562803/"
}
```

### Verification

- All fareHarborId values are strings (not numbers) ✓
- All fareHarborId values match the item ID in the corresponding ticketUrl ✓
- Format matches FareHarbor's API expectations ✓

**No changes needed** - the current format is correct.

---

## 3. ✅ Removed Redundant baseValue Field

### Status

The `baseValue` field **never existed** in the data files.

**No action required** - this field was not present in the codebase.

---

## 4. ✅ Zod Schema Validation

### Created Files

#### `/lib/schemas/events.ts`

Complete TypeScript + Zod schema definitions for all event data structures:

- `EventPricingSchema` - Pricing structure (all values in cents)
- `EventTypeSchema` - Event type enum validation
- `EventCategorySchema` - Event category enum validation
- `EventSchema` - Full event object validation
- `RecurringProgramSchema` - Recurring program validation
- `First250Schema` - First 250 enrollment data validation
- `EventsDataSchema` - Complete events.json structure validation

**Features:**

- All prices validated as integers (cents)
- Date format validation (YYYY-MM-DD)
- URL validation for ticket URLs
- ID format validation (URL-safe slugs)
- TypeScript types auto-generated from schemas

#### `/lib/schemas/validate.ts`

Validation utilities:

```typescript
import { validateEventsData, safeValidateEventsData } from '@/lib/schemas'

// Throws on validation error
const data = validateEventsData(rawData)

// Returns success/error result
const result = safeValidateEventsData(rawData)
if (result.success) {
  // Use result.data
}
```

#### `/lib/schemas/index.ts`

Barrel export for clean imports.

### Usage Example

```typescript
import { EventsDataSchema, type Event } from '@/lib/schemas'

// Validate at runtime
const eventsData = EventsDataSchema.parse(rawData)

// Type-safe access
const event: Event = eventsData.events[0]
const adultPrice = event.pricing?.adult // number (cents) | null | undefined
```

### Validation Results

✅ **All data passes validation:**

- 27 events validated
- 5 recurring programs validated
- First 250 enrollment data validated

---

## Breaking Changes

### For Developers

**Pricing Display:**
All pricing values must now be divided by 100 for display:

```typescript
// Before
<span>${event.pricing.adult}</span>

// After
<span>${event.pricing.adult / 100}</span>
```

**Type Imports:**

```typescript
import type { Event, RecurringProgram, EventsData } from '@/lib/schemas'
```

### For Data Editors

When editing `data/events.json`:

- Prices must be entered in **cents** (not dollars)
- $50 → `5000`
- $12.50 → `1250`
- Free → `0`

---

## Files Modified

### Data Files

- ✅ `data/events.json` - All pricing converted to cents

### New Files Created

- ✅ `lib/schemas/events.ts` - Zod schemas and TypeScript types
- ✅ `lib/schemas/validate.ts` - Validation utilities
- ✅ `lib/schemas/index.ts` - Barrel exports

### Dependencies Added

- ✅ `zod` - Already installed

---

## Testing Performed

### Validation Test

```bash
npx tsx -e "import { safeValidateEventsData } from './lib/schemas/validate'; ..."
```

**Result:** ✅ All validation passed

### Sample Data Verification

**Spring Break Camp Week 1:**

- Child: 18000 cents = $180 ✓
- Members: 15000 cents = $150 ✓

**Woolly Days:**

- Adult: 1200 cents = $12 ✓
- Senior: 1000 cents = $10 ✓
- Child: 800 cents = $8 ✓

**Blacksmith Workshops:**

- Adult: 4000 cents = $40 ✓
- Senior: 3500 cents = $35 ✓
- Members: 3000 cents = $30 ✓

---

## Next Steps

### Recommended Actions

1. **Update display components** to divide prices by 100
2. **Add validation to data import scripts** using the new schemas
3. **Update documentation** to reflect pricing format
4. **Add tests** that use the Zod schemas

### Future Enhancements

- Add automated validation to git pre-commit hooks
- Create a data migration script for future format changes
- Add schema versioning if data structure evolves

---

## Questions or Issues?

If you encounter any issues with the new pricing format or validation:

1. Check that prices are being divided by 100 for display
2. Verify imports are using `@/lib/schemas`
3. Run validation with `safeValidateEventsData()` to see specific errors

---

_Phase 1 completed: January 30, 2026_
