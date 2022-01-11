/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react'

import type { LatLngLiteral } from 'leaflet'
import type { FC } from 'react'
import type { Address } from 'types/address'
import type { Location } from 'types/incident'
import type { EventHandler, Item, Meta } from './types'

interface AssetSelectValue {
  address?: Address
  close: () => void
  edit: EventHandler
  layer?: FC
  coordinates?: LatLngLiteral
  language?: {
    objectTypePlural?: string
    objectTypeSingular?: string
    title?: string
    subTitle?: string
  }
  message?: string
  // meta: Meta
  endpoint?: string
  featureTypes?: Meta['featureTypes']
  removeItem: () => void
  selection?: Item
  setItem: (item: Item) => void
  fetchLocation: (latLng: LatLngLiteral) => void
  setLocation: (location: Location) => void
  setMessage: (message?: string) => void
  wfsFilter?: string
}

export const initialValue: AssetSelectValue = {
  coordinates: undefined,
  close: () => {},
  edit: () => {},
  message: undefined,
  // meta: {
  endpoint: '',
  featureTypes: [],
  wfsFilter: '',
  language: {},
  // extraProperties: [],
  // },
  selection: undefined,
  fetchLocation: () => {},
  setLocation: () => {},
  setMessage: () => {},
  setItem: () => {},
  removeItem: () => {},
}

const AssetSelectContext = createContext(initialValue)

interface AssetSelectProviderProps {
  value: AssetSelectValue
}

export const AssetSelectProvider: FC<AssetSelectProviderProps> = ({
  value,
  children,
}) => (
  <AssetSelectContext.Provider value={value}>
    {children}
  </AssetSelectContext.Provider>
)

export default AssetSelectContext
