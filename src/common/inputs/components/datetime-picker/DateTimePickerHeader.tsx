import React from 'react'
import { Button } from '@common/buttons'
import { DropdownSelect } from '../DropdownSelect'
import { createNumbersRange } from '@common/other/helpers'
import { ChevronLeftIcon, ChevronRightIcon } from '@common/icons'
import { DateTimePickerHeaderProps, DropdownSelectOptionProps } from '@common/inputs/types'

export const DateTimePickerHeader: React.FC<DateTimePickerHeaderProps> = ({
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
    label: year.toString(),
    value: year
  })), []);
  const months = React.useMemo<DropdownSelectOptionProps[]>(() => [
    {
      label: 'January',
      value: 0
    },
    {
      label: 'February',
      value: 1
    },
    {
      label: 'March',
      value: 2
    },
    {
      label: 'April',
      value: 3
    },
    {
      label: 'May',
      value: 4
    },
    {
      label: 'June',
      value: 5
    },
    {
      label: 'July',
      value: 6
    },
    {
      label: 'August',
      value: 7
    },
    {
      label: 'September',
      value: 8
    },
    {
      label: 'October',
      value: 9
    },
    {
      label: 'November',
      value: 10
    },
    {
      label: 'December',
      value: 11
    }
  ], []);

  return (
    <div className='flex'>
      <Button
        className='ml-[10px] px-1 !py-1'
        disabled={prevMonthButtonDisabled}
        onClick={decreaseMonth}
      >
        <ChevronLeftIcon />
      </Button>
      <div className='flex'>
        <DropdownSelect
          inputSize='sm'
          onChange={({ value }) => changeYear(value)}
          options={years}
          value={years.find(year => year.value === date.getFullYear())?.value}
        />
        <DropdownSelect
          inputSize='sm'
          onChange={({ value }) => changeMonth(value)}
          options={months}
          value={months[date.getMonth()].value}
        />
      </div>
      <Button
        className='mr-[10px] px-1 !py-1'
        disabled={nextMonthButtonDisabled}
        onClick={increaseMonth}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
