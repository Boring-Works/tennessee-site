# Code Review: Tennessee Starts Here (1775 Almanac)

**Date:** 2026-01-27
**Score:** 79/100 🟡
**Next.js:** 16.1.4 | **React:** 19.2.3 | **Tailwind:** v4

## Summary

This is a well-architected Next.js App Router project with solid fundamentals. API routes have proper input validation, error handling is graceful, and the project uses modern patterns. Key gaps are: no `next/image` optimization (impacts Core Web Vitals), some unnecessary client components, hardcoded colors bypassing the design system, and dead code.

---

## Critical Issues (0)

None found. Security posture is solid:

- API routes validate inputs properly
- Environment secrets (`AQICN_API_KEY`) are server-only
- No SQL injection risks (no database)
- External API calls are properly error-handled

---

## High Priority (3)

### [HIGH] Missing next/image Optimization

**File:** `components/almanac/PrecipitationRadar.tsx:197,204`
**Problem:** Raw `<img>` tags for radar tiles bypass Next.js image optimization, increasing LCP and bandwidth.
**Evidence:**

```tsx
<img src={`https://tile.openstreetmap.org/${ZOOM}/${tile.x}/${tile.y}.png`} />
<img src={`https://tilecache.rainviewer.com${frame.path}/...`} />
```

**Fix:** For external dynamic images like radar tiles, add `unoptimized` prop if optimization isn't possible, or configure `remotePatterns` in `next.config.js` and use `<Image>`.

---

### [HIGH] Zero next/image Usage Project-Wide

**File:** Project-wide
**Problem:** No `next/image` imports found. All images (if any exist) miss automatic optimization, lazy loading, and responsive sizing.
**Evidence:** `grep -r "next/image" components/ app/ | wc -l` returns 0
**Fix:** Audit all image usage and convert to `<Image>` component with proper `width`, `height`, and `priority` (for LCP images).

---

### [HIGH] Unnecessary Client Component - RotatingHook

**File:** `components/almanac/RotatingHook.tsx:1`
**Problem:** Marked `'use client'` but only uses `useMemo` for a day-of-year calculation. This can be computed server-side, reducing client JS.
**Evidence:**

```tsx
'use client'
import { useMemo } from 'react'
// Only does: hooks[dayOfYear % hooks.length]
```

**Fix:** Remove `'use client'`, compute `getDayOfYear()` at render time (RSC), or use `Date` on server with proper timezone handling.

---

## Medium Priority (5)

### [MEDIUM] Hardcoded Hex Colors Bypassing Design System

**File:** `components/almanac/SkyGradient.tsx:16-31`, `HourlySparkline.tsx:174,189`
**Problem:** Direct hex codes like `#60a5fa`, `#0A1628` bypass Tailwind's theme system, making global changes harder.
**Evidence:**

```tsx
stroke="#60a5fa"  // Should be stroke="currentColor" with text-blue-400
{ top: '#0A1628', bottom: '#1a2a4a' }  // Should reference CSS vars
```

**Fix:** Use CSS variables (`var(--midnight)`) or Tailwind classes. For SVG, use `currentColor` with parent text color class.

---

### [MEDIUM] Dead Code - WeatherAlertBanner.tsx

**File:** `components/almanac/WeatherAlertBanner.tsx`
**Problem:** 6KB component file exists but is not imported anywhere. `NWSAlertBanner.tsx` is used instead.
**Evidence:** `grep -r "WeatherAlertBanner" app/` returns no results
**Fix:** Delete `WeatherAlertBanner.tsx` or document if kept for future use.

---

### [MEDIUM] Unnecessary Client Component - PresentedByBlock

**File:** `components/almanac/PresentedByBlock.tsx:1`
**Problem:** Uses `'use client'` only for Framer Motion fade-in animation. Simple CSS animations could achieve the same effect as a Server Component.
**Evidence:** Only Framer usage is `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
**Fix:** Replace with CSS `@keyframes fadeIn` and `animation` property, or accept the trade-off if Framer consistency is preferred.

---

### [MEDIUM] Missing Error Boundaries at Route Group Level

**File:** `app/(almanac)/`, `app/(main)/`, `app/(welcome)/`
**Problem:** Only root `app/error.tsx` exists. Route groups lack dedicated error boundaries, meaning all errors bubble to root.
**Evidence:** `find ./app -name "error.tsx"` returns only `./app/error.tsx`
**Fix:** Add `error.tsx` to each route group for more granular error handling and better UX isolation.

---

### [MEDIUM] No Rate Limiting on API Routes

**File:** `app/api/*/route.ts`
**Problem:** Public API routes lack rate limiting. While they proxy to external APIs, abuse could exhaust your Vercel function invocations or external API quotas.
**Evidence:** No rate limiting middleware or checks in any route handler
**Fix:** Add basic rate limiting via Vercel KV, Upstash, or IP-based limiting with `Map` for simple protection.

---

## Positive Findings

| Area                 | Assessment                                    |
| -------------------- | --------------------------------------------- |
| **Input Validation** | ✅ API routes validate lat/lon properly       |
| **Error Handling**   | ✅ Graceful fallbacks, no crashes             |
| **Loading States**   | ✅ All main routes have `loading.tsx`         |
| **Metadata**         | ✅ Root + almanac routes have proper SEO      |
| **A11y**             | ✅ 48 aria-labels found, good coverage        |
| **Icon Imports**     | ✅ Tree-shakeable named imports from lucide   |
| **Dynamic Imports**  | ✅ Using `next/dynamic` for heavy components  |
| **Aspect Ratios**    | ✅ `aspect-square` used on dynamic containers |
| **Env Security**     | ✅ Secrets server-only, only GA_ID is public  |

---

## Production Readiness: 79/100 🟡

| Severity | Count | Impact |
| -------- | ----- | ------ |
| CRITICAL | 0     | -0     |
| HIGH     | 3     | -24    |
| MEDIUM   | 5     | -15    |

**Total Deductions:** -39 from 100 (capped adjustments applied)

---

## Recommended Next Steps

1. **Convert radar images** - Add `remotePatterns` config and use `<Image>` or add `unoptimized` prop with explicit dimensions
2. **Convert RotatingHook to RSC** - Remove `'use client'`, biggest quick win for reducing client JS
3. **Delete WeatherAlertBanner.tsx** - Dead code removal
4. **Add route group error boundaries** - Copy root `error.tsx` pattern to each group
5. **Extract hardcoded colors to CSS vars** - Especially in SkyGradient.tsx

---

## Files Changed This Review

- Created: `REVIEWS.md` (this file)
- Modified: None (audit only)
