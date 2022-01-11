import { useEffect } from 'react'
import L from 'leaflet'
import { useMapInstance } from '@amsterdam/react-maps'

import type { FC } from 'react'
import type Geolocation from 'types/geolocation'

import configuration from 'services/configuration'

const locationDotOptions = {
  fillColor: '#009de6',
  fillOpacity: 1.0,
  interactive: false,
  opacity: 1.0,
  color: 'white',
  weight: 2,
  radius: 10,
}

const accuracyCircleOptions = {
  fillColor: '#009de6',
  fillOpacity: 0.1,
  interactive: false,
  stroke: false,
}

const locationDot = new L.CircleMarker(
  configuration.map.options.center,
  locationDotOptions
)
const accuracyCircle = new L.Circle(
  configuration.map.options.center,
  accuracyCircleOptions
)

interface LocationMarkerProps {
  geolocation: Geolocation
}

const LocationMarker: FC<LocationMarkerProps> = ({ geolocation }) => {
  const mapInstance = useMapInstance()

  const { accuracy, latitude, longitude } = geolocation

  useEffect(() => {
    if (!mapInstance) return undefined

    accuracyCircle.addTo(mapInstance)
    accuracyCircle.setLatLng([latitude, longitude])
    accuracyCircle.setRadius(accuracy)

    locationDot.addTo(mapInstance)
    locationDot.setLatLng([latitude, longitude])

    return () => {
      locationDot.remove()
      accuracyCircle.remove()
    }
  }, [mapInstance, latitude, longitude, accuracy])

  return <span data-testid="locationMarker" />
}

export default LocationMarker
