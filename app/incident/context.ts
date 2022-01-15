import { createContext } from 'react'

import type { SyntheticEvent } from 'react'

export interface Context {
  canGoNext: boolean
  canGoPrevious: boolean
  goNext: (event?: SyntheticEvent) => void
  goPrevious: (event?: SyntheticEvent) => void
  loading: boolean
}

const FormContext = createContext<Context>({
  canGoNext: true,
  canGoPrevious: false,
  goPrevious: () => {},
  goNext: () => {},
  loading: false,
})

export default FormContext
