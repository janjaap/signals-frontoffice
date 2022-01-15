import { useContext, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Link, themeSpacing } from '@amsterdam/asc-ui'

import type { FC, KeyboardEvent } from 'react'

import AssetSelectContext from '../context'

import MapStatic from 'components/MapStatic'
import formatAddress from 'services/format-address'

const mapWidth = 640
const mapHeight = 180

const Wrapper = styled.div`
  position: relative;
  margin: ${themeSpacing(0, 0, 0, 0)};
`

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 16px;
  cursor: pointer;
`

const StyledMapStatic = styled(MapStatic)`
  margin: ${themeSpacing(0, 0, 2, 0)};
`

const Summary: FC = () => {
  const { address, coordinates, selectedObject, edit, featureTypes } =
    useContext(AssetSelectContext)
  const { id, type } = selectedObject || {}
  const { description } =
    featureTypes.find(({ typeValue }) => typeValue === type) ?? {}

  const summaryDescription = [description, id].filter(Boolean).join(' - ')
  let summaryAddress = coordinates ? 'Locatie is gepind op de kaart' : ''
  if (address) summaryAddress = formatAddress(address)

  const iconSrc = useMemo(() => {
    if (!selectedObject?.type || selectedObject.type === 'not-on-map') {
      return undefined
    }

    const featureType = featureTypes.find(
      ({ typeValue }) => typeValue === selectedObject.type
    )

    return featureType && featureType.icon.iconUrl
  }, [selectedObject?.type, featureTypes])

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>) => {
      if (event?.key === 'Enter') {
        edit(event)
      }
    },
    [edit]
  )

  return (
    <Wrapper data-testid="assetSelectSummary">
      {coordinates && (
        <StyledMapStatic
          iconSrc={iconSrc}
          height={mapHeight}
          width={mapWidth}
          coordinates={coordinates}
        />
      )}

      {selectedObject && (
        <div data-testid="assetSelectSummaryDescription">
          {summaryDescription}
        </div>
      )}
      <div data-testid="assetSelectSummaryAddress">{summaryAddress}</div>
      <StyledLink
        onClick={edit}
        onKeyUp={onKeyUp}
        variant="inline"
        tabIndex={0}
      >
        Wijzigen
      </StyledLink>
    </Wrapper>
  )
}

export default Summary
