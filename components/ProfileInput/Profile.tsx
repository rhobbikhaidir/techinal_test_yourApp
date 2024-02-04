'use client'
import React from 'react'
import Guard from '../Guard/Guard'
import UsernameInput from './UsernameInput'
import AboutInput from './AboutInput'
import Interest from './Interest'

const Profile = () => {
  return (
    // <Guard >
    <div className='p-10 space-y-8'>
      <UsernameInput />
      <AboutInput />
      <Interest />
    </div>

    // </Guard>
  )
}

export default Profile
