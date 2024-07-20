import { signIn } from '@/auth'
import { signInSchema } from '@/entities/user'
import { ApiError } from '@/lib/apiError'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'

export const signInWithEmail = async ({
  email,
  password
}: z.infer<typeof signInSchema>) => {
  //TODO: check if a user with this email exists or not
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    throw new ApiError('This email address does not exist', 401)
  }
  //TODO: if exists then check if the user's password is matching or not
  const isPasswordMatching = await bcrypt.compare(password, user.password)
  if (!isPasswordMatching) {
    throw new ApiError('Incorrect password', 401)
  }
  //TODO: if matches then signIn the user
  await signIn('credentials', {
    ...user,
    redirect: false
  })
}
