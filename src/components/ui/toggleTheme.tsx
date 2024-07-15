'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import FeatherIcon from 'feather-icons-react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
      size="icon"
    >
      <FeatherIcon
        icon="sun"
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-100 dark:-rotate-90 dark:scale-0"
      />
      <FeatherIcon
        icon="moon"
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-100 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
