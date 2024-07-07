import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: params.username
      }
    })

    if (!user) {
      return NextResponse.json(
        {
          code: 404,
          status: 'error',
          data: null,
          message: 'user does not exist'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json(
      {
        code: 200,
        status: 'success',
        data: user,
        message: null
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
  }
}
