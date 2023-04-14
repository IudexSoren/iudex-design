import React from 'react'
import classNames from 'classnames';

import { mergeRefs } from '@common/other/merge-refs'

import { DropdownSelect, UnstyledNumberInput } from '@common/inputs'
import { TimeIcon } from '@common/icons';

import { BaseInput } from '../base';

import { TimePickerProps } from './time-picker.types';

const DEFAULT_MAX_HOUR = 23;
const DEFAULT_MIN_HOUR = 0;
const DEFAULT_MAX_MINUTES = 59;
const DEFAULT_MIN_MINUTES = 0;
const DEFAULT_MAX_SECONDS = 59;
const DEFAULT_MIN_SECONDS = 0;

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
  max,
  min,
  name,
  onChange,
  showSeconds = false,
  value,
}, ref) => {

  const [timeSystem, setTimeSystem] = React.useState<string>("am");

  const [hour, setHour] = React.useState('00');
  const [minutes, setMinutes] = React.useState('00');
  const [seconds, setSeconds] = React.useState('00');

  const [inputValue, setInputValue] = React.useState<string>("");

  const [hasFocus, setHasFocus] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const hourInputRef = React.useRef<HTMLInputElement>(null);
  const minutesInputRef = React.useRef<HTMLInputElement>(null);
  const secondsInputRef = React.useRef<HTMLInputElement>(null);

  const MAX_HOUR = React.useRef<number>(DEFAULT_MAX_HOUR);
  const MIN_HOUR = React.useRef<number>(DEFAULT_MIN_HOUR);

  const MAX_MINUTES = React.useRef<number>(DEFAULT_MAX_MINUTES);
  const MIN_MINUTES = React.useRef<number>(DEFAULT_MIN_MINUTES);

  React.useEffect(() => {
    setMinLimits();
    setMaxLimits();
    checkValue();
  }, [value]);

  React.useEffect(() => {
    setMinLimits();
    setMaxLimits();
    setInputValue(formatTime())
  }, [hour, minutes, seconds])

  React.useEffect(() => {

    if (inputValue === "") {
      return;
    }

    const event = new Event('change', { bubbles: true });
    inputRef.current?.dispatchEvent(event);
    (event.target as any).value = formatTime();
    console.log("Input value:", formatTime());
    if (onChange) {
      onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }, [inputValue])

  const onClickInputContainer = (event?: React.MouseEvent) => {
    if (event?.target) {
      const { name } = event?.target;

      if (name === "minutes" || name === "seconds") {
        return;
      }
    }

    hourInputRef.current?.focus();
  }

  const onFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);

    event.target.select();
  }

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
  }

  const checkValue = () => {
    if (!value) {
      return;
    }

    const timeChunks = getTimeChunks(value.toString());

    const hourChunk = timeChunks[0];
    const minutesChunk = timeChunks[1];
    let secondsChunk = '00';

    if (timeChunks.length === 3) {
      secondsChunk = timeChunks[2];
      checkSeconds(secondsChunk);
    }

    checkHour(hourChunk);
    checkMinutes(minutesChunk);

    setInputValue(formatTime())
    console.log(formatTime());
  }

  const getTimeChunks = (time: string): string[] => {
    const timeChunks = time.toString().split(':');
    if (!timeChunks || timeChunks.length < 2) {
      return ["00", "00"];
    }

    return timeChunks;
  }

  const formatTime = () => {
    return `${hour}:${minutes}:${seconds}`;
  }

  const checkHour = (hourChunk: string) => {
    let hourNumber = Number(hourChunk);

    if (isNaN(hourNumber)) {
      return;
    }

    if (hourNumber > MAX_HOUR.current) {
      hourNumber = MAX_HOUR.current;
    }

    if (hourNumber < MIN_HOUR.current) {
      hourNumber = MIN_HOUR.current;
    }

    setHour(formatTimeChunk(hourNumber));
  }

  const checkMinutes = (minutesChunk: string) => {
    let minutesNumber = Number(minutesChunk);

    if (isNaN(minutesNumber)) {
      return;
    }

    const hourValue = getTimeChunks(value)[0];

    if (Number(hourValue) > MAX_HOUR.current || minutesNumber > MAX_MINUTES.current) {
      minutesNumber = MAX_MINUTES.current;
    }

    if (Number(hourValue) < MIN_HOUR.current || minutesNumber < MIN_MINUTES.current) {
      minutesNumber = MIN_MINUTES.current;
      console.log("*** Hour (state):", Number(hourValue), "***")
    }

    setMinutes(formatTimeChunk(minutesNumber));
  }

  const checkSeconds = (secondsChunk: string) => {
    let secondsNumber = Number(secondsChunk);

    if (isNaN(secondsNumber)) {
      return;
    }

    if (secondsNumber >= DEFAULT_MAX_SECONDS + 1) {
      secondsNumber = DEFAULT_MIN_SECONDS;
    }

    if (secondsNumber <= DEFAULT_MIN_SECONDS - 1) {
      secondsNumber = DEFAULT_MAX_SECONDS;
    }

    setSeconds(formatTimeChunk(secondsNumber));
  }

  const setMaxLimits = () => {
    if (!max || !TIME_REGEX.test(max)) {
      return;
    }

    const timeChunks = getTimeChunks(max);

    const maxHour = Number(timeChunks[0]);
    const maxMinutes = Number(timeChunks[1]);

    if ((maxHour < 0 || maxMinutes < 0) || (maxHour > 23 || maxMinutes > 59)) {
      return;
    }

    MAX_HOUR.current = maxHour;
    MAX_MINUTES.current = maxHour <= Number(hour) ? maxMinutes : DEFAULT_MAX_MINUTES;
    console.log("=== MAXIMUM =========================");
    console.log("Maximum hour:", MAX_HOUR.current);
    console.log("Maximum minutes:", MAX_MINUTES.current);
    console.log("Maximum minutes should be:", maxHour <= Number(hour) ? maxMinutes : DEFAULT_MAX_MINUTES);
  }

  const setMinLimits = () => {
    if (!min || !TIME_REGEX.test(min)) {
      return;
    }

    const timeChunks = getTimeChunks(min);

    const minHour = Number(timeChunks[0]);
    const minMinutes = Number(timeChunks[1]);

    if ((minHour < 0 || minMinutes < 0) || (minHour > 23 || minMinutes > 59)) {
      return;
    }

    MIN_HOUR.current = minHour;
    MIN_MINUTES.current = minHour >= Number(hour) ? minMinutes : DEFAULT_MIN_MINUTES;
    console.log("=== MINIMUM =========================");
    console.log("Minimum hour:", MIN_HOUR.current);
    console.log("Minimum minutes:", MIN_MINUTES.current);
    console.log("Minimum minutes should be:", minHour >= Number(hour) ? minMinutes : DEFAULT_MIN_MINUTES);
  }


  const onTimeChunkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target

    if (name === "hour") {
      checkHour(value);
    } else if (name === "minutes") {
      checkMinutes(value);
    } else if (name === "seconds") {
      checkSeconds(value);
    }
  }

  const formatTimeChunk = (chunk: number | string) => {
    return Number(chunk) > 9 ? chunk.toString() : `0${chunk}`;
  }

  const inputsClassName = classNames(
    'bg-transparent border-0 h-full input-md !outline-none text-center w-8',
    inputClassName
  )

  const hourClassName = classNames(
    "pl-3 pr-0",
    inputsClassName
  )

  const minutesClassName = classNames(
    inputsClassName,
    {
      "px-0 !w-5": showSeconds,
      "pl-0 pr-3": !showSeconds
    }
  )

  const secondsClassName = classNames(
    inputsClassName,
    "pl-0 pr-3",
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
        <div
          className='flex h-full items-center'
        >
          <div
            onClick={(event) => event.stopPropagation()}
          >
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
          </div>
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
          name={name}
          onChange={(event) => console.log("Input value:", event.target.value)}
          ref={mergeRefs(inputRef, ref)}
          type="hidden"
          value={inputValue}
        />
        <UnstyledNumberInput
          autoComplete='off'
          className={hourClassName}
          disabled={disabled}
          max={MAX_HOUR.current}
          min={MIN_HOUR.current}
          name='hour'
          onBlur={onBlurInput}
          onChange={onTimeChunkChange}
          onFocus={onFocusInput}
          ref={hourInputRef}
          spellCheck={false}
          value={hour}
        />
        <div
          className='font-bold text-center text-md select-none'
          onClick={(event) => event.stopPropagation()}
        >
          :
        </div>
        <UnstyledNumberInput
          autoComplete='off'
          className={minutesClassName}
          disabled={disabled}
          max={MAX_MINUTES.current}
          min={MIN_MINUTES.current}
          name='minutes'
          onBlur={onBlurInput}
          onChange={onTimeChunkChange}
          onFocus={(event) => onFocusInput(event)}
          ref={minutesInputRef}
          spellCheck={false}
          value={minutes}
        />
        {
          showSeconds ?
            <React.Fragment>
              <div
                className='font-bold text-center text-md select-none'
                onClick={(event) => event.stopPropagation()}
              >
                :
              </div>
              <UnstyledNumberInput
                autoComplete='off'
                className={secondsClassName}
                disabled={disabled}
                max={DEFAULT_MAX_SECONDS}
                min={DEFAULT_MIN_SECONDS}
                name='seconds'
                onBlur={onBlurInput}
                onChange={onTimeChunkChange}
                onFocus={(event) => onFocusInput(event)}
                ref={secondsInputRef}
                spellCheck={false}
                value={seconds}
              />
            </React.Fragment> : null
        }
      </div>
    </BaseInput>
  )
})