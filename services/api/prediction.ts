import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Prediction } from '../classification'
import type { IncidentState } from '../../app/store/slices/incident'
import resolveClassification from '../classification'

export const api = createApi({
  reducerPath: 'prediction',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://acc.api.data.amsterdam.nl/signals/',
  }),
  tagTypes: ['Classification'],
  endpoints: (builder) => ({
    postText: builder.mutation<Prediction, Pick<IncidentState, 'description'>>({
      query: (description) => ({
        url: 'category/prediction',
        method: 'POST',
        body: { text: description },
      }),
      transformResponse: (response: Prediction, meta, arg) => {
        const classification = resolveClassification(response)
        return classification
      },
      invalidatesTags: ['Classification'],
    }),
  }),
})

export const { usePostTextMutation } = api
