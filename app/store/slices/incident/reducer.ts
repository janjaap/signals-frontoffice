import { createSlice } from '@reduxjs/toolkit'

import type { LatLngLiteral } from 'leaflet'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Address } from 'types/address'
import type Location from 'types/location'

import { createIncident, fetchClassification } from './thunks'

// type StrictRecord<KeyT extends PropertyKey, ValueT> = {
//   [Key in KeyT]: Record<string, ValueT>
// }[KeyT]

export type Category =
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

export type ExtraProperties = Record<string, string | number | Array<string | number>>

export type Classification = {
  category: Category
  subcategory: string
}

export type RawClassification = {
  category: {
    label: Category
    id: string
  }
  subcategory: {
    label: string
    id: string
  }
}

export interface IncidentState extends RawClassification {
  id?: number
  address?: Address
  coordinates?: LatLngLiteral
  description: string
  files?: ReturnType<typeof URL.createObjectURL>[]
  source: 'online' | 'app'
  extra_properties?: ExtraProperties
  phone?: string
  email?: string
  sharing_allowed?: boolean
}

export type PostRequestData = {
  category: {
    sub_category: RawClassification['subcategory']['id']
  }
  incident_date_start: string
  location: Location
  reporter: Pick<IncidentState, 'phone' | 'email' | 'sharing_allowed'>
  source?: IncidentState['source']
  text: IncidentState['description']
}

export type PostResponseData = {
  _display: string
  created_at: string
  id: number
  incident_date_end: string | null
  incident_date_start: string
  signal_id: string
  status: {
    state: 'OPEN' | 'CLOSED'
    state_display: string
  }
  updated_at: string
}

const initialState: IncidentState = {
  id: undefined,
  address: undefined,
  coordinates: null,
  files: [],
  source: 'online',
  description: '',
  category: undefined,
  subcategory: undefined,
  extra_properties: undefined,
}

const incidentSlice = createSlice({
  name: 'incident',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload
    },
    setSource: (state, action: PayloadAction<IncidentState['source']>) => {
      state.source = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
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
    setFiles: (state, action: PayloadAction<IncidentState['files']>) => {
      state.files = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassification.fulfilled, (state, action) => {
        const {
          meta: { arg: description },
          payload: { category, subcategory },
        } = action

        state.category = category
        state.subcategory = subcategory
        state.description = description
        state.extra_properties = undefined
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        const { id } = action.payload as PostResponseData
        state.id = id
      })
  },
})

// Action creators are generated for each case reducer function
export const {
  resetLocation,
  setAddress,
  setCoordinates,
  setDescription,
  setEmail,
  setExtraProperties,
  setFiles,
  setPhone,
  setSharingAllowed,
  setSource,
} = incidentSlice.actions

export default incidentSlice.reducer
