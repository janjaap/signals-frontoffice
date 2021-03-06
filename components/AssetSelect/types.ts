import type { Feature as GeoJSONFeature, Point } from 'geojson'
import type { BaseIconOptions, LatLngLiteral } from 'leaflet'
import type { Address } from 'types/address'
import type { Classification } from 'app/store/slices/incident/reducer'
import type { MouseEvent, KeyboardEvent } from 'react'
import type { PlainTextType } from 'components/PlainText'
import type { UNREGISTERED_TYPE } from './constants'

type Icon = {
  id: string
  iconUrl: string
}

export interface Item extends Record<string, unknown> {
  location?: {
    address?: Address
    coordinates?: LatLngLiteral
  }
  description?: string
  id?: string | number
  isReported?: boolean
  type?: typeof UNREGISTERED_TYPE | string
}

export interface FeatureIcon {
  options?: BaseIconOptions
  iconUrl: string
  reportedIconSvg?: string
}

export interface FeatureType {
  label: string
  description: string
  icon: FeatureIcon
  iconId?: string
  iconIsReportedId?: string
  idField: string
  isReportedField?: string
  isReportedValue?: number
  typeField: string
  typeValue: string
}

export interface Options {
  className: string
  iconSize: number[]
}

export type RecordValue = string | number | Array<string | number>

export interface RenderCondition {
  category?: Classification['category']
  subcategory?: Classification['subcategory'] | Array<Classification['subcategory']>
  [key: string]: RecordValue | RenderCondition
}

export interface Meta extends Record<string, unknown> {
  endpoint?: string
  extraProperties?: string[]
  featureTypes?: FeatureType[]
  icons?: Icon[]
  ifAllOf?: RenderCondition
  ifOneOf?: RenderCondition
  label?: string
  language?: Record<string, string>
  name?: string
  pathMerge?: string
  shortLabel?: string
  subTitle?: string
  type?: PlainTextType
  value?: string
  values?: Record<string, string>
  wfsFilter?: string
}

export type FeatureProps = Record<string, string | number | undefined>
export type Feature = GeoJSONFeature<Point, FeatureProps>

export type EventHandler = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement> | KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>
) => void

export interface BaseItem {
  id: string
  type: string
  description?: string
}

export interface WfsFilter {
  value: string
}

export interface DataLayerProps {
  desktopView?: boolean
  allowClusters?: boolean
  reportedLayer?: boolean
}
