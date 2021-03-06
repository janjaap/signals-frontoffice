import type { LatLngLiteral, LatLngTuple } from 'leaflet'
import type { Geometrie, Location } from 'types/incident'
import type { Incident } from 'types/api/incident'
import type { RevGeo, Doc } from 'types/pdok/revgeo'

import formatAddress from '../format-address'

export const coordinatesTofeature = ({ lat, lng }: LatLngLiteral): Geometrie => ({
  type: 'Point',
  coordinates: [lat, lng].sort().reverse() as LatLngTuple,
})

export const coordinatesToAPIfeature = ({
  lat,
  lng,
}: LatLngLiteral): Geometrie => ({
  type: 'Point',
  coordinates: [lng, lat] as LatLngTuple,
})

export const featureToCoordinates= ({
  coordinates,
}: Geometrie): LatLngLiteral => {
  const [lat, lng] = coordinates.sort().reverse()
  return { lat, lng }
}

export const wktPointToCoordinates = (wktPoint: string): LatLngLiteral => {
  const pointMatch = wktPoint.match(/\d+\.\d+/gi)

  if (!wktPoint.includes('POINT') || !pointMatch || pointMatch?.length <= 1) {
    throw new TypeError('Provided WKT geometry is not a point.')
  }

  const [lat, lng] = pointMatch
    .sort()
    .reverse()
    .map((str) => Number.parseFloat(str))

  return {
    lat,
    lng,
  }
}

type FormatMapLocation = {
  coordinates?: LatLngLiteral
  addressText?: string
  address?: Location['address']
}

/**
 * Converts a location and address to values
 */
export const formatMapLocation = (
  location?: Incident['location']
): FormatMapLocation => {
  if (!location?.geometrie?.coordinates || !location.address) return {}

  return {
    coordinates: featureToCoordinates(location.geometrie),
    addressText: formatAddress(location.address),
    address: location.address,
  }
}

type PdokAddress = {
  openbare_ruimte: string
  huisnummer: string
  postcode: string
  woonplaats: string
}

/**
 * Convert geocode response to object with values that can be consumed by our API
 */
export const serviceResultToAddress = ({
  straatnaam,
  huis_nlt,
  postcode,
  woonplaatsnaam,
}: Doc): PdokAddress => ({
  openbare_ruimte: straatnaam,
  huisnummer: huis_nlt,
  postcode,
  woonplaats: woonplaatsnaam,
})

export const pdokResponseFieldList = [
  'id',
  'weergavenaam',
  'straatnaam',
  'huis_nlt',
  'postcode',
  'woonplaatsnaam',
  'centroide_ll',
]

export type PdokResponse = {
  id: number | string
  value: string
  data: {
    location: LatLngLiteral
    address: PdokAddress
  }
}

export const formatPDOKResponse = (
  request?: RevGeo | null
): Array<PdokResponse> =>
  request?.response?.docs.map((result) => {
    const { id, weergavenaam, centroide_ll } = result
    return {
      id,
      value: weergavenaam,
      data: {
        location: wktPointToCoordinates(centroide_ll),
        address: serviceResultToAddress(result),
      },
    }
  }) || []

const maxBounds = [
  [52.25168, 4.64034],
  [52.50536, 5.10737],
]
export const pointWithinBounds = (
  coordinates: LatLngTuple,
  bounds = maxBounds
) => {
  const [lat, lng] = coordinates.sort().reverse()

  const latWithinBounds = lat > bounds[0][0] && lat < bounds[1][0]
  const lngWithinBounds = lng > bounds[0][1] && lng < bounds[1][1]

  return latWithinBounds && lngWithinBounds
}
