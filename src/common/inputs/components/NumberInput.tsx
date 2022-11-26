import React from 'react'
import { NumberInputProps } from '../types'
import { TextInput } from './TextInput'

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  max,
  min,
  onChange,
  onKeyDown,
  value = 0,
  ...props
}, ref) => {

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    const convertedValue = Number(value);

    if (isNaN(convertedValue)) return;

    if (!onChange) return;

    onChange(event);
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;

    onKeyDown(event);
  }

  return (
    <TextInput
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      ref={ref}
      {...props}
    />
  )
})