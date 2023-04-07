import React from 'react'
import classNames from 'classnames'
import { Button } from '@common/buttons'
import { CloseIcon, SearchIcon } from '@common/icons'
import { TextInput } from '@common/inputs'
import { DropdownSelectOptionsListProps } from '@common/inputs/components/dropdown-select/dropdown-select.types'
import { DropdownSelectCheckboxItem } from './DropdownSelectCheckboxItem'
import { DropdownSelectItem } from './DropdownSelectItem'
import { Typography } from '@common/typographies'

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

  const filterInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (filterable) {
      filterInputRef.current?.focus();
    }
  }, [isOpen]);

  const renderOptions = React.useCallback((optionsToRender: (DropdownSelectGroupOptionProps | DropdownSelectOptionProps)[]) => {
    const filteredOptions = filterOptionsToRender(optionsToRender);

    if (filteredOptions.length === 0 && filterText.length > 0) {
      return (
        <Typography
          className='p-3 truncate'
          level='div'
          size='sm'
        >
          No results found for "{filterText}"
        </Typography>
      )
    }

    return filteredOptions?.map((option, index) => {

      const itemProps = {
        key: index,
        lightBackground,
        onClickItem,
        option: option as DropdownSelectOptionProps,
      }

      if ((option as DropdownSelectGroupOptionProps).options) {
        const subOptions = [...(option as DropdownSelectGroupOptionProps).options];
        if (option.disabled) {
          for (const subOption of subOptions) {
            subOption.disabled = true;
          }
        }

        return (
          <React.Fragment
            key={index}
          >
            <div
              className='flex gap-1 items-center px-3 py-1 text-zinc-500'
            >
              <span className='text-xs'>{option.label}</span>
            </div>
            {renderOptions(subOptions)}
            <hr className=' border-zinc-300 w-full' />
          </React.Fragment>
        )
      }

      if (multiple) {
        return (
          <DropdownSelectCheckboxItem
            checked={value.includes((option as DropdownSelectOptionProps).value)}
            {...itemProps}
          />
        );
      }

      return (
        <DropdownSelectItem
          selected={value === (option as DropdownSelectOptionProps).value}
          {...itemProps}
        />
      )
    })
  }, [filterText, options, value]);

  const filterOptionsToRender = (optionsToRender: (DropdownSelectGroupOptionProps | DropdownSelectOptionProps)[]) => {
    const filteredOptions = optionsToRender?.filter((option) =>
      !!(option as DropdownSelectGroupOptionProps).options ? true :
        option.label.toLowerCase().includes(filterText.toLowerCase())
    );

    return filteredOptions;
  }

  const handleFilterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setFilterText(value);
  }

  const handleClearFilterText = () => {
    setFilterText('');
  }

  const dropdownContentClassName = classNames(
    listClassName,
    'absolute border border-t-0 border-zinc-300 inset-x-0 shadow-md w-full z-20',
    {
      'bg-base-100': lightBackground,
      'bg-base-200': !lightBackground,
    },
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
                filterable ? (
                  <TextInput
                    autoComplete={'off'}
                    className="border-t-0 border-x-0"
                    inputClassName='pr-0'
                    inputSize={inputSize}
                    lightBackground={!lightBackground}
                    onChange={handleFilterTextChange}
                    placeholder='Search'
                    prefixInput={
                      <div className='pl-3'>
                        <SearchIcon />
                      </div>
                    }
                    ref={filterInputRef}
                    spellCheck={false}
                    suffixInput={
                      <Button
                        className='btn-sm btn-ghost h-full '
                        onClick={handleClearFilterText}
                      >
                        <CloseIcon />
                      </Button>
                    }
                    value={filterText}
                  />
                ) :
                  null
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