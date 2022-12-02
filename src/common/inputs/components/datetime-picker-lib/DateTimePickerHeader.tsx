import React from 'react'
import { Button } from '@common/buttons'
import { DropdownSelect } from '../DropdownSelect'
import { createNumbersRange } from '@common/other/helpers'
import { ChevronLeftIcon, ChevronRightIcon } from '@common/icons'
import { DateTimePickerLibHeaderProps, DropdownSelectOptionProps } from '@common/inputs/types'

export const DateTimePickerHeader: React.FC<DateTimePickerLibHeaderProps> = ({
  changeMonth,
  changeYear,
  customHeaderCount,
  date,
  decreaseMonth,
  decreaseYear,
  increaseMonth,
  increaseYear,
  monthDate,
  nextMonthButtonDisabled,
  nextYearButtonDisabled,
  prevMonthButtonDisabled,
  prevYearButtonDisabled
}) => {

  const years = React.useMemo<DropdownSelectOptionProps[]>(() => createNumbersRange(1990, new Date().getFullYear()).map(year => ({
    children: <div className='text-left'>{year}</div>,
    label: year.toString(),
    value: year
  })), []);

  const months = React.useMemo<DropdownSelectOptionProps[]>(() => [
    {
      children: <div className='text-left'>January</div>,
      label: 'January',
      value: 0
    },
    {
      children: <div className='text-left'>February</div>,
      label: 'February',
      value: 1
    },
    {
      children: <div className='text-left'>March</div>,
      label: 'March',
      value: 2
    },
    {
      children: <div className='text-left'>April</div>,
      label: 'April',
      value: 3
    },
    {
      children: <div className='text-left'>May</div>,
      label: 'May',
      value: 4
    },
    {
      children: <div className='text-left'>June</div>,
      label: 'June',
      value: 5
    },
    {
      children: <div className='text-left'>July</div>,
      label: 'July',
      value: 6
    },
    {
      children: <div className='text-left'>August</div>,
      label: 'August',
      value: 7
    },
    {
      children: <div className='text-left'>September</div>,
      label: 'September',
      value: 8
    },
    {
      children: <div className='text-left'>October</div>,
      label: 'October',
      value: 9
    },
    {
      children: <div className='text-left'>November</div>,
      label: 'November',
      value: 10
    },
    {
      children: <div className='text-left'>December</div>,
      label: 'December',
      value: 11
    }
  ], []);

  return (
    <div className='flex flex-col gap-[5px] mb-[5px]'>

      <div className='flex'>
        <Button
          className='ml-[5px] px-1 !py-1'
          disabled={prevMonthButtonDisabled}
          onClick={decreaseMonth}
        >
          <ChevronLeftIcon />
        </Button>
        <div className='flex'>
          <DropdownSelect
            className='w-24'
            inputSize='sm'
            lightBackground
            onChange={({ value }) => changeYear(value)}
            options={years}
            value={years.find(year => year.value === date.getFullYear())?.value}
          />
          <DropdownSelect
            className='w-36'
            inputSize='sm'
            lightBackground
            onChange={({ value }) => changeMonth(value)}
            options={months}
            value={months[date.getMonth()].value}
          />
        </div>
        <Button
          className='mr-[5px] px-1 !py-1'
          disabled={nextMonthButtonDisabled}
          onClick={increaseMonth}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}
