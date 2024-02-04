import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserProps } from '@/modules/types'
import { useRouter } from 'next/navigation'

const Guard = ({ children }: { children: React.ReactNode}) => {
 const router = useRouter()
  const state = useSelector((state: { user: UserProps }) => state.user)

  useEffect(() => {
    if (isEmpty(state.access_token)) return router.replace('/')
  })

  if (isEmpty(state.access_token)) return <></>

  return <>{children}</>
}

export default Guard
