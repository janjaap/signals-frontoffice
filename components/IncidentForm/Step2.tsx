import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import type { FieldError } from 'react-hook-form'
import type { FC } from 'react'

import PlainText from '../PlainText'
import TextInput from '../TextInput'
import RadioInput from '../RadioInput'
import CheckboxInput from '../CheckboxInput'
import FormContext from '../../app/incident/context'

import { determineConfig } from 'services/definition'
import AddNote from 'components/AddNote'
import AssetSelectRenderer from 'components/AssetSelect/AssetSelectRenderer'
import { setExtraProperties } from 'app/store/slices/incident/reducer'
import { incidentSelector } from 'app/store/slices/incident/selectors'
import { useAppDispatch } from 'app/store/store'
import Form from 'components/Form'

const Step2: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { canGoNext, goNext } = useContext(FormContext)
  const { description, extra_properties, category, subcategory } = useSelector(incidentSelector)
  const { control, formState, handleSubmit, getValues } = useForm({
    defaultValues: extra_properties,
  })
  const { errors } = formState

  const [config, setConfig] = useState(determineConfig({ category, subcategory }))

  const onOptionChange = useCallback(() => {
    const values = getValues()

    const updatedConfig = determineConfig({ category, subcategory, ...values })
    setConfig(updatedConfig)
  }, [getValues, category, subcategory])

  const onSubmit = useCallback(
    (data) => {
      const { locatie, ...formData } = data

      dispatch(setExtraProperties(formData))

      canGoNext && goNext()
    },
    [canGoNext, dispatch, goNext]
  )

  useEffect(() => {
    if (!category) {
      router.replace('/incident/beschrijf')
    }

    const values = getValues()
    const updatedConfig = determineConfig({ category, subcategory, ...values })
    setConfig(updatedConfig)
  }, [router, category, subcategory, getValues])

  if (!config) return null

  return (
    <>
      <Head>
        <title>Locatie en vragen</title>
      </Head>

      <h1>2. Locatie en vragen</h1>

      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>
            Vult u alstublieft de volgende vragen in over &ldquot;{description}
            &rdquot;
          </legend>

          <PlainText type="citation" label="Dit hebt u net ingevuld">
            {description}
          </PlainText>
        </fieldset>

        <fieldset>
          {Object.entries(config).map(([key, { meta, options, render }]) => {
            const { label } = meta
            const required = options?.validators.includes('required')
            const fieldError = errors[key] as FieldError
            const error = fieldError?.type === 'required' && 'Dit veld is verplicht'
            const value = extra_properties?.[key] || ''
            const inputProps = {
              control,
              error,
              hint: meta.subTitle,
              id: key,
              key,
              label,
              options: undefined,
              required,
              value,
            }

            if (render === 'RadioInput' || render === 'CheckboxInput') {
              inputProps.options = Object.entries(meta.values).map(([optionId, optionLabel]) => ({
                id: optionId,
                label: optionLabel,
              }))
            }

            switch (render) {
              case 'TextInput':
                return <TextInput {...inputProps} value={value as string} />

              case 'RadioInput':
                return <RadioInput {...inputProps} value={value as string} onChange={onOptionChange} />

              case 'CheckboxInput':
                return <CheckboxInput {...inputProps} value={value as string[]} onChange={onOptionChange} />

              case 'PlainText':
                return <PlainText key={key} type={meta.type} label={meta.value} />

              case 'TextareaInput':
                return <AddNote {...inputProps} isStandalone={false} maxContentLength={1000} value={value as string} />

              case 'AssetSelect': {
                const { endpoint, featureTypes, wfsFilter } = config[key].meta
                const { id, ...props } = inputProps

                return (
                  <AssetSelectRenderer
                    {...props}
                    id={key}
                    name={key}
                    error={
                      fieldError?.type === 'required' &&
                      'Typ het dichtsbijzijnde adres of klik de locatie aan op de kaart'
                    }
                    endpoint={endpoint}
                    featureTypes={featureTypes}
                    wfsFilter={wfsFilter}
                  />
                )
              }

              default:
                return <p key={key}>{key}</p>
            }
          })}
        </fieldset>
      </Form>
    </>
  )
}

export default Step2
