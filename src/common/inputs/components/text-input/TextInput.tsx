import React from 'react'
import classNames from 'classnames'

import { mergeRefs } from '@common/other/merge-refs'

import { UnstyledTextInput } from './UnstyledTextInput'
import { BaseInput } from '../base'

import { TextInputProps } from './text-input.types'

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({
  className,
  errorMessage,
  inputClassName,
  inputSize = 'md',
  labelContent,
  lightBackground = false,
  onBlur,
  onFocus,
  prefixInput,
  suffixInput,
  ...props
}, ref) => {

  const [hasFocus, setHasFocus] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);

    if (onFocus) {
      onFocus(event);
    }
  }

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);

    if (onBlur) {
      onBlur(event);
    }
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
      disabled={props.disabled}
      errorMessage={errorMessage}
      hasFocus={hasFocus}
      id={props.id}
      inputRef={inputRef}
      inputSize={inputSize}
      labelContent={labelContent}
      lightBackground={lightBackground}
      prefixInput={prefixInput}
      suffixInput={suffixInput}
    >
      <UnstyledTextInput
        {...props}
        className={inputInternalClassName}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        ref={mergeRefs(inputRef, ref)}
      />
    </BaseInput>
  )
})
