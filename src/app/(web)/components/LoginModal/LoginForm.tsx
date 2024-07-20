import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/entities/user'
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

const LoginForm = () => {
  const router = useRouter()
  const { handleSubmit, formState, ...form } = useForm<
    z.infer<typeof signInSchema>
  >({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async ({
    email,
    password
  }: z.infer<typeof signInSchema>) => {
    return submitHanlder(async () => {
      const result = await fetchFromApi('/auth/login', 'POST', {
        email,
        password
      })
      if (result.status === 'error') {
        throw new Error(result.message)
      }
      router.push('/dashboard')
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
          <div className="w-full space-y-4">
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Login
          </Button>
        </form>
      </Form>
    </>
  )
}

export default LoginForm
