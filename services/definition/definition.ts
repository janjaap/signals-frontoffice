import type { Classification, IncidentState } from 'app/store/slices/incident'

import openbaarGroenEnWaterConfig from './questionConfigurations/openbaar-groen-en-water'
import afvalConfig from './questionConfigurations/afval'
import overlastBedrijvenEnHoreca from './questionConfigurations/overlast-bedrijven-en-horeca'

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
type RenderCondition = {
  category?: Classification['category'] | Array<Classification['category']>
  subcategory?:
    | Classification['subcategory']
    | Array<Classification['subcategory']>
}

interface Meta {
  ifAllOf?: RenderCondition
  ifOneOf?: RenderCondition
  label?: string
  subTitle?: string
  values?: Record<string, string>
  value?: string
}
export interface Questions {
  [key: string]: {
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
  description,
}: Classification & Pick<IncidentState, 'description'>): Questions => {
  switch (category) {
    case 'afval':
      return afvalConfig

    case 'openbaar-groen-en-water':
      return openbaarGroenEnWaterConfig

    case 'overlast-bedrijven-en-horeca':
      return overlastBedrijvenEnHoreca
  }
}
