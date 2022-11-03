import React from 'react'
import classNames from 'classnames'
import { DropdownSelectCheckboxItemProps } from '@common/inputs/types'
import { Checkbox } from '@common/inputs'

export const DropdownSelectCheckboxItem: React.FC<DropdownSelectCheckboxItemProps> = ({
  checked,
  lightBackground,
  onClickItem,
  option,
}) => {

  const itemClassName = classNames(
    'flex-row-reverse gap-3 p-3',
    {
      "bg-base-200": lightBackground && checked,
      "bg-base-300": !lightBackground && checked,
      "hover:bg-base-200": lightBackground,
      "hover:bg-base-300": !lightBackground,
      "cursor-not-allowed opacity-50": option.disabled
    }
  )

  return (
    <div
      className='relative'
    >
      <Checkbox
        checked={checked}
        containerClassName={itemClassName}
        labelContent={
          <div className='flex-grow'>
            {option.children ?? option.label}
          </div>
        }
        onChange={() => option.disabled ? null : onClickItem(option.value)}
        tabIndex={option.disabled ? -1 : 0}
      />
    </div>
  )
}
