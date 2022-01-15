import type { PointTuple } from 'leaflet'

import type { Questions } from '..'

const ICON_SIZE = 40
const options = {
  className: 'object-marker',
  iconSize: [ICON_SIZE, ICON_SIZE] as PointTuple,
}

const config = {
  eikenprocessierups: {
    meta: {
      label: 'Waar is het?',
      language: {
        title: 'Locatie',
        subTitle: 'Kies een boom op de kaart',
        unregistered: 'De boom staat niet op de kaart',
        unregisteredId: undefined,
        objectTypeSingular: 'boom',
        objectTypePlural: 'bomen',
        submit: 'Gebruik deze locatie',
      },
      shortLabel: 'Boom',
      pathMerge: 'extra_properties',
      endpoint:
        'https://services9.arcgis.com/YBT9ZoJBxXxS3cs6/arcgis/rest/services/EPR_2021_SIA_Amsterdam/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson&geometryType=esriGeometryEnvelope&geometry={{east},{south},{west},{north}}',
      icons: [
        {
          id: 'oak',
          iconUrl: '/oak.svg',
        },
        {
          id: 'oakIsReported',
          iconUrl: '/oakReported.svg',
        },
        {
          id: 'isReported',
          iconUrl: '/icon-reported-marker.svg',
        },
        {
          id: 'isSelected',
          iconUrl: '/featureSelectedMarker.svg',
        },
        {
          id: 'isSelectedAndReported',
          iconUrl: '/oakSelectedReported.svg',
        },
        {
          id: 'unknown',
          iconUrl: '/featureUnknownMarker.svg',
        },
      ],
      featureTypes: [
        {
          label: 'Eikenboom',
          description: 'Eikenboom',
          iconId: 'oak',
          icon: {
            options,
            iconUrl: '/oak.svg',
            reportedIconSvg: '/oakSelectedReported.svg',
          },
          iconIsReportedId: 'oakIsReported',
          idField: 'OBJECTID',
          typeValue: 'Eikenboom',
          typeField: '',
          isReportedField: 'AMS_Meldingstatus',
          isReportedValue: 1,
        },
        {
          label: 'Eikenboom is reeds gemeld ',
          description: 'Eikenboom is reeds gemeld',
          iconId: 'oakIsReported',
          icon: {
            options,
            iconUrl: '/oakSelectedReported.svg',
          },
          iconIsReportedId: 'oakIsReported',
          idField: 'OBJECTID',
          typeValue: 'oakIsReported',
          typeField: '',
          isReportedField: 'AMS_Meldingstatus',
          isReportedValue: 1,
        },
        {
          label: 'Onbekend',
          description: 'De boom staat niet op de kaart',
          iconId: 'unknown',
          icon: {
            options,
            iconUrl: '/featureUnknownMarker.svg',
          },
          typeValue: 'not-on-map',
          typeField: '',
        },
      ],
      extraProperties: ['GlobalID'],
    },
    options: { validators: ['required'] },
    render: 'CaterpillarSelect',
  },
  nest_grootte: {
    meta: {
      label: 'Wat hebt u op de boom gezien?',
      shortLabel: 'Op de boom gezien',
      pathMerge: 'extra_properties',
      values: {
        klein: 'Nest is zo groot als een tennisbal',
        groot: 'Nest is zo groot als een voetbal',
        deken: 'Rupsen bedekken de stam als een deken',
        geen_nest: 'De rupsen in de boom hebben nog geen nest gevormd',
      },
    },
    options: { validators: ['required'] },
    render: 'RadioInput',
  },
}

export default config as Questions<typeof config>
