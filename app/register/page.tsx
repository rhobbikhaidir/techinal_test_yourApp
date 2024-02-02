'use client'
import * as yup from 'yup'
import { IconBack, IconPassHide, IconPassShow } from '@/components/assets/icons/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FORMIK from '@/modules/formik'
import { PartialRegister } from '@/modules/types'
import Link from 'next/link'
import React, { useState } from 'react'
import Input from '@/components/Input/Input'
import helper from '@/modules/helper'
import { useOnRegisMutation } from '../GlobalRedux/api'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter();
  const [onRegister, register] = useOnRegisMutation()
  const [showPass, setShowPass] = useState<boolean>(false)
  const [confPass, setConfPass] = useState<boolean>(false)

  const scheme = yup.object<PartialRegister>({
    email: yup.string().email('Email is not valid').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .matches(
        helper.passwordRegex(),
        'Password must contain capital, small letters, number and special characters'
      )
      .min(8, 'Minimum Length is 8')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Please re-type your password')
      .oneOf([yup.ref('password')], 'Passwords does not match')
  })
  const initialValues: PartialRegister = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
  const formik = FORMIK.useFormFormik<PartialRegister>(scheme, initialValues, (values) =>
    onRegisHandler(values)
  )

  const onRegisHandler = (values: PartialRegister)  => {
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
      confirmPassword: ''
    }
    onRegister(payload)
      .unwrap()
      .then((res) => {
        toast.success(res.message, {
          position: 'top-right'
        })
        setTimeout(() => {
          router.push('/')
        }, 3000)
      })

  }

  const errorData = formik.errors

  return (
    <main className='flex min-h-screen flex-col p-9 bg-primary'>
      <Link href='/'>
        <div className='flex flex-row items-center cursor-pointer '>
          <IconBack />
          <p className='pl-2 text-white font-bold text-sm'>Back</p>
        </div>
      </Link>

      <div className='flex flex-col items-center justify-center '>
        <div className='flex flex-col justify-stretch flex-1 items-stretch w-[327px] h-[51px]'>
          <h2 className='text-2xl text-white font-bold'>Register</h2>
        </div>
        <form className='pt-[25px]  flex flex-col' onSubmit={formik.handleSubmit}>
          <Input
            name='email'
            id='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            err={Boolean(formik.values.email) && Boolean(errorData.email)}
            placeholder='Enter Email'
            value={formik.values.email}
            type='text'
            messageErr={errorData && errorData.email}
          />
          <Input
            name='username'
            id='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            err={Boolean(formik.values.username) && Boolean(errorData.username)}
            placeholder='Create Username'
            value={formik.values.username}
            type='text'
            messageErr={errorData && errorData.username}
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
          <Input
            name='confirmPassword'
            id='confirmPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            err={Boolean(formik.values.confirmPassword) && Boolean(errorData.confirmPassword)}
            placeholder='Confirm Password'
            value={formik.values.confirmPassword}
            type={confPass ? 'text' : 'password'}
            messageErr={errorData && errorData.confirmPassword}
            onClickIcon={() => setConfPass(!confPass)}
            suffixIcon={confPass ? <IconPassShow /> : <IconPassHide />}
          />
          <Button title='Register' disabled={!formik.isValid} isLoading={register.isLoading} />
        </form>
        <div className='py-10'>
          <p className='text-white text-sm'>
            Have an account?{' '}
            <span className='text-sm text-orange-200 border-b-[1px] border-b-orange-200 cursor-pointer'>
              <Link href='/'>Login Here</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default RegisterPage
