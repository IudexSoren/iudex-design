import React from 'react'
import classNames from 'classnames'

import { mergeRefs } from '@common/other/merge-refs'

import { NumberInputSuffixControls } from '.'

import { BaseInput } from '../base'
import { UnstyledNumberInput } from './UnstyledNumberInput'

import { NumberInputProps } from './number-input.types'

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  className,
  errorMessage,
  inputClassName,
  inputSize = 'md',
  integer = false,
  labelContent,
  max,
  min,
  onBeforeInput,
  showControls = true,
  step = 1,
  suffixInput,
  ...props
}, ref) => {

  const innerRef = React.useRef<HTMLInputElement>(null);

  const getInputValue = () => {
    return innerRef.current?.getAttribute('value') ?? '';
  }

  const onDecrementValue = () => {
    const inputValue = Number(getInputValue());

    if (isNaN(inputValue)) return;

    let newValue = inputValue - step;
    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    innerRef.current?.setAttribute('value', newValue.toString());

    dispatchChangeEvent(newValue);
  }

  const onIncrementValue = () => {
    const inputValue = Number(getInputValue());

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

  const inputInternalClassName = classNames(
    'bg-transparent border-0 flex-grow h-full input-md !outline-none px-3 w-full',
    {
      "cursor-not-allowed opacity-50": props.disabled
    },
    inputClassName
  )

  return (
    <BaseInput
      className={className}
      errorMessage={errorMessage}
      inputRef={innerRef}
      inputSize={inputSize}
      labelContent={labelContent}
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
    >
      <UnstyledNumberInput
        autoComplete='off'
        className={inputInternalClassName}
        ref={mergeRefs(innerRef, ref)}
        spellCheck={false}
        {...props}
        onChange={onInputChange}
      />
    </BaseInput>
    // <TextInput
    //   autoComplete='off'
    //   onBeforeInput={onBeforeInputHandler}
    //   ref={mergeRefs(innerRef, ref)}
    //   spellCheck={false}
    //   suffixInput={
    //     <React.Fragment>
    //       {suffixInput}
    //       {
    //         showControls ? (
    //           <NumberInputSuffixControls
    //             onDecrementValue={onDecrementValue}
    //             onIncrementValue={onIncrementValue}
    //           />
    //         ) : null
    //       }
    //     </React.Fragment>
    //   }
    //   {...props}
    //   onChange={onInputChange}
    // />
  )
})