import React from 'react'

import { mergeRefs } from '@common/other/merge-refs'

import { UnstyledTextInput } from '../text-input'
import { UnstyledNumberInputProps } from './number-input.types'

const hyphen = '-';
const dot = '.';
const allowedCharacters = [hyphen, dot];

export const UnstyledNumberInput = React.forwardRef<HTMLInputElement, UnstyledNumberInputProps>(({
  integer = false,
  max,
  min,
  onBeforeInput,
  step = 1,
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

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    innerRef.current?.setAttribute('value', event.target.value);

    if (!props.onChange) return;

    props.onChange(event);
  }

  return (
    <UnstyledTextInput
      {...props}
      onBeforeInput={onBeforeInputHandler}
      onChange={onInputChange}
      ref={mergeRefs(innerRef, ref)}
    />
  )

})