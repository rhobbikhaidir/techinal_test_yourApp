import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserProps } from '@/modules/types'

const Guard = ({ children }: { children: React.ReactNode}) => {
  const navigate = useNavigate()
  const state = useSelector((state: { user: UserProps }) => state.user)

  useEffect(() => {
    if (isEmpty(state.access_token)) return navigate('/')
  })

  if (isEmpty(state.access_token)) return <></>

  return <>{children}</>
}

export default Guard
