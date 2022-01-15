import isEqual from 'lodash/isEqual'

import type { Meta, RecordValue, RenderCondition } from 'components/AssetSelect/types'

const comparisonFuncs = {
  ifAllOf: Array.prototype.every,
  ifOneOf: Array.prototype.some,
}

const isValueEqual = (
  objToCompareTo: RenderCondition,
  value: RecordValue,
  key: string,
  comparisonFunc: typeof Array.prototype.every | typeof Array.prototype.some
) => {
  if (!Array.isArray(value)) {
    if (isEqual(value, objToCompareTo[key])) return true
  } else {
    if (comparisonFunc.call(value, (val: RecordValue) => isValueEqual(objToCompareTo, val, key, comparisonFunc)))
      return true
  }

  return false
}

const evaluateConditions = (conditions: Meta, objToCompareTo: RenderCondition) => {
  const validConditions = ['ifOneOf', 'ifAllOf']
  const validEntries = Object.entries(conditions).filter(([key]) => validConditions.includes(key))

  return validEntries
    .map(([comparisonKey, value]) => {
      const comparisonFunc = comparisonFuncs[comparisonKey]

      return comparisonFunc.call(Object.entries(value), ([key, val]) => {
        // in case of nested conditions, recursively evaluate that condition
        if (validConditions.includes(key)) {
          return evaluateConditions({ [key]: val }, objToCompareTo)
        }

        return isValueEqual(objToCompareTo, val, key, comparisonFunc)
      })
    }, true)
    .every(Boolean)
}

export default evaluateConditions
