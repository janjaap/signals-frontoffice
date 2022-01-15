import { createSelector } from '@reduxjs/toolkit'

import type { IncidentState } from './reducer'
import type { RootState } from 'app/store/store'

const selectIncident = (state: RootState): IncidentState => state.incident

export const classificationSelector = createSelector(selectIncident, (state: IncidentState) => ({
  category: state.category?.label,
  subcategory: state.subcategory?.label,
}))

export const incidentSelector = createSelector(
  [selectIncident, classificationSelector],
  ({ category, subcategory, ...incident }, classification) => ({
    ...incident,
    ...classification,
  })
)
