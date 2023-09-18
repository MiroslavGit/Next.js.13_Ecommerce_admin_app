import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from '@/reducers/slices/loadingSlice'

const store = configureStore({
  reducer: {
    loadingSlice: loadingSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;