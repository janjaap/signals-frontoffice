import { getCrsRd } from '@amsterdam/arm-core'

import type {
  LatLngBoundsExpression,
  MapOptions,
} from 'leaflet'

import configuration from '.'

const mapOptions = configuration.map.options

const MAP_OPTIONS: MapOptions = {
  center: mapOptions.center,
  maxBounds: mapOptions.maxBounds as LatLngBoundsExpression,
  maxZoom: mapOptions.maxZoom,
  minZoom: mapOptions.minZoom,
  zoom: mapOptions.zoom,
  attributionControl: true,
  crs: getCrsRd(),
  zoomControl: false,
  // dragging: !('ontouchstart' in window), // Touch users should not drag by default. Set to true if the map is full-screen.
}

export default MAP_OPTIONS
