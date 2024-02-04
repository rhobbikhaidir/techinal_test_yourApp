import React from 'react'
import { IconEdit } from '../assets/icons/icons'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { UserProps } from '@/modules/types';

const Interest = () => {
  const { user } = useSelector((state: { user: UserProps }) => state)
  const router = useRouter();

  return (
    <div className='flex flex-col py-4 px-6 w-full bg-[#0E191F] space-y-14'>
      <div className='flex flex-row items-start justify-between '>
        <p className='text-md text-white font-semibold'>Interest</p>
        <button
          className='outline-none focus:ring-4  transform active:scale-90 transition-transform'
          onClick={() => router.push('/interest')}
        >
          <IconEdit />
        </button>
      </div>
      <div className='flex flex-col item-start'>
        {user.profile.interests?.length > 0 ? (
          <div className='flex flex-row space-x-2'>
            {user.profile.interests.map((item, idx) => (
              <div className='bg-[#1c272c] p-2' key={idx}>
                <p className='text-white text-sm font-semibold'>{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-md text-[#FFFFFF] opacity-55 font-medium'>
            Add in your interest to find a better match{' '}
          </p>
        )}
      </div>
    </div>
  )
}

export default Interest