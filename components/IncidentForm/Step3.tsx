import Head from 'next/head'
import { useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import type { RootState } from 'app/store/store'

import FormNavigation from '../FormNavigation'
import TextInput from '../TextInput'
import EmphasisCheckboxInput from '../EmphasisCheckboxInput'

import FormContext from 'app/incident/context'
import {
  setEmail,
  setPhone,
  setSharingAllowed,
} from 'app/store/slices/incident'

type FormData = {
  phone?: string
  email?: string
  sharing_allowed?: boolean
}

const Step3 = () => {
  const dispatch = useDispatch()
  const incident = useSelector((state: RootState) => state.incident)
  const { phone, email, sharing_allowed } = incident
  const { control, handleSubmit } = useForm<FormData>()

  const { onSubmit } = useContext(FormContext)

  const onBlur = useCallback(
    (event) => {
      const { id, value } = event.target

      if (!value || incident[id] === value) return

      switch (id) {
        case 'phone':
          dispatch(setPhone(value))
          break
        case 'email':
          dispatch(setEmail(value))
          break
      }
    },
    [dispatch, incident]
  )

  return (
    <>
      <Head>
        <title>Contactgegevens</title>
      </Head>
      <h1>Contactgegevens</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Geef een korte beschrijving van wat u wilt melden</legend>

          <h2>Mogen we u bellen voor vragen?</h2>
          <TextInput
            control={control}
            hint="We gebruiken uw telefoonnummer alléén om nog iets te kunnen vragen over uw melding."
            id="phone"
            label="Wat is uw telefoonnummer?"
            name="phone"
            type="tel"
            value={phone}
            onBlur={onBlur}
          />

          <h2>Wilt u op de hoogte blijven?</h2>
          <TextInput
            control={control}
            hint="We gebruiken uw e-mailadres alléén om u op de hoogte te houden, of wanneer wij een vraag hebben en u niet per telefoon kunnen bereiken."
            id="email"
            label="Wat is uw e-mailadres?"
            name="email"
            type="email"
            value={email}
            onBlur={onBlur}
          />

          <h2>Melding doorsturen</h2>
          <p>
            Soms kan de gemeente niets doen. Een andere organisatie moet dan aan
            het werk. Bijvoorbeeld de politie of de dierenambulance. Als dat zo
            is kunnen wij uw melding doorsturen. Wij sturen uw telefoonnummer of
            e-mailadres mee. Maar dat doen we alleen als u dat goed vindt.
          </p>
          <EmphasisCheckboxInput
            control={control}
            id="sharing_allowed"
            name="sharing_allowed"
            options={[
              {
                id: 'ja',
                label:
                  'Ja, ik geef de gemeenten Amsterdam en Weesp toestemming om mijn melding door te sturen naar andere organisaties als de melding niet voor de gemeente is bestemd.',
              },
            ]}
            value={sharing_allowed ? ['ja'] : undefined}
            onChange={(event) => {
              dispatch(setSharingAllowed(event.target.checked))
            }}
          />
        </fieldset>
        <FormNavigation />
      </form>
    </>
  )
}

export default Step3
