import React from 'react'
import { NextPage } from 'next'
import { Button } from '../src/common'
import { ForwardArrowIcon } from '../src/common/icons'

const Buttons: NextPage = () => {

  const buttonRef = React.useRef(null);

  return (
    <div
      className='h-screen'
    >
      <Button
        className='btn-primary gap-2 py-2'
        ref={buttonRef}
      >
        <span>
          Button text
        </span>
        <ForwardArrowIcon className='text-xl' />
      </Button>
      <Button
        className='btn-secondary gap-2 py-2'
        ref={buttonRef}
      >
        <span>
          Button text
        </span>
        <ForwardArrowIcon className='text-xl' />
      </Button>
      <Button
        className='btn-ghost gap-2 py-2'
        ref={buttonRef}
      >
        <span>
          Button text
        </span>
        <ForwardArrowIcon className='text-xl' />
      </Button>
    </div>
  )
}

export default Buttons;