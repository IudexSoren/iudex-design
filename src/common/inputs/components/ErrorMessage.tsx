import React from 'react'
import classNames from 'classnames';
import { ErrorMessageProps } from '../types';

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
