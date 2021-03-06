const configuration = {
  apiBaseUrl: 'https://acc.api.data.amsterdam.nl',
  areaTypeCodeForDistrict: 'stadsdeel',
  featureFlags: {
    assignSignalToDepartment: false,
    assignSignalToEmployee: false,
    enablePublicSignalMap: false,
    enableReporter: true,
    enableNearIncidents: true,
    fetchDistrictsFromBackend: false,
    fetchQuestionsFromBackend: false,
    mapFilter24Hours: true,
    showThorButton: true,
    showVulaanControls: true,
    useProjectenSignalType: false,
    useStaticMapServer: true,
  },
  head: {
    androidIcon: '/icon_192x192.png',
    backgroundColor: '#ffffff',
    favicon: '/favicon.png',
    iosIcon: '/icon_180x180.png',
    statusBarStyle: 'default',
    themeColor: '#ec0000',
  },
  language: {
    consentToContactSharing:
      'Ja, ik geef de gemeenten Amsterdam en Weesp toestemming om mijn melding door te sturen naar andere organisaties als de melding niet voor de gemeente is bestemd.',
    district: 'Stadsdeel',
    headerTitle: '',
    helpText:
      'Wij zijn bereikbaar van maandag tot en met vrijdag van 8.00 tot 18.00 uur.',
    helpTextHeader:
      'Lukt het niet om een melding te doen? Bel het telefoonnummer [14 020](tel:14020)',
    logoDescription: 'Logo gemeente Amsterdam, naar amsterdam.nl',
    mapDescription:
      'Weet u het adres niet, bel dan 14 020 om telefonisch de melding te maken.',
    phoneNumber: '14 020',
    shortTitle: 'Meldingen',
    siteAddress: 'meldingen.amsterdam.nl',
    siteTitle: 'Meldingen',
    smallHeaderTitle: 'Signalen',
    title: 'Meldingen Amsterdam',
    urgentContactInfo:
      'Voor spoedeisende zaken kunt u ook telefonisch contact opnemen met 14 020.',
  },
  links: {
    help: 'https://tamtam.amsterdam.nl/do/office?id=1723860-6f6666696365',
    home: 'https://www.amsterdam.nl',
    privacy:
      'https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-wonen/meldingen-overlast-privacy/',
    about: 'https://www.amsterdam.nl/overdezesite/',
    accessibility: '/toegankelijkheidsverklaring',
  },
  logo: {
    url: '/assets/images/amsterdam-logo.svg',
    width: '153px',
    height: '68px',
    smallWidth: '68px',
    smallHeight: '29px',
  },
  map: {
    municipality: 'amsterdam',
    options: {
      center: { lat: 52.3731081, lng: 4.8932945 },
      maxBounds: [
        [52.25168, 4.64034],
        [52.50536, 5.10737],
      ],
      maxZoom: 16,
      minZoom: 8,
      zoom: 10,
    },
    optionsBackOffice: {
      maxZoom: 16,
      minZoom: 7,
      zoom: 7,
    },
    tiles: {
      args: ['https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png'],
      options: {
        attribution:
          "<span aria-hidden='true'>Kaartgegevens CC-BY-4.0 Gemeente Amsterdam</span>",
        subdomains: ['t1', 't2', 't3', 't4'],
        tms: true,
      },
    },
    staticUrl: 'https://map.data.amsterdam.nl/maps/topografie',
    layers: {
      containers:
        'https://api.data.amsterdam.nl/v1/wfs/huishoudelijkafval/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=app:container&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&outputFormat=application/json',
      klokken:
        'https://api.data.amsterdam.nl/v1/wfs/openbareverlichting/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=openbareverlichting&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&outputFormat=application/json',
      verlichting:
        'https://api.data.amsterdam.nl/v1/wfs/openbareverlichting/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=openbareverlichting&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&outputFormat=application/json',
    },
  },
  matomo: {
    urlBase: 'https://analytics.data.amsterdam.nl/',
    siteId: 14,
  },
  sentry: {
    dsn: 'https://3de59e3a93034a348089131aa565bdf4@sentry.data.amsterdam.nl/27',
  },
}

export default configuration
