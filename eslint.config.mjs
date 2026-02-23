import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Custom rules for app/component code
  {
    rules: {
      // Disallow console.* in production code
      // Use lib/logger.ts instead for dev-only logging
      'no-console': 'error',
      // Allow unused variables/args prefixed with underscore
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  // Allow console in scripts, triggers, and server-side files
  {
    files: ['scripts/**', 'trigger/**'],
    rules: {
      'no-console': 'off',
    },
  },
])

export default eslintConfig
