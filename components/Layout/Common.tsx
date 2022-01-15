import { Header } from '@amsterdam/asc-ui'
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

const CommonLayout: FC = ({ children }) => (
  <ContentWrapper className="contentWrapper" id="app">
    <Header tall fullWidth headerLogoTextAs="div" homeLink="./" logo={Logo} />

    <div className="container">{children}</div>

    <Footer />
  </ContentWrapper>
)

export default CommonLayout
