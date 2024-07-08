import { ApiError } from '@/lib/apiError'
import { ApiResponse } from '@/lib/apiResponse'
import { asyncHandler } from '@/lib/asyncHandler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = asyncHandler(
  async (req: Request, { params }: { params: { username: string } }) => {
    const user = await prisma.user.findUnique({
      where: {
        username: params.username
      }
    })

    if (!user) {
      throw new ApiError('user does not exist', 404)
    }

    return NextResponse.json(new ApiResponse(user, 200), { status: 200 })
  }
)
