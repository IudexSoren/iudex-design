import { InputBaseProps } from "@common/inputs/shared.types"

declare global {

  type timeFormat = '12h' | '24h'

}

export interface TimePickerProps extends InputBaseProps, TimeFormatAttr {
  className?: string
  id?: string
  value?: string
}

export interface TimeFormatAttr {
  format?: timeFormat
}