import type { IconOptions, PointTuple } from 'leaflet'
import type { Questions } from '..'

// import { FIELD_TYPE_MAP } from 'signals/incident/containers/IncidentContainer/constants'
// import { validateObjectLocation } from 'signals/incident/services/custom-validators'

const ICON_SIZE = 40

const options: Partial<IconOptions> = {
  className: 'object-marker',
  iconSize: [ICON_SIZE, ICON_SIZE] as PointTuple,
}

const config = {
  container: {
    meta: {
      ifOneOf: {
        subcategory: [
          'container-glas-kapot',
          'container-glas-vol',
          'container-is-kapot',
          'container-is-vol',
          'container-voor-papier-is-stuk',
          'container-voor-papier-is-vol',
          'container-voor-plastic-afval-is-vol',
          'container-voor-plastic-afval-is-kapot',
        ],
      },
      language: {
        title: 'Locatie',
        subTitle: 'Kies een container op de kaart',
        unregistered: 'De container staat niet op de kaart',
        unregisteredId: 'Nummer van de container',
        objectTypeSingular: 'container',
        objectTypePlural: 'containers',
        submit: 'Gebruik deze locatie',
        description:
          'Typ het dichtsbijzijnde adres of klik de locatie aan op de kaart',
      },
      label: 'Kies de container waar het om gaat',
      shortLabel: 'Container(s)',
      pathMerge: 'extra_properties',
      wfsFilter:
        '<PropertyIsEqualTo><PropertyName>status</PropertyName><Literal>1</Literal></PropertyIsEqualTo><BBOX><PropertyName>geometrie</PropertyName><gml:Envelope srsName="{srsName}"><lowerCorner>{west} {south}</lowerCorner><upperCorner>{east} {north}</upperCorner></gml:Envelope></BBOX>',
      endpoint: 'https://api.data.amsterdam.nl/v1/wfs/huishoudelijkafval/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=app:container&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&outputFormat=application/json',
      featureTypes: [
        {
          label: 'Restafval',
          description: 'Restafval container',
          icon: {
            options,
            iconUrl: '/container/rest.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'Rest',
        },
        {
          label: 'Papier',
          description: 'Papier container',
          icon: {
            options,
            iconUrl: '/container/papier.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'Papier',
        },
        {
          label: 'Glas',
          description: 'Glas container',
          icon: {
            options,
            iconUrl: '/container/glas.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'Glas',
        },
        {
          label: 'Plastic',
          description: 'Plastic container',
          icon: {
            options,
            iconUrl: '/container/plastic.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'Plastic',
        },
        {
          label: 'Textiel',
          description: 'Textiel container',
          icon: {
            options,
            iconUrl: '/container/textiel.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'Textiel',
        },
        {
          label: 'Groente- fruit- en tuinafval',
          description: 'Groente- fruit- en tuinafval container',
          icon: {
            options,
            iconUrl: '/container/gft.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'GFT',
        },
        {
          label: 'Brood',
          description: 'Brood container',
          icon: {
            options,
            iconUrl: '/container/brood.svg',
          },
          idField: 'id_nummer',
          typeField: 'fractie_omschrijving',
          typeValue: 'Brood',
        },
        {
          description: 'De container staat niet op de kaart',
          label: 'Onbekend',
          icon: {
            iconUrl: '/featureUnknownMarker.svg',
          },
          idField: 'id',
          typeField: 'type',
          typeValue: 'not-on-map',
        },
      ],
    },
    render: 'AssetSelect',
    options: {
      validators: ['required'],
    },
  },
}

export default config as Questions<typeof config>
