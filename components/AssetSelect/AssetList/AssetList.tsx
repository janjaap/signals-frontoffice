import { useMemo } from 'react'
import styled from 'styled-components'
import { Close } from '@amsterdam/asc-assets'

import type { FunctionComponent } from 'react'
import type { FeatureType, Item } from '../types'

import IconList, { IconListItem } from 'components/IconList/IconList'
import Button from 'components/Button'

const StyledButton = styled(Button).attrs(() => ({
  type: 'button',
  variant: 'blank',
  size: 32,
  iconSize: 12,
}))`
  margin-left: 8px;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  min-width: auto;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export interface AssetListProps {
  className?: string
  featureTypes: FeatureType[]
  onRemove?: () => void
  selectedObject: Item
}

const AssetList: FunctionComponent<AssetListProps> = ({
  onRemove,
  selectedObject,
  className,
  featureTypes,
}) => {
  const item = useMemo(() => {
    const { id, type, isReported } = selectedObject
    const { description, icon }: Partial<FeatureType> =
      featureTypes.find(({ typeValue }) => typeValue === type) ?? {}

    const label = [description, isReported && 'is gemeld', id]
      .filter(Boolean)
      .join(' - ')

    const baseItem = {
      id,
      label,
    }

    if (isReported && icon?.reportedIconSvg) {
      return {
        ...baseItem,
        iconUrl: icon ? icon.reportedIconSvg : '',
        isReported: true,
      }
    }

    return {
      ...baseItem,
      iconUrl: icon ? icon.iconUrl : '',
      isReported,
    }
  }, [featureTypes, selectedObject])

  return (
    <IconList data-testid="assetList" className={className}>
      <IconListItem
        key={item.id}
        id={
          item.isReported
            ? `assetListItem-${item.id}-reported`
            : `assetListItem-${item.id}`
        }
        iconUrl={item.iconUrl}
      >
        <ItemWrapper>
          {item.label}
          {onRemove && (
            <StyledButton
              data-testid={`assetListRemove-${item.id}`}
              aria-label="Verwijder"
              icon={<Close />}
              onClick={onRemove}
            />
          )}
        </ItemWrapper>
      </IconListItem>
    </IconList>
  )
}

export default AssetList
