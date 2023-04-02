import { InputHTMLAttributes } from "react"
import { InputBaseProps } from "@common/inputs/shared.types"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  inputClassName?: string
}

export interface UnstyledTextInputProps extends InputHTMLAttributes<HTMLInputElement> {

}