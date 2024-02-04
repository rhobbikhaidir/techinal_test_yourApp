'use client'
import React, { useRef, useState } from 'react'
import { IconEdit, IconPlus } from '../assets/icons/icons'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { UserProps } from '@/modules/types'
import { AppDispatch } from '@/app/GlobalRedux/store'
import {
  genderReducer,
  horoscopeReducer,
  imageReducer,
  profileReducer,
  zodiacReducer
} from '@/app/GlobalRedux/user'
import Image from 'next/image'
import GlobalHelper from '@/modules/GlobalHelper'

const AboutInput = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { user } = useSelector((state: { user: UserProps }) => state)
  const labelAbout = [
    'Display Name',
    'Gender',
    'Brithday',
    'Horoscope',
    'Zodiac',
    'Height',
    'Weight'
  ]


  const [activeAbout, setActiveAbout] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFocus = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e && e.target && e.target.files
    if (files && files.length > 0 && !isEmpty(files)) {
      const reader: any = new FileReader()
      reader.onload = () => {
        dispatch(imageReducer(reader.result as string))
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'birthday') {
      const year = value?.split('-')[0]
      const month = value?.split('-')[1]
      const day = value?.split('-')[2]
      const horoscope = GlobalHelper.getHoroscope(Number(month), Number(day))
      const zodiac = GlobalHelper.getZodiac(Number(year))
      dispatch(horoscopeReducer(horoscope))
      dispatch(zodiacReducer(zodiac))
    }
    if (name === 'gender') {
      dispatch(genderReducer(value))
    }
    if (name !== ('gender' || 'horoscope' || 'zodiac')) {
      dispatch(
        profileReducer({
          ...user.profile,
          [name]: value
        })
      )
    }
    console.log(name, value, 'blablabal')
  }

  return (
    <>
      {activeAbout ? (
        <div className='flex flex-col w-full  bg-[#0E191F] p-4  '>
          <div className='flex flex-row self-end justify-start items-start transform active:scale-90 transition-transform '>
            <p className='text-md text-white font-semibold '>Save & Updates</p>
          </div>
          <div className=' space-y-3'>
            <div>
              <div className='flex flex-row space-x-2 items-center ' onClick={handleFocus}>
                <input
                  type='file'
                  onChange={handleImg}
                  className='hidden'
                  ref={fileInputRef}
                  accept='image/png, image/gif, image/jpeg'
                />
                {!isEmpty(user.img) && (
                  <Image
                    src={user.img}
                    alt='imge porfile'
                    width={100}
                    height={100}
                    className='rounded-2xl'
                  />
                )}
                {isEmpty(user.img) && (
                  <div>
                    <div className='w-[57px] h-[57px]  bg-[#162329] flex flex-col items-center justify-center  transform active:scale-90 transition-transform'>
                      <IconPlus />
                    </div>
                  </div>
                )}
                {isEmpty(user.img) && (
                  <p className='text-md text-white font-medium transform active:scale-90 transition-transform'>
                    Add image
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-row items-start space-x-4'>
              <div className='flex flex-col space-y-7 items-start'>
                {labelAbout.map((item, idx) => (
                  <p className='text-md text-[#FFFFFF] opacity-55 font-medium' key={idx}>
                    {item}:
                  </p>
                ))}
              </div>
              <div className='flex flex-col space-y-4 items-start flex-1'>
                <input
                  placeholder='Enter name'
                  value={user.profile.name}
                  onChange={handleChange}
                  type='tel'
                  style={{ direction: 'rtl' }}
                  name='name'
                  className='bg-[#162329] focus:outline-none border border-gray-600 h-[36px] w-full p-3 text-white rounded-lg'
                />
                <select
                  defaultValue={user.gender}
                  value={user.gender}
                  name='gender'
                  onChange={handleChange}
                  style={{ direction: 'rtl' }}
                  className='bg-[#162329] focus:outline-none border border-gray-600  w-full p-3 rounded-lg text-white  text-sm'
                >
                  <option value='' disabled className='text-gray-600  text-sm '>
                    Select Gender
                  </option>
                  <option value='Male' className='text-white  text-sm'>
                    Male
                  </option>
                  <option value='Female' className='text-white  text-sm'>
                    Female
                  </option>
                </select>
                <input
                  placeholder='YYYY-MM-DD'
                  value={user.profile.birthday}
                  onChange={handleChange}
                  type='date'
                  style={{ direction: 'rtl' }}
                  name='birthday'
                  className='bg-[#162329] focus:outline-none border border-gray-600 h-[36px] w-full p-3 text-white rounded-lg'
                />
                <input
                  placeholder='--'
                  defaultValue={user.horoscope}
                  style={{ direction: 'rtl' }}
                  name='horoscope'
                  disabled
                  className='bg-[#162329] focus:outline-none border border-gray-600 h-[36px] w-full p-3 text-white rounded-lg'
                />
                <input
                  placeholder='--'
                  defaultValue={user.zodiac}
                  style={{ direction: 'rtl' }}
                  name='zodiac'
                  disabled
                  className='bg-[#162329] focus:outline-none border border-gray-600 h-[36px] w-full p-3 text-white rounded-lg'
                />
                <input
                  placeholder='Add height'
                  value={user.profile.height}
                  onChange={handleChange}
                  type='number'
                  style={{ direction: 'rtl' }}
                  name='height'
                  className='bg-[#162329] focus:outline-none border border-gray-600 h-[36px] w-full p-3 text-white rounded-lg'
                />
                <input
                  placeholder='Add weight'
                  value={user.profile.weight}
                  onChange={handleChange}
                  type='number'
                  style={{ direction: 'rtl' }}
                  name='weight'
                  className='bg-[#162329] focus:outline-none border border-gray-600 h-[36px] w-full p-3 text-white rounded-lg'
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col py-4 px-6 w-full bg-[#0E191F] space-y-14'>
          <div className='flex flex-row items-start justify-between '>
            <p className='text-md text-white font-semibold'>About</p>
            <button
              className='outline-none focus:ring-4  transform active:scale-50 transition-transform'
              onClick={() => setActiveAbout(true)}
            >
              <IconEdit />
            </button>
          </div>
          <div className='flex flex-col item-start'>
            <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>
              Add in your your to help others know you better
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutInput
