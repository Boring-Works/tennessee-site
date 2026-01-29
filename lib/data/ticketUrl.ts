/**
 * Smart Ticket URL Helper
 *
 * Returns the appropriate booking URL for an event:
 * - Uses custom ticketUrl if provided
 * - Falls back to FareHarbor default for ticketed events
 * - Returns null for free events
 */

// Default FareHarbor booking URL for Rocky Mount
export const DEFAULT_FAREHARBOR_URL = 'https://fareharbor.com/embeds/book/rockymountmuseum/'

/**
 * Get the ticket URL for an event
 * @param event - Event object with requiresTicket and optional ticketUrl
 * @returns Booking URL or null for free events
 */
export function getTicketUrl(event: {
  requiresTicket: boolean
  ticketUrl?: string | null
}): string | null {
  // Free events don't need a ticket URL
  if (!event.requiresTicket) {
    return null
  }

  // Use custom URL if provided
  if (event.ticketUrl) {
    return event.ticketUrl
  }

  // Fall back to default FareHarbor booking
  return DEFAULT_FAREHARBOR_URL
}

/**
 * Check if an event has a custom ticket URL (not the default)
 */
export function hasCustomTicketUrl(event: { ticketUrl?: string | null }): boolean {
  return Boolean(event.ticketUrl && event.ticketUrl !== DEFAULT_FAREHARBOR_URL)
}
