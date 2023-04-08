import { DateTime } from "luxon"

declare global {

  interface DateTimePickerEvent {
    name: string
    value: any
  }

  interface DateTimePickerRangeValue {
    from: Date
    to: Date
  }

}

export interface DateTimePickerDisplayProps {
  date: DateTime
  handleIsSelectingDate: () => void
  handleIsSelectingTime: () => void
  isSelectingDate: boolean
  isSelectingTime: boolean
}

export interface DateTimePickerDateDisplayProps {
  date: DateTime
  handleIsSelectingDate: () => void
  isSelectingDate: boolean
  isTo?: boolean
}

export interface DateTimePickerInnerProps extends DateTimePickerValue {
  handleClickContainer: () => void
  isOpen: boolean
}

export interface DateTimePickerTimeDisplayProps {
  date: DateTime
  handleIsSelectingTime: () => void
  isSelectingTime: boolean
  isTo?: boolean
}

export interface DateTimePickerProps extends DateTimePickerValue {

}

interface DateTimePickerValue {
  value: number | string | Date | DateTimePickerRangeValue | null
}


