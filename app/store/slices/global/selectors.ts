import { createSelector } from '@reduxjs/toolkit'

import type { GlobalState } from './reducer'
import type { RootState } from 'app/store/store'

const selectGlobal = (state: RootState): GlobalState => state.global

export const selectedObjectSelector = createSelector(selectGlobal, (state) => state.selectedObject)
export const loadingSelector = createSelector(selectGlobal, (state) => state.loading)
