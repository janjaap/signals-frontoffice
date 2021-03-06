import type { Questions } from '..'

const config = {
  locatie: {
    meta: {
      featureTypes: [],
      label: 'Waar is het?',
      language: {
        title: 'Locatie',
        subTitle: 'Waar is het?',
        description: 'Typ het dichtsbijzijnde adres of klik de locatie aan op de kaart',
        submit: 'Gebruik deze locatie',
      },
      shortLabel: 'Waar is het?',
    },
    render: 'AssetSelect',
    options: {
      validators: ['required'],
    },
  },
}

export default config as Questions<typeof config>
