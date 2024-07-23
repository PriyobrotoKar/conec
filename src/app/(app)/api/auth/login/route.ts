import { signInSchema } from '@/entities/user'
import { ApiResponse } from '@/lib/apiResponse'
import { AsyncHandler } from '@/lib/asyncHandler'
import { signInWithEmail } from '@/services/auth.service'
import { NextResponse } from 'next/server'

export const POST = AsyncHandler.unAuthenticated(async (req) => {
  const body = await req.json()
  const { email, password } = signInSchema.parse(body)
  await signInWithEmail({ email, password })
  return NextResponse.json(new ApiResponse('Logged in successfully', 200))
})
