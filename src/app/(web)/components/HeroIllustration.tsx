import Image from 'next/image'
import React from 'react'

const HeroIllustration = () => {
  return (
    <div className="pointer-events-none space-y-4 md:space-y-8">
      <div className="flex items-end gap-4 md:gap-10">
        <Image
          className="size-40 animate-float delay-1000 lg:size-64"
          src="/assets/face1.svg"
          alt=""
          width={250}
          height={250}
        />
        <Image
          className="size-24 animate-float delay-500 lg:size-36"
          src="/assets/face2.svg"
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className="flex items-center gap-4 md:gap-10">
        <Image
          className="size-36 animate-float delay-700 lg:size-56"
          src="/assets/face3.svg"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="size-32 animate-float lg:size-48"
          src="/assets/face4.svg"
          alt=""
          width={180}
          height={180}
        />
      </div>
    </div>
  )
}

export default HeroIllustration
