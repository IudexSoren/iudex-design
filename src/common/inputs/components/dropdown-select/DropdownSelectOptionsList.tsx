import React from 'react'
import classNames from 'classnames'
import { Button } from '@common/buttons'
import { CloseIcon, SearchIcon } from '@common/icons'
import { TextInput } from '@common/inputs'
import { DropdownSelectGroupOptionProps, DropdownSelectOptionProps, DropdownSelectOptionsListProps } from '@common/inputs/types'
import { DropdownSelectCheckboxItem } from './DropdownSelectCheckboxItem'
import { DropdownSelectItem } from './DropdownSelectItem'

export const DropdownSelectOptionsList: React.FC<DropdownSelectOptionsListProps> = ({
  emptyList,
  filterable,
  filterText,
  inputSize,
  isOpen,
  lightBackground,
  listClassName,
  multiple,
  onClickItem,
  options,
  setFilterText,
  value
}) => {

  const renderOptions = React.useCallback((optionsToRender: (DropdownSelectGroupOptionProps | DropdownSelectOptionProps)[]) => {
    const filteredOptions = optionsToRender?.filter(option => option.label.toLowerCase().includes(filterText.toLowerCase()));

    return filteredOptions?.map((option, index) => {

      const itemProps = {
        key: index,
        lightBackground,
        onClickItem,
        option: option as DropdownSelectOptionProps,
      }

      if ((option as DropdownSelectGroupOptionProps).options) {
        return (
          <React.Fragment
            key={index}
          >
            <div
              className='px-3 py-1 text-zinc-500'
            >

              {option.label}
            </div>
            {renderOptions((option as DropdownSelectGroupOptionProps).options)}
          </React.Fragment>
        )
      }

      if (multiple)
        return (
          <DropdownSelectCheckboxItem
            checked={value.includes((option as DropdownSelectOptionProps).value)}
            {...itemProps}
          />
        );

      return (
        <DropdownSelectItem
          selected={value === (option as DropdownSelectOptionProps).value}
          {...itemProps}
        />
      )
    })
  }, [filterText, options]);

  const handleFilterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setFilterText(value);
  }

  const handleClearFilterText = () => {
    setFilterText('');
  }

  const dropdownContentClassName = classNames(
    'absolute border border-t-0 border-zinc-300 inset-x-0 shadow-md w-full z-20',
    {
      'bg-base-100': lightBackground,
      'bg-base-200': !lightBackground,
    },
    listClassName
  )

  if (!isOpen) return null;

  return (
    <div
      className={dropdownContentClassName}
    >
      {
        options.length === 0 ? emptyList :
          (
            <React.Fragment>
              {
                filterable && (
                  <div
                    className='p-3'
                  >
                    <TextInput
                      afterInput={
                        <Button
                          className='h-full btn-sm'
                          onClick={handleClearFilterText}
                        >
                          <CloseIcon />
                        </Button>
                      }
                      autoComplete={'off'}
                      beforeInput={
                        <div className='pl-3'>
                          <SearchIcon />
                        </div>
                      }
                      inputSize={inputSize}
                      lightBackground={!lightBackground}
                      onChange={handleFilterTextChange}
                      placeholder='Search'
                      spellCheck={false}
                      value={filterText}
                    />
                  </div>
                )
              }
              <ul
                className='max-h-[225px] overflow-auto'
              >
                {renderOptions(options)}
              </ul>
            </React.Fragment>
          )
      }
    </div>
  )
}
