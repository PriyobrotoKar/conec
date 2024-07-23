'use client'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import SignupForm from './SignupForm'
import OAuthButtons from './OAuthButtons'
import { toast } from 'sonner'
import Link from 'next/link'

const SignupModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const unAuthorized =
    searchParams.get('signup') === 'open' && !!searchParams.get('error')
  const showSignupForm = searchParams.get('signup') === 'open'

  useEffect(() => {
    if (unAuthorized && window) {
      toast.error('This account already exists. Try logging in instead')
    }
  }, [unAuthorized])

  return (
    <Dialog
      modal={false}
      open={showSignupForm}
      onOpenChange={(open) => !open && router.replace('/')}
    >
      <DialogContent className="px-10 py-14 md:px-28">
        <DialogHeader>
          <DialogTitle className="text-center text-4xl font-bold">
            One Step Away
          </DialogTitle>
        </DialogHeader>
        <OAuthButtons />
        <SignupForm />
        <DialogFooter className="text-sm italic">
          Already a member?
          <Link className="link ml-2 not-italic" href={'/?login=open'}>
            Login
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SignupModal
