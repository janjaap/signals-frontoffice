/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react'

import type { LatLngLiteral } from 'leaflet'
import type { FC } from 'react'
import type { Address } from 'types/address'
import type { Location } from 'types/incident'
import type { DataLayerProps, EventHandler, Item, FeatureType } from './types'

interface AssetSelectValue {
  address?: Address
  close?: () => void
  edit?: EventHandler
  layer?: FC<DataLayerProps>
  coordinates?: LatLngLiteral
  language?: {
    objectTypePlural?: string
    objectTypeSingular?: string
    title?: string
    subTitle?: string
  }
  message?: string
  endpoint?: string
  featureTypes?: FeatureType[]
  removeItem?: () => void
  selectedObject?: Item
  setItem?: (item: Item) => void
  fetchLocation?: (latLng: LatLngLiteral) => void
  setLocation?: (location: Location) => void
  setMessage?: (message?: string) => void
  wfsFilter?: string
}

export const initialValue: AssetSelectValue = {
  close: () => {},
  coordinates: undefined,
  edit: () => {},
  endpoint: '',
  featureTypes: [],
  fetchLocation: () => {},
  language: {},
  message: undefined,
  removeItem: () => {},
  selectedObject: undefined,
  setItem: () => {},
  setLocation: () => {},
  setMessage: () => {},
  wfsFilter: '',
}

const AssetSelectContext = createContext(initialValue)

interface AssetSelectProviderProps {
  value: AssetSelectValue
}

export const AssetSelectProvider: FC<AssetSelectProviderProps> = ({ value, children }) => (
  <AssetSelectContext.Provider value={value}>{children}</AssetSelectContext.Provider>
)

export default AssetSelectContext
