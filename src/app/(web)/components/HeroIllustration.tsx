import Image from 'next/image'
import React from 'react'

const HeroIllustration = () => {
  return (
    <div className="pointer-events-none space-y-4 md:flex-1 md:space-y-8">
      <div className="flex items-end justify-center gap-3 md:gap-10">
        <Image
          className="size-36 animate-float delay-1000 md:size-[50%] lg:size-64"
          src="/assets/face1.svg"
          alt=""
          width={250}
          height={250}
        />
        <Image
          className="size-20 animate-float delay-500 md:size-[25%] lg:size-36"
          src="/assets/face2.svg"
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className="flex items-center justify-center gap-3 md:gap-10">
        <Image
          className="size-32 animate-float delay-700 md:size-[40%] lg:size-56"
          src="/assets/face3.svg"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="size-28 animate-float md:size-[35%] lg:size-48"
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
