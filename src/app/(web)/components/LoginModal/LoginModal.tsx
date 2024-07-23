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
import LoginForm from './LoginForm'
import OAuthButtons from './OAuthButtons'
import { toast } from 'sonner'
import Link from 'next/link'

const LoginModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const unAuthorized =
    searchParams.get('login') === 'open' && !!searchParams.get('error')
  const showLoginForm = searchParams.get('login') === 'open'

  useEffect(() => {
    if (unAuthorized && window) {
      toast.error('This account does not exist. Try signing up instead')
    }
  }, [unAuthorized])

  return (
    <Dialog
      modal={false}
      open={showLoginForm}
      onOpenChange={(open) => !open && router.replace('/')}
    >
      <DialogContent className="max-w-sm px-10 py-14 md:px-28">
        <DialogHeader>
          <DialogTitle className="text-center text-4xl font-bold">
            One Step Away
          </DialogTitle>
        </DialogHeader>
        <OAuthButtons />
        <LoginForm />
        <DialogFooter className="text-sm italic">
          New to conec?
          <Link className="link ml-2 not-italic" href={'/?signup=open'}>
            Signup
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
