import { useContext, useEffect, useState } from 'react'
import { useMapInstance } from '@amsterdam/react-maps'
import { fetchWithAbort } from '@amsterdam/arm-core'

import type { FunctionComponent, ReactElement } from 'react'
import type { ZoomLevel } from '@amsterdam/arm-core/lib/types'
import type { FeatureCollection } from 'geojson'
import type { Map as MapType } from 'leaflet'
import type { DataLayerProps } from '../../types'

import AssetSelectContext from '../../context'
import { NO_DATA, WfsDataProvider } from './context'

import useLayerVisible from 'hooks/useLayerVisible'

const SRS_NAME = 'urn:ogc:def:crs:EPSG::4326'

interface Bbox {
  east: string
  north: string
  south: string
  west: string
}

export interface WfsLayerProps {
  children: ReactElement<DataLayerProps>
  zoomLevel?: ZoomLevel
}

const getBbox = (map: MapType): Bbox => {
  const bounds = map.getBounds()

  return {
    east: bounds.getEast().toString(),
    north: bounds.getNorth().toString(),
    south: bounds.getSouth().toString(),
    west: bounds.getWest().toString(),
  }
}

const WfsLayer: FunctionComponent<WfsLayerProps> = ({
  children,
  zoomLevel = {},
}) => {
  const mapInstance = useMapInstance()
  const { endpoint, setMessage, wfsFilter } = useContext(AssetSelectContext)
  const layerVisible = useLayerVisible(zoomLevel)
  const [bbox, setBbox] = useState<Bbox>()
  const [data, setData] = useState<FeatureCollection>(NO_DATA)

  const urlReplacements = endpoint &&
    bbox && {
      ...bbox,
      srsName: SRS_NAME,
    }
  const wfsUrl = urlReplacements
    ? Object.entries(urlReplacements).reduce(
        (acc, [key, replacement]) =>
          acc.replace(new RegExp(`{${key}}`, 'g'), replacement),
        endpoint
      )
    : ''
  const wfsFilterReplaced = urlReplacements
    ? Object.entries(urlReplacements).reduce(
        (acc, [key, replacement]) =>
          acc.replace(new RegExp(`{${key}}`, 'g'), replacement),
        (wfsFilter as string) || ''
      )
    : ''

  const filter = wfsFilter
    ? `<Filter><And>${wfsFilterReplaced}</And></Filter>`
    : ''

  useEffect(() => {
    setBbox(getBbox(mapInstance))

    function onMoveEnd() {
      setBbox(getBbox(mapInstance))
    }

    mapInstance.on('moveend', onMoveEnd)

    return () => {
      mapInstance.off('moveend', onMoveEnd)
    }
  }, [mapInstance])

  useEffect(() => {
    setMessage(undefined)
    if (!layerVisible) {
      setData(NO_DATA)
      return
    }

    if (!bbox || !wfsUrl) return

    const url = new URL(wfsUrl)
    if (filter.length > 0) {
      const params = url.searchParams
      params.append('filter', filter)
    }

    const { request, controller } = fetchWithAbort(url.toString())

    request
      .then(async (result) => result.json())
      .then((result) => {
        setData(result)
        return null
      })
      .catch((error) => {
        // Ignore abort errors since they are expected to happen.
        if (!(error instanceof Error && error.name === 'AbortError')) {
          setMessage('Kaart informatie kon niet worden opgehaald.')
        }
      })

    return () => {
      controller.abort()
    }
  }, [bbox, wfsUrl, layerVisible, setMessage, filter])

  return <WfsDataProvider value={data}>{children}</WfsDataProvider>
}

export default WfsLayer
