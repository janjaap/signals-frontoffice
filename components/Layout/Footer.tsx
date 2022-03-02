import { FooterBottom, FooterTop, Link as AscLink } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { ChevronRight } from '@amsterdam/asc-assets'

import type { FC } from 'react'

const StyledFooterTop = styled(FooterTop)`
  margin-top: 80px;
  min-height: 80px;
`

const StyledFooterBottom = styled(FooterBottom)`
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  max-width: 960px;
  flex-wrap: wrap;
  width: 100%;
  margin: 12px auto;

  a {
    font-size: 16px;
    line-height: 20px;
  }
`

const FooterContainer = styled.div`
  margin: 0 auto;
  width: 100%;
`

const Link = styled(AscLink)`
  display: flex;
  align-items: center;
`

const LayoutFooter: FC = () => (
  <FooterContainer>
    <footer>
      <StyledFooterTop data-testid="siteFooter" />
      <StyledFooterBottom>
        <Link href="https://www.amsterdam.nl/overdezesite/">
          <ChevronRight width={12} height={12} />
          &nbsp;Over deze site
        </Link>
        <Link href="https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-wonen/meldingen-overlast-privacy/">
          <ChevronRight width={12} height={12} />
          &nbsp;Privacy
        </Link>
        <Link href="https://acc.meldingen.amsterdam.nl/toegankelijkheidsverklaring">
          <ChevronRight width={12} height={12} />
          &nbsp;Toegankelijkheid
        </Link>
      </StyledFooterBottom>
    </footer>
  </FooterContainer>
)

export default LayoutFooter
