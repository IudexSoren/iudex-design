import React from 'react'

import { mergeRefs } from '@common/other/merge-refs'

import { NumberInputSuffixControls } from '.'

import { TextInput } from '@common/inputs'

import { NumberInputProps } from './number-input.types'

const hyphen = '-';
const dot = '.';
const allowedCharacters = [hyphen, dot];

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  integer = false,
  max,
  min,
  onBeforeInput,
  showControls = true,
  step = 1,
  suffixInput,
  ...props
}, ref) => {

  const innerRef = React.useRef<HTMLInputElement>(null);

  const onBeforeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const compositionEvent = event as unknown as CompositionEvent;

    const { currentTarget } = event;
    let { data } = compositionEvent;
    data = data.trim();

    const { selectionStart, selectionEnd } = currentTarget;
    const isRangeSelection = selectionStart !== selectionEnd;

    const isHyphen = data === hyphen;

    if (shouldPreventDefault(data, selectionStart, selectionEnd)) {
      event.preventDefault();
    }

    let newValue: string = currentTarget.value;

    if (selectionStart !== null && selectionStart > currentTarget.value.length - 1) {
      newValue += data;
    } else {
      let added = false;
      newValue = currentTarget.value.split('').map((character, index) => {
        if (
          selectionStart !== null &&
          selectionEnd !== null &&
          isRangeSelection &&
          (index >= selectionStart && index < selectionEnd)
        ) {
          if (added) return '';

          added = true;

          return data;
        }

        if (index === selectionStart) {
          return data + character;
        }

        return character;
      }).join('');
    }

    const numberValue = Number(newValue);

    if (max !== undefined && numberValue > max) {
      event.preventDefault();
    }

    if (min !== undefined) {

      if (numberValue < min || (isHyphen && min >= 0))
        event.preventDefault();
    }

    if (!onBeforeInput) return;

    onBeforeInput(event);
  }

  const getInputValue = () => {
    return innerRef.current?.getAttribute('value') ?? '';
  }

  const shouldPreventDefault = (data: string, selectionStart: number | null, selectionEnd: number | null): boolean => {
    if (data === "") return true;

    if (!allowedCharacters.includes(data) && isNaN(Number(data))) return true;

    if (data === hyphen) {
      const amountOfHyphens = getAmountOfCharacter(hyphen);
      if (amountOfHyphens > 0) {
        return true;
      }

      if (selectionStart !== 0) {
        return true;
      }
    }

    if (data === dot) {
      const amountOfDots = getAmountOfCharacter(dot);
      if (amountOfDots > 0) {
        return true;
      }

      if (integer) {
        return true;
      }
    }

    return false;
  }

  const getAmountOfCharacter = (character: string) => {
    let amount = 0;
    for (const char of getInputValue().toString()) {
      if (char !== character) continue;

      amount++;
    }

    return amount;
  }

  const onDecrementValue = () => {
    const inputValue = Number(getInputValue());

    if (isNaN(inputValue)) return;

    let newValue = inputValue - step;
    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    innerRef.current?.setAttribute('value', newValue.toString());

    dispatchChangeEvent(newValue);
  }

  const onIncrementValue = () => {
    const inputValue = Number(getInputValue());

    if (isNaN(inputValue)) return;

    let newValue = inputValue + step;
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    innerRef.current?.setAttribute('value', newValue.toString());

    dispatchChangeEvent(newValue);
  }

  const dispatchChangeEvent = (newValue: number) => {
    if (!props.onChange) return;

    const event = new Event('change', { bubbles: true });
    innerRef.current?.dispatchEvent(event);
    (event.target as any).value = newValue;
    props.onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    innerRef.current?.setAttribute('value', event.target.value);

    if (!props.onChange) return;

    props.onChange(event);
  }

  return (
    <TextInput
      autoComplete='off'
      onBeforeInput={onBeforeInputHandler}
      ref={mergeRefs(innerRef, ref)}
      spellCheck={false}
      suffixInput={
        <React.Fragment>
          {suffixInput}
          {
            showControls ? (
              <NumberInputSuffixControls
                onDecrementValue={onDecrementValue}
                onIncrementValue={onIncrementValue}
              />
            ) : null
          }
        </React.Fragment>
      }
      {...props}
      onChange={onInputChange}
    />
  )
})