import { ApiResponse } from '@/lib/apiResponse'
import { AsyncHandler } from '@/lib/asyncHandler'
import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/services/user.service'
import { ApiError } from '@/lib/apiError'
import { Prisma } from '@prisma/client'

export const GET = AsyncHandler.unAuthenticated(async (req: NextRequest) => {
  const username = req.nextUrl.searchParams.get('username')
  const email = req.nextUrl.searchParams.get('email')
  if (username === null && email === null) {
    throw new ApiError('Invalid params', 400)
  }
  let query: Prisma.UserWhereUniqueInput = {} as Prisma.UserWhereUniqueInput
  if (username) query.username = username
  if (email) query.email = email

  if (Object.keys(query).length === 0) {
    throw new ApiError('Invalid params', 400)
  }

  const user = await getUser(query)
  return NextResponse.json(new ApiResponse(user, 200), { status: 200 })
})
