'use client'
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
import { UserProps } from '@/modules/types'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IconBack, IconLogout } from '../assets/icons/icons'

const NavbarProfile = () => {
  const { user } = useSelector((state: { user: UserProps }) => state)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const handleLogout = () =>
    GlobalHelper.logout(() => {
      toast.success('Logout Succes', {
        position: 'top-right'
      })
      dispatch(showDataReducer(false))
      dispatch(genderReducer(''))
      dispatch(zodiacReducer(''))
      dispatch(horoscopeReducer(''))
      dispatch(imageReducer(''))
      dispatch(
        profileReducer({
          name: '',
          birthday: '',
          height: 0,
          weight: 0,
          interests: []
        })
      )

      setTimeout(() => {
        router.replace('/')
      }, 2000)
    })
  return (
    <div className='flex flex-row self-stretch justify-between'>
      <div className='flex flex-row items-center cursor-pointer'>
        <IconBack />
        <p className='pl-2 text-white font-bold text-sm'>Back</p>
      </div>
      <div>
        <p className='text-sm text-white font-semibold'>{user.email}</p>
      </div>
      <button
        className='flex flex-row items-center cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'
        onClick={handleLogout}
      >
        <p className='text-sm text-white font-semibold'>Sign Out</p>
        <IconLogout />
      </button>
    </div>
  )
}

export default NavbarProfile
