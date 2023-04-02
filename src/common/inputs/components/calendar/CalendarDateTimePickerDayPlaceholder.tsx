import React from 'react'

import { CalendarDateTimePickerDayPlaceholderProps } from './calendar.types';

export const CalendarDateTimePickerDayPlaceholder: React.FC<CalendarDateTimePickerDayPlaceholderProps> = ({
  children
}) => {
  return (
    <div
      className='h-9 w-9'
    >
      {children}
    </div>
  )
}
