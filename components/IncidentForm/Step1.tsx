import Head from 'next/head'
import { useCallback, useContext, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import type { BaseSyntheticEvent, FC } from 'react'
import type { RootState } from 'app/store/store'

import AddNote from 'components/AddNote'
import FormNavigation from 'components/FormNavigation'
import { fetchClassification } from 'app/store/slices/incident'
import FormContext from 'app/incident/context'

type FormData = {
  source: string
  description: string
}

const Step1: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()
  const dispatch = useDispatch()
  const { onSubmit } = useContext(FormContext)
  const { description } = useSelector((state: RootState) => state.incident)
  const maxLength = 1000

  const onBlur = useCallback(
    (event: BaseSyntheticEvent<FocusEvent, HTMLTextAreaElement>) => {
      const { value } = event.currentTarget
      const trimmed = value.trim()

      if (!trimmed) return

      dispatch(fetchClassification(trimmed))
    },
    [dispatch]
  )

  const descriptionError = useMemo(() => {
    switch (errors.description?.type) {
      case 'maxLength':
        return `U heeft meer dan de maximale ${maxLength} tekens ingevoerd`;

      case 'required':
        return 'Dit veld is verplicht'

      default:
        return undefined
    }
  }, [errors.description])

  return (
    <>
      <Head>
        <title>Beschrijf uw melding</title>
      </Head>

      <h1>1. Beschrijf uw melding</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Geef een korte beschrijving van wat u wilt melden</legend>

          <input type="hidden" {...register('source', { value: 'online' })} />

          <AddNote
            error={descriptionError}
            id="description"
            isStandalone={false}
            label="Waar gaat het om?"
            maxContentLength={maxLength}
            value={description}
            {...register('description', {
              required: true,
              onBlur,
              value: description,
              maxLength,
            })}
          />
        </fieldset>

        <FormNavigation />
      </form>
    </>
  )
}

export default Step1
