import React, { InputHTMLAttributes, AllHTMLAttributes, ReactElement } from "react"
import { ReactDatePickerProps, ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { ReactSliderProps, } from "react-slider"
import { BackgroundAttr, BASIC_SIZES } from "@common/other/types"

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, CheckableInputAttr, ErrorMessageAttr, LabelContentAttr {

}

// #region DateTimePicker
export interface DateTimePickerProps extends Omit<ReactDatePickerProps, 'name' | 'onChange' | 'selected' | 'selectsRange' | 'value'>, InputBaseProps, ClearableInputAttr {
  name: string
  onChange: (event: DateTimePickerEvent, ...args: any) => void
  selectsRange?: boolean
  value: Date | [Date | null, Date | null] | null
}

export interface DateTimePickerHeaderProps extends ReactDatePickerCustomHeaderProps {

}
// #endregion

// #region DropdownSelect
export interface DropdownSelectProps extends InputBaseProps, ClearableInputAttr {
  className?: string
  emptyList?: ReactElement
  filterable?: boolean
  listClassName?: string
  multiple?: boolean
  name?: string
  onChange: (event: DropdownSelectEvent, ...args: any) => void
  options: (DropdownSelectOptionProps | DropdownSelectGroupOptionProps)[]
  placeholder?: string
  readonly?: boolean
  value: any
  virtualized?: boolean
}

export interface DropdownSelectSuffixInputProps extends BackgroundAttr, DisabledInputAttr {
  suffixInput?: ReactElement
  clearable?: boolean
  handleClearSelection: (event: React.MouseEvent<HTMLButtonElement>) => void
  hasValue: boolean
  isOpen: boolean
  readonly?: boolean
}

export interface DropdownSelectCheckboxItemProps extends Omit<DropdownSelectItemProps, 'selected'> {
  checked: boolean
}

export interface DropdownSelectGroupOptionProps extends DisabledInputAttr {
  label: string
  options: DropdownSelectOptionProps[]
}

export interface DropdownSelectOptionProps extends DisabledInputAttr {
  children?: ReactElement | string // If no children is provided, label will appear as the option
  label: string
  value: string | number | boolean
}

export interface DropdownSelectItemProps extends BackgroundAttr {
  onClickItem: (value: any) => void
  option: DropdownSelectOptionProps
  selected: boolean
}

export interface DropdownSelectOptionsListProps extends BackgroundAttr, InputSizeAttr {
  emptyList?: ReactElement
  filterable: boolean
  filterText: string
  isOpen: boolean
  listClassName?: string
  multiple: boolean
  onClickItem: (selectedValue: any) => void
  options: (DropdownSelectOptionProps | DropdownSelectGroupOptionProps)[]
  setFilterText: (filterText: string) => void
  value: any
}
// #endregion

export interface ErrorMessageProps extends AllHTMLAttributes<HTMLDivElement> {
  children?: ReactElement | string
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

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement>, CheckableInputAttr, ErrorMessageAttr, LabelContentAttr {

}

// #region Slider
export interface SliderProps extends ErrorMessageAttr, LabelContentAttr, Omit<ReactSliderProps, 'defaultValue' | 'value'> {
  value: number[]
}

export interface SliderMarkProps {

}

export interface SliderThumbProps extends SliderStateProps {
  valueNow: number
}

export interface SliderTrackProps extends SliderStateProps {
  className?: string
}
// #endregion

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  inputClassName?: string
  staticLabel?: boolean
}

// Events
export interface DateTimePickerEvent {
  name: string
  value: any
}

export interface DropdownSelectEvent {
  name: string
  value: any
}

export interface NumberInputEvent {
  target: HTMLInputElement
}

// Generic Input
export interface InputBaseProps extends BackgroundAttr, PrefixAndSuffixInputAttrs, DisabledInputAttr, ErrorMessageAttr, InputSizeAttr, LabelContentAttr {

}

// Generic types
export interface PrefixAndSuffixInputAttrs {
  suffixInput?: ReactElement
  prefixInput?: ReactElement
}

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

export interface InputSizeAttr {
  inputSize?: BASIC_SIZES
}

export interface LabelContentAttr {
  labelContent?: ReactElement | string
}

export interface SliderStateProps {
  index: number
  value: number | string | readonly string[]
}