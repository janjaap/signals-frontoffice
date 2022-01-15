import { useController } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import type { Control } from 'react-hook-form'
import type { FunctionComponent } from 'react'
import type { FieldWrapperProps } from 'components/FieldWrapper'
import type { FeatureType } from '../types'

import AssetSelect from '../AssetSelect'
import { AssetSelectProvider } from '../context'

import FieldWrapper from 'components/FieldWrapper'
import { incidentSelector } from 'app/store/slices/incident/selectors'
import { selectedObjectSelector } from 'app/store/slices/global/selectors'

interface AssetSelectRendererProps extends FieldWrapperProps {
  control: Control
  endpoint?: string
  featureTypes?: FeatureType[]
  name: string
  required?: boolean
  wfsFilter?: string
}

const AssetSelectRenderer: FunctionComponent<AssetSelectRendererProps> = ({
  control,
  endpoint,
  error,
  featureTypes,
  label,
  name,
  required,
  wfsFilter,
}) => {
  const { address, coordinates } = useSelector(incidentSelector)
  const selectedObject = useSelector(selectedObjectSelector)
  const { field } = useController({ control, name, rules: { required } })

  useEffect(() => {
    if (!coordinates || !address) return

    field.onChange({ coordinates, address })
    // eslint-disable-next-line
  }, [])

  const onUpdate = useCallback(
    (hasItemSelected: boolean) => {
      if (hasItemSelected) {
        field.onChange({ coordinates, address })
      } else {
        field.onChange(undefined)
      }
    },
    [address, coordinates, field]
  )

  return (
    <FieldWrapper error={error} label={label} required={required} id={name}>
      <AssetSelectProvider
        value={{
          address,
          coordinates,
          endpoint,
          featureTypes,
          selectedObject,
          wfsFilter,
        }}
      >
        <AssetSelect onUpdate={onUpdate} />
      </AssetSelectProvider>
    </FieldWrapper>
  )
}

export default AssetSelectRenderer
