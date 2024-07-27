'use client'
import React, { useEffect, useState } from 'react'

const BetaTag = () => {
  const [mounted, setMounted] = useState(false)

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || (!origin.includes('localhost') && !origin.includes('beta'))) {
    return null
  }

  return (
    <span className="absolute -right-4 top-0 -translate-y-1/2 text-xs font-normal tracking-widest animate-in fade-in-5">
      BETA
    </span>
  )
}

const Logo = () => {
  return (
    <div className="relative text-2xl font-bold">
      Conec.
      <BetaTag />
    </div>
  )
}

export default Logo
