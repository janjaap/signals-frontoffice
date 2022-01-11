import { useController } from 'react-hook-form'
import { useEffect } from 'react'

import type { FunctionComponent } from 'react'
import type { FieldWrapperProps } from 'components/FieldWrapper'
import type { AssetSelectProps } from '../AssetSelect'

import AssetSelect from '../AssetSelect'

import FieldWrapper from 'components/FieldWrapper'

interface AssetSelectRendererProps extends FieldWrapperProps, AssetSelectProps {}

const AssetSelectRenderer: FunctionComponent<AssetSelectRendererProps> = ({
  error,
  label,
  id,
  address,
  coordinates,
  endpoint,
  featureTypes,
  name,
  selection,
  wfsFilter,
  required,
  control,
}) => {
  const { field } = useController({ control, name: id, rules: { required } })

  useEffect(() => {
    if (!coordinates) return

    field.onChange(true)
  }, [coordinates, field])

  return (
    <FieldWrapper error={error} label={label} id={id} required={required}>
      <AssetSelect
        address={address}
        coordinates={coordinates}
        endpoint={endpoint}
        featureTypes={featureTypes}
        name={name}
        selection={selection}
        wfsFilter={wfsFilter}
        onUpdate={(hasItemSelected: boolean) => {
          field.onChange(hasItemSelected)
        }}
      />
    </FieldWrapper>
  )
}

export default AssetSelectRenderer
