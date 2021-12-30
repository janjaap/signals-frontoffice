import locatie from './locatie'

export const controls = {
  locatie,
  extra_afval: {
    meta: {
      ifOneOf: {
        subcategory: ['grofvuil', 'huisafval', 'puin-sloopafval'],
      },
      label: 'Waar komt het afval vandaan, denkt u?',
      shortLabel: 'Waar vandaan',
      pathMerge: 'extra_properties',
    },
    render: 'Textarea',
  },
}

export default controls
