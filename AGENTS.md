# AGENTS.md

## Project
Tennessee Starts Here — Rocky Mount State Historic Site commemorative website.

## Commands
- Install: `npm ci`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Validate data: `npm run validate:data`
- Check facts: `npm run check:facts`

## Package Manager
npm (use package-lock.json, NOT pnpm-lock.yaml)

## Deploy
Vercel (auto-deploy from GitHub). Config in vercel.json.

## Tech Stack
- Next.js 16 (App Router)
- React 19, TypeScript strict
- Tailwind CSS v4
- Framer Motion for animations
- ESLint + Prettier + Husky pre-commit hooks

## Architecture
- `app/` — Next.js App Router pages and layouts
- `components/` — React components
- `lib/` — Business logic, utilities
- `lib/copy/` — Centralized brand copy (single source of truth)
- `lib/dredge/reference-library.ts` — 136 verified historical facts
- `data/` — JSON data files (events, navigation, etc.)
- `content/` — Markdown content files

## CRITICAL: Historical Accuracy
- ALL facts must be verified against lib/dredge/reference-library.ts
- Run `npm run check:facts` before any content changes
- Never add unverified historical claims
- The building dates to 1820s. The SITE was settled ~1770.
- First SOUTHWEST TERRITORY capital (1790-92). NOT first US territorial capital.

## Do NOT
- Generate pnpm-lock.yaml (this project uses npm)
- Modify reference-library.ts without external source verification
- Skip fact checking on content changes
- Use `any` type
- Add console.log (use lib/logger.ts instead)
