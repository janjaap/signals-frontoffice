import type StatusCode from 'types/statusCode'

export type DefaultText = {
  state: StatusCode
  templates: {
    text: string
    title: string
  }[]
}

export type DefaultTexts = DefaultText[]
