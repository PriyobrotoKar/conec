'use client'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import FeatherIcon from 'feather-icons-react'
import { cn } from '@/lib/utils'
import { userSchema } from '@/entities/user'
import { ZodError } from 'zod'
import { fetchFromApi } from '@/lib/fetcher'
import { debounce } from '@/lib/debounce'

const ClaimUrl = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setIsAvailable(undefined)
    if (input === '') {
      return
    }
    setIsLoading(true)
    try {
      userSchema.shape.username.parse(input)
      const result = await fetchFromApi(`/user/${input}`)
      const availability = result.status === 'error'
      setIsAvailable(availability)
      setIsLoading(false)
    } catch (error: any) {
      let errorMessage = error.message
      if (error instanceof ZodError) {
        errorMessage = error.issues[0].message
      }
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }

  //eslint-disable-next-line
  const debouncedHandler = useCallback(debounce(handleOnChange, 500), [
    handleOnChange
  ])

  return (
    <main className="space-y-8 md:space-y-14">
      <h1 className="max-w-xs text-4xl font-bold md:max-w-[30rem] md:text-5xl">
        A page that tells your story.
      </h1>
      <div className="relative flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2 md:px-7 md:py-4">
        <div className="text-muted-foreground">conec.me/</div>
        <input
          type="text"
          className="w-full bg-transparent font-medium outline-none"
          onChange={(e) => debouncedHandler(e)}
        />
        {isLoading && (
          <FeatherIcon
            icon="loader"
            size={18}
            className="absolute right-4 animate-spin text-muted-foreground md:right-7"
          />
        )}
        {typeof isAvailable !== 'undefined' && (
          <FeatherIcon
            size={18}
            icon={isAvailable ? 'check' : 'x'}
            className={cn(
              'absolute right-4 md:right-7',
              isAvailable ? 'text-green-400' : 'text-red-400'
            )}
          />
        )}
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <Button>Claim Url</Button>
        <Link
          href={'?login=open'}
          className="text-xs font-medium italic md:text-lg"
        >
          or login to begin
        </Link>
      </div>
    </main>
  )
}

export default ClaimUrl
