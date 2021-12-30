import {
  Header,
  Link,
  FooterTop,
  FooterBottom,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  background: white;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

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

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'progress header'
    'progress form';
  grid-template-columns: 4fr 8fr;

  grid-column-gap: ${themeSpacing(5)};
`

const FormWrapper = styled.div`
  grid-area: form;
`

const Layout = ({ children }) => (
  <ContentWrapper className="contentWrapper" id="app">
    <Header
      tall
      fullWidth
      headerLogoTextAs="div"
      title="Meldingen"
      homeLink="./"
    />

    <div className="container">
      <Main>
        <FormWrapper>{children}</FormWrapper>
      </Main>
    </div>

    <FooterContainer>
      <footer>
        <StyledFooterTop data-testid="siteFooter" />
        <StyledFooterBottom>
          <Link href="https://www.amsterdam.nl/overdezesite/" inList>
            Over deze site
          </Link>
          <Link
            href="https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-wonen/meldingen-overlast-privacy/"
            inList
          >
            Privacy
          </Link>
          <Link
            href="https://acc.meldingen.amsterdam.nl/toegankelijkheidsverklaring"
            inList
          >
            Toegankelijkheid
          </Link>
        </StyledFooterBottom>
      </footer>
    </FooterContainer>
  </ContentWrapper>
)

export default Layout
