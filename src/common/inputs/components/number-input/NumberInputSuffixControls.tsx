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
    'btn-sm h-1/2 p-1',
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
      >
        <AddIcon />
      </Button>
      <Button
        className={buttonClassName}
        onClick={onDecrementValue}
      >
        <SubtractIcon />
      </Button>
    </div>
  )
}