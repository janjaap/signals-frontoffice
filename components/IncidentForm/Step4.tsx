import Head from 'next/head'
import { useCallback, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

import type { RootState } from 'app/store/store'

import FormNavigation from '../FormNavigation'

import FormContext from 'app/incident/context'
import SummarySection from 'components/SummarySection'
import formatAddress from 'services/format-address'
import MapStatic from 'components/MapStatic'

type FormData = {
  source: string
  description: string
}

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
    font-weight: 700;
    color: inherit;
  }
`

const Step4 = () => {
  const router = useRouter()
  const {
    // formState: { errors },
    handleSubmit,
    // register,
  } = useForm<FormData>()
  const { category, address, coordinates, extra_properties, description, phone, email, sharing_allowed } = useSelector(
    (state: RootState) => state.incident
  )
  const extraCategory = Object.keys(extra_properties).reduce((_, val) => val, '')
  const extraType = extra_properties[extraCategory].type.toLowerCase()
  const hasContactDetails = phone || email || sharing_allowed
  const { onSubmit } = useContext(FormContext)

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
                <MapStatic width={650} coordinates={coordinates} iconSrc={`/${extraCategory}/${extraType}.svg`} />
              </DescriptionListItem>

              <DescriptionListItem term="Uw melding gaat over">{description}</DescriptionListItem>
            </StyledDescriptionList>
          </StyledListItem>

          <StyledListItem>
            <SummarySection href="/incident/vulaan" link="Wijzig aanvullende informatie" heading="Locatie en vragen" />
          </StyledListItem>

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
