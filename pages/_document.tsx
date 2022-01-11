import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const AppDocument = () => (
  <Html>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon_180x180.png" />
      <link
        rel="stylesheet"
        href="https://static.amsterdam.nl/fonts/fonts.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export const getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (AppDocument) => (props) =>
          sheet.collectStyles(<AppDocument {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } finally {
    sheet.seal()
  }
}

export default AppDocument
