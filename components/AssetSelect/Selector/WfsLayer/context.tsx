import { createContext } from 'react'

import type { FunctionComponent } from 'react'
import type { FeatureCollection } from 'geojson'

export const NO_DATA: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
}

const initialValue: FeatureCollection = NO_DATA

const WfsDataContext = createContext(initialValue)

interface WfsDataProviderProps {
  value: FeatureCollection
}

export const WfsDataProvider: FunctionComponent<WfsDataProviderProps> = ({
  value,
  children,
}) => (
  <WfsDataContext.Provider value={value}>{children}</WfsDataContext.Provider>
)

export default WfsDataContext
