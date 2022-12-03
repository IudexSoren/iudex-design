import React from 'react'
import { DateTime, Info } from 'luxon'
import moment from 'moment';
import { TextInput } from './TextInput'
import { DateTimePickerDisplay } from './datetime-picker'

const WEEKS_TO_SHOW = 6;

export const DateTimePicker: React.FC = () => {


  const [date, setDate] = React.useState(DateTime.local());
  const [weekdaysName, setWeekdaysName] = React.useState<string[]>([]);

  React.useEffect(() => {
    console.log(date);
    setWeekdaysName(Info.weekdays('short'));
  }, []);

  const renderWeekdaysName = React.useCallback(() => (
    weekdaysName.map((dayName, index) => (
      <th
        className='capitalize font-medium p-1'
        key={index}
      >
        {dayName}
      </th>
    ))
  ), [weekdaysName]);

  // const renderWeeks = React.useCallback(() => (

  // ), []);

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
          <table>
            <thead>
              <tr>
                {renderWeekdaysName()}
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}