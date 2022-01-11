import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { LatLngLiteral } from 'leaflet'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Prediction } from '../../../services/classification'
import type { Address } from 'types/address'

import resolveClassification from '../../../services/classification'

type StrictRecord<KeyT extends PropertyKey, ValueT> = {
  [Key in KeyT]: Record<string, ValueT>
}[KeyT]

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

export type ExtraProperties = StrictRecord<Category, any>

export type Classification = {
  category: Category
  subcategory: string
}

export interface IncidentState extends Classification {
  address?: Address
  coordinates?: LatLngLiteral
  description: string
  source: string
  extra_properties: ExtraProperties
  phone?: string
  email?: string
  sharing_allowed?: boolean
}

const initialState: IncidentState = {
  address: undefined,
  coordinates: null,
  source: 'online',
  description: '',
  category: undefined,
  subcategory: undefined,
  extra_properties: undefined,
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
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload
    },
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
    setExtraProperties: (state, action: PayloadAction<ExtraProperties>) => {
      state.extra_properties = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setSharingAllowed: (state, action: PayloadAction<boolean>) => {
      state.sharing_allowed = action.payload
    },
    setCoordinates: (state, action: PayloadAction<LatLngLiteral>) => {
      state.coordinates = action.payload
    },
    resetLocation: (state) => {
      state.coordinates = undefined
      state.address = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClassification.fulfilled, (state, action) => {
      const {
        meta: { arg: description },
      } = action
      state.description = description
      state.extra_properties = undefined
    })
  },
})

// Action creators are generated for each case reducer function
export const {
  resetLocation,
  setAddress,
  setClassification,
  setCoordinates,
  setDescription,
  setEmail,
  setExtraProperties,
  setPhone,
  setSharingAllowed,
  setSource,
} = incidentSlice.actions

export { fetchClassification }
export default incidentSlice.reducer
