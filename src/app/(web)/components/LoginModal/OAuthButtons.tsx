import { Icons } from '@/components/Icons'
import React from 'react'

const OAuthButtons = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-base">Continue with socials</span>
      <div className="flex items-center gap-8">
        <Icons.google />
        <Icons.instagram />
        <Icons.twitter />
      </div>
    </div>
  )
}

export default OAuthButtons
