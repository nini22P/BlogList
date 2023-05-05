import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    state: 'hide',
    message: ''
  },
  reducers: {
    setNotification: (state, action) => {
      state.state = action.payload.state
      state.message = action.payload.message
    },
    removeNotification: state => {
      state.state = 'hide'
      state.message = ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer