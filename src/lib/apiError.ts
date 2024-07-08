export class ApiError extends Error {
  code: number
  status
  constructor(message: string, code: number) {
    super(message)
    this.code = code
    this.status = 'error'
  }
}
