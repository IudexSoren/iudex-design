import React from 'react'
import { mergeRefs } from '@common/other/merge-refs'
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
  ...props
}, ref) => {

  const innerRef = React.useRef<HTMLInputElement>(null);

  const onBeforeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const allowedCharacters = ['-', '.'];
    const compositionEvent = event as unknown as CompositionEvent;

    const { currentTarget } = event;
    let { data } = compositionEvent;
    data = data.trim();

    const isHyphen = data === '-';

    if (data === "" || (!allowedCharacters.includes(data) && isNaN(Number(data)))) {
      event.preventDefault();
    }

    const numberValue = Number(currentTarget.value + data);

    if (max !== undefined && numberValue > max) {
      event.preventDefault();
    }

    if (min !== undefined) {

      if (numberValue < min || (isHyphen && min >= 0))
        event.preventDefault();
    }

    if (!onBeforeInput) return;

    onBeforeInput(event);
  }

  const onDecrementValue = () => {
    const inputValue = Number(innerRef.current?.getAttribute('value'));

    if (isNaN(inputValue)) return;

    let newValue = inputValue - step;
    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    innerRef.current?.setAttribute('value', newValue.toString());

    dispatchChangeEvent(newValue);
  }

  const onIncrementValue = () => {
    const inputValue = Number(innerRef.current?.getAttribute('value'));

    if (isNaN(inputValue)) return;

    let newValue = inputValue + step;
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    innerRef.current?.setAttribute('value', newValue.toString());

    dispatchChangeEvent(newValue);
  }

  const dispatchChangeEvent = (newValue: number) => {
    if (!props.onChange) return;

    const event = new Event('change', { bubbles: true });
    innerRef.current?.dispatchEvent(event);
    (event.target as any).value = newValue;
    props.onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    innerRef.current?.setAttribute('value', event.target.value);

    if (!props.onChange) return;

    props.onChange(event);
  }

  return (
    <TextInput
      autoComplete='off'
      onBeforeInput={onBeforeInputHandler}
      ref={mergeRefs(innerRef, ref)}
      spellCheck={false}
      suffixInput={
        <React.Fragment>
          {suffixInput}
          {
            showControls ? (
              <NumberInputSuffixControls
                onDecrementValue={onDecrementValue}
                onIncrementValue={onIncrementValue}
              />
            ) : null
          }
        </React.Fragment>
      }
      {...props}
      onChange={onInputChange}
    />
  )
})