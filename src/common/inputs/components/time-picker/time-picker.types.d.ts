import { InputHTMLAttributes } from "react"
import { InputBaseProps } from "@common/inputs/shared.types"

declare global {

  type timeFormat = '12h' | '24h'

}

export interface TimePickerProps extends InputBaseProps, TimeFormatAttr, InputHTMLAttributes<HTMLInputElement> {
  max?: string
  min?: string
  showSeconds?: boolean
}

export interface TimeFormatAttr {
  format?: timeFormat
}