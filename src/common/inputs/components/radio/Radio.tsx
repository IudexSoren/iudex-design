import React from 'react'
import classNames from 'classnames'

import { mergeRefs } from '@common/other/merge-refs'

import { ErrorMessage } from '../ErrorMessage'
import { FocusElement } from '@common/other/components/FocusElement'

import { RadioProps } from './radio.types'

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  className,
  containerClassName,
  contentClickable = true,
  errorMessage,
  labelContent,
  onFocus,
  onBlur,
  ...props
}, ref) => {

  const [hasFocus, setHasFocus] = React.useState(false);

  const radioRef = React.useRef<HTMLInputElement>(null);

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

  const labelContainerClassName = classNames(
    'label p-0',
    {
      'cursor-pointer': contentClickable,
      'opacity-50': props.disabled
    },
    containerClassName
  )

  const radioClassName = classNames(
    'border-2 border-secondary radio radio-sm radio-secondary !outline-none',
    className
  )

  const focusElementClassName = classNames(
    '!-inset-[3px] rounded-full',
  )

  const AsComponent = contentClickable ? 'label' : 'div';

  return (
    <AsComponent>
      <div className={labelContainerClassName}>

        {labelContent}
        <div className='flex items-center relative'>
          <input
            checked
            className={radioClassName}
            onBlur={onBlurInput}
            onFocus={onFocusInput}
            ref={mergeRefs(radioRef, ref)}
            type="radio"
            {...props}
          />
          <FocusElement
            className={focusElementClassName}
            hasFocus={hasFocus}
          />
        </div>
      </div>
      {
        typeof errorMessage !== 'boolean' ?
          (
            <ErrorMessage
              className='mt-1'
            >
              {errorMessage}
            </ErrorMessage>
          ) :
          null
      }
    </AsComponent>
  )
})