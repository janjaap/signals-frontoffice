import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { Type, Variant } from 'components/Notification/constants'

import { fetchClassification } from './incident'

import { TYPE_LOCAL, VARIANT_NOTICE } from 'components/Notification/constants'

interface Notification {
  message?: string
  title: string
  variant: Variant
  type: Type
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
