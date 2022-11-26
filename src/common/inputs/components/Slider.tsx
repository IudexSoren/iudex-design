import React from 'react'
import ReactSlider from 'react-slider'
import { ErrorMessage } from './ErrorMessage'
import { SliderProps } from '../types'
import { SliderMark, SliderThumb, SliderTrack } from './slider-parts'

export const Slider: React.FC<SliderProps> = ({
  errorMessage,
  labelContent,
  ...props
}) => {
  return (
    <div>
      <div
        className='flex flex-col gap-1'
      >
        {labelContent}
        <ReactSlider
          className='h-1 my-2'
          thumbActiveClassName='bg-red-900'
          thumbClassName="bg-primary cursor-grab p-2 rounded-full -translate-y-1/3"
          trackClassName="bg-zinc-500 h-1"
          renderMark={(props) => null}
          renderThumb={(props, state) => <SliderThumb key={state.index} {...state} {...props} />}
          renderTrack={(props, state) => <SliderTrack key={state.index} {...state} {...props} />}
          {...props}
        />
      </div>
      {
        typeof errorMessage !== 'boolean' ?
          (
            <ErrorMessage className='mt-2'>
              {errorMessage}
            </ErrorMessage>
          ) :
          null
      }
    </div>
  )
}