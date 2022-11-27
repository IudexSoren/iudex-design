import React from 'react'
import { NumberInputProps } from '../types'
import { NumberInputSuffixControls } from './number-input'
import { TextInput } from './TextInput'

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  max,
  min,
  onBeforeInput,
  showControls = true,
  step = 1,
  suffixInput,
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

    const numberValue = Number(currentTarget.value + data);

    if (max !== undefined && numberValue > max) {
      event.preventDefault();
    }

    if (min !== undefined && numberValue < min) {
      event.preventDefault();
    }

    if (!onBeforeInput) return;

    onBeforeInput(event);
  }

  return (
    <TextInput
      onBeforeInput={onBeforeInputHandler}
      ref={ref}
      suffixInput={
        <React.Fragment>
          {suffixInput}
          {
            showControls ? (
              <NumberInputSuffixControls

              />
            ) : null
          }
        </React.Fragment>
      }
      {...props}
    />
  )
})