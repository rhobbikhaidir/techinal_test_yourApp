import { createSlice } from '@reduxjs/toolkit'
import type { UserProps } from '@/modules/types'

const initialState: UserProps = {
  access_token: '',
  email: '',
  profile: {
    name: '',
    birthday: '',
    height: '',
    weight: '',
    interests: []
  },
  img: '',
  horoscope: '',
  zodiac: '',
  gender: ''
}

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUser: (state, action) => (state = action.payload),
    profileReducer: (state, action) => {
      state.profile = action.payload
    },
    imageReducer: (state, action) => {
      state.img = action.payload
    },
    horoscopeReducer: (state, action) => {
      state.horoscope = action.payload
    },
    zodiacReducer: (state, action) => {
      state.zodiac  = action.payload
    },
    genderReducer: (state, action) => {
      state.gender = action.payload
    }
  }
})

export const {
  getUser,
  profileReducer,
  imageReducer,
  horoscopeReducer,
  zodiacReducer,
  genderReducer
} = UserSlice.actions
export default UserSlice.reducer
