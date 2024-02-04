import Profile from '@/components/ProfileInput/Profile'
import UsernameInput from '@/components/ProfileInput/UsernameInput'
import { IconBack, IconEdit, IconLogout } from '@/components/assets/icons/icons'

const ProfilePage = () => {

  return (
    <main className='flex min-h-screen flex-col p-9 bg-[#09141a]'>
      <div className='flex flex-row self-stretch justify-between'>
        <div className='flex flex-row items-center cursor-pointer'>
          <IconBack />
          <p className='pl-2 text-white font-bold text-sm'>Back</p>
        </div>
        <div>
          <p className='text-sm text-white font-semibold'>@johndoe</p>
        </div>
        <div className='flex flex-row items-center cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-50 transition-transform'>
          <p className='text-sm text-white font-semibold'>Sign Out</p>
          <IconLogout />
        </div>
      </div>
      <Profile />
    </main>
  )
}

export default ProfilePage
