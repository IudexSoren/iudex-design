import React from 'react'
import { useClickOutside } from '@mantine/hooks'
import { TextInput } from './TextInput'
import { ErrorMessage } from './ErrorMessage'
import { DropdownSelectAfterInput, DropdownSelectOptionsList } from './dropdown-select';
import { DropdownSelectGroupOptionProps, DropdownSelectOptionProps, DropdownSelectProps } from '../types'
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
  readonly = false,
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

      setTextToShow((option as DropdownSelectOptionProps).label)

      return;
    }

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
              hasValue={multiple ? value.length !== 0 : !!value}
              isOpen={isOpen}
              lightBackground={lightBackground}
              readonly={readonly}
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
          errorMessage={!!errorMessage}
          inputSize={inputSize}
          showAfterAndBeforeInput={true}
          labelContent={labelContent}
          lightBackground={lightBackground}
          readOnly={true}
          spellCheck={false}
          staticLabel
          placeholder={placeholder}
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
        errorMessage && (
          <ErrorMessage className='mt-1'>
            {(typeof errorMessage !== 'boolean') ? errorMessage : ''}
          </ErrorMessage>
        )
      }
    </div>
  )
})