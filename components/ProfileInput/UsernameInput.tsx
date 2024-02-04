'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { IconEdit } from '../assets/icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { PartialUpdateProps, UserProps } from '@/modules/types'
import { AppDispatch } from '@/app/GlobalRedux/store'
import { profileReducer } from '@/app/GlobalRedux/user'

const UsernameInput = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { user } = useSelector((state: { user: UserProps }) => state)
  const [activeName, setActiveName] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(profileReducer({ ...user.profile, name: event.target.value }))

  return (
    <>
      {activeName ? (
        <div className='flex flex-col w-full h-[190px]  bg-[#162329] p-4 ' onClick={handleFocus}>
          <div className='flex flex-row self-end justify-start flex-1 items-start ' />
          <input
            value={user.profile.name}
            onChange={onChangeName}
            ref={inputRef}
            autoFocus
            name='username'
            id='username'
            className=' w-full rounded  p-4 text-area text-white bg-[#162329] focus:outline-none'
          />
        </div>
      ) : (
        <div className=' flex flex-col w-full h-[190px]  bg-[#162329] rounded  p-4'>
          <div className='flex flex-row self-stretch items-end justify-end cursor-pointer'>
            <button
              className='outline-none focus:ring-4 shadow-lg transform active:scale-50 transition-transform'
              onClick={() => setActiveName(true)}
            >
              <IconEdit />
            </button>
          </div>
          <div className='relative flex-1 '>
            <p className='text-md text-white font-semibold absolute bottom-5'>@johndoe</p>
          </div>
        </div>
      )}
    </>
  )
}

export default UsernameInput
