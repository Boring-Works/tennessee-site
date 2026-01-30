# Analytics & Tracking Setup

This document describes the marketing analytics implementation for Tennessee Starts Here.

## Overview

The site tracks user interactions with Google Analytics 4 (GA4) and Facebook Pixel for marketing attribution and conversion tracking.

## What's Tracked

### Page Views

- Automatically tracked on all pages
- GA4: `page_view` event
- Facebook Pixel: `PageView` event

### Event Bookings (begin_checkout)

- Tracked when users click "Reserve Your Spot" buttons
- Fires on both events page (`/events`) and programs page (`/programs`)
- **GA4 Event:** `begin_checkout`
  - `item_id`: FareHarbor ID or event ID
  - `item_name`: Event title
  - `price`: Lowest available ticket price
  - `currency`: USD
- **Facebook Pixel Event:** `InitiateCheckout`
  - `content_name`: Event title
  - `content_ids`: [FareHarbor ID or event ID]
  - `value`: Lowest available ticket price
  - `currency`: USD

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel ID
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX
```

### Getting Your IDs

**Google Analytics 4:**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Admin → Data Streams → Web
3. Copy the "Measurement ID" (format: `G-XXXXXXXXXX`)

**Facebook Pixel:**

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Data Sources → Pixels
3. Copy your Pixel ID (15-16 digit number)

## Implementation Details

### Core Files

| File                                   | Purpose                                            |
| -------------------------------------- | -------------------------------------------------- |
| `lib/analytics.ts`                     | Analytics utility functions (GA4 + Facebook Pixel) |
| `components/Analytics.tsx`             | Loads GA4 and Facebook Pixel scripts               |
| `components/booking/BookingButton.tsx` | Booking button with tracking                       |
| `app/layout.tsx`                       | Renders Analytics component                        |

### How It Works

1. **Page Load:**
   - `Analytics.tsx` loads GA4 and Facebook Pixel scripts
   - Both track initial page view

2. **Booking Click:**
   - User clicks "Reserve Your Spot" on an event
   - `BookingButton` calls `trackBeginCheckout()`
   - Event data sent to both GA4 and Facebook Pixel
   - User redirected to FareHarbor booking page

### Pricing Logic

The tracking uses the **lowest available price** from the event's pricing data:

```typescript
// Example event pricing
{
  "pricing": {
    "adult": 25,
    "senior": 20,
    "child": 15,
    "members": 10  // ← This is sent as the price
  }
}
```

Free events send `price: 0`.

## Testing

### Verify GA4 Setup

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Navigate to tennesseestartshere.com
3. Open DevTools Console
4. Click "Reserve Your Spot" on an event
5. Look for `begin_checkout` event in console

**Alternative:** Use GA4 DebugView in Google Analytics (Admin → DebugView)

### Verify Facebook Pixel

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Navigate to tennesseestartshere.com
3. Click the extension icon
4. Verify "PageView" fires on page load
5. Click "Reserve Your Spot" on an event
6. Verify "InitiateCheckout" fires

## Data Structure

Events must include these fields for tracking:

```typescript
interface TrackableEvent {
  id: string // Event ID (e.g., "spring-break-camp-1")
  title: string // Event name (e.g., "Spring Break Camp Week 1")
  fareHarborId?: string // FareHarbor item ID (e.g., "562803")
  pricing?: {
    adult?: number | null
    senior?: number | null
    child?: number | null
    underFive?: number | null
    members?: number | null
  } | null
}
```

## Usage in Code

### Using BookingButton Component

```tsx
import { BookingButton } from '@/components/booking'

;<BookingButton
  itemId={event.fareHarborId}
  fallbackUrl={event.ticketUrl || '/events'}
  eventData={{
    id: event.id,
    title: event.title,
    fareHarborId: event.fareHarborId,
    pricing: event.pricing,
  }}
>
  Reserve Your Spot
</BookingButton>
```

### Manual Tracking (Advanced)

```typescript
import { trackBeginCheckout } from '@/lib/analytics'

trackBeginCheckout({
  id: 'spring-break-camp-1',
  title: 'Spring Break Camp Week 1',
  fareHarborId: '562803',
  pricing: {
    adult: null,
    child: 180,
    members: 150,
  },
})
```

## Privacy & Compliance

- Analytics only load if environment variables are set
- No personally identifiable information (PII) is tracked
- Both GA4 and Facebook Pixel respect user privacy settings
- Consider adding a cookie consent banner for GDPR compliance (not yet implemented)

## Troubleshooting

### Events Not Showing in GA4

1. Check that `NEXT_PUBLIC_GA_ID` is set in `.env.local`
2. Verify the Measurement ID format (`G-XXXXXXXXXX`)
3. Wait 24-48 hours for data to appear in standard reports
4. Use DebugView for real-time validation

### Facebook Pixel Not Firing

1. Check that `NEXT_PUBLIC_FB_PIXEL_ID` is set in `.env.local`
2. Verify the Pixel ID is a 15-16 digit number
3. Use Meta Pixel Helper to diagnose
4. Check browser console for JavaScript errors

### Tracking Not Working Locally

- Environment variables must start with `NEXT_PUBLIC_` to be available in the browser
- Restart the dev server after adding new env vars: `npm run dev`

## Roadmap

Future enhancements:

- [ ] Purchase event tracking (requires FareHarbor webhook integration)
- [ ] Cookie consent banner (GDPR/CCPA compliance)
- [ ] Google Tag Manager (for easier tag management)
- [ ] Enhanced ecommerce tracking (cart abandonment, etc.)

---

**Last Updated:** January 30, 2026
