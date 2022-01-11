import type { Questions } from '..'

import locatie from './locatie'

export default {
  locatie,
  extra_brug: {
    meta: {
      ifAllOf: {
        subcategory: 'bruggen',
      },
      label: 'Wat is de naam of het nummer van de brug?',
      shortLabel: 'Naam brug',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },
} as Questions
