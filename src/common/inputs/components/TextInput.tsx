import React from 'react'
import classNames from 'classnames'
import { mergeRefs } from '@common/other/merge-refs'
import { ErrorMessage } from './ErrorMessage'
import { TextInputProps } from '../types'
import { FocusElement } from '@common/other/components/FocusElement'

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({
  suffixInput,
  prefixInput,
  className,
  errorMessage,
  inputClassName,
  inputSize = 'md',
  labelContent,
  lightBackground = false,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  staticLabel = true,
  ...props
}, ref) => {

  let labelTranslateClass = 'translate-y-[165%]';

  switch (inputSize) {
    case 'xs':
      labelTranslateClass = 'translate-y-[115%]';
      break;
    case 'sm':
      labelTranslateClass = 'translate-y-[135%]';
      break;
    case 'md':
      labelTranslateClass = 'translate-y-[165%]';
      break;
    case 'lg':
      labelTranslateClass = 'translate-y-[200%]';
      break;
    default:
      labelTranslateClass = 'translate-y-[165%]';
  }

  const [hasValue, setHasValue] = React.useState(!!props.value);
  const [hasFocus, setHasFocus] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const labelContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    addFocusClasses();
  }, []);

  const handleClickContainer = () => {
    inputRef.current?.focus();
  }

  const addFocusClasses = () => {
    if (staticLabel || !labelContent || !labelContainerRef.current || inputRef.current?.value) return;

    labelContainerRef.current.classList.add('!px-3', labelTranslateClass)
  }

  const removeFocusClasses = () => {
    if (staticLabel || !labelContent || !labelContainerRef.current) return;

    labelContainerRef.current.classList.remove('!px-3', labelTranslateClass)
  }

  const onFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);
    removeFocusClasses();

    if (onFocus) {
      onFocus(event);
    }
  }

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
    addFocusClasses();

    if (onBlur) {
      onBlur(event);
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!inputRef.current?.value);

    if (onChange) {
      onChange(event);
    }
  }

  const inputContainerClassName = classNames(
    'border-zinc-300 flex input p-0 relative',
    className,
    {
      'bg-base-100': lightBackground,
      'bg-base-200': !lightBackground
    },
    {
      'input-xs': inputSize === 'xs',
      'input-sm': inputSize === 'sm',
      'input-md': inputSize === 'md',
      'input-lg': inputSize === 'lg',
    }
  )

  const inputInternalClassName = classNames(
    'bg-transparent border-0 flex-grow h-full input !outline-none px-3 w-full',
    {
      "text-black": props.disabled
    },
    inputClassName
  )

  const labelContainerClassName = classNames(
    'duration-300 px-0 relative transition-all z-10',
    {
      'opacity-50': props.disabled,
      'pointer-events-none': !staticLabel && !props.value
    }
  )

  const sideComponentsClassName = classNames(
    'flex items-center justify-center relative',
    {
      'opacity-0': !hasValue && !hasFocus && !staticLabel && labelContent,
      '!bg-base-200 cursor-not-allowed opacity-50': props.disabled
    }
  )

  const borderClasses = className?.split(' ').filter(cl => cl.includes('border') || cl.includes('rounded'));
  const focusElementClassName = classNames(
    {
      "border-b-zinc-300": !hasFocus && !errorMessage,
      "!border-error": !!errorMessage,
    },
    borderClasses
  )

  return (
    <div className='flex flex-col gap-1 relative'>
      <div className='flex flex-col gap-1'>
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
        <div
          className={inputContainerClassName}
          onClick={handleClickContainer}
        >
          {
            !!prefixInput &&
            (
              <div
                className={sideComponentsClassName}
              >
                {prefixInput}
              </div>
            )
          }
          <input
            {...props}
            className={inputInternalClassName}
            onBlur={onBlurInput}
            onChange={onInputChange}
            onFocus={onFocusInput}
            placeholder={(hasFocus || staticLabel || !labelContent) ? placeholder : ''}
            ref={mergeRefs(inputRef, ref)}
          />
          {
            !!suffixInput &&
            (
              <div
                className={sideComponentsClassName}
              >
                {suffixInput}
              </div>
            )
          }
          <FocusElement
            className={focusElementClassName}
            hasFocus={hasFocus}
          />
        </div>
      </div>
      {
        typeof errorMessage !== 'boolean' ?
          (
            <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
          ) :
          null
      }
    </div >
  )
})
