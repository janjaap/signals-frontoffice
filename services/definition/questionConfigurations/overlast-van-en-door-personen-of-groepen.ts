import type { Questions } from '..'

import locatie from './locatie'

const config = {
  ...locatie,
  drugs_verkoop: {
    meta: {
      ifAllOf: {
        category: 'overlast-van-en-door-personen-of-groepen',
        ifOneOf: {
          subcategory: [
            'drank-en-drugsoverlast',
            'overige-overlast-door-personen',
          ],
        },
      },
      label: 'Denkt u dat er drugs worden verkocht?',
      shortLabel: 'Verkoop drugs',
      pathMerge: 'properties',
      values: {
        ja: 'Ja, ik denk dat er drugs worden verkocht',
        nee: 'Nee, ik denk dat er geen drugs worden verkocht',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'RadioInput',
  },
  drugs_verkoop_ja: {
    meta: {
      ifAllOf: {
        drugs_verkoop: 'ja',
      },
      type: 'info',
      value:
        'De politie behandelt meldingen van verkoop van drugs en overlast van straatdealers. Bel de politie op [0900 8844](tel:09008844). U hoeft dit formulier niet meer verder in te vullen.',
    },
    render: 'PlainText',
  },
  jongeren_text: {
    meta: {
      ifAllOf: {
        category: 'overlast-van-en-door-personen-of-groepen',
        subcategory: 'jongerenoverlast',
      },
      type: 'caution',
      value:
        'Weet u de naam van de jongere(n)? Gebruik dan het formulier [Melding zorg en woonoverlast](https://www.amsterdam.nl/zorg-ondersteuning/contact/meldpunt-zorg/). Dan komt uw melding direct bij het juiste team terecht.',
    },
    render: 'PlainText',
  },
  personen_overig: {
    meta: {
      ifAllOf: {
        category: 'overlast-van-en-door-personen-of-groepen',
      },
      label: 'Om hoeveel personen gaat het (ongeveer)?',
      shortLabel: 'Aantal personen',
      pathMerge: 'properties',
      values: {
        '1-3': '1, 2 of 3',
        '4-6': '4, 5 of 6',
        '7_of_meer': '7 of meer',
        onbekend: 'Onbekend',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'RadioInput',
  },
  personen_overig_vaker: {
    meta: {
      ifAllOf: {
        category: 'overlast-van-en-door-personen-of-groepen',
      },
      label: 'Gebeurt het vaker?',
      shortLabel: 'Vaker',
      pathMerge: 'properties',
      values: {
        nee: 'Nee',
        ja: 'Ja, het gebeurt vaker',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'RadioInput',
  },
  personen_overig_vaker_momenten: {
    meta: {
      label: 'Wanneer gebeurt het?',
      shortLabel: 'Momenten',
      pathMerge: 'properties',
      ifAllOf: {
        personen_overig_vaker: 'ja',
        category: 'overlast-van-en-door-personen-of-groepen',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'TextareaInput',
  },
}

export default config as Questions<typeof config>
