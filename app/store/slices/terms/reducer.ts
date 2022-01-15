import { createReducer } from '@reduxjs/toolkit'

import { fetchTerms } from './thunks'

export interface TermsState {
  name?: string
  handlingMessage?: string
}

const initialState: TermsState = {
  name: undefined,
  handlingMessage: undefined,
}

const termsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchTerms.fulfilled, (state, action) => {
      const { _display, handling_message } = action.payload

      state.name = _display
      state.handlingMessage = handling_message
    })
)

export default termsReducer
