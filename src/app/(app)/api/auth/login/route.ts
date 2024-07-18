import { signInSchema } from '@/entities/user'
import { AsyncHandler } from '@/lib/asyncHandler'
import { signInWithEmail } from '@/services/auth.service'
import { NextResponse } from 'next/server'

export const POST = AsyncHandler.unAuthenticated(async (req) => {
  const body = await req.json()
  const { email, password } = signInSchema.parse(body)
  await signInWithEmail({ email, password })
  return NextResponse.json({})
})
