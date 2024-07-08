export class ApiResponse {
  code: number
  data: any
  message: null
  status
  constructor(data: any, code: number) {
    this.code = code
    this.data = data
    this.message = null
    this.status = 'success'
  }
}
