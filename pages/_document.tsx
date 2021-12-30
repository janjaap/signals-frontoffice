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
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default AppDocument

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
