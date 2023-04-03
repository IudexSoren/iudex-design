import React from 'react'
import { RecoilRoot } from 'recoil'
import { DateTime, Info } from 'luxon'
import { useClickOutside } from '@mantine/hooks'
import classNames from 'classnames'

import { DateTimePickerDisplay } from './DateTimePickerDisplay'
import { CalendarDateTimePickerDay, CalendarDateTimePickerDayPlaceholder, CalendarDateTimePickerWeek, CalendarDateTimePickerDayHeader } from '../calendar/datetime-picker'

import { Button } from '@common/buttons'
import { DropdownSelect, NumberInput, TextInput, TimePicker } from '@common/inputs'
import { Typography } from '@common/typographies'

import { DateTimePickerProps } from './datetime-picker.types'

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@common/icons'
import { useCalendar } from '@common/hooks'

const WEEKS_TO_SHOW = 6;
const DAYS_PER_WEEK = 7;

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value
}) => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isSelectingDate, setIsSelectingDate] = React.useState<boolean>(true);
  const [isSelectingTime, setIsSelectingTime] = React.useState<boolean>(false);

  const [date, setDate] = React.useState<DateTime>(DateTime.local());

  const [selectedMinutes, setSelectedMinutes] = React.useState<number>(date.minute);
  const [selectedHour, setSelectedHour] = React.useState<number>(date.hour);
  const [selectedDay, setSelectedDay] = React.useState<number>(date.day);
  const [selectedMonth, setSelectedMonth] = React.useState<number>(date.month);
  const [selectedYear, setSelectedYear] = React.useState<number>(date.year);

  const [weekdaysName, setWeekdaysName] = React.useState<string[]>([]);

  const { monthsList, renderDaysHeader, renderMonthWeeks } = useCalendar({
    month: selectedMonth - 1,
    renderDay: (index, monthDay) => (
      <CalendarDateTimePickerDay
        key={index}
        monthDay={monthDay.toString()}
        onClick={() => alert(monthDay)}
      />
    ),
    renderDayHeader: (index, dayName) => (
      <CalendarDateTimePickerDayHeader
        dayName={dayName}
        key={index}
      />
    ),
    renderDayPlaceholder: (index) => (
      <CalendarDateTimePickerDayPlaceholder
        key={index}
      />
    ),
    renderWeek: (index, days) => (
      <CalendarDateTimePickerWeek
        days={days}
        key={index}
      />
    ),
    year: selectedYear
  })

  React.useEffect(() => {
    console.table({
      time: date.hour + ':' + date.minute,
      day: date.day,
      month: date.month,
      year: date.year
    });
  }, [date])

  React.useEffect(() => {
    setWeekdaysName(Info.weekdays('narrow'));
  }, []);

  React.useEffect(() => {
    if (date.year === selectedYear) return;

    setDate(date.set({ year: selectedYear }));
  }, [selectedYear]);

  React.useEffect(() => {
    if (date.month === selectedMonth) return;

    setDate(date.set({ month: selectedMonth }));
  }, [selectedMonth]);

  React.useEffect(() => {
    if (date.day === selectedDay) return;

    setDate(date.set({ day: selectedDay }));
  }, [selectedDay]);

  React.useEffect(() => {
    if (date.hour === selectedHour) return;

    setDate(date.set({ hour: selectedHour }));
  }, [selectedHour]);

  React.useEffect(() => {
    if (date.minute === selectedMinutes) return;

    setDate(date.set({ minute: selectedMinutes }));
  }, [selectedMinutes]);

  const handleClickContainer = () => {
    // if (disabled || readonly) return;

    setIsOpen(!isOpen);
  }

  const containerRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleIsSelectingDate = () => {
    setIsSelectingTime(false);
    setIsSelectingDate(true);
  }

  const handleIsSelectingTime = () => {
    setIsSelectingDate(false);
    setIsSelectingTime(true);
  }

  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setSelectedYear(Number(value));
  }

  const handleSelectChangeMonth = (event: DropdownSelectEvent) => {
    const { value } = event;
    setSelectedMonth(value);
  }

  const handleChangeMonth = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
  }

  const handleChangeDay = (day: number) => {
    setSelectedDay(day);
  }

  const handleChangeHour = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    let hour = Number(value);
    hour = hour === 24 ? 0 : hour === -1 ? 23 : hour;

    setSelectedHour(hour);
  }

  const handleChangeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    let minutes = Number(value);
    minutes = minutes === 60 ? 0 : minutes === -1 ? 59 : minutes;

    setSelectedMinutes(minutes);
  }

  const containerClassName = classNames(
    "cursor-pointer",
    // className,
  )

  const dateTimePickerInputClassName = classNames(
    'cursor-pointer',
    // inputClassName
  )

  const formatDate = (dateToFormat: DateTime) => {
    return `${formatDateChunk(dateToFormat.day)}-${formatDateChunk(dateToFormat.month)}-${dateToFormat.year} ${formatDateChunk(dateToFormat.hour)}:${formatDateChunk(dateToFormat.minute)}`;
  }

  const formatDateChunk = (value: number) => {
    return value > 9 ? value.toString() : `0${value}`;
  }

  return (
    <RecoilRoot>
      <div
        className='relative'
        ref={containerRef}
      >
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
            value={formatDate(date)}
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
                          Fecha
                        </Typography>
                        <div
                          className='gap-2 grid grid-cols-2 w-64'
                        >
                          <NumberInput
                            className='border-t-0 border-x-0'
                            inputClassName='!px-0'
                            inputSize='sm'
                            integer
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
                            onClick={() => handleChangeMonth(date.month - 1)}
                          >
                            <ChevronLeftIcon />
                          </Button>
                          <Button
                            className='btn-ghost flex-grow'
                          >
                            Hoy
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
                            {renderDaysHeader()}
                          </div>
                          <div>
                            {renderMonthWeeks()}
                          </div>
                        </div>
                      </div>
                    ) : null
                  }

                  {
                    isSelectingTime ? (
                      <div className='h-[358px] m-auto w-64'>
                        <TimePicker
                          className='border-t-0 border-x-0'
                          inputClassName='!px-0'
                          labelContent={
                            <Typography
                              className='mb-2'
                              level='div'
                              size='lg'
                            >
                              Hora
                            </Typography>
                          }
                        />
                        {/* <Typography
                          className='mb-2'
                          level='div'
                          size='lg'
                        >
                          Hora
                        </Typography>
                        <div className='flex gap-2'>
                          <NumberInput
                            className='border-t-0 border-x-0 w-28'
                            inputClassName='!px-0'
                            inputSize='sm'
                            max={24}
                            min={-1}
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
                            max={60}
                            min={-1}
                            name='minutes'
                            onChange={handleChangeMinutes}
                            value={selectedMinutes}
                          />
                        </div> */}
                      </div>
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
        </React.Fragment>
      </div>
    </RecoilRoot>
  )
}