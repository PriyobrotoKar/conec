import { beforeAll, expect, it } from 'vitest'
import { testApiHandler } from 'next-test-api-route-handler'
import * as appHandler from './route'
import prisma from '@/lib/prisma'

beforeAll(async () => {
  await prisma.user.deleteMany()
  await prisma.user.create({
    data: {
      email: 'test@gmail.com'
    }
  })
})

it('GET /api/health --> Should respond with OK and a status of 200', async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      const res = await fetch({ method: 'GET' })
      const body = await res.json()
      console.log(body.email)
      expect(res.status).toBe(200)
      expect(body).equals('test@gmail.com')
    }
  })
})
