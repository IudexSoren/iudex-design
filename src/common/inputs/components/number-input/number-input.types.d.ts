import { InputHTMLAttributes } from "react"
import { InputBaseProps } from "@common/inputs/shared.types"

export interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  integer?: boolean
  max?: number
  min?: number
  showControls?: boolean
  step?: number
  value?: number | string
}

export interface NumberInputSuffixControlsProps {
  onIncrementValue: () => void
  onDecrementValue: () => void
}