import type { Classification } from 'app/store/slices/incident'

import openbaarGroenEnWaterConfig from './questionConfigurations/openbaar-groen-en-water'
import afvalConfig from './questionConfigurations/afval'
import overlastBedrijvenEnHoreca from './questionConfigurations/overlast-bedrijven-en-horeca'

import checkVisibility from './checkVisibility'

type RenderType =
  | 'AssetSelect'
  | 'CaterpillarSelect'
  | 'Caution'
  | 'Citation'
  | 'CheckboxInput'
  | 'PlainText'
  | 'RadioInput'
  | 'SelectInput'
  | 'TextareaInput'
  | 'TextInput'
  | null

type Validator = 'required' | 'optional'
type AssertValidator = 'max_length' | 'min_length'
export type RecordValue = Array<string | number> | string | number

export interface RenderCondition {
  category?: Classification['category']
  subcategory?:
    | Classification['subcategory']
    | Array<Classification['subcategory']>
  [key: string]: RecordValue
}

export interface Meta {
  ifAllOf?: RenderCondition
  ifOneOf?: RenderCondition
  label?: string
  subTitle?: string
  values?: Record<string, string>
  value?: string
}
export type Questions<T = Record<string, never>> = {
  [Property in keyof T]: {
    meta: Meta
    options?: {
      validators?: Array<Validator | [validator: AssertValidator, arg: number]>
    }
    render: RenderType
  }
}

export const determineConfig = ({
  category,
  subcategory,
  ...values
}: // description,
// }: Classification & Pick<IncidentState, 'description'>) => {
Classification): Questions | null => {
  let config: Questions

  switch (category) {
    case 'afval':
      config = afvalConfig as Questions<typeof afvalConfig>
      break

    case 'openbaar-groen-en-water':
      config = openbaarGroenEnWaterConfig as Questions<
        typeof openbaarGroenEnWaterConfig
      >
      break

    case 'overlast-bedrijven-en-horeca':
      config = overlastBedrijvenEnHoreca as Questions<
        typeof overlastBedrijvenEnHoreca
      >
      break

    default:
      return null
  }

  return Object.entries(config)
    .filter(([, control]) =>
      checkVisibility(control.meta, {
        ...values,
        category,
        subcategory,
      })
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}
