import { createSlice } from '@reduxjs/toolkit'
import type { UserProps } from '@/modules/types'

const initialState: UserProps = {
  access_token: '',
  email: '',
  profile: {
    name: '',
    birthday: '',
    height: 0,
    weight: 0,
    interests: []
  },
  img: '',
  horoscope: '',
  zodiac: '',
  gender: '',
  isShowData: false
}

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.access_token = action.payload.access_token
      state.email = action.payload.email
    },
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
    },
    showDataReducer: (state, action) => {
      state.isShowData = action.payload
    }
  }
})

export const {
  getUser,
  profileReducer,
  imageReducer,
  horoscopeReducer,
  zodiacReducer,
  genderReducer,
  showDataReducer
} = UserSlice.actions
export default UserSlice.reducer
