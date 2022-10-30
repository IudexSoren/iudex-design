import React from 'react'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import { TextInput } from './TextInput'
import { Button } from '@common/buttons'
import { CalendarIcon, CloseIcon } from '@common/icons'
import { DateTimePickerHeader } from './datetime-picker'
import { DateTimePickerProps } from '../types'
import "react-datepicker/dist/react-datepicker.css"

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  afterInput,
  beforeInput,
  disabled = false,
  labelContent,
  lightBackground = false,
  name,
  onChange,
  value,
  ...props
}) => {


  const handleOnChange = (date: Date | null, event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    if (!onChange) return;

    onChange({
      name,
      value: date
    }, event);
  }

  const handleClearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled || !onChange) return;

    onChange({
      name,
      value: null
    });
  }

  const buttonClassName = classNames(
    'btn-sm h-full',
    {
      "bg-base-100 hover:bg-base-200 border-base-100 hover:!border-base-200": lightBackground,
      "bg-base-200 border-base-200 pointer-events-none": disabled
    }
  )

  return (
    <DatePicker
      calendarClassName='!border-zinc-300 !font-be-vietnam !rounded-none shadow-md '
      customInput={
        <TextInput
          afterInput={
            <div className='flex h-full items-center'>
              {
                <React.Fragment>
                  {afterInput}
                  {
                    !!value ?
                      (
                        <Button
                          className={buttonClassName}
                          onClick={handleClearSelection}
                        >
                          <CloseIcon />
                        </Button>
                      ) : null
                  }
                </React.Fragment>
              }
              <div className='pl-3 pr-3'>
                <CalendarIcon />
              </div>
            </div>
          }
          beforeInput={beforeInput}
          labelContent={labelContent}
        />
      }
      disabled={disabled}
      dropdownMode='select'
      onChange={(date, event) => handleOnChange(date, event as React.ChangeEvent<HTMLInputElement>)}
      popperClassName='!p-0 !z-20'
      renderCustomHeader={(headerProps) => <DateTimePickerHeader {...headerProps} />}
      selected={value}
      showMonthDropdown
      showPopperArrow={false}
      {...props}
    />
  )
}