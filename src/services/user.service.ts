'use server'

import { ApiError } from '@/lib/apiError'
import prisma from '@/lib/prisma'

export const getUserbyUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    throw new ApiError('user does not exist', 404)
  }

  return user
}
