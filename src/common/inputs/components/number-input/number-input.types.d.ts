import { InputHTMLAttributes } from "react"

import { InputBaseProps } from "@common/inputs/shared.types"
import { UnstyledTextInputProps } from "../text-input/text-input.types"

interface BaseNumberInputProps {
  integer?: boolean
  max?: number
  min?: number
  step?: number
}

export interface NumberInputProps extends BaseNumberInputProps, InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  inputClassName?: string
  showControls?: boolean
}

export interface NumberInputSuffixControlsProps {
  onIncrementValue: () => void
  onDecrementValue: () => void
}

export interface UnstyledNumberInputProps extends BaseNumberInputProps, InputHTMLAttributes<HTMLInputElement>, UnstyledTextInputProps, {

}