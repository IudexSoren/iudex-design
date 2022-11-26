import React from 'react'
import classNames from 'classnames'
import { SliderTrackProps } from '@common/inputs/types'

export const SliderTrack = React.forwardRef<HTMLDivElement, SliderTrackProps>(({
  index,
  value,
  ...props
}, ref) => {

  const { className } = props;
  delete props.className;

  const sliderTrackClassName = classNames(
    {
      '!bg-primary': index === 0,

    },
    className,
  );

  return (
    <div
      className={sliderTrackClassName}
      ref={ref}
      {...props}
    >
    </div>
  )
})