/* eslint-disable no-console */
/**
 * Centralized logger utility for development-only logging.
 * Prevents console statements from appearing in production builds.
 *
 * This is the ONLY file allowed to use console.* directly.
 * All other code should import and use `logger` from this module.
 *
 * @example
 * import { logger } from '@/lib/logger'
 *
 * logger.debug('Verbose info', { data })
 * logger.info('General info')
 * logger.warn('Potential issue')
 * logger.error('Something failed', error)
 */

interface LogData {
  [key: string]: unknown
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development'

  /**
   * Debug level logging - verbose development info
   */
  debug(message: string, data?: LogData): void {
    if (this.isDev) {
      console.log(`[DEBUG] ${message}`, data ?? '')
    }
  }

  /**
   * Info level logging - general information
   */
  info(message: string, data?: LogData): void {
    if (this.isDev) {
      console.info(`[INFO] ${message}`, data ?? '')
    }
  }

  /**
   * Warning level logging - potential issues
   */
  warn(message: string, data?: LogData): void {
    if (this.isDev) {
      console.warn(`[WARN] ${message}`, data ?? '')
    }
  }

  /**
   * Error level logging — always logs to stderr. Never swallows production errors.
   */
  error(message: string, error?: unknown): void {
    // Always log errors (production → vercel logs, dev → terminal)
    console.error(`[ERROR] ${message}`, error ?? '')

    // Future: if (!this.isDev) sendToSentry(error)
  }
}

export const logger = new Logger()
