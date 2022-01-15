import { createAsyncThunk } from '@reduxjs/toolkit'

import type { Classification } from '../incident/reducer'

type TermsReponseData = {
  _display: string
  name: string
  handling_message: string
}

export const fetchTerms = createAsyncThunk(
  '/terms/categories',
  async ({ category, subcategory }: Classification): Promise<TermsReponseData> => {
    const response = await fetch(
      `https://api.data.amsterdam.nl/signals/v1/public/terms/categories/${category}/sub_categories/${subcategory}`
    )

    return response.json()
  }
)
