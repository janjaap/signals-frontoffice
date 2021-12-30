import { configureStore } from '@reduxjs/toolkit'

import globalReducer from './slices/global'
import incidentReducer from './slices/incident'
// import { api as predictionApi } from '../../services/api/prediction'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    incident: incidentReducer,
    // [predictionApi.reducerPath]: predictionApi.reducer,
  },
  // middleware: (gDM) => gDM().concat(predictionApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
