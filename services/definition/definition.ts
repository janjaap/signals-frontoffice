import type { Classification, ExtraProperties } from 'app/store/slices/incident/reducer'
import type { Meta } from 'components/AssetSelect/types'

import eikenprocessierupsConfig from './questionConfigurations/eikenprocessierups'
import afvalConfig from './questionConfigurations/afval'
import afvalContainerConfig from './questionConfigurations/afval-container'
import overlastBedrijvenEnHoreca from './questionConfigurations/overlast-bedrijven-en-horeca'
import evaluateConditions from './evaluateConditions'
import civieleConstructies from './questionConfigurations/civieleConstructies'
import overlastInDeOpenbareRuimte from './questionConfigurations/overlast-in-de-openbare-ruimte'
import overlastOpHetWater from './questionConfigurations/overlast-op-het-water'
import overlastVanDieren from './questionConfigurations/overlast-van-dieren'
import wegenVerkeerStraatmeubilair from './questionConfigurations/wegen-verkeer-straatmeubilair'
import overlastVanEnDoorPersonenOfGroepen from './questionConfigurations/overlast-van-en-door-personen-of-groepen'
import wonen from './questionConfigurations/wonen'
import locatie from './questionConfigurations/locatie'

const displayTypes = ['AssetSelect', 'CaterpillarSelect'] as const
const previewTypes = ['CheckboxInput', 'PlainText', 'RadioInput', 'SelectInput', 'TextareaInput', 'TextInput'] as const
const renderTypes = [...displayTypes, ...previewTypes, null] as const

type RenderType = typeof renderTypes[number]
type PreviewType = typeof previewTypes[number]
type Validator = 'required' | 'optional'
type AssertValidator = 'max_length' | 'min_length'

export type Questions<T = Record<string, never>> = {
  [Property in keyof T]: {
    meta: Meta
    options?: {
      validators?: Array<Validator | [validator: AssertValidator, arg: number]>
    }
    render: RenderType
  }
}

interface MappedValue {
  label: string
  value: string | number | Array<string | number>
}

export const mappedValues = ({
  category,
  subcategory,
  extra_properties,
}: Classification & {
  extra_properties: ExtraProperties
}): Array<MappedValue> | typeof undefined => {
  const config = determineConfig({ category, subcategory, ...extra_properties })

  if (!config) return

  const getValue = (valueIndex: MappedValue['value'], values: Meta['values']) => {
    if (Array.isArray(valueIndex)) {
      return valueIndex.map((index) => values[index])
    } else {
      return values ? values[valueIndex] : valueIndex
    }
  }

  const filteredAndMapped = Object.entries(config)
    .filter(
      ([
        ,
        {
          meta: { label },
          render,
        },
      ]) => label && previewTypes.includes(render as PreviewType)
    )
    .map(
      ([
        key,
        {
          meta: { label, values },
        },
      ]) => ({
        label: label,
        value: getValue(extra_properties[key], values),
      })
    )

  if (!filteredAndMapped.length) {
    return
  }

  return filteredAndMapped
}

export const determineConfig = ({ category, subcategory, ...values }: Classification): Questions | null => {
  let config: Questions

  switch (category) {
    case 'afval': {
      if (subcategory.startsWith('container')) {
        config = afvalContainerConfig
      } else {
        config = afvalConfig
      }
      break
    }

    case 'wonen':
      config = wonen
      break

    case 'overlast-van-en-door-personen-of-groepen':
      config = overlastVanEnDoorPersonenOfGroepen
      break

    case 'wegen-verkeer-straatmeubilair':
      config = wegenVerkeerStraatmeubilair
      break

    case 'overlast-van-dieren':
      config = overlastVanDieren
      break

    case 'overlast-op-het-water':
      config = overlastOpHetWater
      break

    case 'overlast-in-de-openbare-ruimte':
      config = overlastInDeOpenbareRuimte
      break

    case 'civiele-constructies':
      config = civieleConstructies
      break

    case 'openbaar-groen-en-water':
      if (subcategory === 'eikenprocessierups') {
        config = eikenprocessierupsConfig
      } else {
        config = locatie
      }
      break

    case 'overlast-bedrijven-en-horeca':
      config = overlastBedrijvenEnHoreca
      break

    default:
      config = locatie
  }

  return Object.entries(config)
    .filter(([, control]) =>
      evaluateConditions(control.meta, {
        ...values,
        category,
        subcategory,
      })
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}
