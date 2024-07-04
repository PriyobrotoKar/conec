import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json(users.length ? users[0].email : 'No Users!!', {
    status: 200
  })
}
