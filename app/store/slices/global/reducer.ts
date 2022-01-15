import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { Type, Variant } from 'components/Notification/constants'
import type { Item } from 'components/AssetSelect/types'

import { fetchClassification, createIncident } from '../incident/thunks'
import { fetchTerms } from '../terms/thunks'

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
  selectedObject?: Item
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
  selectedObject: undefined,
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
    setSelectedObject: (state, action: PayloadAction<Item>) => {
      state.selectedObject = action.payload
    },
    removeSelectedObject: (state) => {
      state.selectedObject = undefined
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
      .addCase(createIncident.pending, (state) => {
        state.loading = true
      })
      .addCase(createIncident.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(createIncident.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchTerms.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTerms.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export const { showGlobalNotification, setSelectedObject, removeSelectedObject } = globalSlice.actions

export default globalSlice.reducer
