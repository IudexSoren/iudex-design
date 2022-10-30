import React from 'react'
import classNames from 'classnames'

export interface FocusElementProps {
  className?: string,
  hasFocus: boolean
}

export const FocusElement: React.FC<FocusElementProps> = ({
  className,
  hasFocus = false
}) => {

  const focusElementClassName = classNames(
    'absolute bg-transparent border-2 border-transparent -inset-px pointer-events-none transition',
    {
      '!border-primary': hasFocus
    },
    className,
  )

  return (
    <div
      className={focusElementClassName}
    />
  )
}
