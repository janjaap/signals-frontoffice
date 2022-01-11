import type { Point, FeatureCollection } from 'geojson'
import type StatusCode from 'types/statusCode'

export type Property = {
  id: number
  created_at: string
  status: {
    state: StatusCode
    state_display: string
  }
}

export type Geography = FeatureCollection<Point, Property>
