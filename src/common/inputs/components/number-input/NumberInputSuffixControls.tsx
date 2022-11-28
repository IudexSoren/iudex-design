import React from 'react'
import classNames from 'classnames'
import { AddIcon, SubtractIcon } from '@common/icons'
import { Button } from '@common/buttons'
import { NumberInputSuffixControlsProps } from '@common/inputs/types'

export const NumberInputSuffixControls: React.FC<NumberInputSuffixControlsProps> = ({
  onDecrementValue,
  onIncrementValue
}) => {

  const buttonClassName = classNames(
    'btn-sm h-full',
    {
      "bg-base-100 hover:bg-base-200 border-base-100 hover:!border-base-200": false,
      "bg-base-200 border-base-200 pointer-events-none": false
    }
  )

  return (
    <div className='flex h-full items-center'>
      <Button
        className={buttonClassName}
        onClick={onDecrementValue}
      >
        <SubtractIcon />
      </Button>
      <Button
        className={buttonClassName}
        onClick={onIncrementValue}
      >
        <AddIcon />
      </Button>
    </div>
  )
}