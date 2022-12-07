import { InputHTMLAttributes } from "react"
import { InputBaseProps } from "./shared.types"

export interface NumberInputEvent {
  target: HTMLInputElement
}

export interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  max?: number
  min?: number
  showControls?: boolean
  step?: number
  value?: number
}

export interface NumberInputSuffixControlsProps {
  onIncrementValue: () => void
  onDecrementValue: () => void
}