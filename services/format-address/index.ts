import type { Address } from 'types/address'

const formatAddress = ({
  openbare_ruimte,
  huisnummer,
  huisletter,
  huisnummer_toevoeging,
  postcode,
  woonplaats,
}: Address) =>
  [
    [
      openbare_ruimte,
      `${huisnummer || ''}${huisletter || ''}${
        huisnummer_toevoeging ? `-${huisnummer_toevoeging}` : ''
      }`.trim(),
    ],
    [postcode?.trim(), woonplaats],
  ]
    .flatMap((parts) => parts.filter(Boolean).join(' '))
    .filter(Boolean)
    .join(', ')

export default formatAddress
