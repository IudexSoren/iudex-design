import React from 'react'
import { NextPage } from 'next'
import { Typography } from '@common/typographies'

const Typographies: NextPage = () => {
  return (
    <div>
      <Typography
        level='h1'
        size='4xl'
      >
        Heading
      </Typography>
      <Typography
        level='h1'
        size='4xl'
      >
        Heading size 4xl
      </Typography>
      <Typography
        level='h1'
        size='sm'
      >
        Heading size sm
      </Typography>
      <Typography
        level='p'
      >
        Paragraph
      </Typography>
    </div>
  )
}

export default Typographies