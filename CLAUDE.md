# Claude Instructions for Tennessee Starts Here

## Owner Commands

### HOTFIX

When Cody says **"HOTFIX"**, immediately run the full verification sequence:

1. `npm run lint` — Check for code issues
2. `npm run build` — Verify production build
3. Report results clearly:
   - ✅ "Ready to publish" if both pass
   - ❌ "Found issues" + fix them if either fails

This is the pre-publish checklist. Do not ask questions — just run it.

---

## Code Standards

### No Console Statements

ESLint enforces `no-console`. Use the logger instead:

```typescript
import { logger } from '@/lib/logger'

logger.debug('info', { data })
logger.error('failed', error)
```

### Pre-commit Hooks

Husky + lint-staged run automatically on every commit:

- ESLint with auto-fix
- Prettier formatting

---

## Key Files

| File              | Purpose                  |
| ----------------- | ------------------------ |
| `lib/logger.ts`   | Dev-only logging utility |
| `CONTRIBUTING.md` | Full coding standards    |
| `docs/PROJECT.md` | Project specification    |
