import type { Questions } from '..'

import locatie from './locatie'

const config = {
  ...locatie,
  brug: {
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
}

export default config as Questions<typeof config>
