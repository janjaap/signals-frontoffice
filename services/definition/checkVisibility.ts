// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam
import isEqual from 'lodash/isEqual'
// import isObject from 'lodash/isObject'

import type { Meta, RecordValue, RenderCondition } from './definition'

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
    if (
      comparisonFunc.call(value, (val: RecordValue) =>
        isValueEqual(objToCompareTo, val, key, comparisonFunc)
      )
    )
      return true
  }

  // if (Array.isArray(objToCompareTo[key])) {
  //   if (
  //     objToCompareTo[key].includes(value) ||
  //     comparisonFunc.call(
  //       objToCompareTo[key],
  //       (item: RecordValue) => item === value
  //     )
  //   )
  //     return true
  // }

  // if (isObject(objToCompareTo[key])) {
  //   if (objToCompareTo[key].value && isEqual(value, objToCompareTo[key].value))
  //     return true
  //   if (objToCompareTo[key].id && isEqual(value, objToCompareTo[key].id))
  //     return true
  // }

  return false
}

const evaluateConditions = (
  conditions: Meta,
  objToCompareTo: RenderCondition
) => {
  const validConditions = ['ifOneOf', 'ifAllOf']
  const validEntries = Object.entries(conditions).filter(([key]) =>
    validConditions.includes(key)
  )

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
