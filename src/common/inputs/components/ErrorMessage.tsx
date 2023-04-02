import React, { AllHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames';

export interface ErrorMessageProps extends AllHTMLAttributes<HTMLDivElement> {
  children?: ReactElement | string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  ...props
}) => {

  if (!props.children) return null;

  const errorMessageClassName = classNames(
    'font-medium text-sm text-error',
    props.className
  )

  return (
    <div
      className={errorMessageClassName}
    >
      {props.children}
    </div>
  )
}
