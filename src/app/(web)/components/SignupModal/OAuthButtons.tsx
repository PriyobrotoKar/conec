import { Icons } from '@/components/Icons'
import { signIn } from 'next-auth/react'
import Cookies from 'js-cookie'
import React from 'react'

const OAuthButtons = () => {
  const handleGoogleSignIn = async () => {
    Cookies.set('isOnboardingFinished', 'false')
    signIn('google', { redirect: false })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-base">Continue with socials</span>
      <div className="flex items-center gap-8">
        <Icons.google onClick={handleGoogleSignIn} />
        <Icons.instagram />
        <Icons.twitter />
      </div>
    </div>
  )
}

export default OAuthButtons
