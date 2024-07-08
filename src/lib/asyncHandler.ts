import { NextRequest, NextResponse } from 'next/server'

export const asyncHandler =
  <TParams extends Record<any, string>>(
    fn: (
      req: NextRequest,
      context: { params: TParams }
    ) => Promise<NextResponse<any>>
  ) =>
  async (request: NextRequest, context: { params: TParams }) => {
    try {
      return await fn(request, context)
    } catch (error: any) {
      return NextResponse.json(
        {
          code: error.code || 500,
          status: error.status || 'error',
          data: null,
          message:
            process.env.NODE_ENV !== 'production'
              ? error.message
              : 'Internal Server Error',
          stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
        },
        { status: error.code || 500 }
      )
    }
  }
