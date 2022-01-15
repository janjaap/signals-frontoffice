import type { Questions } from '..'

import locatie from './locatie'

const config = {
  ...locatie,
  auto_scooter_bromfietswrak: {
    meta: {
      ifAllOf: {
        subcategory: 'auto-scooter-bromfietswrak',
      },
      label: 'Wat weet u over hoe het wrak eruit ziet? Weet u waar het wrak ligt?',
      shortLabel: 'Extra informatie',
      subtitle: 'Bijvoorbeeld: kenteken, merk, kleur, roest, zonder wielen',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },
  fietswrak: {
    meta: {
      ifAllOf: {
        subcategory: 'fietswrak',
      },
      label: 'Wat weet u over hoe het wrak eruit ziet? Weet u waar het wrak ligt?',
      subtitle: 'Bijvoorbeeld: merk, kleur, roest, zonder wielen',
      shortLabel: 'Extra informatie',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },
  parkeeroverlast: {
    meta: {
      ifAllOf: {
        subcategory: 'parkeeroverlast',
      },
      label: 'Wat weet u over de auto, bus of motor?',
      shortLabel: 'Extra informatie',
      subtitle: 'Bijvoorbeeld: kenteken, merk en kleur',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },
}

export default config as Questions<typeof config>
