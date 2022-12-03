import React from 'react'
import { DateTime, Info } from 'luxon'
import { Button } from '@common/buttons'
import { TextInput } from './TextInput'
import { DateTimePickerDisplay } from './datetime-picker'

const WEEKS_TO_SHOW = 6;
const DAYS_PER_WEEK = 7;

export const DateTimePicker: React.FC = () => {

  const [date, setDate] = React.useState(DateTime.local());
  const [weekdaysName, setWeekdaysName] = React.useState<string[]>([]);

  React.useEffect(() => {
    setWeekdaysName(Info.weekdays('narrow'));
    renderWeeks()
  }, []);

  const renderWeekdaysName = React.useCallback(() => (
    weekdaysName.map((dayName, index) => (
      <th
        className='capitalize font-medium p-2'
        key={index}
      >
        {dayName}
      </th>
    ))
  ), [weekdaysName]);

  const renderWeeks = React.useCallback(() => {
    const monthFirstWeekday = getFirstWeekdayOfTheMonth();

    const weeks = [];
    let days = [];

    let monthDay = 0;
    for (let week = 1; week <= WEEKS_TO_SHOW; week++) {
      for (let day = 1; day <= DAYS_PER_WEEK; day++) {
        if ((week === 1 && day < monthFirstWeekday) || monthDay === date.endOf("month").day) {
          days.push((
            <td key={day}>

            </td>
          ));

          continue;
        }

        monthDay++;
        days.push((
          <td
            key={day}
          >
            <Button
              className='btn-ghost !p-2 w-full'
            >
              {monthDay.toString()}
            </Button>
          </td>
        ));
      }
      weeks.push((
        <tr
          key={week}
        >
          {days}
        </tr>
      ));
      days = [];
    }

    return weeks;
  }, [date]);

  const getFirstWeekdayOfTheMonth = () => {
    return date.startOf("month").weekday;
  }

  return (
    <div className='relative'>
      <TextInput

      />
      <div
        className='absolute border border-t-0 border-zinc-300 flex flex-col md:flex-row shadow-md top-full z-20'
        tabIndex={1}
      >
        <DateTimePickerDisplay />
        <div
          className='bg-base-200 p-3'
        >
          <table

          >
            <thead>
              <tr
                className='select-none'
              >
                {renderWeekdaysName()}
              </tr>
            </thead>
            <tbody>
              {renderWeeks()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}