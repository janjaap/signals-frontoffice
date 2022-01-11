export const VARIANT_ERROR = 'error'
export const VARIANT_NOTICE = 'notice'
export const VARIANT_SUCCESS = 'success'

export const TYPE_GLOBAL = 'global'
export const TYPE_LOCAL = 'local'

export const SLIDEUP_TIMEOUT = 8000
export const ONCLOSE_TIMEOUT = 200

export type Variant = typeof VARIANT_ERROR | typeof VARIANT_NOTICE | typeof VARIANT_SUCCESS
export type Type = typeof TYPE_GLOBAL | typeof TYPE_LOCAL
