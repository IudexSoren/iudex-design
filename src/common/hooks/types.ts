export interface UseCalendarProps {
  month: number
  renderDay: (index: number, monthDay: number) => JSX.Element
  renderDayHeader: (index: number, dayName: string) => JSX.Element
  renderDayPlaceholder: (index: number) => JSX.Element
  renderWeek: (index: number, days: JSX.Element[]) => JSX.Element
  year: number
}

export interface UseCalendarObject {

}