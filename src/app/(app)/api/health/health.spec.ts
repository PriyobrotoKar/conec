import { expect, it } from 'vitest'
import { testApiHandler } from 'next-test-api-route-handler'
import * as appHandler from './route'

it('GET /api/health --> Should respond with OK and a status of 200', async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      const res = await fetch({ method: 'GET' })
      const body = await res.json()
      expect(res.status).toBe(200)
      expect(body).equals('OK')
    }
  })
})
