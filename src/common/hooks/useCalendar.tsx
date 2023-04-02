import React from 'react'
import { DateTime, Info } from 'luxon'

import { CalendarDateTimePickerDay } from '@common/inputs/components/calendar/CalendarDateTimePickerDay';
import { CalendarDateTimePickerDayPlaceholder } from '@common/inputs/components/calendar/CalendarDateTimePickerDayPlaceholder';
import { CalendarDateTimePickerWeek } from '@common/inputs/components/calendar/CalendarDateTimePickerWeek';

import { UseCalendarProps } from './types';
import { CalendarDateTimePickerDayHeader } from '@common/inputs/components/calendar/CalendarDateTimePickerDayHeader';

const WEEKS_TO_SHOW = 6;
const DAYS_PER_WEEK = 7;

export const useCalendar = ({
  month,
  renderDay,
  renderDayHeader,
  renderDayPlaceholder,
  renderWeek,
  year,
}: UseCalendarProps) => {

  const [weekdaysName, setWeekdaysName] = React.useState<string[]>([]);

  const [date, setDate] = React.useState<DateTime>(DateTime.local());

  React.useEffect(() => {
    setWeekdaysName(Info.weekdays('narrow'));
  }, []);

  React.useEffect(() => {
    setDate(date.set({ year, month: month + 1 }));
  }, [month, year]);

  const monthsList = React.useMemo<DropdownSelectOptionProps[]>(() => Info.months('long').map((monthName, index) => {
    const capitalizedMonthName: string = monthName[0].toUpperCase() + monthName.substring(1);

    return {
      label: capitalizedMonthName,
      value: index + 1,
    }
  }), []);

  const renderDaysHeader = React.useCallback(() => (
    weekdaysName.map((dayName, index) => (
      renderDayHeader(index, dayName)
      // <CalendarDateTimePickerDayHeader
      //   dayName={dayName}
      //   key={index}
      // />
    ))
  ), [weekdaysName]);

  const renderMonthWeeks = React.useCallback<() => JSX.Element[]>(() => {
    const monthFirstWeekday = getFirstWeekdayOfTheMonth();

    const weeks: JSX.Element[] = [];
    let days: JSX.Element[] = [];

    let monthDay = 0;
    for (let week = 1; week <= WEEKS_TO_SHOW; week++) {
      for (let day = 1; day <= DAYS_PER_WEEK; day++) {
        if ((week === 1 && day < monthFirstWeekday) || monthDay === getLastDayOfTheMonth()) {
          days.push((
            renderDayPlaceholder(day)
            // <CalendarDateTimePickerDayPlaceholder
            //   key={day}
            // />
          ));

          continue;
        }

        monthDay++;
        const currentMonthDay = monthDay;

        days.push((
          renderDay(day, currentMonthDay)
          // <CalendarDateTimePickerDay
          //   key={day}
          //   monthDay={monthDay.toString()}
          //   onClick={() => handleChangeDay(currentMonthDay)}
          // />
        ));
      }
      weeks.push((
        renderWeek(week, days)
        // <CalendarDateTimePickerWeek
        //   days={days}
        //   key={week}
        // />
      ));
      days = [];
    }

    return weeks;
  }, [date]);

  const getFirstWeekdayOfTheMonth = () => {
    return date.startOf("month").weekday;
  }

  const getLastDayOfTheMonth = () => {
    return date.endOf("month").day;
  }

  return {
    monthsList,
    renderMonthWeeks,
    renderDaysHeader
  }
}
