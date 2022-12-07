import { InputHTMLAttributes } from "react"
import { InputBaseProps } from "./shared.types"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  inputClassName?: string
  staticLabel?: boolean
}