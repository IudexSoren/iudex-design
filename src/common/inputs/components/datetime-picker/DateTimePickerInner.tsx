import React from 'react'
import { useRecoilState } from 'recoil';
import classNames from 'classnames';

import { Button } from '@common/buttons';
import { DropdownSelect, NumberInput, TextInput } from '@common/inputs';
import { Typography } from '@common/typographies';

import { DateTimePickerInnerProps } from './datetime-picker.types';
import { DateTimePickerDisplay } from './DateTimePickerDisplay';

import { INPUTS_datetime } from './state';

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@common/icons';

export const DateTimePickerInner: React.FC<DateTimePickerInnerProps> = ({
  handleClickContainer,
  isOpen,
}) => {

  const [datetimeState, setDateTimeState] = useRecoilState(INPUTS_datetime);

  const containerClassName = classNames(
    "cursor-pointer",
    // className,
  )

  const dateTimePickerInputClassName = classNames(
    'cursor-pointer',
    // inputClassName
  )

  return (
    <div>
      <React.Fragment>
        <TextInput
          className={containerClassName}
          inputClassName={dateTimePickerInputClassName}
          onClick={handleClickContainer}
          suffixInput={
            <div className='flex h-full items-center'>
              <div className='px-2'>
                <CalendarIcon />
              </div>
            </div>
          }
          readOnly
        />
        {
          isOpen || true ? (
            <div
              className='absolute border border-t-0 border-zinc-300 flex flex-col md:flex-row shadow-md top-full z-20'
              tabIndex={1}
            >
              <DateTimePickerDisplay
                date={date}
                isSelectingDate={isSelectingDate}
                isSelectingTime={isSelectingTime}
                handleIsSelectingDate={handleIsSelectingDate}
                handleIsSelectingTime={handleIsSelectingTime}
              />
              <div
                className='bg-base-200 flex gap-3 p-3 md:px-5'
              >
                {
                  isSelectingDate ? (
                    <div className='mx-auto w-64'>
                      <Typography
                        className='mb-2'
                        level='div'
                        size='lg'
                      >
                        Date
                      </Typography>
                      <div
                        className='gap-2 grid grid-cols-2 w-64'
                      >
                        <NumberInput
                          className='border-t-0 border-x-0'
                          inputClassName='!px-0'
                          inputSize='sm'

                          min={0}
                          name='year'
                          onChange={handleChangeYear}
                          value={date.year}
                        />
                        <DropdownSelect
                          className='border-t-0 border-x-0'
                          inputClassName='!px-0'
                          inputSize='sm'

                          name='month'
                          onChange={handleSelectChangeMonth}
                          options={monthsList}
                          value={date.month}
                        />
                      </div>
                      <div className='flex justify-between my-1'>
                        <Button
                          className='btn-ghost px-2 !py-2'
                          onClick={() => handleChangeMonth(date.month - 2)}
                        >
                          <ChevronLeftIcon />
                        </Button>
                        <Button
                          className='btn-ghost flex-grow'
                        >
                          Today
                        </Button>
                        <Button
                          className='btn-ghost px-2 !py-2'
                          onClick={() => handleChangeMonth(date.month + 1)}
                        >
                          <ChevronRightIcon />
                        </Button>
                      </div>
                      <div>
                        <div
                          className='flex select-none'
                        >
                          {renderWeekdaysName()}
                        </div>
                        <div>
                          {renderWeeks()}
                        </div>
                      </div>
                    </div>
                  ) : null
                }

                {
                  isSelectingTime ? (
                    <div className='h-[358px] mx-auto w-64'>
                      <Typography
                        className='mb-2'
                        level='div'
                        size='lg'
                      >
                        Time
                      </Typography>
                      <div className='flex gap-2'>
                        <NumberInput
                          className='border-t-0 border-x-0 w-28'
                          inputClassName='!px-0'
                          inputSize='sm'
                          max={23}
                          min={0}
                          name='hour'
                          onChange={handleChangeHour}
                          value={selectedHour}
                        />
                        <div
                          className='font-bold text-center text-xl w-4'
                        >
                          :
                        </div>
                        <NumberInput
                          className='border-t-0 border-x-0 w-28'
                          inputClassName='!px-0'
                          inputSize='sm'
                          max={59}
                          min={0}
                          name='minutes'
                          onChange={handleChangeMinutes}
                          value={selectedMinutes}
                        />
                      </div>
                    </div>
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
      </React.Fragment>
    </div>
  )
}