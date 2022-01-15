import { TileLayer } from '@amsterdam/react-maps'
import { useMemo, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { ViewerContainer } from '@amsterdam/arm-core'
import { Zoom, Map as MapComponent } from '@amsterdam/arm-core'
import styled from 'styled-components'

import type { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import type { FC, ReactNode } from 'react'
import type Geolocation from 'types/geolocation'

import GPSButton from '../GPSButton'
import LocationMarker from '../LocationMarker'

import { showGlobalNotification } from 'app/store/slices/global/reducer'
import { TYPE_LOCAL, VARIANT_NOTICE } from 'components/Notification/constants'
import configuration from 'services/configuration'
import { useAppDispatch } from 'app/store/store'

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400; // this elevation ensures that this container comes on top of the internal leaflet components
`

const StyledMap = styled(MapComponent)<{ className?: string }>`
  cursor: default;

  &:focus {
    outline: 5px auto Highlight !important; // Firefox outline
    outline: 5px auto -webkit-focus-ring-color !important; // Safari / Chrome outline
  }

  &.leaflet-drag-target {
    cursor: all-scroll;
  }
`

const StyledGPSButton = styled(GPSButton)`
  margin-bottom: 8px;
`

interface MapProps {
  className?: string
  children?: ReactNode
  'data-testid'?: string
  events: LeafletEventHandlerFnMap
  hasGPSControl?: boolean
  hasZoomControls?: boolean
  fullScreen?: boolean
  mapOptions: MapOptions
  setInstance?: (instance: L.Map) => void
}

const Map: FC<MapProps> = ({
  className = '',
  children,
  'data-testid': dataTestId = 'map-base',
  events,
  hasGPSControl = false,
  hasZoomControls = false,
  fullScreen = false,
  mapOptions,
  setInstance,
}) => {
  const dispatch = useAppDispatch()
  const [inBrowser, setInBrowser] = useState(false)
  const [mapInstance, setMapInstance] = useState<L.Map>()
  const [geolocation, setGeolocation] = useState<Geolocation>()
  const hasTouchCapabilities = false // 'ontouchstart' in window
  const showZoom = hasZoomControls && !hasTouchCapabilities
  const maxZoom = mapOptions.maxZoom || configuration.map.options.maxZoom
  const minZoom = mapOptions.minZoom || configuration.map.options.minZoom
  const options = useMemo(() => {
    const center = geolocation ? [geolocation.latitude, geolocation.longitude] : mapOptions.center

    return {
      center,
      maxZoom,
      minZoom,
      scrollWheelZoom: false,
      tap: false,
      ...mapOptions,
    }
  }, [mapOptions, geolocation, maxZoom, minZoom])

  useLayoutEffect(() => {
    if (!mapInstance || !geolocation || !geolocation.toggled) return

    mapInstance.flyTo([geolocation.latitude, geolocation.longitude], maxZoom, {
      animate: true,
      noMoveStart: true,
    })
  }, [geolocation, mapInstance, maxZoom])

  const captureInstance = useCallback(
    (instance) => {
      setMapInstance(instance)

      if (typeof setInstance === 'function') {
        setInstance(instance)
      }
    },
    [setInstance]
  )

  useEffect(() => {
    setInBrowser(true)
  }, [])

  if (!inBrowser) return null

  return (
    <StyledMap
      className={className}
      data-max-zoom={maxZoom}
      data-min-zoom={minZoom}
      data-testid={dataTestId}
      events={events}
      fullScreen={fullScreen}
      options={options as MapOptions}
      setInstance={captureInstance}
    >
      {children}

      {/* Render GPS and zoom buttons after children to maintain correct focus order */}
      <StyledViewerContainer
        bottomRight={
          <div data-testid="mapZoom">
            {hasGPSControl && global.navigator.geolocation && (
              <StyledGPSButton
                onLocationSuccess={(location) => {
                  setGeolocation(location)
                }}
                onLocationError={() => {
                  dispatch(
                    showGlobalNotification({
                      variant: VARIANT_NOTICE,
                      title: `${configuration.language.siteAddress} heeft geen toestemming om uw locatie te gebruiken.`,
                      message: 'Dit kunt u wijzigen in de voorkeuren of instellingen van uw browser of systeem.',
                      type: TYPE_LOCAL,
                    })
                  )
                }}
                onLocationOutOfBounds={() => {
                  dispatch(
                    showGlobalNotification({
                      variant: VARIANT_NOTICE,
                      title: 'Uw locatie valt buiten de kaart en is daardoor niet te zien',
                      type: TYPE_LOCAL,
                    })
                  )
                }}
              />
            )}
            {showZoom && <Zoom />}
          </div>
        }
      />

      {geolocation?.toggled && <LocationMarker geolocation={geolocation} />}

      <TileLayer args={configuration.map.tiles.args as [string]} options={configuration.map.tiles.options} />
    </StyledMap>
  )
}

export default Map
