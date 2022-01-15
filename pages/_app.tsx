import { ThemeProvider } from '@amsterdam/asc-ui'
import { Provider } from 'react-redux'

import type { FC, ReactElement, ReactNode, ReactPropTypes } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import FormLayout from '../components/Layout/Form'
import { store } from '../app/store/store'

import '../styles/global.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

interface CustomAppProps {
  Component: any
  pageProps: ReactPropTypes
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const CustomApp: FC<CustomAppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => <FormLayout>{page}</FormLayout>)

  return (
    <ThemeProvider>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
    </ThemeProvider>
  )
}
export default CustomApp
