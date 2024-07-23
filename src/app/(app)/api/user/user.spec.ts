import { testApiHandler } from 'next-test-api-route-handler'
import {
  describe,
  beforeEach,
  expect,
  it,
  afterEach,
  beforeAll,
  vi
} from 'vitest'
import * as appHandler from './route'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

describe('user tests', () => {
  let user: User
  vi.mock('@/auth')

  beforeAll(async () => {
    await prisma.user.deleteMany()
  })
  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        username: 'janeDoe',
        email: 'janeDoe@gmail.com',
        password: bcrypt.hashSync('thisIsJane', 10)
      }
    })
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  it('GET api/user -> Should throw error for having invalid params', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        expect(res.status).toBe(400)
        expect(body.code).toBe(400)
        expect(body.status).toEqual('error')
        expect(body.message).toEqual('Invalid params')
      }
    })
  })

  it('GET api/user?username=janeDoe -> Should return the user with a specific username', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/user?username=janeDoe',
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

  it('GET api/user?username=testuser -> Should return an error if the specific user does not exist', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/user?username=testuser',
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

  it('GET api/user?email=janeDoe@gmail.com -> Should return the user with a specific email', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/user?email=janeDoe@gmail.com',
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

  it('GET api/user?email=testuser@gmail.com -> Should return an error if the specific email does not exist', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/user?email=testuser@gmail.com',
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

  it('GET api/user?username=janeDoe&email=janeDoe@gmail.com -> Should return the user with a specific username and email', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/user?username=janeDoe&email=janeDoe@gmail.com',
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

  it('GET api/user?username=testuser&email=testuser@gmail.com -> Should return an error if the specific user does not exist', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/user?username=testuser&email=testuser@gmail.com',
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
