import React from 'react'

import { CalendarDateTimePickerDayHeaderProps } from './calendar.types'

export const CalendarDateTimePickerDayHeader: React.FC<CalendarDateTimePickerDayHeaderProps> = ({
  dayName
}) => {

  return (
    <div
      className='capitalize flex justify-center font-medium items-center py-1 px-2 w-9'
    >
      {dayName}
    </div>
  )
}
