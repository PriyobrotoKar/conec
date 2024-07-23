import { toast } from 'sonner'
import { ZodError } from 'zod'

export const submitHanlder = async (fn: () => Promise<void>) => {
  try {
    await fn()
  } catch (error: any) {
    let errorMessage = error.message
    if (error instanceof ZodError) {
      errorMessage = error.issues[0].message
    }
    toast.error(errorMessage)
  }
}
