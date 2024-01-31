import React from 'react'

export type GameListProps = {
  categories: string[]
  name: string
  image: string
  id: string
}

export type AmountListProps = {
  game: string
  amount: number
}

export type GameListResProps = {
  data: GameListProps[]
}

export type ParamsFilterProps = {
  _id: string
  title: string
  filter: string
  url: string
}

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

}

export type PartialLoginProps = {
  email: string
  password: string
}


export type PartialRegister = {
  email: string
  username: string
  password: string
  confirmPassword: string
}