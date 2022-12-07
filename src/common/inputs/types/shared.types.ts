import { ReactElement } from "react"
import { BackgroundAttr, BASIC_SIZES } from "@common/other/types"

// Generic input
export interface InputBaseProps extends BackgroundAttr, DisabledInputAttr, ErrorMessageAttr, InputClassNameAttr, InputSizeAttr, LabelContentAttr, PrefixAndSuffixInputAttrs {

}

// Generic types
export interface CheckableInputAttr {
  containerClassName?: string
  contentClickable?: boolean
}

export interface ClearableInputAttr {
  clearable?: boolean
}

export interface DisabledInputAttr {
  disabled?: boolean
}

export interface ErrorMessageAttr {
  errorMessage?: ReactElement | string | boolean
}

export interface InputClassNameAttr {
  inputClassName?: string
}

export interface InputSizeAttr {
  inputSize?: BASIC_SIZES
}

export interface LabelContentAttr {
  labelContent?: ReactElement | string
}

export interface PrefixAndSuffixInputAttrs {
  suffixInput?: ReactElement
  prefixInput?: ReactElement
}