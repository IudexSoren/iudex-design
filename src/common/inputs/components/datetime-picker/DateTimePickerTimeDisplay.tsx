import React from 'react'
import classNames from 'classnames'

import { Typography } from '@common/typographies'
import { Button } from '@common/buttons'
import { TimeIcon } from '@common/icons'
import { DateTimePickerTimeDisplayProps } from './datetime-picker.types'

export const DateTimePickerTimeDisplay: React.FC<DateTimePickerTimeDisplayProps> = ({
  date,
  handleIsSelectingTime,
  isSelectingTime
}) => {

  const buttonClassName = classNames(
    'btn-primary font-normal h-1/2 md:h-auto justify-start !p-3 md:!pl-5 !pr-0 w-full',
    {
      'bg-primary-focus border-primary-focus': isSelectingTime
    }
  )

  return (
    <Button
      className={buttonClassName}
      onClick={handleIsSelectingTime}
    >
      <Typography
        className='flex gap-2 items-center transition-all'
        level='div'
        size={false ? 'xl' : 'md'}
      >
        <TimeIcon size={false ? '20' : '16'} />
        <div className='flex gap-1'>
          <span>
            {date.hour > 9 ? date.hour : `0${date.hour}`}
          </span>
          <span>:</span>
          <span>
            {date.minute > 9 ? date.minute : `0${date.minute}`}
          </span>
        </div>
      </Typography>
    </Button>
  )
}