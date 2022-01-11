import { useContext } from 'react'
import styled from 'styled-components'

import type { FC } from 'react'

import Button from '../Button'
import FormContext from '../../app/incident/context'

const Wrapper = styled.fieldset`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

interface FormNavigationProps {
  isLast?: boolean
}

const FormNavigation: FC<FormNavigationProps> = ({ isLast }) => {
  const { canGoNext, canGoPrevious, goPrevious, loading } = useContext(FormContext)

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

      {(canGoNext || isLast) && (
        <Button type="submit" variant="secondary" taskflow disabled={loading}>
          {isLast ? 'Verstuur' : 'Volgende'}
        </Button>
      )}
    </Wrapper>
  )
}

export default FormNavigation
