import locatie from './locatie'

export const overlastOpHetWater = {
  locatie,
  extra_boten_snelheid_typeboot: {
    meta: {
      label: 'Wat voor type boot is het?',
      shortLabel: 'Type boot',
      pathMerge: 'extra_properties',
      values: {
        pleziervaart: 'Pleziervaart',
        rondvaartboot_of_salonboot: 'Rondvaartboot of salonboot',
        vrachtschip_of_binnenvaartschip: 'Vrachtschip of binnenvaartschip',
        overig: 'Overig',
      },
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
      },
    },
    options: { validators: ['required'] },
    render: 'Radio',
  },
  extra_boten_snelheid_rederij: {
    meta: {
      label: 'Wat is de naam van de rederij?',
      shortLabel: 'Rederij',
      pathMerge: 'extra_properties',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
        extra_boten_snelheid_typeboot: 'rondvaartboot_of_salonboot',
      },
    },
    render: 'TextInput',
  },
  extra_boten_snelheid_naamboot: {
    meta: {
      label: 'Wat is de naam van de boot?',
      shortLabel: 'Naam boot',
      pathMerge: 'extra_properties',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
        ifOneOf: {
          extra_boten_snelheid_typeboot: [
            'pleziervaart',
            'rondvaartboot_of_salonboot',
            'vrachtschip_of_binnenvaartschip',
            'overig',
          ],
        },
      },
    },
    render: 'TextInput',
  },
  extra_boten_snelheid_meer: {
    meta: {
      label: 'Wat weet u nog meer over deze situatie?',
      shortLabel: 'Extra informatie',
      subtitle:
        'Bijvoorbeeld: de kleur van de boot, aantal passagiers, vaarrichting, Y of Vignet nummer etc.',
      pathMerge: 'extra_properties',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
        ifOneOf: {
          extra_boten_snelheid_typeboot: [
            'pleziervaart',
            'rondvaartboot_of_salonboot',
            'vrachtschip_of_binnenvaartschip',
            'overig',
          ],
        },
      },
    },
    render: 'Textarea',
  },
  extra_boten_geluid_meer: {
    meta: {
      label: 'Wat weet u nog meer over deze situatie?',
      shortLabel: 'Extra informatie',
      subtitle:
        'Bijvoorbeeld: waar de boot naar toe vaart, kleur van de boot, aantal passagiers, kenteken, vignet, etc.',
      pathMerge: 'extra_properties',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-geluid',
      },
    },
    render: 'Textarea',
  },
  extra_boten_gezonken_meer: {
    meta: {
      label: 'Wat weet u nog meer over deze situatie?',
      shortLabel: 'Extra informatie',
      subtitle:
        'Bijvoorbeeld: "er lekt olie", "gevaar voor andere boten", etc.',
      pathMerge: 'extra_properties',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-gezonken-boot',
      },
    },
    render: 'Textarea',
  },
}

export default overlastOpHetWater
