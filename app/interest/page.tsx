'use client'
import { IconBack, IconLoading } from '@/components/assets/icons/icons'
import { PartialUpdateProps, ReactSelectProps, UserProps } from '@/modules/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select, { StylesConfig, ValueType } from 'react-select'
import { AppDispatch } from '../GlobalRedux/store'
import { profileReducer, showDataReducer } from '../GlobalRedux/user'
import { isEmpty } from 'lodash'
import { useOnUpdateProfileMutation } from '../GlobalRedux/api'
import { ToastContainer, toast } from 'react-toastify'

const InterestPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [onUpdateProfile, updateProfile] = useOnUpdateProfileMutation()
  const { user } = useSelector((state: { user: UserProps }) => state)
  const defaultValue =
    !isEmpty(user.profile.interests) && user.profile.interests?.length > 0
      ? user.profile.interests.map((item) => ({
          label: item,
          value: item
        }))
      : []

  const router = useRouter()

  const options: ReactSelectProps[] = [
    { value: 'Soccer', label: 'Soccer' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Running', label: 'Running' },
    { value: 'Gymming', label: 'Gymming' },
    { value: 'Fitness', label: 'Fitness' },
    { value: 'Swiming', label: 'Swiming' },
    { value: 'Chest', label: 'Chest' },
    { value: 'Game', label: 'Game' }
  ]

  const colourStyles: StylesConfig = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: '#21373d',
      height: '46px',
      border: 'none',
      color: 'white',
      borderRadius: isFocused ? '10px' : '100px'
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: '#21373d',
      color: 'white'
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? 'black' : 'white'
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: '#344549'
    }),

    container: (styles) => ({
      ...styles,
      color: 'white',
      opacity: '100%',
      borderRadius: '100px'
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'white'
    })
  }

  const handleChangeSelect = (selected: ValueType<ReactSelectProps, true>) => {
    if (selected) {
      const selectedValuesArray = (selected as ReactSelectProps[]).map((option) => option.value)
      dispatch(
        profileReducer({
          ...user.profile,
          interests: selectedValuesArray
        })
      )
    } else {
      dispatch(
        profileReducer({
          ...user.profile,
          interests: []
        })
      )
    }
  }

  const handleSaveInterest = () => {
    const payload: PartialUpdateProps = {
      name: user.profile.name,
      birthday: user.profile.birthday,
      height: !isEmpty(user.profile.height) ? Number(user.profile.height) : null,
      weight: !isEmpty(user.profile.weight) ? Number(user.profile.weight) : null,
      interests: user.profile.interests
    }
    onUpdateProfile(payload)
      .unwrap()
      .then((res) => {
        dispatch(showDataReducer(true))
        toast.success(res.message, {
          position: 'top-right'
        })
        setTimeout(() => {
          router.back()
        }, 2000)
      })
      .catch(() => {
        toast.error('something wrong', {
          position: 'top-right'
        })
      })
  }

  return (
    <main className='flex min-h-screen flex-col p-9 bg-primary'>
      <div className='flex flex-row self-stretch justify-between'>
        <div
          className='flex flex-row items-center cursor-pointer transform active:scale-90 transition-transform'
          onClick={() => router.back()}
        >
          <IconBack />
          <p className='pl-2 text-white font-bold text-sm'>Back</p>
        </div>
        <div className='transform active:scale-90 transition-transform'>
          <button
            className='text-md text-white font-semibold'
            disabled={updateProfile.isLoading}
            onClick={handleSaveInterest}
          >
            {updateProfile.isLoading ? (
              <div className='flex flex-row items-center'>
                <span className='text-sm pr-1'>Wait</span>
                <IconLoading />
              </div>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
      {/* content */}
      <div className='py-10 space-y-5  flex flex-col items-start'>
        <p className='text-sm text-yellow-600'>Tell everyone about yourself</p>
        <p className='text-xl text-white '>Tell everyone about yourself</p>

        <Select
          onChange={handleChangeSelect}
          defaultValue={defaultValue}
          isMulti
          styles={colourStyles}
          className='bg-[#21373d] w-full h-[46px]'
          name='colors'
          options={options}
          classNamePrefix='select'
        />
      </div>
      <ToastContainer />
    </main>
  )
}

export default InterestPage
