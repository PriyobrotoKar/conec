import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signupSchema } from '@/entities/user'
import { fetchFromApi } from '@/lib/fetcher'
import { submitHanlder } from '@/lib/submitHandler'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import PasswordInput from '@/components/PasswordInput'

const SignupForm = () => {
  const router = useRouter()
  const { handleSubmit, formState, ...form } = useForm<
    z.infer<typeof signupSchema>
  >({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async ({ email }: z.infer<typeof signupSchema>) => {
    return submitHanlder(async () => {
      const result = await fetchFromApi(`/user?email=${email}`)
      if (result.status === 'success') {
        throw new Error('This account already exists. Try logging in instead')
      }
      router.push('/onboarding')
    })
  }

  return (
    <>
      <p className="text-center text-sm">or use email</p>
      <Form {...form} handleSubmit={handleSubmit} formState={formState}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-8"
        >
          <div className="w-full space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Sign up
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SignupForm
