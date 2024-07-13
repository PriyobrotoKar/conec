export class ApiError extends Error {
  code: number
  status
  constructor(message: string, code: number) {
    super(message)
    this.code = code
    this.status = 'error'
  }
}

export class AuthError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Unauthorized', 401)
  }
}
