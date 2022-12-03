import React from 'react'
import { Typography } from '@common/typographies'

export const DateTimePickerDateDisplay = () => {
  return (
    <Typography
      className='flex gap-1 font-bold'
      level='div'
      size='xl'
    >
      <span>
        Dec
      </span>
      <div>
        <span>
          2
        </span>
        <span>,</span>
      </div>
      <span>
        2022
      </span>
    </Typography>
  )
}