# Documentation Health - Quick Check

**Tennessee Starts Here**
**Last Updated:** January 29, 2026

---

## ✅ Completed

### Schema Accuracy (100% Fixed)

- [x] **historicalFigures** - Corrected from object to array with proper fields
- [x] **accessibility** - Corrected from string to complex nested structure
- [x] **hours** - Added 6 missing fields (formatted, seasonNote, tourSchedule, etc.)
- [x] **drivingDistances** - Added to location object
- [x] **sisterSites** - Added top-level array
- [x] **admissionIncludes** - Added top-level array
- [x] **contact.social.tiktok** - Added missing social field
- [x] **nearbyAttractions.description** - Added missing field

**Result:** SCHEMA.md now matches siteInfo.json 100%

---

## 📋 Ready to Execute

### Documentation Cleanup Plan

- [ ] Create `_archive/` folder structure
- [ ] Move 5 completed audits to `_archive/audits/`
- [ ] Move 2 completed planning docs to `_archive/planning/`
- [ ] Move 5 Claude prompts to `_archive/claude-prompts/`
- [ ] Move 2 Governor's Glass docs to `_archive/projects/governor-glass/`
- [ ] Move 2 active reference docs to `docs/reference/`
- [ ] Organize 35+ feature docs in `docs/features/`
- [ ] Create `docs/README.md` navigation index
- [ ] Update `CLAUDE.md` with new structure
- [ ] Create `_archive/README.md` with explanation

**Time:** 45-60 minutes
**Plan:** See `DOCUMENTATION-CLEANUP-PLAN.md` for step-by-step commands

---

## 📊 Before & After

### Before

- ❌ SCHEMA.md: 7 major mismatches (70% accurate)
- ❌ Root folder: 19 markdown files (cluttered)
- ❌ No archive structure (completed work mixed with active)
- ❌ docs/ flat structure (53+ files, hard to navigate)

### After (When Cleanup Executed)

- ✅ SCHEMA.md: 100% accurate
- ✅ Root folder: 3 markdown files (clean)
- ✅ Archive structure: 14 historical files organized
- ✅ docs/ hierarchy: 6 logical subdirectories with index

---

## 📁 Deliverables

| File                             | Lines       | Purpose                                    |
| -------------------------------- | ----------- | ------------------------------------------ |
| `SCHEMA.md` (updated)            | 757         | Corrected data schema (7 fixes)            |
| `DOCUMENTATION-CLEANUP-PLAN.md`  | 532         | Complete migration plan with bash commands |
| `DOCUMENTATION-AUDIT-SUMMARY.md` | 406         | Executive summary and findings             |
| `DOCS-HEALTH-QUICK-CHECK.md`     | (this file) | Quick reference checklist                  |

---

## 🎯 Next Steps

1. **Review** - Read `DOCUMENTATION-AUDIT-SUMMARY.md` for full details
2. **Execute** - Follow `DOCUMENTATION-CLEANUP-PLAN.md` step-by-step
3. **Verify** - Confirm root has only 3 MD files
4. **Commit** - Commit changes with message: "docs: Fix SCHEMA.md and reorganize documentation"

---

## 💡 Quick Commands

**Verify schema accuracy:**

```bash
npm run build
# Should pass with no errors
```

**Start cleanup (creates folders):**

```bash
mkdir -p _archive/{audits,planning,claude-prompts,projects/governor-glass}
mkdir -p docs/reference
mkdir -p docs/features/{almanac,events,evidence,welcome,homepage,navigation}
```

**Check progress:**

```bash
ls *.md | wc -l
# Target: 3 files (CLAUDE.md, README.md, CONTRIBUTING.md)

ls _archive/**/*.md | wc -l
# Target: 14 files
```

---

_Dr. Kai Nakamura - "If it's not in the docs, it doesn't exist."_
