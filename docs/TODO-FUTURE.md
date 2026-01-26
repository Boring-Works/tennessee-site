# The 1775 Almanac — Future Enhancements

> **Purpose:** Features deferred from v1.0 launch. Revisit after initial deployment is stable.
> **Created:** January 26, 2026

---

## Deferred Features

### Rocky Mount Pantry Integration
**What:** Weather-triggered product suggestions in footer
**Why deferred:** Product inventory not yet confirmed. Need stable Pantry catalog before tying to weather conditions.
**When to revisit:** Once Pantry has consistent seasonal inventory

**Original spec (for reference):**
- Freezing (<32°F): Suggest warming products
- Rainy: Suggest comfort foods
- Hot (>88°F): Suggest refreshing items
- Link to: rockymountmuseum.com/shop

---

### Dynamic OG Image Generation
**What:** Generate shareable social cards with current weather stats
**Why deferred:** Adds server-side complexity (canvas rendering or edge function)
**When to revisit:** After launch, if social sharing becomes a priority

---

### Custom Subdomain
**What:** `1775.rockymountmuseum.com` or `almanac.rockymountmuseum.com`
**Why deferred:** Requires DNS configuration, SSL cert, Vercel domain mapping
**When to revisit:** Before major marketing push

---

### PWA / Offline Support
**What:** Service worker for offline access to cached data
**Why deferred:** Adds significant complexity, caching edge cases
**When to revisit:** If rural users request offline functionality

---

### Print-Friendly View
**What:** Single-page printable "Today's Briefing" PDF
**Why deferred:** CSS print styles are fiddly; PDF generation adds dependencies
**When to revisit:** If visitor center staff request printed handouts

---

### Email Capture / Daily Briefing
**What:** Subscribe to daily weather email
**Why deferred:** Requires email service integration (Mailchimp, Resend, etc.)
**When to revisit:** After launch, as list-building initiative

---

### Best Window Today
**What:** Scan hourly forecast to find optimal work windows
**Why deferred:** Requires recalculating scores for each hour — new logic = new bugs
**When to revisit:** v1.1 after core features stable

---

## Notes

- These features are NOT blockers for launch
- Revisit quarterly based on user feedback
- Pantry integration is highest priority once inventory stabilizes
