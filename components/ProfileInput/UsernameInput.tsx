'use client'
import { UserProps } from '@/modules/types'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { isEmpty } from 'lodash'
import GlobalHelper from '@/modules/GlobalHelper'

const UsernameInput = () => {
  const { user } = useSelector((state: { user: UserProps }) => state)
  return (
    <>
      <div className='relative flex flex-col w-full h-[190px]  bg-[#162329] rounded'>
        {!isEmpty(user.img) && user.isShowData  && (
          <Image
            src={user.img}
            className='w-full h-[190px] rounded'
            width={100}
            height={190}
            alt=''
          />
        )}
        <div className='absolute bottom-1 p-2 w-full '>
          <p className='text-md text-white font-semibold'>
            {user.email} {' '}
            {!isEmpty(user.profile.birthday) &&
              user.isShowData &&
              `, ${GlobalHelper.getAge(user.profile.birthday)}`}
          </p>
          {!isEmpty(user.gender) && user.isShowData && (
            <p className='text-md text-white font-semibold'>{user.gender}</p>
          )}

          <div className='flex flex-row space-x-2'>
            {!isEmpty(user.horoscope) && user.isShowData && (
              <div className='bg-[#1c272c] p-2 rounded'>
                <p className='text-white text-sm font-semibold'>{user.horoscope}</p>
              </div>
            )}
            {!isEmpty(user.zodiac) && user.isShowData && (
              <div className='bg-[#1c272c] p-2 rounded'>
                <p className='text-white text-sm font-semibold'>{user.zodiac}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}

export default UsernameInput
