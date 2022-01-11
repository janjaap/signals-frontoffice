import {
  ThemeProvider,
} from '@amsterdam/asc-ui'
import { Provider } from 'react-redux'

import Layout from '../components/Layout'
import { store } from '../app/store/store'

import '../styles/global.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const App = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ThemeProvider>
)

export default App
