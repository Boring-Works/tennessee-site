/**
 * Example components demonstrating hook usage
 *
 * These are NOT meant to be imported into production.
 * They serve as reference implementations.
 */

import { useContact, useHours, useAdmission, useTours, useSiteInfo } from './index'

/**
 * Example: Contact information display
 */
export function ContactExample() {
  const contact = useContact()

  return (
    <div>
      <h2>Contact Us</h2>

      {/* Phone */}
      <a href={contact.phoneHref}>{contact.phoneFormatted}</a>

      {/* Email */}
      <a href={contact.emailHref}>{contact.email}</a>

      {/* Address */}
      <address>{contact.address.full}</address>

      {/* Directions */}
      <a href={contact.coordinates.mapsUrl}>Get Directions</a>

      {/* Social Media */}
      <a href={contact.social.facebook.url}>Facebook: {contact.social.facebook.handle}</a>
      <a href={contact.social.instagram.url}>Instagram: {contact.social.instagram.handle}</a>
    </div>
  )
}

/**
 * Example: Hours with open/closed logic
 */
export function HoursExample() {
  const hours = useHours()

  return (
    <div>
      <h2>Hours</h2>

      {hours.isOpenToday() ? (
        <p className="text-green-600">Open today: {hours.getTodayHours()}</p>
      ) : (
        <p className="text-red-600">Closed today. Next open: {hours.getNextOpenDay()}</p>
      )}

      <p>{hours.formatted.short}</p>
      <p>{hours.season}</p>
    </div>
  )
}

/**
 * Example: Admission pricing calculator
 */
export function AdmissionExample() {
  const admission = useAdmission()

  // Example group
  const groupCounts = {
    adults: 2,
    seniors: 1,
    children: 3,
    childrenFree: 1,
  }

  const total = admission.calculateGroupTotal(groupCounts)
  const totalPeople = Object.values(groupCounts).reduce((sum, count) => sum + count, 0)
  const isGroup = admission.isGroupRate(totalPeople)

  return (
    <div>
      <h2>Admission</h2>

      {/* Price list */}
      <ul>
        <li>
          {admission.adults.label}: {admission.formatPrice(admission.adults.price)}
        </li>
        <li>
          {admission.seniors.label}: {admission.formatPrice(admission.seniors.price)}
        </li>
        <li>
          {admission.children.label}: {admission.formatPrice(admission.children.price)}
        </li>
        <li>{admission.childrenFree.label}: Free</li>
      </ul>

      {/* Example calculation */}
      <p>Example group total: {admission.formatPrice(total)}</p>
      {isGroup && <p className="text-amber-600">{admission.groups.note}</p>}

      {/* What's included */}
      <h3>Admission Includes:</h3>
      <ul>
        {admission.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Example: Tour schedule with next tour logic
 */
export function ToursExample() {
  const tours = useTours()
  const nextTour = tours.getNextTourTime()
  const remaining = tours.getToursRemaining()
  const minutes = tours.getMinutesUntilNextTour()
  const allTours = tours.getTodayTours()

  return (
    <div>
      <h2>Tours</h2>

      {tours.areToursRunning() ? (
        <div className="text-green-600">
          <p>Next tour: {nextTour?.formatted}</p>
          <p>{remaining} tours remaining today</p>
          {minutes !== null && <p>Next tour in {minutes} minutes</p>}
        </div>
      ) : (
        <p className="text-gray-600">Tours finished for today</p>
      )}

      <p>{tours.schedule}</p>
      <p>{tours.note}</p>
      <p>Duration: {tours.duration}</p>

      {/* All tour times */}
      <h3>Today&apos;s Schedule:</h3>
      <ul>
        {allTours.map((tour) => (
          <li key={tour.hour}>
            {tour.formatted}
            {tour.isLastTour && ' (Last Tour)'}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Example: Full site info access
 */
export function SiteInfoExample() {
  const site = useSiteInfo()

  return (
    <div>
      <h1>{site.site.name}</h1>
      <p>{site.site.tagline}</p>
      <p>Established {site.site.established}</p>

      <h2>Historical Significance</h2>
      <p>{site.site.territorialCapital.description}</p>

      <h2>Historical Figures</h2>
      {site.historicalFigures.map((figure) => (
        <div key={figure.id}>
          <h3>{figure.name}</h3>
          <p className="font-semibold">{figure.title}</p>
          <p>{figure.hook}</p>
        </div>
      ))}
    </div>
  )
}
