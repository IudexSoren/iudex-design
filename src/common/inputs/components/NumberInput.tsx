import React from 'react'
import { NumberInputProps } from '../types'
import { TextInput } from './TextInput'

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  max,
  min,
  onBeforeInput,
  onChange,
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

  const onBeforeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const compositionEvent = event as unknown as CompositionEvent;
    const { data } = compositionEvent;

    if (isNaN(Number(data))) {
      event.preventDefault();
    }

    if (!onBeforeInput) return;

    onBeforeInput(event);
  }

  return (
    <TextInput
      onChange={onInputChange}
      onBeforeInput={onBeforeInputHandler}
      ref={ref}
      {...props}
    />
  )
})