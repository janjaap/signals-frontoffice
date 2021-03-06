import { useCallback, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MapPanelContent } from '@amsterdam/arm-core'
import {
  Paragraph,
  Button,
  themeSpacing,
  Label,
  Input,
  Checkbox,
  themeColor,
} from '@amsterdam/asc-ui'

import type { KeyboardEvent, ChangeEvent, FC } from 'react'
import type { Variant } from '@amsterdam/arm-core/lib/components/MapPanel/MapPanelContext'
import type { FeatureType } from '../../types'

import AssetList from '../../AssetList'
import { UNREGISTERED_TYPE } from '../../constants'
import AssetSelectContext from '../../context'

const StyledAssetList = styled(AssetList)`
  margin: ${themeSpacing(2)} 0 ${themeSpacing(4)} 0;
`

const StyledButton = styled(Button)`
  margin-top: ${themeSpacing(6)};
`

const Description = styled.span`
  display: block;
  font-weight: 400;
  font-size: 16px;
  color: ${themeColor('tint', 'level5')};
`

export interface SelectionPanelProps {
  featureTypes: FeatureType[]
  language?: Record<string, string>
  variant: Variant
}

const SelectionPanel: FC<SelectionPanelProps> = ({
  variant,
  featureTypes,
  language = {},
}) => {
  const { selectedObject, removeItem, setItem, close } =
    useContext(AssetSelectContext)

  const selectionOnMap =
    selectedObject && selectedObject.type !== UNREGISTERED_TYPE ? selectedObject : undefined

  const unregisteredAsset =
    selectedObject && selectedObject.type === UNREGISTERED_TYPE ? selectedObject : undefined

  const [showObjectIdInput, setShowObjectIdInput] = useState(
    unregisteredAsset !== undefined
  )
  const [unregisteredAssetValue, setUnregisteredAssetValue] = useState(
    unregisteredAsset?.id || ''
  )

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnregisteredAssetValue(event.currentTarget.value)
  }

  const onCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setShowObjectIdInput(!showObjectIdInput)

      if (!event.target.checked) {
        removeItem()
      }
    },
    [removeItem, showObjectIdInput]
  )

  const onSetItem = useCallback(() => {
    setItem({
      location: {},
      id: unregisteredAssetValue,
      type: UNREGISTERED_TYPE,
    })
  }, [setItem, unregisteredAssetValue])

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSetItem()
        close()
      }
    },
    [close, onSetItem]
  )

  useEffect(() => {
    if (selectionOnMap) {
      setUnregisteredAssetValue('')
      setShowObjectIdInput(false)
    }

    if (unregisteredAsset) {
      setShowObjectIdInput(true)
    }
  }, [selectionOnMap, unregisteredAsset])

  return (
    <MapPanelContent
      variant={variant}
      title={language.title || 'Locatie'}
      data-testid="selectionPanel"
    >
      <Paragraph strong>
        {language.subTitle || 'U kunt maar een object kiezen'}
        {language.description ? (
          <Description>{language.description}</Description>
        ) : null}
      </Paragraph>

      {selectedObject && selectionOnMap && (
        <StyledAssetList
          selectedObject={selectedObject}
          onRemove={removeItem}
          featureTypes={featureTypes}
        />
      )}

      {featureTypes.length > 0 && (!selectedObject || unregisteredAsset) && (
        <div data-testid="unregisteredObjectPanel">
          <Checkbox
            id="unregisteredAssetCheckbox"
            checked={showObjectIdInput}
            onChange={onCheck}
          />
          <Label
            htmlFor="unregisteredAssetCheckbox"
            label={language.unregistered || 'Het object staat niet op de kaart'}
          />

          {showObjectIdInput && language.unregisteredId && (
            <>
              <Label
                htmlFor="unregisteredAssetInput"
                label={
                  <>
                    <strong>{language.unregisteredId}</strong> (niet verplicht)
                  </>
                }
              />
              <Input
                id="unregisteredAssetInput"
                onBlur={onSetItem}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onSubmit={close}
                value={unregisteredAssetValue}
              />
            </>
          )}
        </div>
      )}

      {selectedObject && (
        <StyledButton onClick={close} variant="primary">
          {language.submit || 'Meld dit object'}
        </StyledButton>
      )}
    </MapPanelContent>
  )
}

export default SelectionPanel
