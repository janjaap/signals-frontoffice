import L from 'leaflet'

export const smallMarkerIcon = L.icon({
  iconUrl: '/icon-select-marker.svg',
  iconSize: [20, 20],
  iconAnchor: [10, 19],
  className: 'map-marker-select-small',
})

export const markerIcon = L.icon({
  iconUrl: '/icon-select-marker.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 39],
  className: 'map-marker-select',
})

export const incidentIcon = L.icon({
  iconUrl: '/icon-incident-marker.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 39],
  className: 'map-marker-incident',
})

export const pointerSelectIcon = L.icon({
  iconUrl: '/icon-pin-red.svg',
  iconAnchor: [16, 42],
})

const ANCHOR: L.PointExpression = [12, 32]

export const openIncidentIcon = L.icon({
  iconUrl: '/icon-pin.svg',
  iconAnchor: ANCHOR,
})

export const closedIncidentIcon = L.icon({
  iconUrl: '/icon-pin-green.svg',
  iconAnchor: ANCHOR,
})
