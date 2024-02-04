'use client'
import { IconBack } from '@/components/assets/icons/icons'
import { useRouter } from 'next/navigation';
import React from 'react'

const InterestPage = () => {
  const router = useRouter();

  return (
    <main className='flex min-h-screen flex-col p-9 bg-primary'>
      <div className='flex flex-row self-stretch justify-between'>
        <div className='flex flex-row items-center cursor-pointer transform active:scale-90 transition-transform'>
          <IconBack />
          <p className='pl-2 text-white font-bold text-sm'>Back</p>
        </div>
        <div className='transform active:scale-90 transition-transform'>
          <p className='text-sm text-white font-semibold'>Save</p>
        </div>
      </div>
    </main>
  )
}

export default InterestPage