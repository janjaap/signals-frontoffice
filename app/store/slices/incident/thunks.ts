import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from 'app/store/store'
import type { Prediction } from 'services/classification'
import type { PostResponseData, PostRequestData, RawClassification } from './reducer'

import { fetchTerms } from '../terms/thunks'

import resolveClassification from 'services/classification'
import { coordinatesToAPIfeature } from 'services/map-location'

export const fetchClassification = createAsyncThunk(
  'category/prediction',
  async (description: string, { dispatch }): Promise<RawClassification> => {
    const response = await fetch('https://acc.api.data.amsterdam.nl/signals/category/prediction', {
      body: JSON.stringify({ text: description }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data: Prediction = await response.json()

    const classification = resolveClassification(data)

    dispatch(fetchTerms({ category: classification.category.label, subcategory: classification.subcategory.label }))

    return classification
  }
)

export const createIncident = createAsyncThunk('incident/post', async (_, thunkAPI): Promise<PostResponseData> => {
  const { incident } = thunkAPI.getState() as RootState
  const postData: PostRequestData = {
    category: {
      sub_category: incident.subcategory.id,
    },
    incident_date_start: new Date().toISOString(),
    location: {
      address: incident.address,
      geometrie: coordinatesToAPIfeature(incident.coordinates),
    },
    reporter: {
      phone: incident.phone,
      email: incident.email,
      sharing_allowed: incident.sharing_allowed,
    },
    source: incident.source,
    text: incident.description,
  }

  const response = await fetch('https://acc.api.data.amsterdam.nl/signals/v1/public/signals', {
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
})
