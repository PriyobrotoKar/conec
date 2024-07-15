import z from 'zod'
export const userSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+$/, 'Username can only contain a-z,A-Z,0-9,.,-,_'),
  email: z.string().email(),
  password: z.string()
})
