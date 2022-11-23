import React from 'react'
import classNames from 'classnames'

export interface FocusElementProps {
  className?: string,
  hasFocus: boolean
}

export const FocusElement = React.forwardRef<HTMLDivElement, FocusElementProps>(({
  className,
  hasFocus = false
}, ref) => {

  const focusElementClassName = classNames(
    'absolute bg-transparent border-2 border-transparent -inset-px overflow-hidden pointer-events-none transition',
    {
      '!border-primary': hasFocus
    },
    className,
  )

  return (
    <div
      className={focusElementClassName}
      ref={ref}
    />
  )
});
