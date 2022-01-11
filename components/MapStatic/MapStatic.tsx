import { useMemo } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import type { FC } from 'react'
import type { LatLngLiteral } from 'leaflet'

import { wgs84ToRd } from 'services/crs-converter'

const ImgWrapper = styled.div<{ maxWidth: number; markerSize: number }>`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;
  z-index: 0;
  display: block;
`

const Marker = styled.div<{ markerSize: number }>`
  position: absolute;
  left: calc(50% - ${({ markerSize }) => markerSize / 2}px);
  top: calc(50% - ${({ markerSize }) => markerSize}px);
  pointer-events: none;
`

const MapImg = styled.img`
  max-width: 100%;
  height: auto;
`

interface MapStaticProps {
  /* The bigger the number, the higher the zoom level */
  boundsScaleFactor?: number
  className?: string
  coordinates: LatLngLiteral
  /** Supported image formats */
  format?: 'png' | 'jpeg' | 'gif'
  /** Height in pixels of the image tile that should be generated */
  height?: number
  iconSrc?: string
  /** Indicator of the map style */
  layers?: 'basiskaart' | 'basiskaart-light' | 'basiskaart-zwartwit'
  /** Size in pixels of the marker */
  markerSize?: number
  /** When false, will not render marker at given latitude and longitude */
  showMarker?: boolean
  /** Width in pixels of the image tile that should be generated */
  width?: number
}

/**
 * Component that renders a map tile of a given width and height around a center point
 */
const MapStatic: FC<MapStaticProps> = ({
  boundsScaleFactor = 2,
  className = '',
  coordinates,
  format = 'jpeg',
  height = 300,
  iconSrc = '/icon-select-marker.svg',
  layers = 'basiskaart',
  markerSize = 40,
  showMarker = true,
  width = 460,
}) => {
  const { lat, lng } = coordinates
  const { x, y } = useMemo(() => wgs84ToRd({ lat, lng }), [lat, lng])
  const src = useMemo(() => {
    const queryParams = {
      bbox: [
        x - width / boundsScaleFactor,
        y - height / boundsScaleFactor,
        x + width / boundsScaleFactor,
        y + height / boundsScaleFactor,
      ].join(','),
      format,
      height: height.toString(),
      layers,
      request: 'getmap',
      srs: 'EPSG:28992',
      version: '1.1.1',
      width: width.toString(),
    }

    const searchParams = new URLSearchParams(queryParams)

    return `https://map.data.amsterdam.nl/maps/topografie?${searchParams.toString()}`
  }, [boundsScaleFactor, format, height, layers, width, x, y])

  return (
    <ImgWrapper
      className={className}
      data-testid="mapStatic"
      markerSize={markerSize}
      maxWidth={width}
    >
      <>
        <MapImg
          alt=""
          className="map"
          data-testid="mapStaticImage"
          height={height}
          src={src}
          width={width}
        />
        {showMarker && (
          <Marker markerSize={markerSize}>
            <Image
              alt=""
              aria-hidden="true"
              className="marker"
              data-testid="mapStaticMarker"
              height={markerSize}
              src={iconSrc}
              tabIndex={-1}
              width={markerSize}
            />
          </Marker>
        )}
      </>
    </ImgWrapper>
  )
}

export default MapStatic
