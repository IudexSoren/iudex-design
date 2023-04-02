import React from 'react'
import classNames from 'classnames'

import { Typography } from '@common/typographies'
import { Button } from '@common/buttons'
import { CalendarIcon } from '@common/icons'
import { DateTimePickerDateDisplayProps } from './datetime-picker.types'

export const DateTimePickerDateDisplay: React.FC<DateTimePickerDateDisplayProps> = ({
  date,
  handleIsSelectingDate,
  isSelectingDate,
}) => {

  const buttonClassName = classNames(
    'btn-primary font-normal h-1/2 md:h-auto justify-start !p-3 md:!pl-5 !pr-0 w-full',
    {
      'bg-primary-focus border-primary-focus': isSelectingDate
    }
  )

  return (
    <Button
      className={buttonClassName}
      onClick={handleIsSelectingDate}
    >
      <Typography
        className='flex gap-2 items-center transition-all'
        level='div'
      >
        <CalendarIcon />
        <span>
          {
            date.monthShort.replace('.', '')
          }
        </span>
        <div>
          <span>
            {date.day}
          </span>
          <span>,</span>
        </div>
        <span>
          {date.year}
        </span>
      </Typography>
    </Button>
  )
}