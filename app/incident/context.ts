/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react'

import type { SyntheticEvent } from 'react'

export interface Context {
  canGoNext: boolean
  canGoPrevious: boolean
  goPrevious: (event?: SyntheticEvent) => void
  loading: boolean
  onSubmit: () => void
}

const FormContext = createContext<Context>({
  canGoNext: true,
  canGoPrevious: false,
  goPrevious: () => {},
  loading: false,
  onSubmit: () => {},
})

export default FormContext
