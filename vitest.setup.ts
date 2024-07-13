import { expect } from 'vitest'

expect.extend({
  toHaveValidResponseStructure(received) {
    const pass =
      received &&
      typeof received === 'object' &&
      received.hasOwnProperty('code') &&
      received.hasOwnProperty('status') &&
      received.hasOwnProperty('data') &&
      received.hasOwnProperty('message')

    if (pass) {
      return {
        message: () => `expected response not to have a valid structure`,
        pass: true
      }
    } else {
      return {
        message: () => `expected response to have a valid structure`,
        pass: false
      }
    }
  }
})
