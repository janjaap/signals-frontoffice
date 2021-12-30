import { createContext } from 'react'
import type { SyntheticEvent } from 'react'

export interface Context {
  canGoNext: boolean
  canGoPrevious: boolean
  goPrevious: (event?: SyntheticEvent) => void
  loading: boolean
  onSubmit: (formData?: any) => void
}

const FormContext = createContext({
  canGoNext: true,
  canGoPrevious: false,
  goPrevious: () => {},
  loading: false,
  onSubmit: () => {},
})

export default FormContext
