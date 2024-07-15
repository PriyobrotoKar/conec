import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toggleTheme'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="fixed flex w-full items-center justify-between p-5 md:px-16 md:py-8">
      <div className="text-2xl font-bold">Conec.</div>
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
