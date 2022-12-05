import React from 'react'
import { useClickOutside } from '@mantine/hooks'
import { TextInput } from './TextInput'
import { ErrorMessage } from './ErrorMessage'
import { DropdownSelectSuffixInput, DropdownSelectOptionsList } from './dropdown-select';
import { DropdownSelectGroupOptionProps, DropdownSelectOptionProps, DropdownSelectProps } from '../types'
import classNames from 'classnames';

export const DropdownSelect = React.forwardRef<HTMLInputElement, DropdownSelectProps>(({
  className,
  clearable = false,
  disabled = false,
  emptyList,
  errorMessage,
  filterable = false,
  inputClassName,
  inputSize,
  labelContent,
  lightBackground = false,
  listClassName,
  multiple = false,
  name,
  onChange,
  options = [],
  placeholder,
  prefixInput,
  readonly = false,
  suffixInput,
  value
}, ref) => {

  const [textToShow, setTextToShow] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');

  React.useEffect(() => {
    if (value === null || value.length === 0) setTextToShow('');

    getTextInputValue();
  }, [value])

  const optionsContainerRef = useClickOutside(() => {
    setFilterText('');
    setIsOpen(false);
  });

  const handleClearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!onChange || disabled || readonly) return;

    onChange({
      name: name ?? '',
      value: multiple ? [] : null
    });
  }

  const handleClickContainer = () => {
    if (disabled || readonly) return;

    setIsOpen(!isOpen);
  }

  const onClickItem = (selectedValue: any) => {
    if (disabled) return;

    if (!multiple)
      setIsOpen(false);

    if (!onChange) return;

    if (multiple) {
      const isInArray = value.includes(selectedValue);

      let newValue = [...value];
      newValue = isInArray ? newValue.filter(v => v !== selectedValue) : [...newValue, selectedValue];
      onChange({
        name: name ?? '',
        value: newValue
      });

      return;
    }

    onChange({
      name: name ?? '',
      value: selectedValue
    });
  }

  const getTextInputValue = () => {
    if (multiple) {
      if (options.length === 0) {
        setTextToShow('');

        return;
      };

      setTextToShow(options.filter((option) => value.includes((option as DropdownSelectOptionProps).value)).map(option => option.label).join(', '));

      return;
    }

    for (const option of options) {
      if (!!(option as DropdownSelectGroupOptionProps).options) {
        for (const subOption of (option as DropdownSelectGroupOptionProps).options) {
          if (subOption.value !== value) continue;

          setTextToShow(subOption.label);

          return;
        }
      }

      if ((option as DropdownSelectOptionProps).value !== value) continue;

      setTextToShow((option as DropdownSelectOptionProps).label);

      return;
    }
  }

  const containerClassName = classNames(
    "cursor-pointer",
    className,
  )

  const dropdownSelectInputClassName = classNames(
    'cursor-pointer',
    inputClassName
  )

  return (
    <div
      className='relative'
      ref={optionsContainerRef}
    >
      <div
        onClick={handleClickContainer}
        tabIndex={disabled ? -1 : 0}
      >
        <TextInput
          autoComplete="off"
          className={containerClassName}
          disabled={disabled}
          errorMessage={!!errorMessage}
          inputClassName={dropdownSelectInputClassName}
          inputSize={inputSize}
          labelContent={labelContent}
          lightBackground={lightBackground}
          placeholder={placeholder}
          prefixInput={
            <React.Fragment>
              {
                multiple && (
                  <div className='pl-3'>
                    <div
                      className='bg-black cursor-default px-4 rounded-full text-white'
                    >
                      {value.length}
                    </div>
                  </div>
                )
              }
              {prefixInput}
            </React.Fragment>
          }
          readOnly={true}
          ref={ref}
          spellCheck={false}
          staticLabel
          suffixInput={
            <DropdownSelectSuffixInput
              suffixInput={suffixInput}
              clearable={clearable}
              disabled={disabled}
              handleClearSelection={handleClearSelection}
              hasValue={multiple ? value.length !== 0 : !!value}
              isOpen={isOpen}
              lightBackground={lightBackground}
              readonly={readonly}
            />
          }
          value={textToShow}
        />
      </div>
      <DropdownSelectOptionsList
        emptyList={emptyList}
        filterText={filterText}
        filterable={filterable}
        inputSize={inputSize}
        isOpen={isOpen}
        lightBackground={lightBackground}
        listClassName={listClassName}
        multiple={multiple}
        onClickItem={onClickItem}
        options={options}
        setFilterText={setFilterText}
        value={value}
      />
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