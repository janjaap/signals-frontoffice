import type { Questions } from '..'

import locatie from './locatie'

const config = {
  ...locatie,
  boten_snelheid_typeboot: {
    meta: {
      label: 'Wat voor type boot is het?',
      shortLabel: 'Type boot',
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
    render: 'RadioInput',
  },
  boten_snelheid_rederij: {
    meta: {
      label: 'Wat is de naam van de rederij?',
      shortLabel: 'Rederij',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
        boten_snelheid_typeboot: 'rondvaartboot_of_salonboot',
      },
    },
    render: 'TextInput',
  },
  boten_snelheid_naamboot: {
    meta: {
      label: 'Wat is de naam van de boot?',
      shortLabel: 'Naam boot',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
        ifOneOf: {
          boten_snelheid_typeboot: [
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
  boten_snelheid_meer: {
    meta: {
      label: 'Wat weet u nog meer over deze situatie?',
      shortLabel: 'Extra informatie',
      subtitle: 'Bijvoorbeeld: de kleur van de boot, aantal passagiers, vaarrichting, Y of Vignet nummer etc.',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-snel-varen',
        ifOneOf: {
          boten_snelheid_typeboot: [
            'pleziervaart',
            'rondvaartboot_of_salonboot',
            'vrachtschip_of_binnenvaartschip',
            'overig',
          ],
        },
      },
    },
    render: 'TextareaInput',
  },
  boten_geluid_meer: {
    meta: {
      label: 'Wat weet u nog meer over deze situatie?',
      shortLabel: 'Extra informatie',
      subtitle:
        'Bijvoorbeeld: waar de boot naar toe vaart, kleur van de boot, aantal passagiers, kenteken, vignet, etc.',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-geluid',
      },
    },
    render: 'TextareaInput',
  },
  boten_gezonken_meer: {
    meta: {
      label: 'Wat weet u nog meer over deze situatie?',
      shortLabel: 'Extra informatie',
      subtitle: 'Bijvoorbeeld: "er lekt olie", "gevaar voor andere boten", etc.',
      ifAllOf: {
        subcategory: 'overlast-op-het-water-gezonken-boot',
      },
    },
    render: 'TextareaInput',
  },
}

export default config as Questions<typeof config>
