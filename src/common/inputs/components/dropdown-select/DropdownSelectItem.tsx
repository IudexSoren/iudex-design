import React from 'react'
import classNames from 'classnames'
import { DropdownSelectItemProps } from '@common/inputs/types'

export const DropdownSelectItem: React.FC<DropdownSelectItemProps> = ({
  lightBackground = false,
  onClickItem,
  option
}) => {

  const itemClassName = classNames(
    'cursor-pointer p-3 relative',
    {
      "hover:bg-base-200": lightBackground,
      "hover:bg-base-300": !lightBackground,
      "cursor-not-allowed opacity-50": option.disabled
    }
  )

  return (
    <li
      className={itemClassName}
      onClick={() => option.disabled ? null : onClickItem(option.value)}
      tabIndex={option.disabled ? -1 : 0}
    >
      {option.children ?? option.label}
    </li>
  )
}