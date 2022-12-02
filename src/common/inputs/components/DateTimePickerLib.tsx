import React from 'react'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import { TextInput } from './TextInput'
import { Button } from '@common/buttons'
import { CalendarIcon, CloseIcon } from '@common/icons'
import { DateTimePickerHeader } from './datetime-picker-lib'
import { DateTimePickerLibProps } from '../types'
import "react-datepicker/dist/react-datepicker.css"

export const DateTimePicker: React.FC<DateTimePickerLibProps> = ({
  clearable,
  disabled = false,
  labelContent,
  lightBackground = false,
  name,
  onChange,
  prefixInput,
  suffixInput,
  value,
  ...props
}) => {

  const handleOnChange = (date: Date | [Date | null, Date | null] | null, event: React.ChangeEvent<HTMLInputElement> | undefined) => {
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
      value: props.selectsRange ? [null, null] : null
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
          suffixInput={
            <div className='flex h-full items-center'>
              {
                <React.Fragment>
                  {suffixInput}
                  {
                    (!!value && clearable) ?
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
          prefixInput={prefixInput}
          labelContent={labelContent}
        />
      }
      disabled={disabled}
      dropdownMode='select'
      endDate={Array.isArray(value) ? value[1] : null}
      onChange={(date, event) => handleOnChange(date, event as React.ChangeEvent<HTMLInputElement>)}
      popperClassName='!p-0 !z-20'
      renderCustomHeader={(headerProps) => <DateTimePickerHeader {...headerProps} />}
      selected={Array.isArray(value) ? null : value}
      showMonthDropdown
      showPopperArrow={false}
      startDate={Array.isArray(value) ? value[0] : null}
      {...props}
    />
  )
}