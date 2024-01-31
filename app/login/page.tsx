'use client'
import { IconBack, IconPassHide, IconPassShow } from '@/components/assets/icons/icons'
import React, { useState } from 'react'

const LoginPage = () => {
  const [showPass, setShowPass] = useState<boolean>(false)
  return (
    <main className='flex min-h-screen flex-col p-9 bg-primary'>
      <div className='flex flex-row items-center '>
        <IconBack />
        <p className='pl-2 text-white font-bold text-sm'>Back</p>
      </div>

      <div className='flex flex-col items-center justify-center '>
        <h2 className='text-2xl text-white font-bold'>Login</h2>

        <form className='pt-[25px] pb-[40px] flex flex-col'>
          <input
            type='text'
            className='w-[327px] h-[51px] bg-[#ffffff0f] rounded-[9px] text-white p-[18px]'
          />
          <div className='relative w-[327px] h-[51px]'>
            <input
              type={showPass ? "text" : 'password'}
              className='w-[327px] h-[51px] bg-[#ffffff0f] rounded-[9px] mt-[15px] mb-[25px] text-white p-[18px] '
            />
            <div
              className='absolute top- bottom-0 right-0 pr-3 flex items-center text-sm leading-5 text-white cursor-pointer'
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IconPassShow /> : <IconPassHide />}
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
