import React from 'react'
import classNames from 'classnames'
import { mergeRefs } from '@common/other/merge-refs'
import { CheckboxProps } from '../types'
import { ErrorMessage } from './ErrorMessage'
import { FocusElement } from '@common/other/components/FocusElement'

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
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

  const checkboxRef = React.useRef<HTMLInputElement>(null);

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
    'label',
    {
      'cursor-pointer': contentClickable,
      'opacity-50': props.disabled
    },
    containerClassName
  )

  const checkboxClassName = classNames(
    'border-2 border-secondary checkbox checkbox-sm checkbox-secondary !outline-none rounded-full',
    className
  )

  const focusElementClassName = classNames(
    '!-inset-[3px] rounded-full'
  );

  const AsComponent = contentClickable ? 'label' : 'div';

  return (
    <div>
      <AsComponent className={labelContainerClassName}>
        {labelContent}
        <div className='flex items-center relative'>
          <input
            checked
            className={checkboxClassName}
            onBlur={onBlurInput}
            onFocus={onFocusInput}
            ref={mergeRefs(checkboxRef, ref)}
            type="checkbox"
            {...props}
          />
          <FocusElement
            className={focusElementClassName}
            hasFocus={hasFocus}
          />
        </div>
      </AsComponent>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </div>
  )
})