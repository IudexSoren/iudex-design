import React from 'react'
import classNames from 'classnames'
import { Button } from '@common/buttons'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon
} from '@common/icons'
import { DropdownSelectSuffixInputProps } from '@common/inputs/types'

export const DropdownSelectSuffixInput: React.FC<DropdownSelectSuffixInputProps> = ({
  suffixInput,
  clearable,
  disabled,
  handleClearSelection,
  hasValue,
  isOpen,
  lightBackground,
  readonly
}) => {

  const buttonClassName = classNames(
    'btn-sm h-full',
    {
      "bg-base-100 hover:bg-base-200 border-base-100 hover:!border-base-200": lightBackground,
      "bg-base-200 border-base-200 pointer-events-none": disabled
    }
  )

  return (
    <div className='flex h-full items-center'>
      {
        <React.Fragment>
          {suffixInput}
          {
            (hasValue && clearable) ?
              (
                <Button
                  className={buttonClassName}
                  onClick={handleClearSelection}
                  disabled={disabled || readonly}
                >
                  <CloseIcon />
                </Button>
              ) : null
          }
        </React.Fragment>
      }
      <div className='px-2'>
        {
          isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
      </div>
    </div>
  )
}
