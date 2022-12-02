import React from 'react'
import { TextInput } from './TextInput'
import { Typography } from '@common/typographies'

export const DateTimePicker: React.FC = () => {
  return (
    <div className='relative'>
      <TextInput

      />
      <div
        className='absolute border border-t-0 border-zinc-300 flex flex-col md:flex-row shadow-md top-full z-20'
        tabIndex={1}
      >
        <div
          className='bg-primary flex flex-col items-center p-3 text-base-100'
        >
          <Typography
            className='flex gap-1 font-bold'
            level='p'
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
          <Typography
            level='p'
          >
            12:00
          </Typography>
        </div>
        <div
          className='bg-base-200 p-3'
        >

        </div>
      </div>
    </div>
  )
}