import { useCallback, useEffect, useReducer, useMemo } from 'react'

import type { Reducer } from 'react'

type Data = Record<string, unknown>
export type FetchError = (Response | Error) & {
  message: string
  detail?: string
}

export interface State<T> {
  data?: T
  error?: boolean | FetchError
  isLoading: boolean
  isSuccess?: boolean
}

interface FetchResponse<T> extends State<T> {
  get: (url: string, params?: Data, requestOptions?: Data) => Promise<void>
  patch: (
    url: string,
    modifiedData: Data,
    requestOptions?: Data
  ) => Promise<void>
  post: (
    url: string,
    modifiedData?: Data,
    requestOptions?: Data
  ) => Promise<void>
  put: (url: string, modifiedData: Data, requestOptions?: Data) => Promise<void>
}

const errorMessageDictionary = {
  default: 'De opgevraagde gegevens konden niet gevonden worden',
  400: 'Deze wijziging is niet toegestaan in deze situatie.',
  401: 'Om de opgevraagde gegevens te bekijken is een geautoriseerde sessie noodzakelijk',
  403: 'Je hebt niet voldoende rechten om deze actie uit te voeren.',
  408: 'Het verzoek kan niet verwerkt worden door een timeout op de server',
  413: 'De grootte van de payload overschrijdt de toegestane limiet',
  418: 'The server refuses to brew coffee because it is a teapot',
  429: 'Er zijn teveel verzoeken verstuurd',
  500: 'Interne fout op de server. Probeer het nogmaals',
  503: 'Server is op dit moment niet beschikbaar. Probeer het nogmaals',
}

const getErrorMessage = (error, defaultErrorMessage = '') => {
  const status = error?.response?.status || error?.status

  if (!status) {
    return (
      error.message || defaultErrorMessage || errorMessageDictionary.default
    )
  }

  return (
    errorMessageDictionary[status] ||
    defaultErrorMessage ||
    errorMessageDictionary.default
  )
}

/**
 * Custom hook useFetch
 *
 * Will take a URL and an optional object of parameters and use those to construct a request URL
 * with, call fetch and return the response.
 *
 * @returns {FetchResponse}
 */
const useFetch = <T>(): FetchResponse<T> => {
  interface Action {
    payload: boolean | Data | FetchError
    type: string
  }

  const initialState: State<T> = {
    data: undefined,
    error: undefined,
    isLoading: false,
    isSuccess: undefined,
  }

  const reducer = (state: State<T>, action: Action): State<T> => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload as boolean, error: false }

      case 'SET_GET_DATA':
        return {
          ...state,
          data: action.payload as T,
          isLoading: false,
          error: false,
        }

      case 'SET_MODIFY_DATA':
        return {
          ...state,
          data: action.payload as T,
          isLoading: false,
          error: false,
          isSuccess: true,
        }

      case 'SET_ERROR':
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          error: action.payload as FetchError,
        }

      /* istanbul ignore next */
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State<T>, Action>>(
    reducer,
    initialState
  )

  const controller = useMemo(() => new AbortController(), [])
  const { signal } = controller
  const requestHeaders = useCallback(
    () => ({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    []
  )

  useEffect(
    () => () => {
      controller.abort()
    },
    [controller]
  )

  const get = useCallback(
    async (url, params = {}, requestOptions: Data = {}) => {
      dispatch({ type: 'SET_LOADING', payload: true })

      const arrayParams = Object.entries(params)
        .filter(([, value]) => Array.isArray(value))
        .flatMap(([key, value]) =>
          (value as string[]).flatMap((val: string) => `${key}=${val}`)
        )

      const scalarParams = Object.entries(params)
        .filter(([, value]) => Boolean(value) && !Array.isArray(value))
        .flatMap(([key, value]) => `${key}=${value}`)

      const queryParams = arrayParams.concat(scalarParams).join('&')
      const requestURL = [url, queryParams].filter(Boolean).join('?')

      try {
        const fetchResponse = await fetch(requestURL, {
          headers: requestHeaders(),
          method: 'GET',
          signal,
          ...requestOptions,
        })

        const responseData = (
          requestOptions.responseType === 'blob'
            ? await fetchResponse.blob()
            : await fetchResponse.json()
        ) as Data

        if (fetchResponse.ok) {
          dispatch({ type: 'SET_GET_DATA', payload: responseData })
        } else {
          Object.defineProperty(fetchResponse, 'message', {
            value: getErrorMessage(fetchResponse),
            writable: false,
          })

          if (responseData.detail) {
            Object.defineProperty(fetchResponse, 'detail', {
              value: responseData.detail,
              writable: false,
            })
          }

          dispatch({ type: 'SET_ERROR', payload: fetchResponse as FetchError })
        }
      } catch (exception: unknown) {
        if (signal.aborted) return

        Object.defineProperty(exception, 'message', {
          value: getErrorMessage(exception),
          writable: false,
        })

        dispatch({ type: 'SET_ERROR', payload: exception as FetchError })
      }
    },
    [requestHeaders, signal]
  )

  const modify = useCallback(
    (method: string) =>
      async (
        url: RequestInfo,
        modifiedData: Data = {},
        requestOptions: Data = {}
      ) => {
        dispatch({ type: 'SET_LOADING', payload: true })

        try {
          const modifyResponse = await fetch(url, {
            headers: requestHeaders(),
            method,
            signal,
            body: JSON.stringify(modifiedData),
            ...requestOptions,
          })

          const responseData = (
            requestOptions.responseType === 'blob'
              ? await modifyResponse.blob()
              : await modifyResponse.json()
          ) as Data

          if (modifyResponse.ok) {
            dispatch({ type: 'SET_MODIFY_DATA', payload: responseData })
          } else {
            Object.defineProperty(modifyResponse, 'message', {
              value: getErrorMessage(modifyResponse),
              writable: false,
            })

            if (responseData.detail) {
              Object.defineProperty(modifyResponse, 'detail', {
                value: responseData.detail,
                writable: false,
              })
            }

            dispatch({
              type: 'SET_ERROR',
              payload: modifyResponse as FetchError,
            })
          }
        } catch (exception: unknown) {
          if (signal.aborted) return
          Object.defineProperty(exception, 'message', {
            value: getErrorMessage(exception),
            writable: false,
          })

          dispatch({ type: 'SET_ERROR', payload: exception as FetchError })
        }
      },
    [requestHeaders, signal]
  )

  const post = useMemo(() => modify('POST'), [modify])
  const patch = useMemo(() => modify('PATCH'), [modify])
  const put = useMemo(() => modify('PUT'), [modify])

  /**
   * @typedef {Object} FetchResponse
   * @property {Object} data - Fetch response
   * @property {Error} error - Error object thrown during fetch and data parsing
   * @property {Function} get - Function that expects a URL and a query parameter object
   * @property {Boolean} isLoading - Indicator of fetch request status
   * @property {Boolean} isSuccess - Indicator of post or patch request status
   * @property {Function} patch - Function that expects a URL and a data object as parameters
   * @property {Function} post - Function that expects a URL and a data object as parameters
   */
  return {
    get,
    patch,
    post,
    put,
    ...state,
  }
}

export default useFetch
