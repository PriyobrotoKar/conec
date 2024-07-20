import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      authorize: async (session) => {
        return session
      }
    })
  ],
  secret: process.env.AUTH_SECRET
})
