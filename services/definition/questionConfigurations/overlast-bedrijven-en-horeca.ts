import locatie from './locatie'

const config = {
  locatie,
  wat: {
    meta: {
      ifAllOf: {
        category: 'overlast-bedrijven-en-horeca',
      },
      label: 'Uw melding gaat over:',
      shortLabel: 'Soort bedrijf',
      pathMerge: 'extra_properties',
      values: {
        horecabedrijf:
          'Horecabedrijf, zoals een café, restaurant, snackbar of kantine',
        ander_soort_bedrijf:
          'Ander soort bedrijf, zoals een winkel, supermarkt of sportschool',
        evenement_festival_markt:
          'Evenement, zoals een festival, feest of markt',
        iets_anders: 'Iets anders',
      },
    },
    options: { validators: ['required'] },
    render: 'RadioInput',
  },
  naam: {
    meta: {
      ifAllOf: {
        category: 'overlast-bedrijven-en-horeca',
      },
      label: 'Wie of wat zorgt voor deze overlast, denkt u?',
      shortLabel: 'Mogelijke veroorzaker',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },
  adres: {
    meta: {
      ifAllOf: {
        category: 'overlast-bedrijven-en-horeca',
      },
      label: 'Op welk adres hebt u overlast?',
      shortLabel: 'Adres overlast',
      pathMerge: 'extra_properties',
    },
    options: { validators: ['required'] },
    render: 'TextInput',
  },

  muziek_direct_naast: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
      },
      ifOneOf: {
        wat: ['horecabedrijf', 'ander_soort_bedrijf'],
      },
      label:
        'Woont u direct boven of naast het gebouw waar het geluid vandaan komt?',
      shortLabel: 'Aanpandig',
      pathMerge: 'extra_properties',
      values: {
        naast: 'Naast',
        boven: 'Boven',
        onder: 'Onder',
        nee: 'Nee, ik woon er niet direct naast',
      },
    },
    render: 'RadioInput',
  },

  muziek_ramen_dicht: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
      },
      ifOneOf: {
        wat: ['horecabedrijf', 'ander_soort_bedrijf'],
      },
      label:
        'Hebt u ook last van het geluid als uw ramen en deuren gesloten zijn?',
      shortLabel: 'Overlast met ramen en deuren dicht',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, ook last met ramen en deuren gesloten',
        nee: 'Nee, geen last met ramen en deuren gesloten',
      },
    },
    render: 'RadioInput',
  },
  muziek_ramen_dicht_onderneming: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
      },
      ifOneOf: {
        wat: ['horecabedrijf', 'ander_soort_bedrijf'],
      },
      label: 'Staan de ramen of deuren open van het horecabedrijf?',
      shortLabel: 'Ramen/deuren horeca open',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, ramen of deuren staan open',
        nee: 'Nee, ramen en deuren zijn gesloten',
      },
    },
    render: 'RadioInput',
  },
  muziek_ramen_dicht_onderneming_lang: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
        muziek_ramen_dicht_onderneming: 'ja',
      },
      ifOneOf: {
        wat: ['horecabedrijf', 'ander_soort_bedrijf'],
      },
      label: 'Gaan de ramen of deuren kort of lang open?',
      shortLabel: 'Ramen/deuren gaan',
      pathMerge: 'extra_properties',
      values: {
        kort: 'Kort open',
        lang: 'Lang open',
      },
    },
    render: 'RadioInput',
  },

  muziek_evenement: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
        wat: 'evenement_festival_markt',
      },
      label: 'Heeft iemand van de organisatie u geïnformeerd?',
      shortLabel: 'Geïnformeerd door organisator',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, ik ben geïnformeerd door de organisator',
        nee: 'Nee, ik ben niet geïnformeerd door de organisator',
      },
    },
    options: { validators: ['required'] },
    render: 'RadioInput',
  },

  muziek_evenement_einde: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
        wat: 'evenement_festival_markt',
        muziek_evenement: 'ja',
      },
      label: 'Weet u hoe laat het evenement eindigt?',
      shortLabel: 'Evenement eindigt om',
      pathMerge: 'extra_properties',
    },
    options: { validators: ['required'] },
    render: 'TextInput',
  },

  installaties: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-installaties',
      },
      label: 'Van wat voor soort installatie hebt u last?',
      shortLabel: 'Soort installatie',
      subtitle: 'Bijvoorbeeld een afzuiger of airconditioning',
      pathMerge: 'extra_properties',
    },
    options: { validators: ['required'] },
    render: 'TextInput',
  },

  personen: {
    meta: {
      ifAllOf: {
        subcategory: 'overlast-door-bezoekers-niet-op-terras',
      },
      label: 'Wat is de oorzaak van de overlast?',
      shortLabel: 'Oorzaak overlast',
      values: {
        dronken_bezoekers: 'Dronken bezoekers',
        schreeuwende_bezoekers: 'Schreeuwende bezoekers',
        rokende_bezoekers: 'Rokende bezoekers',
        teveel_fietsen: '(Teveel) fietsen',
        wildplassen: 'Wildplassen',
        overgeven: 'Overgeven',
      },
      pathMerge: 'extra_properties',
    },
    render: 'CheckboxInput',
  },

  terrassen: {
    meta: {
      ifAllOf: {
        subcategory: 'overlast-terrassen',
      },
      label: 'Wat is de oorzaak van de overlast?',
      shortLabel: 'Oorzaak overlast',
      values: {
        uitgewaaierd_terras: 'Uitgewaaierd terras (buiten de toegestane grens)',
        doorloop: 'Het terras belemmert de doorloop',
        stoep_in_beslag:
          'Terras / terrasbezoekers nemen hele stoep in zodat u via de weg erlangs moet',
        bezoekers_op_straat: 'Bezoekers staan op straat',
        bezoekers_op_terras: 'Bezoekers op terras',
        opruimen_meubels: 'Geluid van opruimen meubels',
      },
      pathMerge: 'extra_properties',
    },
    render: 'CheckboxInput',
  },

  stank: {
    meta: {
      ifAllOf: {
        subcategory: 'stankoverlast',
      },
      label: 'Welke geur ruikt u?',
      shortLabel: 'Soort geur',
      subtitle: 'Beschrijf wat voor geur het is',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },

  stank_oorzaak: {
    meta: {
      ifAllOf: {
        subcategory: 'stankoverlast',
      },
      label: 'Wat is de oorzaak van de geuroverlast, denkt u?',
      shortLabel: 'Vermoedelijke oorzaak',
      subtitle: 'Bijvoorbeeld afvoerpijp of schoorsteen',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },

  stank_weer: {
    meta: {
      ifAllOf: {
        subcategory: 'stankoverlast',
      },
      label: 'Welk weer is het tijdens de overlast?',
      shortLabel: 'Weersomstandigheden',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },

  stank_ramen: {
    meta: {
      ifAllOf: {
        subcategory: 'stankoverlast',
      },
      label:
        'Staan de deuren of ramen open van het gebouw waar de geur vandaan komt?',
      shortLabel: 'Ramen/deuren open',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, ramen of deuren staan open',
        nee: 'Nee, ramen en deuren zijn gesloten',
      },
    },
    render: 'RadioInput',
  },

  vaker: {
    meta: {
      ifAllOf: {
        category: 'overlast-bedrijven-en-horeca',
      },
      label: 'Gebeurt het vaker?',
      shortLabel: 'Vaker overlast',
      subtitle: 'Had u de overlast al eerder of is dit de eerste keer?',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, het gebeurt vaker',
        nee: 'Nee, het is de eerste keer',
      },
    },
    render: 'RadioInput',
  },
  tijdstippen: {
    meta: {
      ifAllOf: {
        category: 'overlast-bedrijven-en-horeca',
        vaker: 'ja',
      },
      label: 'Op welke momenten van de dag hebt u de overlast?',
      shortLabel: 'Overlast momenten',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },

  muziek_geluidmeting_muziek: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-muziek',
      },
      label: 'Mogen we contact met u opnemen over de melding?',
      subtitle: 'Bijvoorbeeld om bij u thuis het geluid te meten.',
      shortLabel: 'Toestemming contact opnemen',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, u mag contact met mij opnemen',
        nee: 'Nee, liever geen contact',
      },
    },
    options: { validators: ['required'] },
    render: 'RadioInput',
  },
  muziek_geluidmeting_installaties: {
    meta: {
      ifAllOf: {
        subcategory: 'geluidsoverlast-installaties',
      },
      label: 'Mogen we contact met u opnemen over de melding?',
      subtitle: 'Bijvoorbeeld om bij u thuis het geluid te meten.',
      shortLabel: 'Toestemming contact opnemen',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, u mag contact met mij opnemen',
        nee: 'Nee, liever geen contact',
      },
    },
    options: { validators: ['required'] },
    render: 'RadioInput',
  },
  muziek_geluidmeting_overige: {
    meta: {
      ifAllOf: {
        subcategory: 'overig-horecabedrijven',
      },
      label: 'Mogen we contact met u opnemen over de melding?',
      subtitle: 'Bijvoorbeeld om bij u thuis het geluid te meten.',
      shortLabel: 'Toestemming contact opnemen',
      pathMerge: 'extra_properties',
      values: {
        ja: 'Ja, u mag contact met mij opnemen',
        nee: 'Nee, liever geen contact',
      },
    },
    options: { validators: ['required'] },
    render: 'RadioInput',
  },
  muziek_geluidmeting_caution: {
    meta: {
      ifOneOf: {
        muziek_geluidmeting_muziek: 'ja',
        muziek_geluidmeting_installaties: 'ja',
        muziek_geluidmeting_overige: 'ja',
      },
      value: 'Let op! Vul uw telefoonnummer in op de volgende pagina',
    },
    render: 'Caution',
  },
  muziek_geluidmeting_ja: {
    meta: {
      ifOneOf: {
        muziek_geluidmeting_muziek: 'ja',
        muziek_geluidmeting_installaties: 'ja',
        muziek_geluidmeting_overige: 'ja',
      },
      label: 'Mogen we u nu bellen?',
      shortLabel: 'Bel moment',
      pathMerge: 'extra_properties',
      values: {
        within_30_minutes: 'Binnen 30 minuten',
        within_1_hour: 'Binnen 1 uur',
        not_now: 'Niet nu',
      },
    },
    render: 'RadioInput',
  },
  muziek_geluidmeting_ja_nietnu: {
    meta: {
      ifOneOf: {
        muziek_geluidmeting_ja: 'not_now',
      },
      label: 'Wanneer mogen we u bellen?',
      shortLabel: 'Ander bel moment',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },
  muziek_geluidmeting_nee: {
    meta: {
      ifOneOf: {
        muziek_geluidmeting_muziek: 'nee',
        muziek_geluidmeting_installaties: 'nee',
        muziek_geluidmeting_overige: 'nee',
      },
      label: 'Waarom hebt u liever geen contact?',
      shortLabel: 'Liever geen contact',
      pathMerge: 'extra_properties',
    },
    render: 'TextInput',
  },

  caution: {
    meta: {
      ifAllOf: {
        category: 'overlast-bedrijven-en-horeca',
      },
      value:
        'Wij geven uw gegevens niet aan de (horeca)ondernemer of organisator.\n\nMeldingen met telefoonnummer en/of e-mailadres pakken wij sneller op dan meldingen zonder telefoonnummer en/of e-mailadres.',
    },
    render: 'Caution',
  },
}

export default config
