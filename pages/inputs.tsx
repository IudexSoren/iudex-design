import React from 'react'
import { NextPage } from 'next'
import { CancelIcon, CheckmarkFilledIcon, ForwardArrowIcon, PasswordIcon, UserIcon } from '@common/icons'
import { Checkbox, DateTimePicker, DropdownSelect, DropdownSelectEvent, Radio, TextInput, DropdownSelectOptionProps, DateTimePickerEvent } from '@common/inputs'
import { Button } from '@common/buttons'

const Inputs: NextPage = () => {

  const [formState, setFormState] = React.useState({
    birthdate: null,
    booking: [null, null],
    carBrand: null,
    country: null,
    password: '',
    playlist: null,
    playlists: [],
    rememberMe: true,
    role: 'admin',
    username: '',
  })

  React.useEffect(() => {
    console.table(formState)
  }, [formState])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onCheckToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name } = target;

    if (!Object.hasOwn(formState, name)) return;

    setFormState({
      ...formState,
      [name]: !(formState as any)[name]
    })
  }

  const onSelectChange = (event: DropdownSelectEvent) => {
    const { name, value } = event;

    if (!Object.hasOwn(formState, name)) return;

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onDateTimePickerChange = (event: DateTimePickerEvent) => {
    const { name, value } = event;

    if (!Object.hasOwn(formState, name)) return;

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const dropdownSelectOptions: DropdownSelectOptionProps[] = React.useMemo(() => [
    {
      label: 'Music',
      value: 1,
    },
    {
      label: 'Games',
      value: 2,
    },
    {
      label: 'Funny',
      value: 3,
    },
    {
      label: 'Motivation',
      value: 4,
    },
    {
      label: 'Cars',
      value: 5,
    },
    {
      label: 'Landscapes',
      value: 6,
    }
  ], [formState]);

  const carBrands: DropdownSelectOptionProps[] = React.useMemo(() => [
    {
      label: 'BMW',
      value: 1,
    },
    {
      label: 'Bugatti',
      value: 2,
    },
    {
      label: 'Ferrari',
      value: 3,
    },
    {
      label: 'Chevrolet',
      value: 4,
    },
    {
      label: 'Ford',
      value: 5,
    },
    {
      label: 'Nissan',
      value: 6,
    }
  ], [formState]);

  return (
    <div
      className='flex flex-col gap-3 p-3 py-10'
    >
      <TextInput
        disabled
        afterInput={
          <div className='pr-3'>
            <CheckmarkFilledIcon />
          </div>
        }
        autoComplete={'off'}
        beforeInput={
          <div className='pl-3'>
            <UserIcon />
          </div>
        }
        labelContent={(<div className='flex items-center gap-2'><UserIcon /> Username</div>)}
        name='username'
        onChange={onInputChange}
        placeholder='E.g.: Iudex, Soren, ...'
        spellCheck={false}
        value={formState.username}
      />
      <TextInput
        afterInput={
          <div className='pr-3'>
            <CheckmarkFilledIcon />
          </div>
        }
        beforeInput={
          <div className='pl-3'>
            <UserIcon />
          </div>
        }
        autoComplete={'off'}
        labelContent={(<div className='flex items-center gap-2'><UserIcon /> Username</div>)}
        name='username'
        onChange={onInputChange}
        placeholder='E.g.: Iudex, Soren, ...'
        spellCheck={false}
        value={formState.username}
      />
      <TextInput
        beforeInput={
          <div className='pl-3'>
            <PasswordIcon />
          </div>
        }
        autoComplete={'off'}
        id='password'
        labelContent={(<div className='flex items-center gap-2'><PasswordIcon /> Password</div>)}
        lightBackground
        name='password'
        onChange={onInputChange}
        spellCheck={false}
        type='password'
        value={formState.password}
      />
      <TextInput
        afterInput={
          <div className='pr-3'>
            <ForwardArrowIcon />
          </div>
        }
        autoComplete={'off'}
        id='username'
        labelContent={'Username'}
        name='username'
        onChange={onInputChange}
        placeholder='E.g.: Iudex, Soren, ...'
        value={formState.username}
        spellCheck={false}
        staticLabel
      />
      <TextInput
        afterInput={
          <div className='pr-3'>
            <ForwardArrowIcon />
          </div>
        }
        autoComplete={'off'}
        errorMessage={
          <div className='flex gap-1 items-center'>
            <CancelIcon /> Required
          </div>
        }
        labelContent={'Username'}
        name='username'
        onChange={onInputChange}
        placeholder='E.g.: Iudex, Soren, ...'
        value={formState.username}
      />
      <Checkbox
        checked={formState.rememberMe}
        containerClassName='flex-row-reverse gap-3'
        errorMessage={
          <div className='flex gap-1 items-center'>
            <CancelIcon /> Required
          </div>
        }
        labelContent={
          <div className='flex-grow'>
            Remember username
          </div>
        }
        name='rememberMe'
        onChange={onCheckToggleChange}
      />
      <div>
        <div>Select a role</div>
        <div
          className='flex gap-2'
        >
          <Radio
            containerClassName='flex-row-reverse gap-3'
            labelContent={
              <div className='flex-grow'>
                Admin
              </div>
            }
            name='role'
            onChange={onInputChange}
            checked={formState.role === 'admin'}
            value='admin'
          />
          <Radio
            containerClassName='flex-row-reverse gap-3'
            labelContent={
              <div className='flex-grow'>
                Customer
              </div>
            }
            name='role'
            onChange={onInputChange}
            checked={formState.role === 'customer'}
            value='customer'
          />
        </div>
      </div>
      <DateTimePicker
        clearable
        labelContent='Birthdate'
        name='birthdate'
        onChange={onDateTimePickerChange}
        placeholderText='Set your birthdate'
        todayButton={(
          <Button
            className='btn-ghost !py-2 w-full'
          >
            Today
          </Button>
        )}
        value={formState.birthdate}
      />
      <DateTimePicker
        clearable
        labelContent='Booking'
        name='booking'
        onChange={onDateTimePickerChange}
        placeholderText='Set your booking'
        selectsRange={true}
        todayButton={(
          <Button
            className='btn-ghost !py-2 w-full'
          >
            Today
          </Button>
        )}
        value={formState.booking}
      />
      <DropdownSelect
        clearable
        labelContent='Playlist'
        lightBackground
        name='playlist'
        onChange={onSelectChange}
        options={dropdownSelectOptions}
        placeholder='Select a playlist'
        value={formState.playlist}
      />
      <DropdownSelect
        clearable
        labelContent='Playlist'
        lightBackground
        name='playlist'
        onChange={onSelectChange}
        options={dropdownSelectOptions}
        placeholder='Select a playlist'
        readonly
        value={formState.playlist}
      />
      <DropdownSelect
        errorMessage={
          <div className='flex gap-1 items-center'>
            <CancelIcon /> Required
          </div>
        }
        filterable
        labelContent='Car brand'
        lightBackground
        name='carBrand'
        onChange={onSelectChange}
        options={carBrands}
        placeholder='Select a car brand'
        value={formState.carBrand}
      />
      <DropdownSelect
        disabled
        errorMessage={
          <div className='flex gap-1 items-center'>
            <CancelIcon /> Required
          </div>
        }
        filterable
        labelContent='Car brand'
        lightBackground
        name='carBrand'
        onChange={onSelectChange}
        options={carBrands}
        placeholder='Select a car brand'
        value={formState.carBrand}
      />
      <DropdownSelect
        filterable
        labelContent='Add to playlist'
        multiple
        name='playlists'
        onChange={onSelectChange}
        options={dropdownSelectOptions}
        placeholder='Select at least one playlist'
        value={formState.playlists}
      />
      <DropdownSelect
        emptyList={
          <div
            className='p-3 text-center'
          >
            No countries in this list
          </div>
        }
        labelContent='Country'
        lightBackground
        name='country'
        onChange={onSelectChange}
        options={[]}
        placeholder='Select a country'
        value={formState.country}
      />

    </div>
  )
}

export default Inputs