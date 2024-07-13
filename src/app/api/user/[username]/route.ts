import { ApiResponse } from '@/lib/apiResponse'
import { AsyncHandler } from '@/lib/asyncHandler'
import { NextResponse } from 'next/server'
import { getUserbyUsername } from '@/services/user.service'

export const GET = AsyncHandler.authenticated(
  async (req: Request, { params }: { params: { username: string } }) => {
    const user = await getUserbyUsername(params.username)
    return NextResponse.json(new ApiResponse(user, 200), { status: 200 })
  }
)
