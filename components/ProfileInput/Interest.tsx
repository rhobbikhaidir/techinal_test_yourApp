import React from 'react'
import { IconEdit } from '../assets/icons/icons'
import { useRouter } from 'next/navigation';

const Interest = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col py-4 px-6 w-full bg-[#0E191F] space-y-14'>
          <div className='flex flex-row items-start justify-between '>
            <p className='text-md text-white font-semibold'>About</p>
            <button
              className='outline-none focus:ring-4  transform active:scale-50 transition-transform'
              onClick={() => router.push('/interest')}
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
  )
}

export default Interest