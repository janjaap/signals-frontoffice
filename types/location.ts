import type { Address } from './address'
import type { Geometrie } from './incident'

export default interface Location {
  address?: Address
  address_text?: string
  buurt_code?: string
  id?: number
  bag_validated?: boolean
  stadsdeel?: string
  geometrie?: Geometrie
}
