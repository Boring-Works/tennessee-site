import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * FareHarbor Webhook Endpoint
 *
 * Receives booking notifications from FareHarbor:
 * - New bookings
 * - Booking updates
 * - Cancellations
 *
 * Webhook secrets (from FareHarbor):
 * - FAREHARBOR_WEBHOOK_SECRET: Primary secret
 * - FAREHARBOR_WEBHOOK_SECRET_ZAPIER: Zapier integration secret
 */

// Verify webhook signature using HMAC SHA-256
function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

// FareHarbor booking webhook payload type
interface FareHarborWebhookPayload {
  webhook_type: 'booking' | 'item'
  event: 'created' | 'updated' | 'cancelled'
  booking?: {
    pk: number
    uuid: string
    display_id: string
    status: 'booked' | 'cancelled'
    total: number
    contact: {
      name: string
      email: string
      phone: string
    }
    item: {
      pk: number
      name: string
    }
    availability: {
      pk: number
      start_at: string
      end_at: string
    }
    customers: Array<{
      customer_type_rate: {
        customer_prototype: {
          display_name: string
        }
        total: number
      }
    }>
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('x-fareharbor-signature') || ''

    // Try both webhook secrets
    const primarySecret = process.env.FAREHARBOR_WEBHOOK_SECRET
    const zapierSecret = process.env.FAREHARBOR_WEBHOOK_SECRET_ZAPIER

    let isValid = false

    if (primarySecret && verifySignature(rawBody, signature, primarySecret)) {
      isValid = true
    } else if (zapierSecret && verifySignature(rawBody, signature, zapierSecret)) {
      isValid = true
    }

    // In development, allow unverified webhooks for testing
    const isDev = process.env.NODE_ENV === 'development'
    if (!isValid && !isDev) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse payload
    const payload: FareHarborWebhookPayload = JSON.parse(rawBody)

    // Log the webhook (in production, you'd store this or trigger actions)
    // Using console here intentionally for webhook debugging
    // eslint-disable-next-line no-console
    console.log('[FareHarbor Webhook]', {
      type: payload.webhook_type,
      event: payload.event,
      booking_id: payload.booking?.display_id,
      item: payload.booking?.item?.name,
      total: payload.booking?.total ? `$${(payload.booking.total / 100).toFixed(2)}` : null,
      customer: payload.booking?.contact?.name,
    })

    // Handle different webhook events
    if (payload.webhook_type === 'booking') {
      switch (payload.event) {
        case 'created':
          // New booking created
          // Could: send confirmation email, update inventory count, trigger Zapier, etc.
          break

        case 'updated':
          // Booking modified
          break

        case 'cancelled':
          // Booking cancelled
          break
      }
    }

    // Acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[FareHarbor Webhook Error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/fareharbor-webhook',
    accepts: 'POST',
    description: 'FareHarbor booking webhook receiver',
  })
}
