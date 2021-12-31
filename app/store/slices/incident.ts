import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { Prediction } from '../../../services/classification'

import resolveClassification from '../../../services/classification'


type Category =
  | 'afval'
  | 'civiele-constructies'
  | 'ondermijning'
  | 'openbaar-groen-en-water'
  | 'overig'
  | 'overlast-bedrijven-en-horeca'
  | 'overlast-in-de-openbare-ruimte'
  | 'overlast-op-het-water'
  | 'overlast-van-dieren'
  | 'overlast-van-en-door-personen-of-groepen'
  | 'schoon'
  | 'wegen-verkeer-straatmeubilair'
  | 'wonen'

export type Classification = {
  category: Category
  subcategory: string
}

export interface IncidentState extends Classification {
  description: string
  source: string
}

const initialState: IncidentState = {
  source: 'online',
  description: '',
  category: undefined,
  subcategory: undefined,
}

const fetchClassification = createAsyncThunk(
  'category/prediction',
  async (description: string, { dispatch }) => {
    const response = await fetch(
      'https://acc.api.data.amsterdam.nl/signals/category/prediction',
      {
        body: JSON.stringify({ text: description }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data: Prediction = await response.json()
    const classification = resolveClassification(data)

    dispatch(setClassification(classification))
  }
)

export const incidentSlice = createSlice({
  name: 'incident',
  initialState,
  reducers: {
    setSource: (state, action: PayloadAction<string>) => {
      state.source = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setClassification: (state, action: PayloadAction<Classification>) => {
      const { category, subcategory } = action.payload
      state.category = category
      state.subcategory = subcategory
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClassification.fulfilled, (state, action) => {
      const {
        meta: { arg: description },
      } = action
      state.description = description
    })
  },
})

// Action creators are generated for each case reducer function
export const { setClassification, setDescription, setSource } =
  incidentSlice.actions

export { fetchClassification }
export default incidentSlice.reducer
