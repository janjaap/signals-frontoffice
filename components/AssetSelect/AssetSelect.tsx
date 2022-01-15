import { useCallback, useContext, useEffect, useState } from 'react'
import { batch } from 'react-redux'
import dynamic from 'next/dynamic'

import type { Location } from 'types/incident'
import type { LatLngLiteral } from 'leaflet'
import type { FC } from 'react'
import type { Item } from './types'

import { UNREGISTERED_TYPE } from './constants'
import AssetSelectContext, { AssetSelectProvider } from './context'
import Intro from './Intro'
import Summary from './Summary'

import reverseGeocoderService from 'services/reverse-geocoder'
import { resetLocation, setAddress, setCoordinates } from 'app/store/slices/incident/reducer'
import { removeSelectedObject, setSelectedObject } from 'app/store/slices/global/reducer'
import { useAppDispatch } from 'app/store/store'

interface AssetSelectProps {
  layer?: FC
  onUpdate?: (hasItemSelected: boolean) => void
}

const Selector = dynamic(() => import('./Selector'), { ssr: false })

const AssetSelect: FC<AssetSelectProps> = ({ layer, onUpdate }) => {
  const dispatch = useAppDispatch()
  const [showMap, setShowMap] = useState(false)
  const [message, setMessage] = useState<string>()
  const context = useContext(AssetSelectContext)
  const { coordinates, address, selectedObject } = context

  const setItem = useCallback(
    (item: Item) => {
      const { location, ...restItem } = item
      const { address: addr, coordinates: coords } = location
      const itemCoords = item?.type === UNREGISTERED_TYPE ? coordinates : coords
      const itemAddress = item?.type === UNREGISTERED_TYPE ? address : addr

      batch(() => {
        dispatch(setCoordinates({ ...itemCoords }))
        dispatch(setAddress(itemAddress))
        dispatch(setSelectedObject(restItem))
      })

      onUpdate && onUpdate(true)
    },
    [address, coordinates, dispatch, onUpdate]
  )

  const removeItem = useCallback(() => {
    batch(() => {
      dispatch(resetLocation())
      dispatch(removeSelectedObject())
    })

    onUpdate && onUpdate(false)
  }, [dispatch, onUpdate])

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

        // Clicking the map should unset a previous selected object and preset it with an item that we know
        // doesn't exist on the map. By setting UNREGISTERED_TYPE, the checkbox in the selection panel
        // will be checked whenever a click on the map is registered
        dispatch(setSelectedObject({ type: UNREGISTERED_TYPE }))
      })

      const response = await reverseGeocoderService(latLng)

      if (response) {
        dispatch(setAddress(response.data.address))
      }

      onUpdate && onUpdate(true)
    },
    [dispatch, onUpdate]
  )

  const setLocation = useCallback(
    (location: Location) => {
      batch(() => {
        dispatch(setCoordinates(location.coordinates))
        dispatch(setAddress(location.address))
        dispatch(setSelectedObject({ type: UNREGISTERED_TYPE }))
      })

      onUpdate && onUpdate(true)
    },
    [dispatch, onUpdate]
  )

  const closeOnEsc = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      setShowMap(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keyup', closeOnEsc)

    return () => {
      document.removeEventListener('keyup', closeOnEsc)
    }
  }, [closeOnEsc])

  return (
    <AssetSelectProvider
      value={{
        ...context,
        close: () => setShowMap(false),
        coordinates,
        edit: () => setShowMap(true),
        fetchLocation,
        layer,
        message,
        removeItem,
        setItem,
        setLocation,
        setMessage,
      }}
    >
      {!showMap && !selectedObject && <Intro />}

      {showMap && <Selector />}

      {!showMap && selectedObject && <Summary />}
    </AssetSelectProvider>
  )
}

export default AssetSelect
