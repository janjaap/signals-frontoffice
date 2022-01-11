import { ThemeProvider } from '@amsterdam/asc-ui'
import { Provider } from 'react-redux'

import type { FC, ReactPropTypes } from 'react'

import Layout from '../components/Layout'
import { store } from '../app/store/store'

import '../styles/global.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

interface AppProps {
  Component: any
  pageProps: ReactPropTypes
}

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ThemeProvider>
)

export default App
