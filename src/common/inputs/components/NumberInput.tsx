import React from 'react'
import { mergeRefs } from '@common/other/merge-refs'
import { NumberInputProps } from '../types'
import { TextInput } from './TextInput'

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  max,
  min,
  onBeforeInput,
  value = 0,
  ...props
}, ref) => {

  const onBeforeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const allowedCharacters = ['-', '.', ','];
    const compositionEvent = event as unknown as CompositionEvent;

    const { currentTarget } = event;
    let { data } = compositionEvent;
    data = data.trim();

    if (data === "" || (!allowedCharacters.includes(data) && isNaN(Number(data)))) {
      event.preventDefault();
    }

    if (data === "-" && currentTarget.value.length > 0) {
      event.preventDefault();
    }

    if (!onBeforeInput) return;

    onBeforeInput(event);
  }

  return (
    <TextInput
      onBeforeInput={onBeforeInputHandler}
      ref={ref}
      {...props}
    />
  )
})