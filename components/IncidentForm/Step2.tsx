import Head from 'next/head'
import { useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'

import type { RootState } from '../../app/store/store'

import FormNavigation from '../FormNavigation'
import PlainText from '../PlainText'
import TextInput from '../TextInput'
import RadioInput from '../RadioInput'
import FormContext from '../../app/incident/context'

import { determineConfig } from 'services/definition'

// type FormData = {
//   source: string
//   description: string
// }

const Fieldset = styled.fieldset`
  display: grid;
  row-gap: 32px;
`

const Step2 = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm()
  const { category, subcategory, description } = useSelector(
    (state: RootState) => state.incident
  )
  const config = determineConfig({ category, subcategory, description })
  // const { loading } = useSelector((state: RootState) => state.global)
  const { onSubmit } = useContext(FormContext)
  console.log(Object.keys(errors))
  return (
    <>
      <Head>
        <title>Locatie en vragen</title>
      </Head>

      <h1>Locatie en vragen</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <legend>
            Vult u alstublieft de volgende vragen in over &ldquot;{description}
            &rdquot;
          </legend>

          <PlainText type="citation" label="Dit hebt u net ingevuld">
            {description}
          </PlainText>

          {Object.entries(config)
            .filter(([, { meta }]) =>
              meta.ifAllOf?.category?.includes(category)
            )
            .map(([key, { meta, options, render }]) => {
              const { label } = meta
              const required = options?.validators.includes('required')

              if (render === 'TextInput') {
                return (
                  <Controller
                    name={key}
                    control={control}
                    rules={{ required }}
                    render={({ field }) => (
                      <TextInput
                        error={
                          errors[key]?.type === 'required' &&
                          'Dit veld is verplicht'
                        }
                        label={label}
                        hint={meta.subTitle}
                        id={key}
                        {...field}
                      />
                    )}
                  />
                )
              }

              if (render === 'RadioInput') {
                return (
                  <Controller
                    name={key}
                    control={control}
                    rules={{ required }}
                    render={({ field }) => (
                      <RadioInput
                        error={
                          errors[key]?.type === 'required' &&
                          'Dit veld is verplicht'
                        }
                        label={label}
                        hint={meta.subTitle}
                        id={key}
                        options={Object.entries(meta.values).map(
                          ([id, label]) => ({
                            id,
                            label,
                          })
                        )}
                        {...field}
                      />
                    )}
                  />
                )
              }

              if (render === 'Caution') {
                return (
                  <Controller
                    name={key}
                    control={control}
                    rules={{ required }}
                    render={({ field }) => (
                      <PlainText
                        error={
                          errors[key]?.type === 'required' &&
                          'Dit veld is verplicht'
                        }
                        type="caution"
                        label={meta.value}
                        hint={meta.subTitle}
                        id={key}
                        {...field}
                      />
                    )}
                  />
                )
              }

              return <div key={key}>{key}</div>
            })}
        </Fieldset>

        <FormNavigation />
      </form>
    </>
  )
}

export default Step2
