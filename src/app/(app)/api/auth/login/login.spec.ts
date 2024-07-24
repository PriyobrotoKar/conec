import { testApiHandler } from 'next-test-api-route-handler'
import bcrypt from 'bcrypt'
import {
  beforeAll,
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import * as appHandler from './route'
import prisma from '@/lib/prisma'

describe('login tests', () => {
  describe('Validate email and password', () => {
    it('POST /api/login -> Should throw error if the email address is blank', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({ email: '' })
          })
          const body = await res.json()
          expect(body.code).toBe(400)
          expect(body.status).toBe('error')
          expect(body.message).toBe('Email is required')
        }
      })
    })

    it('POST /api/login -> Should throw error if the email address is invalid', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({ email: 'aosiefao' })
          })
          const body = await res.json()
          expect(body.code).toBe(400)
          expect(body.status).toBe('error')
          expect(body.message).toBe('Email is invalid')
        }
      })
    })

    it('POST /api/login -> Should throw error if the password is blank', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({ email: 'johnDoe@gmail.com', password: '' })
          })
          const body = await res.json()
          expect(body.code).toBe(400)
          expect(body.status).toBe('error')
          expect(body.message).toBe('Password is required')
        }
      })
    })
  })

  describe('Authenticate user', () => {
    vi.mock('@/auth', () => ({
      signIn: vi.fn()
    }))
    const testUser = {
      username: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: bcrypt.hashSync('thisIsJohn', 10)
    }

    beforeAll(async () => {
      await prisma.user.deleteMany()
    })

    beforeEach(async () => {
      await prisma.user.create({
        data: { ...testUser, authProvider: 'EMAIL' }
      })
    })

    afterEach(async () => {
      await prisma.user.deleteMany()
    })

    it('POST /api/login -> Should throw error if the user does not have an account', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({
              ...testUser,
              email: 'test@gmail.com'
            })
          })
          const body = await res.json()
          expect(body.code).toBe(401)
          expect(body.status).toBe('error')
          expect(body.message).toBe(
            'This account does not exist. Try signing up instead'
          )
        }
      })
    })

    it('POST /api/login -> Should throw error if the password is incorrect', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({
              email: testUser.email,
              password: 'testing1234'
            })
          })
          const body = await res.json()
          expect(body.code).toBe(401)
          expect(body.status).toBe('error')
          expect(body.message).toBe('Incorrect password')
        }
      })
    })
    it('POST /api/login -> Should login the user with correct credentials', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({
              email: testUser.email,
              password: 'thisIsJohn'
            })
          })
          const body = await res.json()
          expect(body.code).toBe(200)
          expect(body.status).toBe('success')
          expect(body.data).toBe('Logged in successfully')
        }
      })
    })
  })
})
