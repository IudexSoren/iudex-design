import React from 'react'
import classNames from 'classnames';

import { mergeRefs } from '@common/other/merge-refs'

import { DropdownSelect, ErrorMessage, UnstyledNumberInput } from '@common/inputs'
import { TimeIcon } from '@common/icons';

import { BaseInput } from '../base';

import { TimePickerProps } from './time-picker.types';

const DEFAULT_MAX_HOUR = 24;
const DEFAULT_MIN_HOUR = -1;
const DEFAULT_MAX_MINUTES = 60;
const DEFAULT_MIN_MINUTES = -1;

const TIME_REGEX = new RegExp(/^([0-9]{2}:[0-9]{2})$/);
const TIME_WITH_SECONDS_REGEX = new RegExp(/^([0-9]{2}:[0-9]{2}:[0-9]{2})$/);

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(({
  className,
  disabled,
  errorMessage,
  format = '24h',
  id,
  inputClassName,
  inputSize,
  labelContent,
  lightBackground,
  value,
}, ref) => {

  const DEFAULT_MAX_HOUR = React.useMemo(() => format === "12h" ? 13 : 24, [format]);
  const DEFAULT_MIN_HOUR = React.useMemo(() => format === "12h" ? 0 : -1, [format]);

  const hourInputRef = React.useRef<HTMLInputElement>(null);
  const minutesInputRef = React.useRef<HTMLInputElement>(null);

  const [timeSystem, setTimeSystem] = React.useState<string>("am");

  const [hour, setHour] = React.useState('00');
  const [minutes, setMinutes] = React.useState('00');
  const [seconds, setSeconds] = React.useState('00');

  const [hasFocus, setHasFocus] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    checkValue();
  }, [value]);

  const onClickInputContainer = (event?: React.MouseEvent) => {
    if (event?.target.name === "minutes") {
      return;
    }

    hourInputRef.current?.focus();
  }

  const onFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);

    const { name } = event.target;

    if (name === "hour") {
      hourInputRef.current?.select();
    } else if (name === "minutes") {
      minutesInputRef.current?.select();
    }
  }

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
  }

  const checkValue = () => {
    if (!value) {
      return;
    }

    if (TIME_REGEX.test(value)) {
      console.log("Value allowed")
    } else {
      console.log("Value disallowed")
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

    if (hourNumber >= DEFAULT_MAX_HOUR || hourNumber <= DEFAULT_MIN_HOUR) {
      throwError();
    }

    setHour(formatTimeChunk(hourNumber));
  }

  const checkMinutes = (minutesChunk: string) => {
    const minutesNumber = Number(minutesChunk);

    if (isNaN(minutesNumber)) {
      throwError();
    }

    if (minutesNumber >= DEFAULT_MAX_MINUTES || minutesNumber <= DEFAULT_MIN_MINUTES) {
      throwError();
    }

    setMinutes(formatTimeChunk(minutesNumber));
  }

  const formatTimeChunk = (chunk: number | string) => {
    return Number(chunk) > 9 ? chunk.toString() : `0${chunk}`;
  }

  const throwError = () => {
    throw new Error("TimePicker Invalid time value");
  }

  const inputsClassName = classNames(
    'bg-transparent border-0 h-full input-md !outline-none px-3 text-center w-[2.60rem]',
    inputClassName
  )

  const timeSystemOptions = React.useMemo<DropdownSelectOptionProps[]>(() => [
    {
      label: 'AM',
      value: "am",
    },
    {
      label: 'PM',
      value: "pm",
    }
  ], []);

  return (
    <BaseInput
      className={className}
      disabled={disabled}
      errorMessage={errorMessage}
      hasFocus={hasFocus}
      inputRef={inputRef}
      inputSize={inputSize}
      labelContent={labelContent}
      lightBackground={lightBackground}
      onClickInputContainer={(event) => onClickInputContainer(event)}
      suffixInput={
        <div className='flex h-full items-center'>
          {
            format === "12h" ? (
              <DropdownSelect
                className='w-20'
                inputSize={inputSize}
                options={timeSystemOptions}
                onChange={({ value }) => setTimeSystem(value)}
                value={timeSystem}
              />
            ) : null
          }
          <div className='px-2'>
            <TimeIcon />
          </div>
        </div>
      }
    >
      <div
        className='flex flex-grow gap-2 items-center'
      >
        <input
          disabled={disabled}
          id={id}
          ref={mergeRefs(inputRef, ref)}
          type="hidden"
        />
        <UnstyledNumberInput
          className={inputsClassName}
          disabled={disabled}
          max={DEFAULT_MAX_HOUR}
          min={DEFAULT_MIN_HOUR}
          name='hour'
          onBlur={onBlurInput}
          onFocus={onFocusInput}
          ref={hourInputRef}
          value={formatTimeChunk(hour)}
        />
        <div
          className='font-bold text-center text-md'
        >
          :
        </div>
        <UnstyledNumberInput
          className={inputsClassName}
          disabled={disabled}
          max={DEFAULT_MAX_MINUTES}
          min={DEFAULT_MIN_MINUTES}
          name='minutes'
          onBlur={onBlurInput}
          onFocus={(event) => onFocusInput(event)}
          ref={minutesInputRef}
          value={formatTimeChunk(minutes)}
        />
      </div>
    </BaseInput>
  )

  // return (
  //   <div>
  //     {
  //       labelContent && (
  //         <div
  //           className={labelContainerClassName}
  //           ref={labelContainerRef}
  //         >
  //           <label htmlFor={props.id}>{labelContent}</label>
  //         </div>
  //       )
  //     }
  //     <div className='flex gap-2 items-center'>
  //       <input
  //         ref={mergeRefs(inputRef, ref)}
  //         type="hidden"
  //       />
  //       <NumberInput
  //         className={className}
  //         inputClassName={inputClassName}
  //         inputSize={inputSize}
  //         max={DEFAULT_MAX_HOUR}
  //         min={DEFAULT_MIN_HOUR}
  //         name='hour'
  //         value={'05'}
  //         {...props}
  //       // onChange={handleChangeHour}
  //       />
  //       <div
  //         className='font-bold text-center text-xl w-4'
  //       >
  //         :
  //       </div>
  //       <NumberInput
  //         className={className}
  //         inputClassName={inputClassName}
  //         inputSize={inputSize}
  //         max={DEFAULT_MAX_MINUTES}
  //         min={DEFAULT_MIN_MINUTES}
  //         name='minutes'
  //         value={'00'}
  //         {...props}
  //       // onChange={handleChangeMinutes}
  //       />
  //     </div>
  //     {
  //       typeof errorMessage !== 'boolean' ?
  //         (
  //           <ErrorMessage className='mt-1'>
  //             {errorMessage}
  //           </ErrorMessage>
  //         ) :
  //         null
  //     }
  //   </div>
  // )
})