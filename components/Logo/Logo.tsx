import styled from 'styled-components'
import { breakpoint, themeSpacing } from '@amsterdam/asc-ui'

import type { FC } from 'react'

const StyledLogo = styled.img`
  display: block;
  width: 153px;
  height: 68px;

  @media screen and ${breakpoint('max-width', 'tabletS')} {
    width: 68px;
    height: 29px;
  }
`

const StyledA = styled.a`
  display: inline-block;
  width: 153px;
  height: 68px;
  margin-right: ${themeSpacing(3)};

  @media screen and ${breakpoint('max-width', 'tabletS')} {
    width: 68px;
    height: 29px;
  }
  @media screen and ${breakpoint('min-width', 'laptopM')} {
    margin-right: ${themeSpacing(10)};
  }
`

const Logo: FC = () => (
  <StyledA data-testid="logo-link" href="https://www.amsterdam.nl">
    <StyledLogo
      data-testid="logo"
      alt="Logo gemeente Amsterdam, naar amsterdam.nl"
      src="/amsterdam-logo.svg"
    />
  </StyledA>
)

export default Logo
