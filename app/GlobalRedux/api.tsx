import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import type {
  PartialLoginProps,
  ProfileProps,
  RegisProps,
  ResponseProps,
  UserProps
} from '@/modules/types'

const baseUrl = 'https://techtest.youapp.ai'

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const user = getState() as { user: UserProps }

    if (user && user.user && user.user.access_token) {
      headers.set('x-access-token', `${user.user.access_token}`)
    }
  }
})

const fetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error) {
    console.log('error fetching:', result.error)

    switch (result.error.status) {
      case 'FETCH_ERROR': {
        const message = 'Oops.. Network request failed'
        const error = { ...result, error: { ...result.error, message } }
        return error
      }
      default: {
        const message = 'Oops.. Something went wrong'
        const error = { ...result, error: { ...result.error, message } }

        return error
      }
    }
  }

  return result
}

export const headers = () => {
  const header = new Headers()

  header.append('User-Agent', 'PostmanRuntime/7.29.4')
  header.append('Accept', '*/*')
  header.append('Accept-Encoding', 'gzip, deflate, br')
  header.append('Connection', 'keep-alive')
  header.append(
    'x-access-token',
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmM5NTg2MjM0YzQ2ZTk3MmQyNWZmMyIsInVzZXJuYW1lIjoiRXBveTEyMyIsImVtYWlsIjoiZXBveUBwb3kuY29tIiwiaWF0IjoxNzA2ODY1OTk2LCJleHAiOjE3MDY4Njk1OTZ9.meJCtzFx8A0ifAIMhC3yMcduDLCrk-8UK0tkMgbSR2I`
  )

  return header
}

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBase,
  endpoints: (builder) => ({
    onlogin: builder.mutation<UserProps, PartialLoginProps>({
      query: (body) => ({
        url: '/api/login',
        method: 'POST',
        body: body
      })
    }),
    onRegis: builder.mutation<RegisProps, PartialLoginProps>({
      query: (body) => ({
        url: '/api/register',
        method: 'POST',
        body: body
      })
    }),
    getProfile: builder.mutation<ResponseProps<ProfileProps>, void>({
      query: () => ({
        url: '/api/getProfile',
        method: 'GET',
        headers: headers()
      })
    })
  })
})

export const { useOnloginMutation, useOnRegisMutation, useGetProfileMutation } = API
