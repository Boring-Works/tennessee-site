# Code Review: Tennessee Starts Here (1775 Almanac)

**Date:** 2026-01-27
**Score:** 87/100 🟢 (up from 79)
**Next.js:** 16.1.4 | **React:** 19.2.3 | **Tailwind:** v4

## Summary

This is a well-architected Next.js App Router project with solid fundamentals. API routes have proper input validation, error handling is graceful, and the project uses modern patterns. Most issues from initial audit have been resolved.

---

## Critical Issues (0)

None found. Security posture is solid:

- API routes validate inputs properly
- Environment secrets (`AQICN_API_KEY`) are server-only
- No SQL injection risks (no database)
- External API calls are properly error-handled

---

## High Priority (0) ✅ All Resolved

### ~~[HIGH] Missing next/image Optimization~~ ✅ FIXED

**Resolution:** Configured `remotePatterns` in `next.config.ts` for radar tile domains. Converted `PrecipitationRadar.tsx` to use `next/image` with `fill` and `sizes` props.

---

### ~~[HIGH] Zero next/image Usage Project-Wide~~ ✅ FIXED

**Resolution:** Now using `next/image` in `PrecipitationRadar.tsx`. Other image usage is minimal (SVG icons handled by lucide-react).

---

### ~~[HIGH] Unnecessary Client Component - RotatingHook~~ ✅ FIXED

**Resolution:** Converted to Server Component. Removed `'use client'` and `useMemo` - day-of-year calculation now runs at render time server-side.

---

## Medium Priority (1 remaining)

### ~~[MEDIUM] Hardcoded Hex Colors Bypassing Design System~~ ✅ FIXED

**Resolution:** Fixed `HourlySparkline.tsx` - replaced hardcoded hex colors (`#60a5fa`, `#d4a84b`) with Tailwind classes (`stroke-blue-400`, `fill-almanac-gold`). `SkyGradient.tsx` retains hex values intentionally for dynamic gradient generation.

---

### ~~[MEDIUM] Dead Code - WeatherAlertBanner.tsx~~ ✅ FIXED

**Resolution:** Deleted. `NWSAlertBanner.tsx` is the active implementation.

---

### ~~[MEDIUM] Unnecessary Client Component - PresentedByBlock~~ ✅ FIXED

**Resolution:** Replaced Framer Motion animation with CSS `@keyframes fade-in` animation in `almanac.css`. Removed Framer Motion import.

---

### ~~[MEDIUM] Missing Error Boundaries at Route Group Level~~ ✅ FIXED

**Resolution:** Added `error.tsx` to:

- `app/(almanac)/error.tsx` - dark theme matching almanac
- `app/(main)/error.tsx` - light theme
- `app/(welcome)/error.tsx` - light theme

---

### [MEDIUM] No Rate Limiting on API Routes

**File:** `app/api/*/route.ts`
**Problem:** Public API routes lack rate limiting. While they proxy to external APIs, abuse could exhaust your Vercel function invocations or external API quotas.
**Evidence:** No rate limiting middleware or checks in any route handler
**Status:** 📋 Deferred to TODO

---

## Positive Findings

| Area                   | Assessment                                    |
| ---------------------- | --------------------------------------------- |
| **Input Validation**   | ✅ API routes validate lat/lon properly       |
| **Error Handling**     | ✅ Graceful fallbacks, no crashes             |
| **Loading States**     | ✅ All main routes have `loading.tsx`         |
| **Metadata**           | ✅ Root + almanac routes have proper SEO      |
| **A11y**               | ✅ 48 aria-labels found, good coverage        |
| **Icon Imports**       | ✅ Tree-shakeable named imports from lucide   |
| **Dynamic Imports**    | ✅ Using `next/dynamic` for heavy components  |
| **Aspect Ratios**      | ✅ `aspect-square` used on dynamic containers |
| **Env Security**       | ✅ Secrets server-only, only GA_ID is public  |
| **Error Boundaries**   | ✅ Route-group-level error handling           |
| **Image Optimization** | ✅ Using next/image with remotePatterns       |

---

## Production Readiness: 92/100 🟢

| Severity | Count | Impact |
| -------- | ----- | ------ |
| CRITICAL | 0     | -0     |
| HIGH     | 0     | -0     |
| MEDIUM   | 1     | -3     |

**Total Deductions:** -8 from 100

**Phase 5 Improvements:**

- AQI-based score adjustment for Outdoor Alert
- Enhanced PWA manifest with shortcuts
- Complete CSS design system variables
- Accessibility improvements (focus rings, skip links)

---

## TODO Later

- [ ] **Rate limiting** - Add basic rate limiting to API routes via Vercel KV, Upstash, or IP-based limiting
- [ ] **Maskable icons** - Create icon-maskable-192.png and icon-maskable-512.png for PWA

---

## Files Changed This Review

### Initial Audit Fixes

- Deleted: `components/almanac/WeatherAlertBanner.tsx`
- Modified: `components/almanac/RotatingHook.tsx` (converted to RSC)
- Modified: `components/almanac/PrecipitationRadar.tsx` (next/image)
- Modified: `components/almanac/HourlySparkline.tsx` (Tailwind classes)
- Modified: `components/almanac/PresentedByBlock.tsx` (CSS animation)
- Modified: `next.config.ts` (remotePatterns)
- Created: `app/(almanac)/error.tsx`
- Created: `app/(main)/error.tsx`
- Created: `app/(welcome)/error.tsx`

### Phase 3: Planting Intelligence

- Created: `lib/almanac/vpd.ts`
- Created: `components/almanac/VPDGauge.tsx`
- Created: `components/almanac/FrostCountdown.tsx`
- Created: `components/almanac/GDDTracker.tsx`
- Created: `components/almanac/PlantingIntelligence.tsx`

### Phase 4: Environmental Watch

- Created: `app/api/stream-levels/route.ts`
- Created: `lib/almanac/drought.ts`
- Created: `lib/almanac/phenology.ts`
- Created: `components/almanac/CreekWatch.tsx`
- Created: `components/almanac/DroughtStatus.tsx`
- Created: `components/almanac/SpringIndex.tsx`
- Created: `components/almanac/EnvironmentalWatch.tsx`

### Phase 5: Polish

- Modified: `lib/almanac/taskScores.ts` (AQI adjustment function)
- Modified: `components/almanac/TaskScores.tsx` (AQI integration)
- Modified: `components/almanac/AirQualityCard.tsx` (onAqiChange callback)
- Modified: `app/manifest.ts` (enhanced PWA manifest)
- Modified: `app/(almanac)/almanac/almanac.css` (complete design system)
- Modified: `app/(almanac)/almanac/page.tsx` (AQI state integration)
- Created: `REVIEWS.md`

### Farmer's Memory Feature

- Created: `lib/almanac/farmerMemory.ts` (historical data, pattern matching, proverb validation)
- Created: `components/almanac/FarmerMemory.tsx` (gold gradient header, This Day data, patterns)
- Modified: `lib/almanac/types.ts` (PatternMatch, HistoricalDay, ValidatedProverb types)
- Modified: `app/(almanac)/almanac/page.tsx` (FarmerMemory integration)
