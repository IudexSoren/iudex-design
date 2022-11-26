import React from 'react'
import { SliderThumbProps } from '@common/inputs/types'

export const SliderThumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(({
  index,
  value,
  valueNow,
  ...props
}, ref) => {

  return (
    <div
      {...props}
      ref={ref}
    >
    </div>
  )
})