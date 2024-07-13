import { auth } from '@/auth'
import { AuthError } from '@/lib/apiError'
import { Session } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

type RequestHandler<TParams extends Record<any, string>, T> = (
  request: NextRequest,
  context: { params: TParams }
) => Promise<NextResponse<T>>

type FnType<TParams, T = null> = (
  req: NextRequest,
  context: { params: TParams },
  data: T
) => Promise<NextResponse<any>>

export class AsyncHandler<TParams extends Record<any, string>, T> {
  static instance: RequestHandler<any, any> | undefined

  constructor(
    private fn: FnType<TParams, T>,
    private middleware?: () => Promise<T>
  ) {
    if (!AsyncHandler.instance) {
      AsyncHandler.instance = this.handleRequest.bind(this)
    }
  }

  private async handleRequest(
    request: NextRequest,
    context: { params: TParams }
  ) {
    try {
      const data = this.middleware ? await this.middleware() : null
      const args = [request, context, data].filter((arg) => arg !== null)
      return await this.fn(...(args as [NextRequest, { params: TParams }, T]))
    } catch (error: any) {
      process.env.NODE_ENV === 'development' && console.log(error)
      return this.createErrorResponse(error)
    }
  }

  private createErrorResponse(error: any) {
    const statusCode = error.code || 500
    const message =
      process.env.NODE_ENV !== 'production'
        ? error.message
        : 'Internal Server Error'
    const stack = process.env.NODE_ENV !== 'production' ? error.stack : ''
    return NextResponse.json(
      {
        code: statusCode,
        status: 'error',
        data: null,
        message,
        stack
      },
      { status: statusCode }
    )
  }

  static authenticated<U extends Record<any, string>>(
    fn: FnType<U, { currentUser: Session }>
  ) {
    new AsyncHandler(fn, async () => {
      const currentUser = await auth()
      if (!currentUser) {
        throw new AuthError()
      }
      return { currentUser }
    })
    return AsyncHandler.instance
  }

  static unAuthenticated<U extends Record<any, string>>(fn: FnType<U>) {
    new AsyncHandler(fn)
    return AsyncHandler.instance
  }
}
