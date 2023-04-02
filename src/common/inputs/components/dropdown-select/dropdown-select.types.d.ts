import { ReactElement } from "react"
import { BackgroundAttr } from "@common/other/types"
import { ClearableInputAttr, DisabledInputAttr, InputBaseProps, InputSizeAttr } from "@common/inputs/shared.types"

declare global {

  interface DropdownSelectEvent {
    name: string
    value: any
  }

  interface DropdownSelectGroupOptionProps extends DisabledInputAttr {
    label: string
    options: DropdownSelectOptionProps[]
  }

  interface DropdownSelectOptionProps extends DisabledInputAttr {
    children?: ReactElement | string // If no children is provided, label will appear as the option
    label: string
    value: string | number | boolean
  }

}

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


export interface DropdownSelectCheckboxItemProps extends Omit<DropdownSelectItemProps, 'selected'> {
  checked: boolean
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

export interface DropdownSelectSuffixInputProps extends BackgroundAttr, DisabledInputAttr {
  suffixInput?: ReactElement
  clearable?: boolean
  handleClearSelection: (event: React.MouseEvent<HTMLButtonElement>) => void
  hasValue: boolean
  isOpen: boolean
  readonly?: boolean
}