import type { Questions } from '..'

import locatie from './locatie'

const config = {
  ...locatie,
  onderhoud_stoep_straat_en_fietspad: {
    meta: {
      ifOneOf: {
        subcategory: ['onderhoud-stoep-straat-en-fietspad', 'gladheid'],
      },
      label: 'Om wat voor soort wegdek gaat het?',
      shortLabel: 'Soort wegdek',
      subtitle: 'Bijvoorbeeld: asfalt, klinkers of stoeptegels',
    },
    render: 'TextInput',
  },
  wegen_gladheid: {
    meta: {
      ifAllOf: {
        subcategory: 'gladheid',
      },
      value: `
Let op:

Is het glad bij een trein-, bus- of metrostation? Neem dan contact op met de NS of GVB: [gvb.nl/klantenservice](https://gvb.nl/klantenservice)`,
      type: 'caution',
    },
    render: 'PlainText',
  },
  verkeerslicht_welk: {
    meta: {
      label: 'Welk verkeerslicht werkt niet goed?',
      shortLabel: 'Type verkeerslicht',
      ifAllOf: {
        subcategory: 'verkeerslicht',
      },
      values: {
        voetganger: 'Voetganger',
        fiets: 'Fiets',
        auto: 'Auto',
        tram_bus: 'Tram of bus',
        niet_van_toepassing: 'Niet van toepassing',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'RadioInput',
  },
  verkeerslicht: {
    meta: {
      label: 'Zijn er ook beschadigingen aan het verkeerslicht?',
      shortLabel: 'Beschadigingen aan verkeerslicht',
      ifAllOf: {
        subcategory: 'verkeerslicht',
      },
      ifOneOf: {
        verkeerslicht_welk: ['voetganger', 'fiets', 'auto', 'tram_bus'],
      },
      values: {
        geen_beschadigingen: 'Nee, geen beschadigingen',
        verkeerslicht_scheef: 'Ja, het verkeerslicht staat scheef',
        verkeerslicht_op_grond: 'Ja, de lamp of het verkeerslicht ligt op de grond',
        lamp_hangt_los: 'Ja, de lamp hangt los',
        losse_kabels_zichtbaar: 'Ja, er hangen losse stroomkabels',
        deurtje_weg_of_open: 'Ja, er zit geen deurtje in het verkeerslicht of het deurtje staat open',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'RadioInput',
  },
  verkeerslicht_gevaar: {
    meta: {
      ifAllOf: {
        subcategory: 'verkeerslicht',
      },
      ifOneOf: {
        verkeerslicht: [
          'verkeerslicht_scheef',
          'verkeerslicht_op_grond',
          'deurtje_weg_of_open',
          'losse_kabels_zichtbaar',
          'lamp_hangt_los',
        ],
      },
      label: 'Dit kan een gevaarlijke situatie zijn, bel 14 020',
      type: 'info',
      value:
        'Wij verzoeken u om ons te bellen op 14 020 zodat we dit met spoed kunnen oppakken. U hoeft het formulier niet meer verder in te vullen.',
    },
    render: 'PlainText',
  },
  verkeerslicht_probleem_voetganger: {
    meta: {
      label: 'Wat is het probleem?',
      shortLabel: 'Probleem',
      ifAllOf: {
        subcategory: 'verkeerslicht',
        verkeerslicht: 'geen_beschadigingen',
        verkeerslicht_welk: 'voetganger',
      },
      ifOneOf: {
        verkeerslicht_welk: ['voetganger'],
      },
      values: {
        rood_werkt_niet: 'Rood licht werkt niet',
        groen_werkt_niet: 'Groen licht werkt niet',
        blindentikker_werkt_niet: 'Blindentikker werkt niet',
        groen_duurt_te_lang: 'Duurt (te) lang voordat het groen wordt',
        anders: 'Anders',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'CheckboxInput',
  },
  verkeerslicht_probleem_fiets_auto: {
    meta: {
      label: 'Wat is het probleem?',
      shortLabel: 'Probleem',
      ifAllOf: {
        subcategory: 'verkeerslicht',
        verkeerslicht: 'geen_beschadigingen',
      },
      ifOneOf: {
        verkeerslicht_welk: ['fiets', 'auto'],
      },
      values: {
        rood_werkt_niet: 'Rood licht werkt niet',
        oranje_werkt_niet: 'Oranje/geel licht werkt niet',
        groen_werkt_niet: 'Groen licht werkt niet',
        groen_duurt_te_lang: 'Duurt (te) lang voordat het groen wordt',
        anders: 'Anders',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'CheckboxInput',
  },
  verkeerslicht_probleem_bus_tram: {
    meta: {
      label: 'Wat is het probleem?',
      shortLabel: 'Probleem',
      ifAllOf: {
        subcategory: 'verkeerslicht',
        verkeerslicht: 'geen_beschadigingen',
        verkeerslicht_welk: 'tram_bus',
      },
      values: {
        rood_werkt_niet: 'Rood licht werkt niet',
        oranje_werkt_niet: 'Oranje/geel licht werkt niet',
        wit_werkt_niet: 'Wit licht werkt niet',
        waarschuwingslicht_tram_werkt_niet: 'Licht dat waarschuwt voor aankomende tram werkt niet',
        anders: 'Anders',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'CheckboxInput',
  },
  verkeerslicht_nummer: {
    meta: {
      label: 'Wat is het nummer van het verkeerslicht?',
      shortLabel: 'Verkeerslicht nummer',
      subtitle: 'Deze kunt u meestal vinden in witte tekst onder of boven de lampen',
      ifAllOf: {
        subcategory: 'verkeerslicht',
        verkeerslicht: 'geen_beschadigingen',
      },
    },
    render: 'TextInput',
  },

  fietsrek_aanvragen: {
    meta: {
      ifAllOf: {
        subcategory: 'fietsrek-nietje',
      },
      label: "Wilt u een nieuw fietsenrek of 'nietje' aanvragen?",
      shortLabel: 'Fietsenrek aanvragen',
      values: {
        ja: 'Ja, dat ik wil ik',
        nee: 'Nee, ik wil direct verder gaan',
      },
    },
    options: {
      validators: ['required'],
    },
    render: 'RadioInput',
  },
  fietsrek_aanvraag: {
    meta: {
      ifAllOf: {
        subcategory: 'fietsrek-nietje',
        fietsrek_aanvragen: 'ja',
      },
      label: "Fietsenrek of 'nietje' aanvragen",
      shortLabel: "Aanvraag fietsenrek of 'nietje'",
    },
    render: 'TextareaInput',
  },
}

export default config as Questions<typeof config>
