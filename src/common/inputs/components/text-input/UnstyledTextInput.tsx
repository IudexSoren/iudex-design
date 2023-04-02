import React from 'react'

import { UnstyledTextInputProps } from './text-input.types'

export const UnstyledTextInput = React.forwardRef<HTMLInputElement, UnstyledTextInputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
    />
  )
})