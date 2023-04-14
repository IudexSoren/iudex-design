import React from 'react'
import classNames from 'classnames'
import { mergeRefs } from '@common/other/merge-refs'
import { FocusElement } from '@common/other/components/FocusElement'
import { ButtonProps } from '../types'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  onBlur,
  onFocus,
  onMouseDown,
  ...props
}, ref) => {

  const [hasFocus, setHasFocus] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const focusElementRef = React.useRef<HTMLDivElement>(null);

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

  const onMouseDownOnButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (focusElementRef.current) {
      const x = event.clientX - focusElementRef.current.offsetLeft;
      const y = event.clientY - focusElementRef.current.offsetTop;
      const ripples = document.createElement('span');
      ripples.classList.add(
        'absolute',
        'animate-ripple',
        'bg-black/20',
        'duration-400',
        'origin-center',
        'pointer-event-none',
        'rounded-full',
        'inset-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
      );

      // ripples.style.left = x + 'px';
      // ripples.style.top = y + 'px';

      focusElementRef.current?.appendChild(ripples);

      setTimeout(() => {
        ripples.remove();
      }, 700);
    }

    if (onMouseDown) {
      onMouseDown(event);
    }
  }

  const className = classNames(
    "animate-none btn h-auto min-h-fit focus:outline-0 py-0 relative active:!scale-100 focus:!scale-100",
    props.className
  );

  const borderClasses = className?.split(' ').filter(cl => cl.includes('border') || cl.includes('rounded'));
  const focusElementClassName = classNames(
    'inset-0',
    borderClasses
  );

  return (
    <button
      {...props}
      className={className}
      onBlur={onBlurButton}
      onFocus={onFocusButton}
      onMouseDown={onMouseDownOnButton}
      ref={mergeRefs<HTMLButtonElement>(ref, buttonRef)}
    >
      {props.children}
      <FocusElement
        className={focusElementClassName}
        hasFocus={hasFocus}
        ref={focusElementRef}
      />
    </button>
  );
})
