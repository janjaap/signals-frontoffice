import type { Questions } from '..'

import locatie from './locatie'

const config = {
  ...locatie,
  afval: {
    meta: {
      ifOneOf: {
        subcategory: ['grofvuil', 'huisafval', 'puin-sloopafval'],
      },
      label: 'Waar komt het afval vandaan, denkt u?',
      shortLabel: 'Waar vandaan',
      pathMerge: 'extra_properties',
    },
    render: 'TextareaInput',
  },
}

export default config as Questions<typeof config>
