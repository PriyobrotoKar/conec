import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    coverage: {
      include: ['src/app/(app)/api/**']
    },
    include: ['src/app/**/*.spec.ts'],
    exclude: ['src/app/**/*.unit.spec.ts']
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  }
})
