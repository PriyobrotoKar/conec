import { testApiHandler } from 'next-test-api-route-handler'
import { describe, beforeEach, expect, it, afterEach, beforeAll } from 'vitest'
import * as appHandler from './route'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

describe('user tests', () => {
  let user: User
  beforeAll(async () => {
    await prisma.user.deleteMany()
  })
  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        username: 'johnDoe',
        email: 'johnDoe@gmail.com',
        password: bcrypt.hashSync('thisIsJohn', 10)
      }
    })
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  it('GET api/user/:username -> Should return the user with a specific username', async () => {
    await testApiHandler({
      appHandler,
      params: {
        username: 'johnDoe'
      },
      async test({ fetch }) {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        expect(res.status).toBe(200)
        expect(body.code).toBe(200)
        expect(body.status).toEqual('success')
        expect(body.data).toEqual({
          ...user,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      }
    })
  })

  it('GET api/user/:username -> Should return an error if the specific user does not exist', async () => {
    await testApiHandler({
      appHandler,
      params: {
        username: 'test@gmail.com'
      },
      async test({ fetch }) {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        expect(res.status).toBe(404)
        expect(body.code).toBe(404)
        expect(body.status).toBe('error')
        expect(body.data).toBeNull()
        expect(body.message).toBe('user does not exist')
      }
    })
  })
})
