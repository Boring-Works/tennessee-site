'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Thermometer, AlertTriangle, Bell, X, Mail } from 'lucide-react'

interface FrostAlertProps {
  temperature: number
  minTemperature: number // Today's forecasted low
  feelsLike: number
}

type FrostRisk = 'none' | 'watch' | 'warning' | 'danger'

function getFrostRisk(temp: number, minTemp: number): { risk: FrostRisk; message: string; color: string } {
  // Check forecasted low first
  if (minTemp <= 28) {
    return {
      risk: 'danger',
      message: 'Hard freeze expected. Protect tender plants and exposed pipes.',
      color: 'text-red-400',
    }
  }
  if (minTemp <= 32) {
    return {
      risk: 'warning',
      message: 'Frost likely tonight. Cover sensitive plants before sunset.',
      color: 'text-orange-400',
    }
  }
  if (minTemp <= 36) {
    return {
      risk: 'watch',
      message: 'Frost possible in low-lying areas. Monitor conditions.',
      color: 'text-yellow-400',
    }
  }
  // Check current temp
  if (temp <= 36) {
    return {
      risk: 'watch',
      message: 'Near-freezing temperatures. Watch for frost in hollows.',
      color: 'text-yellow-400',
    }
  }
  return {
    risk: 'none',
    message: 'No frost risk in the forecast.',
    color: 'text-green-400',
  }
}

export default function FrostAlert({ temperature, minTemperature, feelsLike }: FrostAlertProps) {
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { risk, message, color } = getFrostRisk(temperature, minTemperature)

  // Don't show if no frost risk and user hasn't interacted
  if (risk === 'none' && !showSignup) {
    return null
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual email signup with backend service
    // This would connect to a service like SendGrid, Mailchimp, or custom API
    console.log('Frost alert signup:', email)
    setSubmitted(true)
    setTimeout(() => {
      setShowSignup(false)
      setSubmitted(false)
      setEmail('')
    }, 3000)
  }

  const Icon = risk === 'none' ? Thermometer : AlertTriangle

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={`border rounded-lg p-4 ${
        risk === 'danger'
          ? 'bg-red-900/20 border-red-500/30'
          : risk === 'warning'
          ? 'bg-orange-900/20 border-orange-500/30'
          : risk === 'watch'
          ? 'bg-yellow-900/20 border-yellow-500/30'
          : 'bg-almanac-midnight/80 border-almanac-gold/20'
      }`}
    >
      {/* Alert Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${color}`} />
          <div>
            <h3 className={`font-medium ${color}`}>
              {risk === 'danger' && 'Freeze Warning'}
              {risk === 'warning' && 'Frost Warning'}
              {risk === 'watch' && 'Frost Watch'}
              {risk === 'none' && 'No Frost Risk'}
            </h3>
            <p className="text-sm text-almanac-parchment/70 mt-1">
              {message}
            </p>
          </div>
        </div>
        {risk !== 'none' && (
          <button
            onClick={() => setShowSignup(!showSignup)}
            className="p-2 rounded-full bg-almanac-gold/10 hover:bg-almanac-gold/20 transition-colors"
            title="Get frost alerts"
          >
            <Bell className="w-4 h-4 text-almanac-gold" />
          </button>
        )}
      </div>

      {/* Temperature Details */}
      {risk !== 'none' && (
        <div className="flex gap-4 mt-3 pt-3 border-t border-white/10 text-sm">
          <div>
            <span className="text-almanac-parchment/50">Current: </span>
            <span className="text-almanac-parchment">{Math.round(temperature)}°F</span>
          </div>
          <div>
            <span className="text-almanac-parchment/50">Tonight's Low: </span>
            <span className={`${minTemperature <= 32 ? 'text-red-400' : 'text-almanac-parchment'}`}>
              {Math.round(minTemperature)}°F
            </span>
          </div>
          <div>
            <span className="text-almanac-parchment/50">Feels Like: </span>
            <span className="text-almanac-parchment">{Math.round(feelsLike)}°F</span>
          </div>
        </div>
      )}

      {/* Email Signup Modal */}
      <AnimatePresence>
        {showSignup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            {!submitted ? (
              <form onSubmit={handleSignup}>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-almanac-gold" />
                  <span className="text-sm text-almanac-parchment">
                    Get frost alerts by email
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSignup(false)}
                    className="ml-auto text-almanac-parchment/50 hover:text-almanac-parchment"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-almanac-midnight border border-almanac-gold/20 rounded px-3 py-2 text-sm text-almanac-parchment placeholder:text-almanac-parchment/30 focus:outline-none focus:border-almanac-gold/50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-almanac-gold text-almanac-midnight text-sm font-medium rounded hover:bg-almanac-gold/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-almanac-parchment/40 mt-2">
                  Alerts sent when frost is forecast for your location.
                </p>
              </form>
            ) : (
              <div className="text-center py-2">
                <p className="text-green-400 text-sm">
                  Thanks! You'll receive frost alerts at {email}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/*
 * FROST ALERT BACKEND REQUIREMENTS
 * ================================
 * To fully implement email/SMS frost alerts, you'll need:
 *
 * 1. Database (Supabase recommended):
 *    - frost_alert_subscribers table:
 *      { id, email, phone?, latitude, longitude, created_at, verified }
 *
 * 2. Email Service (SendGrid, Resend, or AWS SES):
 *    - Verification emails
 *    - Daily frost alert emails
 *
 * 3. SMS Service (Twilio) - optional:
 *    - For SMS alerts
 *
 * 4. Scheduled Job (Vercel Cron or separate service):
 *    - Run daily at 4 PM local time
 *    - Check weather forecast for each subscriber's location
 *    - If min temp <= 36°F, send alert
 *
 * 5. API Routes:
 *    - POST /api/frost-alerts/subscribe
 *    - GET /api/frost-alerts/verify?token=xxx
 *    - DELETE /api/frost-alerts/unsubscribe?token=xxx
 *
 * Example cron job (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/frost-alerts/check",
 *     "schedule": "0 21 * * *"  // 4 PM EST (21:00 UTC)
 *   }]
 * }
 */
