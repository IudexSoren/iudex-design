import React from 'react'

import { DateTimePickerDisplayProps } from './datetime-picker.types'
import { DateTimePickerDateDisplay } from './DateTimePickerDateDisplay'
import { DateTimePickerTimeDisplay } from './DateTimePickerTimeDisplay'
import { Typography } from '@common/typographies'

export const DateTimePickerDisplay: React.FC<DateTimePickerDisplayProps> = ({
  date,
  handleIsSelectingDate,
  handleIsSelectingTime,
  isSelectingDate,
  isSelectingTime,
}) => {

  return (
    <div
      className='bg-primary flex md:flex-col justify-between md:justify-start text-base-100 md:w-60'
    >
      <div className='md:flex flex-col flex-grow md:flex-grow-0 md:justify-center'>
        <Typography
          className='font-bold pl-3 md:!pl-5 py-3 md:pt-5 select-none uppercase'
          level='div'
          size='sm'
        >
          From
        </Typography>
        <div className='flex-grow md:flex-grow-0'>
          <DateTimePickerDateDisplay
            date={date}
            isSelectingDate={isSelectingDate}
            handleIsSelectingDate={handleIsSelectingDate}
          />
          <DateTimePickerTimeDisplay
            date={date}
            isSelectingTime={isSelectingTime}
            handleIsSelectingTime={handleIsSelectingTime}
          />
        </div>
      </div>
      <div className='flex flex-col flex-grow md:flex-grow-0 md:justify-center'>
        <Typography
          className='font-bold pl-3 md:!pl-5 py-3 md:pt-5 select-none uppercase'
          level='div'
          size='sm'
        >
          To
        </Typography>
        <div className='flex-grow md:flex-grow-0'>
          <DateTimePickerDateDisplay
            date={date}
            isSelectingDate={false}
            handleIsSelectingDate={handleIsSelectingDate}
          />
          <DateTimePickerTimeDisplay
            date={date}
            isSelectingTime={false}
            handleIsSelectingTime={handleIsSelectingTime}
          />
        </div>
      </div>
    </div>
  )
}