import Head from 'next/head'
import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  OrderedList,
  ListItem,
  DescriptionList,
  DescriptionListItem,
  themeSpacing,
  themeColor,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import FormNavigation from '../FormNavigation'

import SummarySection from 'components/SummarySection'
import formatAddress from 'services/format-address'
import MapStatic from 'components/MapStatic'
import { UNREGISTERED_TYPE } from 'components/AssetSelect/constants'
import { mappedValues } from 'services/definition/definition'
import { createIncident } from 'app/store/slices/incident/thunks'
import { incidentSelector } from 'app/store/slices/incident/selectors'
import { selectedObjectSelector } from 'app/store/slices/global/selectors'
import FormContext from 'app/incident/context'
import { useAppDispatch } from 'app/store/store'

const List = styled(OrderedList)`
  & > li {
    position: relative;
    min-height: 48px;

    &:before {
      font-size: 18px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 8px;
    }
  }

  h2 {
    display: inline-block;
    font-weight: 500;
  }
`

const StyledListItem = styled(ListItem)`
  padding: ${themeSpacing(6, 0, 0)};
  border-top: 2px solid ${themeColor('tint', 'level3')};
`

const StyledDescriptionList = styled(DescriptionList)`
  font-size: 16px;

  && * {
    display: block;
    width: 100%;
    border: 0;
  }

  dt {
    font-weight: 500;
    color: inherit;
  }
`

const Step4 = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { handleSubmit } = useForm<FormData>()
  const { category, subcategory, address, coordinates, extra_properties, description, phone, email, sharing_allowed } =
    useSelector(incidentSelector)
  const selectedObject = useSelector(selectedObjectSelector)
  const mappedStateValues = mappedValues({ category, subcategory, extra_properties })

  const extraCategory = Object.keys(extra_properties || {}).reduce((_, val) => val, '')
  const selectedObjectType = selectedObject?.type?.toLowerCase()
  const hasContactDetails = phone || email || sharing_allowed
  const iconSrc =
    selectedObjectType === UNREGISTERED_TYPE ? '/icon-select-marker.svg' : `/${extraCategory}/${selectedObjectType}.svg`

  const { canGoNext, goNext } = useContext(FormContext)

  const onSubmit = useCallback(async () => {
    await dispatch(createIncident()).unwrap()

    canGoNext && goNext()
  }, [canGoNext, dispatch, goNext])

  useEffect(() => {
    if (!category) {
      router.replace('/incident/beschrijf')
    }
  }, [router, category])

  if (!category) return null

  return (
    <>
      <Head>
        <title>Versturen</title>
      </Head>

      <h1>4. Versturen</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <List>
          <StyledListItem>
            <SummarySection href="/incident/beschrijf" link="Wijzig uw melding" heading="Beschrijf uw melding" />

            <StyledDescriptionList>
              <DescriptionListItem term="Waar is het?">
                <address>{formatAddress(address)}</address>
              </DescriptionListItem>

              <DescriptionListItem term="">
                <MapStatic width={650} coordinates={coordinates} iconSrc={iconSrc} />
              </DescriptionListItem>

              <DescriptionListItem term="Uw melding gaat over">{description}</DescriptionListItem>
            </StyledDescriptionList>
          </StyledListItem>

          {mappedStateValues && (
            <StyledListItem>
              <SummarySection
                href="/incident/vulaan"
                link="Wijzig aanvullende informatie"
                heading="Locatie en vragen"
              />

              <StyledDescriptionList>
                {mappedStateValues.map(({ label, value }) => (
                  <DescriptionListItem key={label} term={label}>
                    {Array.isArray(value) ? value.map((val) => <div key={val}>- {val}</div>) : value}
                  </DescriptionListItem>
                ))}
              </StyledDescriptionList>
            </StyledListItem>
          )}

          {hasContactDetails && (
            <StyledListItem>
              <SummarySection href="/incident/contact" link="Wijzig contactgegevens" heading="Contactgegevens" />

              <StyledDescriptionList>
                {phone && <DescriptionListItem term="Uw telefoonnummer">{phone}</DescriptionListItem>}

                {email && <DescriptionListItem term="Uw e-mailadres">{email}</DescriptionListItem>}

                {sharing_allowed && (
                  <DescriptionListItem term="Melding delen">
                    Ja, ik geef de gemeenten Amsterdam en Weesp toestemming om mijn melding door te sturen naar andere
                    organisaties als de melding niet voor de gemeente is bestemd.
                  </DescriptionListItem>
                )}
              </StyledDescriptionList>
            </StyledListItem>
          )}
        </List>

        <FormNavigation isLast />
      </form>
    </>
  )
}

export default Step4
