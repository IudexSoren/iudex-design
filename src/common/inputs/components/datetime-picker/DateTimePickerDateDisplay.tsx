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
  isTo = false
}) => {

  const buttonClassName = classNames(
    'btn-primary font-normal h-1/2 md:h-auto justify-start !py-3 md:!pl-5 w-full',
    {
      'bg-primary-focus border-primary-focus': isSelectingDate,
      'pl-0 pr-3 md:pr-0': isTo,
      'pl-3 !pr-0': !isTo
    }
  )

  const typographyClassName = classNames(
    'flex gap-2 items-center transition-all w-full',
    {
      'justify-end md:justify-start': isTo
    }
  )

  const iconClassName = classNames(
    {
      'order-last md:order-none': isTo
    }
  )

  return (
    <Button
      className={buttonClassName}
      onClick={handleIsSelectingDate}
    >
      <Typography
        className={typographyClassName}
        level='div'
      >
        <CalendarIcon className={iconClassName} />
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