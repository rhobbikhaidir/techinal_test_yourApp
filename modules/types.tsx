import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import React from 'react'

export type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  placeholder: string
  err?: boolean
  py?: string
  messageErr?: string
  name: string
  id: string
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  suffixIcon?: React.ReactNode
  onClickIcon?: () => void
  className?: string
  autocomplete?: string
}

export type PartialLoginProps = {
  email: string
  username: string
  password: string
}

export type RegisProps = {
  message: string
}

export type PartialRegister = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type UserProps = {
  access_token: string
  email: string
  profile: PartialUpdateProps
  img: string | StaticImport
  zodiac: string
  horoscope: string
  gender: string
}

export type PartialLoginTempProps = {
  email: string
  password: string
}

export type ResponseProps<T> = {
  message: string
  data: T
}

export type ProfileProps = {
  email: string
  username: string
  interests: string[]
}

export type InterestProps = {
  email: string
  username: string
  interests: string[]
}

export type PartialUpdateProps = {
  name: string
  birthday: string
  height: number | string
  weight: number | string
  interests: string[]
}
