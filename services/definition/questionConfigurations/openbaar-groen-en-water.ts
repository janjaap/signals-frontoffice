import oakIcon from '../svg/openbaar-groen-en-water/oak.svg'
import oakReportedIcon from '../svg/openbaar-groen-en-water/oakReported.svg'
import oakSelectedReportedIcon from '../svg/openbaar-groen-en-water/oakSelectedReported.svg'
import featureReportedMarkerUrl from '../svg/icon-reported-marker.svg'
import featureSelectedMarkerUrl from '../svg/featureSelectedMarker.svg'
import unknownFeatureMarkerUrl from '../svg/featureUnknownMarker.svg'

const ICON_SIZE = 40
const options = {
  className: 'object-marker',
  iconSize: [ICON_SIZE, ICON_SIZE],
}

const config = {
  extra_eikenprocessierups: {
    meta: {
      ifAllOf: {
        subcategory: 'eikenprocessierups',
      },
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
          iconUrl: oakIcon,
        },
        {
          id: 'oakIsReported',
          iconUrl: oakReportedIcon,
        },
        {
          id: 'isReported',
          iconUrl: featureReportedMarkerUrl,
        },
        {
          id: 'isSelected',
          iconUrl: featureSelectedMarkerUrl,
        },
        {
          id: 'isSelectedAndReported',
          iconUrl: oakSelectedReportedIcon,
        },
        {
          id: 'unknown',
          iconUrl: unknownFeatureMarkerUrl,
        },
      ],
      featureTypes: [
        {
          label: 'Eikenboom',
          description: 'Eikenboom',
          iconId: 'oak',
          icon: {
            options,
            iconUrl: oakIcon,
            reportedIconSvg: oakSelectedReportedIcon,
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
            iconUrl: oakSelectedReportedIcon,
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
            iconUrl: unknownFeatureMarkerUrl,
          },
          typeValue: 'not-on-map',
          typeField: '',
        },
      ],
      extraProperties: ['GlobalID'],
    },
    options: {
      // validators: [validateObjectLocation('boom')],
    },
    render: 'CaterpillarSelect',
  },
  extra_nest_grootte: {
    meta: {
      ifAllOf: {
        subcategory: 'eikenprocessierups',
      },
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

export default config
