import React from 'react'
import { useClickOutside } from '@mantine/hooks'
import { CloseIcon, SearchIcon } from '@common/icons'
import { TextInput } from './TextInput'
import { ErrorMessage } from './ErrorMessage'
import { DropdownSelectAfterInput, DropdownSelectOptionsList } from './dropdown-select';
import { DropdownSelectProps } from '../types'
import classNames from 'classnames';

export const DropdownSelect = React.forwardRef<HTMLDivElement, DropdownSelectProps>(({
  afterInput,
  beforeInput,
  className,
  clearable = false,
  disabled = false,
  emptyList,
  errorMessage,
  filterable = false,
  inputSize,
  labelContent,
  lightBackground = false,
  listClassName,
  multiple = false,
  name,
  onChange,
  options = [],
  placeholder,
  value
}, ref) => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');

  const optionsContainerRef = useClickOutside(() => {
    setFilterText('');
    setIsOpen(false)
  });

  const handleClearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!onChange || disabled) return;

    onChange({
      name: name ?? '',
      value: multiple ? [] : null
    });
  }

  const handleClickContainer = () => {
    if (disabled) return;

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
      if (options.length === 0) return '';

      return options.filter(option => value.includes(option.value)).map(option => option.label).join(', ');
    }

    return options.find(option => option.value === value)?.label ?? '';
  }

  const containerClassName = classNames(
    "cursor-pointer",
    className,
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
          afterInput={
            <DropdownSelectAfterInput
              afterInput={afterInput}
              clearable={clearable}
              disabled={disabled}
              handleClearSelection={handleClearSelection}
              isOpen={isOpen}
              lightBackground={lightBackground}
              hasValue={multiple ? value.length !== 0 : !!value}
            />
          }
          beforeInput={
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
              {beforeInput}
            </React.Fragment>
          }
          autoComplete="off"
          className={containerClassName}
          disabled={disabled}
          inputSize={inputSize}
          isSelect={true}
          labelContent={labelContent}
          lightBackground={lightBackground}
          readOnly={true}
          spellCheck={false}
          staticLabel
          placeholder={placeholder}
          value={getTextInputValue()}
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
        errorMessage && (
          <ErrorMessage className='mt-1'>
            {errorMessage}
          </ErrorMessage>
        )
      }
    </div>
  )
})