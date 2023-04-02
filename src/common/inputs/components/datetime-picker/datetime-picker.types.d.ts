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
  isSelectingDate: boolean
  isSelectingTime: boolean
  handleIsSelectingDate: () => void
  handleIsSelectingTime: () => void
}

export interface DateTimePickerDateDisplayProps {
  date: DateTime
  isSelectingDate: boolean
  handleIsSelectingDate: () => void
}

export interface DateTimePickerInnerProps extends DateTimePickerValue {
  handleClickContainer: () => void
  isOpen: boolean
}

export interface DateTimePickerTimeDisplayProps {
  date: DateTime
  isSelectingTime: boolean
  handleIsSelectingTime: () => void
}

export interface DateTimePickerProps extends DateTimePickerValue {
  
}

interface DateTimePickerValue {
  value: number | string | Date | DateTimePickerRangeValue | null
}


