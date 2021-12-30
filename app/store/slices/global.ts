import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchClassification } from './incident'

import {
  VARIANT_NOTICE,
  VARIANT_ERROR,
  VARIANT_SUCCESS,
  TYPE_GLOBAL,
  TYPE_LOCAL,
} from '../../../components/Notification/constants'

interface Notification {
  message: string
  title: string
  variant: typeof VARIANT_NOTICE | typeof VARIANT_ERROR | typeof VARIANT_SUCCESS
  type: typeof TYPE_LOCAL | typeof TYPE_GLOBAL
}

export interface GlobalState {
  loading: boolean
  error: boolean
  notification: Notification
}

const initialState: GlobalState = {
  loading: false,
  error: false,
  notification: {
    message: '',
    title: '',
    variant: VARIANT_NOTICE,
    type: TYPE_LOCAL,
  },
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showGlobalNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload
    },
    resetGlobalNotification: (state) => {
      state.notification = initialState.notification
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassification.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchClassification.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchClassification.fulfilled, (state) => {
        state.loading = false
      })
  },
})

export const { showGlobalNotification } = globalSlice.actions

export default globalSlice.reducer
