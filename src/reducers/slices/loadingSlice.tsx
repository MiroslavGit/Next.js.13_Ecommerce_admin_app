import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: true,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions

export const getIsloading = (state: RootState) => state.loadingSlice

export default loadingSlice.reducer