import { defineConfig } from '@trigger.dev/sdk'

export default defineConfig({
  project: 'rocky-mount-dredge',
  runtime: 'node',
  logLevel: 'info',
  maxDuration: 300, // 5 minutes default
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
    },
  },
  dirs: ['./trigger'],
})
