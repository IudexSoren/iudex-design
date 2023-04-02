import React from 'react'
import classNames from 'classnames';

import { mergeRefs } from '@common/other/merge-refs'

import { ErrorMessage, NumberInput } from '@common/inputs'

import { TimePickerProps } from './time-picker.types';

const DEFAULT_MAX_HOUR = 24;
const DEFAULT_MIN_HOUR = -1;
const DEFAULT_MAX_MINUTES = 60;
const DEFAULT_MIN_MINUTES = -1;

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(({
  className,
  errorMessage,
  labelContent,
  inputClassName,
  inputSize,
  value,
  ...props
}, ref) => {

  const [hour, setHour] = React.useState('00');
  const [minutes, setMinutes] = React.useState('00');
  const [seconds, setSeconds] = React.useState('00');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const labelContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    checkValue();
  }, [value])


  const checkValue = () => {
    if (!value) {
      return;
    }

    const timeChunks = value.split(':');
    if (!timeChunks || timeChunks.length < 2) {
      throwError();
    }

    checkHour(timeChunks[0]);
    checkMinutes(timeChunks[1]);

    console.log(formatTime());
  }

  const formatTime = () => {
    return `${hour}:${minutes}:${seconds}`;
  }

  const checkHour = (hourChunk: string) => {
    const hourNumber = Number(hourChunk);

    if (isNaN(hourNumber)) {
      throwError();
    }

    setHour(formatTimeChunk(hourNumber));
  }

  const checkMinutes = (minutesChunk: string) => {
    const minutesNumber = Number(minutesChunk);

    if (isNaN(minutesNumber)) {
      throwError();
    }

    setMinutes(formatTimeChunk(minutesNumber));
  }

  const formatTimeChunk = (chunk: number) => {
    return chunk > 9 ? chunk.toString() : `0${chunk}`;
  }

  const throwError = () => {
    throw new Error("TimePicker Invalid time value");
  }

  const labelContainerClassName = classNames(
    'duration-300 mb-1 px-0 relative transition-all z-10'
  )

  return (
    <div>
      {
        labelContent && (
          <div
            className={labelContainerClassName}
            ref={labelContainerRef}
          >
            <label htmlFor={props.id}>{labelContent}</label>
          </div>
        )
      }
      <div className='flex gap-2 items-center'>
        <input
          ref={mergeRefs(inputRef, ref)}
          type="hidden"
        />
        <NumberInput
          className={className}
          inputClassName={inputClassName}
          inputSize={inputSize}
          max={DEFAULT_MAX_HOUR}
          min={DEFAULT_MIN_HOUR}
          name='hour'
          value={'05'}
          {...props}
        // onChange={handleChangeHour}
        />
        <div
          className='font-bold text-center text-xl w-4'
        >
          :
        </div>
        <NumberInput
          className={className}
          inputClassName={inputClassName}
          inputSize={inputSize}
          max={DEFAULT_MAX_MINUTES}
          min={DEFAULT_MIN_MINUTES}
          name='minutes'
          value={'00'}
          {...props}
        // onChange={handleChangeMinutes}
        />
      </div>
      {
        typeof errorMessage !== 'boolean' ?
          (
            <ErrorMessage className='mt-1'>
              {errorMessage}
            </ErrorMessage>
          ) :
          null
      }
    </div>
  )
})