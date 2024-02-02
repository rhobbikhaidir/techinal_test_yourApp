import { createSlice } from '@reduxjs/toolkit'
import type { UserProps } from '@/modules/types'

const initialState: UserProps = {
    access_token: '',
    message: ''
}

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUser: (state, action) => (state.access_token = action.payload)
  }
})

export const { getUser } = UserSlice.actions
export default UserSlice.reducer
