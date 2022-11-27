import React from 'react'
import { mergeRefs } from '@common/other/merge-refs'
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
      onChange={onInputChange}
      onBeforeInput={onBeforeInputHandler}
      ref={ref}
      {...props}
    />
  )
})