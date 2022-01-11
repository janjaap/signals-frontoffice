import type { Classification } from '../../app/store/slices/incident'

export const MINIMUM_CERTAINTY = 0.41
export const DEFAULT_CLASSIFICATION = 'overig'
export const reCategory = /terms\/categories\/([^/]+)(?:\/?[^/]+\/([^/]+))?$/

export type Prediction = {
  hoofdrubriek: [Array<string>, Array<number>]
  subrubriek: [Array<string>, Array<number>]
}

const resolveClassification = ({ hoofdrubriek = [[], []], subrubriek = [[], []] }: Prediction): Classification => {
  const subrubriekMeetsMinimumCertainty = MINIMUM_CERTAINTY <= subrubriek[1][0]
  const hoofdrubriekMeetsMinimumCertainty = MINIMUM_CERTAINTY <= hoofdrubriek[1][0]

  if (subrubriekMeetsMinimumCertainty) {
    const [, category, subcategory] = subrubriek[0][0].match(reCategory) as [void, Classification['category'], string]

    return {
      category,
      subcategory,
    }
  }

  if (hoofdrubriekMeetsMinimumCertainty) {
    const [, category] = hoofdrubriek[0][0].match(reCategory) as [void, Classification['category']]
    let subcategory: string

    switch (category) {
      case 'afval':
        subcategory = 'overig-afval'
        break

      case 'schoon':
        subcategory = 'veegzwerfvuil'
        break

      case 'openbaar-groen-en-water':
        subcategory = 'overig-groen-en-water'
        break

      case 'overlast-bedrijven-en-horeca':
        subcategory = 'overig-horecabedrijven'
        break

      case 'overlast-in-de-openbare-ruimte':
        subcategory = 'overig-openbare-ruimte'
        break

      case 'overlast-op-het-water':
        subcategory = 'overig-boten'
        break

      case 'overlast-van-dieren':
        subcategory = 'overig-dieren'
        break

      case 'overlast-van-en-door-personen-of-groepen':
        subcategory = 'overige-overlast-door-personen'
        break

      case 'wegen-verkeer-straatmeubilair':
        subcategory = 'overig-wegen-verkeer-straatmeubilair'
        break

      case 'wonen':
        subcategory = 'wonen-overig'
        break

      default:
        subcategory = DEFAULT_CLASSIFICATION
    }

    return {
      category,
      subcategory,
    }
  }

  return {
    category: DEFAULT_CLASSIFICATION,
    subcategory: DEFAULT_CLASSIFICATION,
  }
}

export default resolveClassification
