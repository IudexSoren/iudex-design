import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { mergeRefs } from '@common/other/merge-refs'
import { FocusElement } from '@common/other/components/FocusElement'
import { ButtonProps } from '../types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  onBlur,
  onFocus,
  ...props
}, ref) => {

  const [hasFocus, setHasFocus] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const onBlurButton = (event: React.FocusEvent<HTMLButtonElement>) => {
    setHasFocus(false);

    if (onBlur) {
      onBlur(event);
    }
  }

  const onFocusButton = (event: React.FocusEvent<HTMLButtonElement>) => {
    setHasFocus(true);

    if (onFocus) {
      onFocus(event);
    }
  }

  const className = classNames(
    "btn h-auto min-h-fit focus:outline-none py-0 relative",
    props.className
  );

  const borderClasses = className?.split(' ').filter(cl => cl.includes('border') || cl.includes('rounded'));
  const focusElementClassName = classNames(
    borderClasses
  );

  return (
    <button
      {...props}
      className={className}
      onBlur={onBlurButton}
      onFocus={onFocusButton}
      ref={mergeRefs<HTMLButtonElement>(ref, buttonRef)}
    >
      {props.children}
      <FocusElement
        className={focusElementClassName}
        hasFocus={hasFocus}
      />
    </button>
  );
})
