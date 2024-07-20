'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import LoginForm from './LoginForm'
import OAuthButtons from './OAuthButtons'

const LoginModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showLoginForm = searchParams.get('login') === 'open'
  return (
    <Dialog
      open={showLoginForm}
      onOpenChange={(open) => !open && router.back()}
    >
      <DialogContent className="px-28 py-14">
        <DialogHeader>
          <DialogTitle className="text-center text-4xl font-bold">
            One Step Away
          </DialogTitle>
        </DialogHeader>
        <OAuthButtons />
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
