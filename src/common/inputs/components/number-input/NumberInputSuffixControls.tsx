import React from 'react'
import classNames from 'classnames'

import { Button } from '@common/buttons'

import { NumberInputSuffixControlsProps } from './number-input.types'

import { ChevronDownIcon, ChevronUpIcon } from '@common/icons'

export const NumberInputSuffixControls: React.FC<NumberInputSuffixControlsProps> = ({
  onDecrementValue,
  onIncrementValue
}) => {

  const buttonClassName = classNames(
    'btn-sm btn-ghost !h-1/2 p-1',
    {
      "bg-base-100 hover:bg-base-200 border-base-100 hover:!border-base-200": false,
      "bg-base-200 border-base-200 pointer-events-none": false
    }
  )

  return (
    <div className='flex flex-col h-full items-center'>
      <Button
        className={buttonClassName}
        onClick={onIncrementValue}
        tabIndex={-1}
      >
        <ChevronUpIcon />
      </Button>
      <Button
        className={buttonClassName}
        onClick={onDecrementValue}
        tabIndex={-1}
      >
        <ChevronDownIcon />
      </Button>
    </div>
  )
}