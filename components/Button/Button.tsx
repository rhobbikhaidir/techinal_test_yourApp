import React from 'react'
import { IconLoading } from '../assets/icons/icons'

interface BTN {
  disabled: boolean
  isLoading: boolean
  title: string
}

const Button: React.FC<BTN> = ({ disabled, isLoading, title }) => {
  return (
    <button
      type='submit'
      className={`w-[327px] h-[51px] text-white bg-second mt-[40px] rounded-[9px] disabled:opacity-[0.3] outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform`}
      disabled={disabled}
    >
      {isLoading ? (
        <div className='flex flex-row items-center justify-center'>
          <span className='text-sm pr-1'>Loading..</span>
          <IconLoading />
        </div>
      ) : (
        title
      )}
    </button>
  )
}

export default Button
