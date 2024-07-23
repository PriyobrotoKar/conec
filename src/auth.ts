import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import prisma from './lib/prisma'
import { cookies } from 'next/headers'
import { User } from '@prisma/client'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      authorize: async (session) => {
        return session
      }
    }),
    Google
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === 'credentials') {
        return true
      }
      if (!profile || !account || !profile.email) {
        return false
      }
      const isOnboardingFinished = cookies().get('isOnboardingFinished')
      const checkUserExist = await prisma.user.findUnique({
        where: {
          email: profile.email,
          authProvider: account.provider.toUpperCase() as User['authProvider']
        }
      })
      if (isOnboardingFinished === undefined && !checkUserExist) {
        return '/?login=open&error=AccessDenied'
      }
      if (isOnboardingFinished !== undefined && checkUserExist) {
        return '/?signup=open&error=AccessDenied'
      }
      return true
    }
  },
  pages: {
    signIn: '/?login=open',
    error: '/'
  },
  secret: process.env.AUTH_SECRET
})
