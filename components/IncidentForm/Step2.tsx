import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import type { RootState } from 'app/store/store'

import FormNavigation from '../FormNavigation'
import PlainText from '../PlainText'
import TextInput from '../TextInput'
import RadioInput from '../RadioInput'
import CheckboxInput from '../CheckboxInput'
import AssetSelect from '../AssetSelect'
import FormContext from '../../app/incident/context'

import { determineConfig } from 'services/definition'
import { setExtraProperties } from 'app/store/slices/incident'

const Fieldset = styled.fieldset`
  display: grid;
  row-gap: 32px;
`

const Step2 = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    address,
    coordinates,
    category,
    subcategory,
    description,
    extra_properties,
  } = useSelector((state: RootState) => state.incident)
  const { control, formState, handleSubmit, getValues } = useForm({
    defaultValues: extra_properties?.[category],
  })
  const { errors } = formState

  const [config, setConfig] = useState(
    determineConfig({ category, subcategory })
  )

  const { onSubmit } = useContext(FormContext)

  const onFormSubmit = useCallback(
    (formData) => {
      dispatch(setExtraProperties({ [category]: { ...formData } }))
      onSubmit()
    },
    [category, dispatch, onSubmit]
  )

  const onOptionChange = useCallback(() => {
    const values = getValues()

    const updatedConfig = determineConfig({ category, subcategory, ...values })
    setConfig(updatedConfig)
  }, [getValues, category, subcategory])

  useEffect(() => {
    if (!category) {
      router.replace('/incident/beschrijf')
    }
  }, [router, category])

  if (!config) return null

  return (
    <>
      <Head>
        <title>Locatie en vragen</title>
      </Head>

      <h1>Locatie en vragen</h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Fieldset>
          <legend>
            Vult u alstublieft de volgende vragen in over &ldquot;{description}
            &rdquot;
          </legend>

          <PlainText type="citation" label="Dit hebt u net ingevuld">
            {description}
          </PlainText>

          {Object.entries(config).map(([key, { meta, options, render }]) => {
            const { label } = meta
            const required = options?.validators.includes('required')
            const error =
              errors[key]?.type === 'required' && 'Dit veld is verplicht'
            const inputProps = {
              control,
              error,
              hint: meta.subTitle,
              id: key,
              key,
              label,
              options: undefined,
              required,
              value: extra_properties?.[category]?.[key],
            }

            if (render === 'RadioInput' || render === 'CheckboxInput') {
              inputProps.options = Object.entries(meta.values).map(
                ([optionId, optionLabel]) => ({
                  id: optionId,
                  label: optionLabel,
                })
              )
            }

            switch (render) {
              case 'TextInput':
                return <TextInput {...inputProps} />

              case 'RadioInput':
                return <RadioInput {...inputProps} onChange={onOptionChange} />

              case 'CheckboxInput':
                return (
                  <CheckboxInput {...inputProps} onChange={onOptionChange} />
                )

              case 'Caution':
                return <PlainText key={key} type="caution" label={meta.value} />

              case 'AssetSelect': {
                const { endpoint, featureTypes, wfsFilter } = config[key].meta

                return (
                  <AssetSelect
                    address={address}
                    coordinates={coordinates}
                    endpoint={endpoint}
                    featureTypes={featureTypes}
                    key={key}
                    name={key}
                    selection={extra_properties?.[key]}
                    wfsFilter={wfsFilter}
                  />
                )
              }

              default:
                return <p key={key}>{key}</p>
            }
          })}
        </Fieldset>

        <FormNavigation />
      </form>
    </>
  )
}

export default Step2
