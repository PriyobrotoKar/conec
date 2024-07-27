import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toggleTheme'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 flex w-full max-w-screen-2xl items-center justify-between place-self-center p-5 md:px-16 md:py-8">
      <Logo />
      <div className="flex items-center gap-7">
        <ModeToggle />
        <Link href={'/login'}>
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
