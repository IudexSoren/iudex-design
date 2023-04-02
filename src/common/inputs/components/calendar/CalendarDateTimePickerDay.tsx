import React from 'react'
import classNames from 'classnames'

import { Button } from '@common/buttons'

import { CalendarDateTimePickerDayPlaceholder } from './CalendarDateTimePickerDayPlaceholder'

import { CalendarDateTimePickerDayProps } from './calendar.types'

export const CalendarDateTimePickerDay: React.FC<CalendarDateTimePickerDayProps> = ({
  monthDay,
  onClick
}) => {

  const dayClassName = classNames(
    'font-medium h-full !p-2 rounded-sm w-full',
    {
      // 'btn-ghost': monthDay !== date.day,
      // 'btn-primary': monthDay === date.day,
      '!btn-disabled': false
    }
  )

  return (
    <CalendarDateTimePickerDayPlaceholder>
      <Button
        className={dayClassName}
        onClick={onClick}
      >
        {monthDay}
      </Button>
    </CalendarDateTimePickerDayPlaceholder>
  )

}