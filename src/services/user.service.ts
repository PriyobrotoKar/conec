'use server'

import { ApiError } from '@/lib/apiError'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const getUser = async (query: Prisma.UserWhereUniqueInput) => {
  const user = await prisma.user.findUnique({
    where: query
  })

  if (!user) {
    throw new ApiError('user does not exist', 404)
  }

  return user
}
