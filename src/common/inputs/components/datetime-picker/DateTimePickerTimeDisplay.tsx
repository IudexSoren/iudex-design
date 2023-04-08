import React from 'react'
import classNames from 'classnames'

import { Typography } from '@common/typographies'
import { Button } from '@common/buttons'
import { TimeIcon } from '@common/icons'
import { DateTimePickerTimeDisplayProps } from './datetime-picker.types'

export const DateTimePickerTimeDisplay: React.FC<DateTimePickerTimeDisplayProps> = ({
  date,
  handleIsSelectingTime,
  isSelectingTime,
  isTo = false,
}) => {

  const buttonClassName = classNames(
    'btn-primary font-normal h-1/2 md:h-auto justify-start !py-3 md:!pl-5 w-full',
    {
      'bg-primary-focus border-primary-focus': isSelectingTime,
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
      onClick={handleIsSelectingTime}
    >
      <Typography
        className={typographyClassName}
        level='div'
      >
        <TimeIcon className={iconClassName} />
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