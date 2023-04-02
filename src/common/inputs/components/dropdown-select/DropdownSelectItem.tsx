import React from 'react'
import classNames from 'classnames'
import { DropdownSelectItemProps } from './dropdown-select.types'
import { Button } from '@common/buttons'

export const DropdownSelectItem: React.FC<DropdownSelectItemProps> = ({
  lightBackground = false,
  onClickItem,
  option,
  selected = false
}) => {

  const itemClassName = classNames(
    'block border-0 cursor-pointer font-normal normal-case !p-3 relative text-left w-full',
    {
      "btn-primary": selected,
      "hover:bg-primary/10": lightBackground && !option.disabled && !selected,
      "hover:bg-primary/20": !lightBackground && !option.disabled && !selected,
      "!cursor-not-allowed opacity-50 pointer-events-none select-none": option.disabled
    }
  )

  return (
    <Button
      className={itemClassName}
      onClick={() => option.disabled ? null : onClickItem(option.value)}
      tabIndex={option.disabled ? -1 : 0}
    >
      <li
      >
        {option.children ?? option.label}
      </li>
    </Button>
  )
}