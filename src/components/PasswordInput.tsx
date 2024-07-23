import React, { useState } from 'react'
import { Input, InputProps } from './ui/input'
import { Icons } from './Icons'
import { Button } from './ui/button'

const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <Button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        variant={'ghost'}
        size={'icon'}
        className="absolute right-1 top-0"
      >
        {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
      </Button>
    </div>
  )
}

export default PasswordInput
