import { StepByStepNav, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import type { FC } from 'react'

import CommonLayout from './Common'

const FormWrapper = styled.div`
  grid-area: form;
`

const ProgressContainer = styled.div`
  grid-area: progress;
  padding-top: 2em;

  li {
    line-height: 20px;
  }
`

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'progress header'
    'progress form';
  grid-template-columns: 4fr 8fr;
  grid-column-gap: ${themeSpacing(5)};
`

type Step = {
  id: number
  label: string
  slug: string
}

const steps: Step[] = [
  {
    id: 1,
    label: 'Beschrijf uw melding',
    slug: 'beschrijf,',
  },
  {
    id: 2,
    label: 'Locatie en vragen',
    slug: 'vulaan',
  },
  {
    id: 3,
    label: 'Contactgegevens',
    slug: 'contact',
  },
  {
    id: 4,
    label: 'Versturen',
    slug: 'verstuur',
  },
]

const FormLayout: FC = ({ children }) => {
  const router = useRouter()
  const { slug } = router.query
  const activeItem = steps.find((step) => step.slug === slug)?.id || 1

  return (
    <CommonLayout>
      <ProgressContainer>
        <StepByStepNav activeItem={activeItem} steps={steps} itemType="numeric" />
      </ProgressContainer>

      <FormWrapper>
        <Main>{children}</Main>
      </FormWrapper>
    </CommonLayout>
  )
}

export default FormLayout
