import React from 'react'
import { DateTimePickerDateDisplay } from './DateTimePickerDateDisplay'
import { DateTimePickerHourDisplay } from './DateTimePickerHourDisplay'

export const DateTimePickerDisplay: React.FC = () => {
  return (
    <div
      className='bg-primary flex flex-col p-3 md:px-5 text-base-100'
    >
      <DateTimePickerDateDisplay />
      <DateTimePickerHourDisplay />
    </div>
  )
}