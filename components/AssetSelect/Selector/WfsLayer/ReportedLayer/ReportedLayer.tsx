import L from 'leaflet'
import { Marker } from '@amsterdam/arm-core'
import reportedIconUrl from 'public/icon-reported-marker.svg'

import type { FC } from 'react'
import type { Feature, FeatureType } from '../../../types'

import type { Geometrie } from 'types/incident'

import { featureToCoordinates } from 'services/map-location'
import './reportedLayer.module.css'

const REPORTED_CLASS_MODIFIER = 'marker-reported'

export interface ReportedLayerProps {
  reportedFeatures: Feature[]
  reportedFeatureType: FeatureType
}

const ReportedLayer: FC<ReportedLayerProps> = ({ reportedFeatures, reportedFeatureType }) => {
  const getMarker = (feat: any, index: number) => {
    const feature = feat as Feature
    const latLng = featureToCoordinates(feature?.geometry as Geometrie)

    if (!feature || !reportedFeatureType) return

    const icon = L.icon({
      iconSize: [20, 20],
      iconUrl: reportedIconUrl,
      className: REPORTED_CLASS_MODIFIER,
    })

    const featureId = feature.properties[reportedFeatureType.idField] || index

    return (
      <Marker
        key={featureId}
        latLng={latLng}
        options={{
          zIndexOffset: 1000,
          icon,
          alt: `Is gemeld - ${featureId}`,
        }}
      />
    )
  }
  return <>{reportedFeatures.map(getMarker)}</>
}

export default ReportedLayer
