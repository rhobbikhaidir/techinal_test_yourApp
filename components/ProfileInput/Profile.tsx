'use client'
import React, { useEffect } from 'react'
import Guard from '../Guard/Guard'
import UsernameInput from './UsernameInput'
import AboutInput from './AboutInput'
import Interest from './Interest'
import { useGetProfileMutation } from '@/app/GlobalRedux/api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/GlobalRedux/store'
import {
  horoscopeReducer,
  profileReducer,
  showDataReducer,
  zodiacReducer
} from '@/app/GlobalRedux/user'
import { isEmpty } from 'lodash'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import GlobalHelper from '@/modules/GlobalHelper'
import NavbarProfile from './NavbarProfile'

const Profile = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [getProfile, profile] = useGetProfileMutation()
  useEffect(() => {
    getProfile()
      .unwrap()
      .then((res) => {
        const birthdayDate = (!isEmpty(res.data.birthday) && res.data.birthday) || ''
        const year = birthdayDate?.split('-')[0]
        const month = birthdayDate?.split('-')[1]
        const day = birthdayDate?.split('-')[2]
        const horoscope =
          (!isEmpty(birthdayDate) && GlobalHelper.getHoroscope(Number(month), Number(day))) || ''
        const zodiac = (!isEmpty(birthdayDate) && GlobalHelper.getZodiac(Number(year))) || ''
        dispatch(horoscopeReducer(horoscope))
        dispatch(zodiacReducer(zodiac))
        const valueUser = {
          name: (!isEmpty(res.data.name) && res.data.name) || '',
          birthday: (!isEmpty(res.data.birthday) && res.data.birthday) || '',
          height: (res.data.height && res.data.height) || 0,
          weight: (res.data.weight && res.data.weight) || 0,
          interests: (!isEmpty(res.data.interests) && res.data.interests) || []
        }
        if (!isEmpty(res.data.name || res.data.birthday || res.data.height || res.data.birthday)) {
          dispatch(showDataReducer(true))
        }
        dispatch(profileReducer(valueUser))
      })
      .catch((res) => {
        toast.error('Token expired , Please Login again', {
          position: 'top-left'
        })
        setTimeout(() => {
          router.replace('/')
        }, 2000)
      })
  }, [])
  return (
    <Guard>
      <NavbarProfile />
      <div className='p-10 space-y-8'>
        <UsernameInput />
        <AboutInput />
        <Interest />
        <ToastContainer />
      </div>
    </Guard>
  )
}

export default Profile
