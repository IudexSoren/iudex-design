


export interface CalendarDateTimePickerDayProps {
  monthDay: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export interface CalendarDateTimePickerDayPlaceholderProps {
  children?: ReactElement
}

export interface CalendarDateTimePickerDayHeaderProps {
  dayName: string
}

export interface CalendarDateTimePickerWeekProps {
  days: JSX.Element[]
}
