import { useCallback, useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'

import type { Location } from 'types/incident'
import type { LatLngLiteral } from 'leaflet'
import type { FC } from 'react'
import type { FeatureType, Item } from './types'
import type { Address } from 'types/address'

import { UNREGISTERED_TYPE } from './constants'
import { AssetSelectProvider } from './context'
import Intro from './Intro'
import Summary from './Summary'

import reverseGeocoderService from 'services/reverse-geocoder'
import { resetLocation, setAddress, setCoordinates, setExtraProperties } from 'app/store/slices/incident'

export interface AssetSelectProps {
  address?: Address
  coordinates?: LatLngLiteral
  endpoint?: string
  featureTypes: FeatureType[]
  layer?: FC
  name: string
  onUpdate?: (hasItemSelected: boolean) => void
  selection?: Item
  wfsFilter?: string
}

const Selector = dynamic(() => import('./Selector'), { ssr: false })

const AssetSelect: FC<AssetSelectProps> = ({
  address,
  coordinates,
  endpoint,
  featureTypes,
  layer,
  name,
  onUpdate,
  selection,
  wfsFilter,
}) => {
  const dispatch = useDispatch()
  const [showMap, setShowMap] = useState(false)
  const [message, setMessage] = useState<string>()

  const setItem = useCallback(
    (item: Item) => {
      const { location, ...restItem } = item
      const { address: addr, coordinates: coords } = location
      const itemCoords = item?.type === UNREGISTERED_TYPE ? coordinates : coords
      const itemAddress = item?.type === UNREGISTERED_TYPE ? address : addr

      batch(() => {
        dispatch(setCoordinates({ ...itemCoords }))

        dispatch(setAddress(itemAddress))

        dispatch(setExtraProperties({ [name]: restItem }))
      })

      onUpdate && onUpdate(true)
    },
    [address, coordinates, name, dispatch, onUpdate]
  )

  const removeItem = useCallback(() => {
    batch(() => {
      dispatch(resetLocation())

      dispatch(setExtraProperties({ [name]: undefined }))
    })

    onUpdate && onUpdate(false)
  }, [dispatch, name, onUpdate])

  /**
   * Callback handler for map clicks; will fetch the address and dispatches both coordinates and
   * address to the global state.
   */
  const fetchLocation = useCallback(
    async (latLng: LatLngLiteral) => {
      batch(() => {
        // Immediately set the location so that the marker is placed on the map; the reverse geocoder response
        // might take some time to resolve, leaving the user wondering if the map click actually did anything.
        // Note that the latLng object is destructured to prevent Redux from complaining about a non-serializable
        // object being passed as the action's payload.
        dispatch(setCoordinates({ ...latLng }))

        // Clicking the map should unset a previous selection and preset it with an item that we know
        // doesn't exist on the map. By setting UNREGISTERED_TYPE, the checkbox in the selection panel
        // will be checked whenever a click on the map is registered
        dispatch(setExtraProperties({ [name as string]: { type: UNREGISTERED_TYPE } }))
      })

      const response = await reverseGeocoderService(latLng)

      if (response) {
        dispatch(setAddress(response.data.address))
      }

      onUpdate && onUpdate(true)
    },
    [dispatch, name, onUpdate]
  )

  const setLocation = useCallback(
    (location: Location) => {
      batch(() => {
        dispatch(setCoordinates(location.coordinates))
        dispatch(setExtraProperties({ [name as string]: { type: UNREGISTERED_TYPE } }))
        dispatch(setAddress(location.address))
      })

      onUpdate && onUpdate(true)
    },
    [dispatch, name, onUpdate]
  )

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setShowMap(false)
      }
    }

    document.addEventListener('keyup', closeOnEsc)

    return () => {
      document.removeEventListener('keyup', closeOnEsc)
    }
  }, [])

  return (
    <AssetSelectProvider
      value={{
        address,
        close: () => setShowMap(false),
        coordinates,
        edit: () => setShowMap(true),
        endpoint,
        featureTypes,
        fetchLocation,
        layer,
        message,
        removeItem,
        selection,
        setItem,
        setLocation,
        setMessage,
        wfsFilter,
      }}
    >
      {!showMap && !selection && <Intro />}

      {showMap && <Selector />}

      {!showMap && selection && <Summary />}
    </AssetSelectProvider>
  )
}

export default AssetSelect
