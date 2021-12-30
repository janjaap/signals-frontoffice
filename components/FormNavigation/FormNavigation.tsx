import { useContext } from 'react'
import styled from 'styled-components'

import type { FC } from 'react'

import Button from '../Button'
import FormContext from '../../pages/incident/context'

const Wrapper = styled.fieldset`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const FormNavigation: FC = () => {
  const { canGoNext, canGoPrevious, goPrevious, loading } =
    useContext(FormContext)

  return (
    <Wrapper>
      <legend>Ga naar de vorige of volgende stap in het proces</legend>

      {canGoPrevious ? (
        <Button type="button" variant="textButton" onClick={goPrevious}>
          Vorige
        </Button>
      ) : (
        <span />
      )}

      {canGoNext && (
        <Button type="submit" variant="secondary" taskflow disabled={loading}>
          Volgende
        </Button>
      )}
    </Wrapper>
  )
}

export default FormNavigation
