import { useContext } from 'react'
import styled from 'styled-components'
import { themeSpacing } from '@amsterdam/asc-ui'
import Image from 'next/image'

import AssetSelectContext from '../context'

import MapStatic from 'components/MapStatic'
import Button from 'components/Button'

const Wrapper = styled.div`
  position: relative;
  height: ${themeSpacing(40)};
`

const ButtonBar = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 401; // 400 is the minimum elevation where elements are shown above the map
`

const Intro = () => {
  const { edit, coordinates } = useContext(AssetSelectContext)

  return (
    <Wrapper data-testid="assetSelectIntro">
      {coordinates ? (
        <MapStatic
          coordinates={coordinates}
          height={170}
          showMarker={false}
          width={650}
        />
      ) : (
        <Image
          alt="Kaart bovenaanzicht Dam, Amsterdam"
          height={170}
          src="/center.webp"
          width={650}
        />
      )}

      <ButtonBar>
        <Button data-testid="chooseOnMap" onClick={edit} variant="primary">
          Kies op kaart
        </Button>
      </ButtonBar>
    </Wrapper>
  )
}

export default Intro
