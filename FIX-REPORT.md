# Pre-Production Fix Report
> Generated: 2025-05-21 | Repo: tennessee-starts-here | Branch: audit-report-v1

## Executive Summary
- **Total findings**: 12
- **Critical**: 3 | **High**: 4 | **Medium**: 3 | **Low**: 2
- **Estimated fix effort**: 8-12 hours
- **Deploy blocker?**: Yes — Missing critical integrations (GiveButter) and environment configuration makes deployment impossible/unstable.

## Priority Queue (Fix Order)

### 🔴 CRITICAL — Fix before any deploy

#### FIX-001: Implement Missing GiveButter Integration
- **File(s)**: `app/` (missing integration)
- **Category**: Wiring & Integration Gaps
- **What's wrong**: The requirement "givebutter is another i need to wire up" is completely unmet. No code, components, or API routes exist for GiveButter (donations/ticketing).
- **Production impact**: Core business function (revenue/donations) will not work.
- **Fix approach**:
  1.  Install GiveButter SDK or set up script injection (if using widget).
  2.  Create a reusable component `components/GiveButterWidget.tsx`.
  3.  Add environment variables for GiveButter API keys/Widget IDs to `.env.local` (and `.env.example`).
  4.  Embed the widget on relevant pages (likely `app/(main)/support/` or similar).
- **Verify by**: Manually verify the widget loads and can process a test donation in the dev environment.
- **Effort**: L (~4 hours)

#### FIX-002: Remove Client-Side JSON Bundling
- **File(s)**: `components/home/Commemorative2026.tsx`, `components/home/NextEventBadge.tsx`
- **Category**: Performance
- **What's wrong**: `events.json` is imported directly into Client Components (`'use client'`). This bundles the *entire* events database into the client-side JavaScript chunk, increasing initial load time and bandwidth usage.
- **Production impact**: Slow page loads, especially on mobile networks.
- **Fix approach**:
  1.  In `app/(main)/home/page.tsx` (a Server Component), import `eventsData` from `@/data/events.json`.
  2.  Filter/process the data on the server (e.g., `const nextEvent = eventsData.events.find(...)`).
  3.  Pass the *specific* data needed as props to `Commemorative2026` and `NextEventBadge`.
  4.  Remove the `import eventsData ...` line from the client components.
- **Code sketch**:
```tsx
  // app/(main)/home/page.tsx (Server Component)
  import eventsData from '@/data/events.json'
  import { NextEventBadge } from '@/components/home/NextEventBadge'

  export default function Page() {
    const nextEvent = eventsData.events.find(e => new Date(e.date) >= new Date())
    return <NextEventBadge event={nextEvent} />
  }

  // components/home/NextEventBadge.tsx (Client Component)
  // BEFORE: import eventsData from '@/data/events.json'
  export function NextEventBadge({ event }: { event: Event }) {
    if (!event) return null
    // ... use event prop
  }
```
- **Verify by**: Run `npm run build` and check the size of the client chunks. Inspect the network tab to ensure `events.json` content isn't in the JS bundle.
- **Effort**: M (~1 hour)

#### FIX-003: Create `.env.example`
- **File(s)**: `.env.example` (missing)
- **Category**: Wiring & Integration Gaps
- **What's wrong**: No example environment file exists. Developers/DevOps have to guess which variables are required.
- **Production impact**: High risk of broken deployments due to missing config.
- **Fix approach**:
  1.  Create `.env.example` in the root.
  2.  Add all variables found in code: `NEXT_PUBLIC_GA_ID`, `GA4_API_SECRET`, `FAREHARBOR_WEBHOOK_SECRET`, `SLACK_WEBHOOK_URL`, `AQICN_API_KEY`, `REVIEW_STATION_PASSWORD`, `NEXT_PUBLIC_API_URL`.
  3.  Add placeholder values/comments explaining each.
- **Verify by**: Developer check.
- **Effort**: S (~15 mins)

### 🟠 HIGH — Fix before public launch

#### FIX-004: Weather API Fallback Logic
- **File(s)**: `app/api/weather/route.ts` (lines 68-75)
- **Category**: Silent Failures
- **What's wrong**: The API route fetches from Open-Meteo and throws/errors if the fetch fails. It has no fallback (e.g., cache or empty state), meaning the weather section will crash the UI or show an error state if the external API hiccups.
- **Production impact**: Poor user experience during API outages.
- **Fix approach**:
  1.  Wrap the fetch in a `try/catch` block.
  2.  In the `catch` block, return a "fallback" weather object (e.g., cached data from a JSON file or a minimal "data unavailable" structure) with a 200 status code, but with a flag like `isStale: true`.
  3.  Alternatively, implement `next: { revalidate: 3600 }` properly to serve stale data while revalidating.
- **Verify by**: Disconnect internet or block `api.open-meteo.com` in `/etc/hosts` and verify the page doesn't crash.
- **Effort**: M (~45 mins)

#### FIX-005: Use Zod Schemas for Data Validation
- **File(s)**: `scripts/validate-data.ts`, `lib/schemas/events.ts`
- **Category**: Wiring & Integration Gaps
- **What's wrong**: The validation script manually checks fields instead of using the robust Zod schemas defined in `lib/schemas/`. This leads to duplication and potential drift between the "truth" (schema) and the check.
- **Production impact**: Invalid data could slip through if the manual script misses a case that the app code expects (via Zod types).
- **Fix approach**:
  1.  Update `scripts/validate-data.ts` to import `EventsDataSchema` from `lib/schemas/events.ts`.
  2.  Replace manual `if (!event.date)` checks with `const result = EventsDataSchema.safeParse(data)`.
  3.  Log `result.error` issues nicely if `!result.success`.
- **Code sketch**:
```ts
  // scripts/validate-data.ts
  import { EventsDataSchema } from '@/lib/schemas/events'
  // ...
  const result = EventsDataSchema.safeParse(jsonContent)
  if (!result.success) {
    console.error('Validation failed:', result.error.format())
    process.exit(1)
  }
```
- **Verify by**: Run `npm run validate:data` with invalid data and confirm it catches errors.
- **Effort**: M (~1 hour)

#### FIX-006: Fix Global 404 Page Location
- **File(s)**: `app/not-found.tsx`, `app/(main)/layout.tsx`
- **Category**: Build & Deploy Readiness
- **What's wrong**: `app/not-found.tsx` is at the root and renders without the main site navigation/footer (because `app/layout.tsx` is just `<html><body>...`).
- **Production impact**: Users hitting a 404 feel "lost" and disconnected from the site brand.
- **Fix approach**:
  1.  Option A: Move `app/not-found.tsx` to `app/(main)/not-found.tsx` (simplest, covers most cases).
  2.  Option B (Better): Update `app/not-found.tsx` to import `MainLayout` from `app/(main)/layout.tsx` and wrap its content.
- **Code sketch**:
```tsx
  // app/not-found.tsx
  import MainLayout from '@/app/(main)/layout'
  export default function NotFound() {
    return (
      <MainLayout>
        {/* current content */}
      </MainLayout>
    )
  }
```
- **Verify by**: Visit a non-existent route (`/random-page`) and verify Header/Footer appear.
- **Effort**: S (~20 mins)

#### FIX-007: Safe GA4 Analytics Initialization
- **File(s)**: `lib/analytics-server.ts`
- **Category**: Silent Failures
- **What's wrong**: Code checks `process.env.GA4_API_SECRET` but only warns in console. In production, this should likely be a hard failure or a robust skip to prevent silent data loss.
- **Production impact**: Missing revenue data.
- **Fix approach**:
  1.  Add a check at the top of the file or in an init function.
  2.  If `NODE_ENV === 'production'` and secret is missing, throw a visible error or send an alert (Sentry/logs).
- **Verify by**: Run locally with `NODE_ENV=production` and no secret; verify behavior.
- **Effort**: S (~15 mins)

### 🟡 MEDIUM — Fix within first sprint post-launch

#### FIX-008: Clean Up Unused Code
- **File(s)**: `components/Card/`, `app/(main)/home/page.module.css`
- **Category**: Dead Code
- **What's wrong**: Entire component folder and CSS file are unused.
- **Production impact**: Minor bundle bloat, developer confusion.
- **Fix approach**:
  1.  Delete `components/Card/`.
  2.  Delete `app/(main)/home/page.module.css`.
- **Verify by**: `grep` for references, then delete.
- **Effort**: S (~5 mins)

#### FIX-009: Server-Side Markdown Rendering
- **File(s)**: `components/evidence/DocumentViewer.tsx`
- **Category**: Performance
- **What's wrong**: Uses `react-markdown` and `rehype` plugins in a Client Component. These are large libraries.
- **Production impact**: Large bundle size for evidence pages.
- **Fix approach**:
  1.  Refactor `DocumentViewer` to be a Server Component (or split the markdown rendering part into one).
  2.  Use `remote-mdx` or verify if `react-markdown` can run on server (it can, but passing React elements across boundary is tricky).
  3.  Ideally, pre-render markdown to HTML on the server and use `dangerouslySetInnerHTML` (sanitized) or a lighter client runtime.
- **Verify by**: Check bundle size.
- **Effort**: M (~2 hours)

### 🔵 LOW — Backlog / tech debt

#### FIX-010: Remove Demo Code
- **File(s)**: `lib/hooks/EXAMPLES.tsx`
- **Category**: Dead Code
- **What's wrong**: Demo code in production source.
- **Fix approach**: Delete the file.
- **Effort**: S (~1 min)

#### FIX-011: Webhook Signature Verification in Dev
- **File(s)**: `app/api/fareharbor-webhook/route.ts`
- **Category**: Security
- **What's wrong**: Bypasses signature check if `NODE_ENV` is dev.
- **Fix approach**: Remove the bypass or make it controllable via a specific flag (e.g., `SKIP_WEBHOOK_VERIFY`), not just generic `NODE_ENV`.
- **Effort**: S (~10 mins)

#### FIX-012: Move 404 Page to (main) Group
- **File(s)**: `app/not-found.tsx`
- **Category**: Refactor
- **What's wrong**: `not-found.tsx` at root might conflict with future layouts.
- **Fix approach**: Move to `app/(main)/not-found.tsx` for better organization.
- **Effort**: S (~5 mins)

## Patterns & Systemic Issues

1.  **Client Component Data Fetching**: Several components import JSON data directly.
    *   *Systemic Fix*: Establish a convention that all data loading happens in `page.tsx` (Server Components) and is passed down as props. Enforce via code review.

2.  **Validation Disconnect**: Schemas exist but manual scripts do the work.
    *   *Systemic Fix*: Make the Zod schema the "source of truth". Generate Types from Zod schemas and use them in the validation scripts.

## Quick Wins

| # | Fix | File | Effort |
|---|-----|------|--------|
| 1 | Create .env.example | `.env.example` | ~5 min |
| 2 | Delete unused Card component | `components/Card/` | ~2 min |
| 3 | Delete unused CSS | `app/(main)/home/page.module.css` | ~1 min |
| 4 | Delete demo code | `lib/hooks/EXAMPLES.tsx` | ~1 min |

## Dependency Map

- FIX-002 (Data Props) -> FIX-009 (Server Markdown) : Both involve moving logic to Server Components.
- FIX-005 (Zod) -> Future Data Additions : Validating data correctly prevents bad deployments.

## Files Touched Summary

| File | Findings | Highest Severity |
|------|:--------:|:----------------:|
| `app/api/weather/route.ts` | 1 | HIGH |
| `app/not-found.tsx` | 2 | HIGH |
| `components/home/Commemorative2026.tsx` | 1 | CRITICAL |
| `scripts/validate-data.ts` | 1 | HIGH |
| `.env.example` | 1 | CRITICAL |
| `app/api/fareharbor-webhook/route.ts` | 1 | LOW |
| `components/evidence/DocumentViewer.tsx` | 1 | MEDIUM |
