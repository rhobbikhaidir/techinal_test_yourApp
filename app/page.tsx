'use client'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { IconLoading, IconPassHide, IconPassShow } from '@/components/assets/icons/icons'
import FORMIK from '@/modules/formik'
import { PartialLoginTempProps } from '@/modules/types'
import Input from '@/components/Input/Input'
import GlobalHelper from '@/modules/GlobalHelper'
import Link from 'next/link'
import { useOnloginMutation } from './GlobalRedux/api'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './GlobalRedux/store'
import { getUser } from './GlobalRedux/user'
import Button from '@/components/Button/Button'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [onLogin, login] = useOnloginMutation()
  const [showPass, setShowPass] = useState<boolean>(false)
  const scheme = yup.object<PartialLoginTempProps>({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup
      .string()
      .matches(
        GlobalHelper.passwordRegex(),
        'Password must contain capital, small letters, number and special characters'
      )
      .min(8, 'Minimum Length is 8')
      .required('Password is required')
  })
  const initialValues: PartialLoginTempProps = {
    email: '',
    password: ''
  }
  const formik = FORMIK.useFormFormik<PartialLoginTempProps>(scheme, initialValues, (values) =>
    onLoginHandler(values)
  )

  const onLoginHandler = (values: PartialLoginTempProps) => {
    const payload = {
      email: values.email,
      username: values.email,
      password: values.password
    }
    onLogin(payload)
      .unwrap()
      .then((res) => {
        console.log(res, 'blablal')
        dispatch(
          getUser({
            access_token: res.access_token,
            email: formik.values.email
          })
        )
        toast.success(res.message, {
          position: 'top-right'
        })
        setTimeout(() => {
          router.push('/profile')
        })
      })
  }

  const errorData = formik.errors

  return (
    <main className='flex min-h-screen flex-col p-9 bg-primary'>
      <div className='flex flex-col items-center justify-center '>
        <div className='flex flex-col justify-stretch flex-1 items-stretch w-[327px] h-[51px]'>
          <h2 className='text-2xl text-white font-bold'>Login</h2>
        </div>
        <form className='pt-[25px] flex flex-col' onSubmit={formik.handleSubmit}>
          <Input
            name='email'
            id='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            err={Boolean(formik.values.email) && Boolean(errorData.email)}
            placeholder='Enter Username/Email'
            value={formik.values.email}
            type='text'
            messageErr={errorData && errorData.email}
          />
          <Input
            name='password'
            id='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            err={Boolean(formik.values.password) && Boolean(errorData.password)}
            placeholder='Enter Password'
            value={formik.values.password}
            type={showPass ? 'text' : 'password'}
            messageErr={errorData && errorData.password}
            onClickIcon={() => setShowPass(!showPass)}
            suffixIcon={showPass ? <IconPassShow /> : <IconPassHide />}
          />
          <Button title='Login' disabled={!formik.isValid} isLoading={login.isLoading} />
        </form>
        <div className='py-10'>
          <p className='text-white text-sm'>
            No account?{' '}
            <span className='text-sm text-orange-200 border-b-[1px] border-b-orange-200 cursor-pointer'>
              <Link href='/register'>Register here</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}
