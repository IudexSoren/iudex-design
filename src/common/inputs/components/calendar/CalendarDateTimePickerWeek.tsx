import React from 'react'

import { CalendarDateTimePickerWeekProps } from './calendar.types'

export const CalendarDateTimePickerWeek: React.FC<CalendarDateTimePickerWeekProps> = ({
  days
}) => {

  return (
    <div
      className='flex'
    >
      {days}
    </div>
  )

}