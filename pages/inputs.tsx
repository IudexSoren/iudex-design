import React from 'react'
import { NextPage } from 'next'

import { Checkbox, DateTimePicker, DropdownSelect, Radio, TextInput, NumberInput, TimePicker } from '@common/inputs'
import { Typography } from '@common/typographies'

import { CancelIcon, CheckmarkFilledIcon, ForwardArrowIcon, PasswordIcon, UserIcon } from '@common/icons'

const Inputs: NextPage = () => {

  const [formState, setFormState] = React.useState({
    birthdate: null,
    bookingDate: [null, null],
    carBrand: null,
    country: null,
    limit: 10,
    password: '',
    playlist: null,
    playlistGrouped: null,
    playlists: [],
    rememberMe: true,
    role: 'admin',
    time: '03:04',
    username: '',
  })

  React.useEffect(() => {
    // console.table(formState)
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

  const playlists = React.useMemo<DropdownSelectOptionProps[]>(() => [
    {
      label: 'Music',
      value: 1,
    },
    {
      disabled: true,
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

  const playlistsGrouped = React.useMemo<(DropdownSelectOptionProps | DropdownSelectGroupOptionProps)[]>(() => [
    {
      label: 'Music',
      options: [
        {
          label: 'Pop',
          value: 1,
        },
        {
          disabled: true,
          label: 'Rock',
          value: 2,
        },
        {
          label: 'Metal',
          value: 3,
        },
      ]
    },
    {
      disabled: true,
      label: 'Cars',
      options: [
        {
          label: 'BMW',
          value: 4,
        },
        {
          label: 'Ford',
          value: 5,
        },
        {
          label: 'Ferrari',
          value: 6,
        }
      ]
    },
    {
      label: 'Random stuff',
      value: 7,
    }
  ], [formState]);

  const carBrands = React.useMemo<DropdownSelectOptionProps[]>(() => [
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
    },
    {
      label: 'Mercedes-Benz',
      value: 7,
    },
    {
      label: 'Honda',
      value: 8,
    },
    {
      label: 'Audi',
      value: 9,
    },
    {
      label: 'Subaru',
      value: 10,
    },
    {
      label: 'Porsche',
      value: 11,
    }
  ], [formState]);

  return (
    <div
      className='flex flex-col gap-3 p-3 py-10'
    >
      <Typography
        className='font-bold mb-5'
        level='h1'
        size='4xl'
      >
        Inputs
      </Typography>

      {/* TextInput section */}
      <div>
        <Typography
          className='mb-4'
          level='h2'
          size='3xl'
        >
          TextInput
        </Typography>

        {/* Overview section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Overview
          </Typography>
          <TextInput
            suffixInput={
              <div className='pr-3'>
                <CheckmarkFilledIcon />
              </div>
            }
            prefixInput={
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
        </div>
        {/* End of Overview section */}

        {/* Sizes section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Sizes
          </Typography>
          <div
            className='flex flex-col sm:flex-row gap-3'
          >
            <TextInput
              autoComplete={'off'}
              labelContent="LG size"
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              inputSize='lg'
              spellCheck={false}
              value={formState.username}
            />
            <TextInput
              autoComplete={'off'}
              labelContent="MD size (Default)"
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              spellCheck={false}
              value={formState.username}
            />
            <TextInput
              autoComplete={'off'}
              inputSize='sm'
              labelContent="SM size"
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              value={formState.username}
            />
            <TextInput
              autoComplete={'off'}
              inputSize='xs'
              labelContent="XS size"
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              value={formState.username}
            />
          </div>
        </div>
        {/* End of Sizes section */}

        {/* States section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            States
          </Typography>
          <div
            className='flex flex-col sm:flex-row gap-3'
          >
            <TextInput
              suffixInput={
                <div className='pr-3'>
                  <CheckmarkFilledIcon />
                </div>
              }
              autoComplete={'off'}
              prefixInput={
                <div className='pl-3'>
                  <UserIcon />
                </div>
              }
              labelContent={(<div className='flex items-center gap-2'><UserIcon /> Username (Readonly)</div>)}
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              readOnly
              spellCheck={false}
              value={formState.username}
            />
            <TextInput
              disabled
              suffixInput={
                <div className='pr-3'>
                  <CheckmarkFilledIcon />
                </div>
              }
              autoComplete={'off'}
              prefixInput={
                <div className='pl-3'>
                  <UserIcon />
                </div>
              }
              labelContent={(<div className='flex items-center gap-2'><UserIcon /> Username (Disabled)</div>)}
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              spellCheck={false}
              value={formState.username}
            />
            <TextInput
              suffixInput={
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
              labelContent={'Username (Error)'}
              name='username'
              onChange={onInputChange}
              placeholder='E.g.: Iudex, Soren, ...'
              value={formState.username}
            />
          </div>
        </div>
        {/* End of States section */}

        {/* Types section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Types
          </Typography>
          <div
            className='flex flex-col sm:flex-row flex-wrap gap-3'
          >
            <div>
              <Typography
                className='mb-3'
                level='h4'
                size='xl'
              >
                Text
              </Typography>
              <TextInput
                suffixInput={
                  <div className='pr-3'>
                    <CheckmarkFilledIcon />
                  </div>
                }
                prefixInput={
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
            </div>
            <div>
              <Typography
                className='mb-3'
                level='h4'
                size='xl'
              >
                Password
              </Typography>
              <TextInput
                suffixInput={
                  <div className='pr-3'>
                    <CheckmarkFilledIcon />
                  </div>
                }
                prefixInput={
                  <div className='pl-3'>
                    <PasswordIcon />
                  </div>
                }
                autoComplete={'off'}
                id='password'
                labelContent={(<div className='flex items-center gap-2'><PasswordIcon /> Password</div>)}
                name='password'
                onChange={onInputChange}
                spellCheck={false}
                type='password'
                value={formState.password}
              />
            </div>
          </div>
        </div>
        {/* End of Types section */}
      </div>
      {/* End of TextInput section */}

      {/* NumberInput section */}
      <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h2'
          size='3xl'
        >
          NumberInput
        </Typography>

        <NumberInput
          labelContent='Set limit'
          max={5}
          min={-6}
          name="limit"
          onChange={onInputChange}
          step={2}
          value={formState.limit}
        />
      </div>
      {/* End of NumberInput section */}

      {/* Checkbox section */}
      <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h2'
          size='3xl'
        >
          Checkbox
        </Typography>

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
      </div>
      {/* End of Checkbox section */}

      {/* Radio section */}
      <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h2'
          size='3xl'
        >
          Radio
        </Typography>

        <div>
          <div>Select a role</div>
          <div
            className='flex gap-4 mt-2'
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
      </div>
      {/* End of Radio section */}

      {/* DropdownSelect section */}
      <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h2'
          size='3xl'
        >
          DropdownSelect
        </Typography>

        {/* Overview section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Overview
          </Typography>
          <DropdownSelect
            clearable
            labelContent='Playlist'
            name='playlist'
            onChange={onSelectChange}
            options={playlists}
            placeholder='Select a playlist'
            value={formState.playlist}
          />
        </div>
        {/* End of Overview section */}

        {/* Multiple section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Multiple
          </Typography>
          <DropdownSelect
            clearable
            labelContent='Add to playlist'
            multiple
            name='playlists'
            onChange={onSelectChange}
            options={playlists}
            placeholder='Select at least one playlist'
            value={formState.playlists}
          />
        </div>
        {/* End of Multiple section */}

        {/* Filterable section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Filterable
          </Typography>
          <DropdownSelect
            filterable
            labelContent='Car brand'
            name='carBrand'
            onChange={onSelectChange}
            options={carBrands}
            placeholder='Select a car brand'
            value={formState.carBrand}
          />
        </div>
        {/* End of Filterable section */}

        {/* Grouped options */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Grouped options
          </Typography>
          <DropdownSelect
            clearable
            labelContent='Playlist (Grouped)'
            name='playlistGrouped'
            onChange={onSelectChange}
            options={playlistsGrouped}
            placeholder='Select a playlist'
            value={formState.playlistGrouped}
          />
        </div>
        {/* End of Grouped options */}

        {/* Clearable section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Clearable
          </Typography>
          <DropdownSelect
            clearable
            labelContent='Playlist (Readonly)'
            lightBackground
            name='playlist'
            onChange={onSelectChange}
            options={playlists}
            placeholder='Select a playlist'
            value={formState.playlist}
          />
        </div>
        {/* End of Clearable section */}

        {/* States section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            States
          </Typography>
          <div
            className='flex flex-col sm:flex-row gap-3'
          >
            <DropdownSelect
              labelContent='Playlist (Readonly)'
              name='playlist'
              onChange={onSelectChange}
              options={playlists}
              placeholder='Select a playlist'
              readonly
              value={formState.playlist}
            />
            <DropdownSelect
              disabled
              labelContent='Car brand'
              name='carBrand'
              onChange={onSelectChange}
              options={carBrands}
              placeholder='Select a car brand'
              value={formState.carBrand}
            />
            <DropdownSelect
              errorMessage={
                <div className='flex gap-1 items-center'>
                  <CancelIcon /> Required
                </div>
              }
              filterable
              labelContent='Car brand'
              name='carBrand'
              onChange={onSelectChange}
              options={carBrands}
              placeholder='Select a car brand'
              value={formState.carBrand}
            />
          </div>
        </div>
        {/* End of States section */}

        {/* Empty list section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Empty list
          </Typography>
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
        {/* End of Empty list section */}
      </div>
      {/* End of DropdownSelect section */}

      {/* Radio section */}
      <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h2'
          size='3xl'
        >
          TimePicker
        </Typography>

        <div className='mb-5'>
          <TimePicker
            labelContent="Time"
            max='05:40'
            min='03:03'
            name='time'
            onChange={onInputChange}
            showSeconds
            value={formState.time}
          />
        </div>
        <div className='mb-5'>
          {/* <TimePicker
            format='12h'
            labelContent="Time"
          /> */}
        </div>
      </div>
      {/* End of Radio section */}

      {/* DateTimePicker section */}
      <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h3'
          size='3xl'
        >
          DateTimePicker
        </Typography>

        {/* Overview section */}
        <div
          className='mb-5'
        >
          <Typography
            className='mb-3'
            level='h3'
            size='2xl'
          >
            Overview
          </Typography>
          <DateTimePicker

          />
        </div>
        {/* End of Overview section */}
      </div>
      {/* End of DateTimePicker */}

      {/* Slider section */}
      {/* <div
        className='mb-5'
      >
        <Typography
          className='mb-4'
          level='h3'
          size='3xl'
        >
          Slider
        </Typography>
        <Slider
          errorMessage={
            <div className='flex gap-1 items-center'>
              <CancelIcon /> Required
            </div>
          }
          labelContent='Amount'
          value={[26, 47, 70]}
        />
      </div> */}
      {/* End of Slider section */}



    </div>
  )
}

export default Inputs