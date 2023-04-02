import React from 'react'

import { BaseInputProps } from './base.types'
import { FocusElement } from '@common/other/components/FocusElement'
import classNames from 'classnames'
import { ErrorMessage } from '@common/inputs'

export const BaseInput: React.FC<BaseInputProps> = ({
  children,
  className,
  disabled,
  errorMessage,
  handleClickContainer,
  hasFocus = false,
  id,
  inputSize,
  labelContent,
  lightBackground,
  prefixInput,
  suffixInput
}) => {

  const inputContainerClassName = classNames(
    'border-zinc-300 flex input p-0 relative',
    className,
    {
      "border-zinc-200": disabled
    },
    {
      'bg-base-100': lightBackground,
      'bg-base-200': !lightBackground
    },
    {
      'input-xs': inputSize === 'xs',
      'input-sm': inputSize === 'sm',
      'input-md': inputSize === 'md',
      'input-lg': inputSize === 'lg',
    }
  )

  const labelContainerClassName = classNames(
    'duration-300 mb-1 px-0 relative transition-all z-10',
    {
      'opacity-50': disabled
    }
  )

  const sideComponentsClassName = classNames(
    'flex items-center justify-center relative',
    {
      '!bg-base-200 cursor-not-allowed opacity-50': disabled
    }
  )

  const borderClasses = className?.split(' ').filter(cl => cl.includes('border') || cl.includes('rounded'));
  const focusElementClassName = classNames(
    {
      "border-b-zinc-300": !hasFocus && !errorMessage,
      "!border-error": !!errorMessage,
    },
    borderClasses
  )

  return (
    <div>
      {
        labelContent && (
          <div
            className={labelContainerClassName}
          >
            <label htmlFor={id}>{labelContent}</label>
          </div>
        )
      }
      <div
        className={inputContainerClassName}
        onClick={handleClickContainer}
      >
        {
          !!prefixInput &&
          (
            <div
              className={sideComponentsClassName}
            >
              {prefixInput}
            </div>
          )
        }
        {children}
        {
          !!suffixInput &&
          (
            <div
              className={sideComponentsClassName}
            >
              {suffixInput}
            </div>
          )
        }
        <FocusElement
          className={focusElementClassName}
          hasFocus={hasFocus}
        />
      </div>
      {
        typeof errorMessage !== 'boolean' ?
          (
            <ErrorMessage className='mt-1'>
              {errorMessage}
            </ErrorMessage>
          ) :
          null
      }
    </div>
  )
}