import { breakpoint, Header, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import type { FC } from 'react'

import Logo from '../Logo'
import Footer from './Footer'

const ContentWrapper = styled.div`
  background: white;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  padding: 0 ${themeSpacing(4)};
  max-width: var(--max-content-width);
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-areas: 'progress form';
  grid-template-columns: 4fr 8fr;
  grid-column-gap: ${themeSpacing(5)};

  @media only screen and ${breakpoint('max-width', 'tabletM')} {
    display: block;
  }
`

const CommonLayout: FC = ({ children }) => (
  <ContentWrapper className="contentWrapper" id="app">
    <Header tall fullWidth headerLogoTextAs="div" homeLink="./" logo={Logo} />

    <Container>{children}</Container>

    <Footer />
  </ContentWrapper>
)

export default CommonLayout