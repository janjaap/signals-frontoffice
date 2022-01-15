import type { TermsState } from './reducer'
import type { RootState } from 'app/store/store'

export const selectTerms = (state: RootState): TermsState => state.terms
