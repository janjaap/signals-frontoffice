import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Heading } from '@amsterdam/asc-ui'
import ReactMarkdown from 'react-markdown'

import type { ReactElement } from 'react'

import { FullWidth } from 'components/Layout'
import { incidentSelector } from 'app/store/slices/incident/selectors'
import { selectTerms } from 'app/store/slices/terms/selectors'
import PlainText from 'components/PlainText'

const Article = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`

const Bedankt = () => {
  const { id } = useSelector(incidentSelector)
  const { handlingMessage } = useSelector(selectTerms)

  return (
    <Article>
      <header>
        <Heading>Bedankt!</Heading>
      </header>

      <PlainText type="message">Uw melding is bij ons bekend onder nummer {id || 'onbekend'}</PlainText>

      <PlainText label="Wat doen we met uw melding?" type="disclaimer">
        <ReactMarkdown allowedElements={['a', 'p']}>{handlingMessage}</ReactMarkdown>
      </PlainText>
    </Article>
  )
}
Bedankt.getLayout = (page: ReactElement) => {
  return <FullWidth>{page}</FullWidth>
}

export default Bedankt
