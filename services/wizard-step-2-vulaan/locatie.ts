type Condition = {
  category?: string | Array<string>
  subcategory?: string | Array<string>
  datetime?: string
}

interface DisplayConditions {
  ifAllOf?: Condition
  ifOneOf?: Condition
  ifNotOf?: Condition
}

const locatie = {
  meta: {
    featureTypes: [],
    label: 'Waar is het?',
    language: {
      title: 'Locatie',
      subTitle: 'Waar is het?',
      description:
        'Typ het dichtsbijzijnde adres of klik de locatie aan op de kaart',
      submit: 'Gebruik deze locatie',
    },
    shortLabel: 'Waar is het?',
  },
  render: 'AssetSelect',
  options: {
    validators: ['required'],
  },
}

export const locatieFn = (displayConditions: DisplayConditions = {}) => ({
  ...locatie,
  meta: {
    ...locatie.meta,
    ...displayConditions,
  },
})

export default locatie
