import { useContext } from 'react'
import styled from 'styled-components'
import { themeColor } from '@amsterdam/asc-ui'

import type { FC } from 'react'

import FormContext from '../../app/incident/context'

import PreviousButton from 'components/PreviousButton'
import NextButton from 'components/NextButton'

const Wrapper = styled.fieldset`
  display: flex;
  justify-content: space-between;
  height: 64px;
  background-color: ${themeColor('tint', 'level3')};
  padding: 0 16px;
  margin-top: 28px;
`

interface FormNavigationProps {
  isLast?: boolean
}

const FormNavigation: FC<FormNavigationProps> = ({ isLast }) => {
  const { canGoNext, canGoPrevious, goPrevious, loading } = useContext(FormContext)

  return (
    <Wrapper>
      <legend>Ga naar de vorige of volgende stap in het proces</legend>

      {canGoPrevious ? <PreviousButton onClick={goPrevious}>Vorige</PreviousButton> : <span />}

      {(canGoNext || isLast) && <NextButton disabled={loading}>{isLast ? 'Verstuur' : 'Volgende'}</NextButton>}
    </Wrapper>
  )
}

export default FormNavigation
