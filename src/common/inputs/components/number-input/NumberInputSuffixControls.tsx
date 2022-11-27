import React from 'react'
import classNames from 'classnames'
import { AddIcon, SubtractIcon } from '@common/icons'
import { Button } from '@common/buttons'

export const NumberInputSuffixControls: React.FC = () => {

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
      >
        <SubtractIcon />
      </Button>
      <Button
        className={buttonClassName}
      >
        <AddIcon />
      </Button>
    </div>
  )
}