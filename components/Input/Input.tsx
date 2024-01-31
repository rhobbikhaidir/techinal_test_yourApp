'use client'
import { InputProps } from '@/modules/types'
import React from 'react'

const Input = (props: InputProps) => {
  return (
    <div className={`relative w-[327px] h-[51px] py-[${props.py || '40px'}]`}>
      <input
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        className={`w-[327px] h-[51px] bg-[#ffffff0f] rounded-[9px] text-white p-[18px] focus:border-none ${props.err && 'border-2 border-red-900 focus:border-red-900 focus:border-2'} ${props.className}`}
      />
      {props.err && <p className='text-xs text-red-600'>{props.messageErr}</p>}
      {props.suffixIcon && (
        <div
          className='absolute top- bottom-0 right-0 pr-3 flex items-center text-sm leading-5 text-white cursor-pointer'
          onClick={props.onClickIcon}
        >
          {props.suffixIcon}
        </div>
      )}
    </div>
  )
}

export default Input
