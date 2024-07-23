import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile']
const unprotectedRoutes = ['/']

import { auth } from '@/auth'
import { cookies } from 'next/headers'

export default async function middleware(request: NextRequest) {
  const session = await auth()
  const isOnboardingFinished = cookies().get('isOnboardingFinished')

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  )

  if (isOnboardingFinished?.value === 'false' && isProtectedRoute) {
    const absoluteURL = new URL('/onboarding', request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL('/?login=open', request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
  if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL('/dashboard', request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}
