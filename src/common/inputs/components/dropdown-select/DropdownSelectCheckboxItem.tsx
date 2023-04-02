import React from 'react'
import classNames from 'classnames'

import { Checkbox } from '@common/inputs'

import { DropdownSelectCheckboxItemProps } from './dropdown-select.types'
import { Button } from '@common/buttons'

export const DropdownSelectCheckboxItem: React.FC<DropdownSelectCheckboxItemProps> = ({
  checked,
  lightBackground,
  onClickItem,
  option,
}) => {

  const buttonClassName = classNames(
    'bg-transparent hover:bg-transparent block border-0 font-normal normal-case p-0 relative text-left w-full',
    {
      "!cursor-not-allowed pointer-events-none select-none": option.disabled
    }
  )

  const itemClassName = classNames(
    'flex-row-reverse gap-3 p-3',
    {
      "btn-primary": checked,
      "hover:bg-primary/10": lightBackground && !option.disabled && !checked,
      "hover:bg-primary/20": !lightBackground && !option.disabled && !checked,
      "!cursor-not-allowed opacity-50 pointer-events-none select-none": option.disabled
    }
  )

  return (
    <Button
      className={buttonClassName}
      tabIndex={option.disabled ? -1 : 0}
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
      />
    </Button>
  )
}
