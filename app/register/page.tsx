'use client'
import * as yup from 'yup'
import { IconBack, IconPassHide, IconPassShow } from '@/components/assets/icons/icons'
import FORMIK from '@/modules/formik'
import { PartialLoginProps, PartialRegister } from '@/modules/types'
import Link from 'next/link'
import React, { useState } from 'react'
import Input from '@/components/Input/Input'
import helper from '@/modules/helper'

const RegisterPage = () => {
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

  const onRegisHandler = (values: PartialRegister) => console.log(values)

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
        <form className='pt-[25px] pb-[40px] flex flex-col'>
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
            placeholder='Confirm confirmPassword'
            value={formik.values.confirmPassword}
            type={confPass ? 'text' : 'confirmPassword'}
            messageErr={errorData && errorData.confirmPassword}
            onClickIcon={() => setConfPass(!confPass)}
            suffixIcon={confPass ? <IconPassShow /> : <IconPassHide />}
          />
        </form>
        <button
          type='button'
          onClick={() => formik.handleSubmit()}
          className='w-[327px] h-[51px] text-white bg-second rounded-[9px] disabled:opacity-[0.3]'
          disabled={!formik.isValid}
        >
          Login
        </button>
        <div className='py-10'>
          <p className='text-white text-sm'>
            No account?{' '}
            <span className='text-sm text-orange-200 border-b-[1px] border-b-orange-200 cursor-pointer'>
              <Link href='/'>Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
