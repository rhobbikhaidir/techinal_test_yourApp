'use client'
import { useOnUpdateProfileMutation } from '@/app/GlobalRedux/api'
import { AppDispatch } from '@/app/GlobalRedux/store'
import {
  genderReducer,
  horoscopeReducer,
  imageReducer,
  profileReducer,
  showDataReducer,
  zodiacReducer
} from '@/app/GlobalRedux/user'
import GlobalHelper from '@/modules/GlobalHelper'
import { PartialUpdateProps, UserProps } from '@/modules/types'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IconEdit, IconLoading, IconPlus } from '../assets/icons/icons'

const AboutInput = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [onUpdateProfile, updateProfile] = useOnUpdateProfileMutation()
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
  }

  const handleSave = () => {
    const payload: PartialUpdateProps = {
      name: user.profile.name,
      birthday: user.profile.birthday,
      height: !isEmpty(user.profile.height) ? Number(user.profile.height) : null ,
      weight:!isEmpty(user.profile.weight) ? Number(user.profile.weight) : null,
      interests: user.profile.interests
    }
    onUpdateProfile(payload)
      .unwrap()
      .then((res) => {
        dispatch(showDataReducer(true))
        toast.success(res.message, {
          position: 'top-right'
        })
        setActiveAbout(false)
      })
  }


  return (
    <>
      {activeAbout ? (
        <div className='flex flex-col w-full  bg-[#0E191F] p-4  '>
          <button className='flex flex-row self-end justify-start items-start transform active:scale-90 transition-transform '>
            <button className='text-md text-white font-semibold' disabled={updateProfile.isLoading} onClick={handleSave}>
              {updateProfile.isLoading ? (
                <div className='flex flex-row items-center'>
                  <span className='text-sm pr-1'>Wait</span>
                  <IconLoading />
                </div>
              ) : (
                'Save & Updates'
              )}
            </button>
          </button>
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
        <div className='flex flex-col py-4 px-6 w-full bg-[#0E191F] space-y-4'>
          <div className='flex flex-row items-start justify-between '>
            <p className='text-md text-white font-semibold'>About</p>
            <button
              className='outline-none focus:ring-4  transform active:scale-90 transition-transform'
              onClick={() => setActiveAbout(true)}
            >
              <IconEdit />
            </button>
          </div>
          <div className='flex flex-col item-start'>
            {!user.isShowData && (
              <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>
                Add in your your to help others know you better
              </p>
            )}
            {user.isShowData && (
              <div className='flex flex-col items-start space-y-3'>
                <div className='flex flex-row space-x-2'>
                  <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>Birthday:</p>
                  <p className='text-md text-white font-semibold'>
                    {GlobalHelper.formatDate(user.profile.birthday)}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>Horoscope:</p>
                  <p className='text-md text-white font-semibold'>{user.horoscope || '-'}</p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>Zodiac:</p>
                  <p className='text-md text-white font-semibold'>{user.zodiac || '-'}</p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>Height:</p>
                  <p className='text-md text-white font-semibold'>
                    {user.profile.height || '-'} cm
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>Weight:</p>
                  <p className='text-md text-white font-semibold'>
                    {user.profile.weight || '-'} kg{' '}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AboutInput
