import Head from 'next/head'
import { useCallback, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import type { BaseSyntheticEvent, FC } from 'react'

import AddNote from '../../components/AddNote'
import FormNavigation from '../../components/FormNavigation'

import { fetchClassification, setSource } from '../../app/store/slices/incident'
import FormContext from '../../pages/incident/context'
import type { RootState } from 'app/store/store'

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
  const onBlur = useCallback(
    (event: BaseSyntheticEvent<FocusEvent, HTMLTextAreaElement>) => {
      const { value } = event.currentTarget
      const trimmed = value.trim()

      if (!trimmed) return

      dispatch(fetchClassification(trimmed))
    },
    [dispatch]
  )

  return (
    <>
      <Head>
        <title>Beschrijf uw melding</title>
      </Head>
      <h1>Beschrijf uw melding</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Geef een korte beschrijving van wat u wilt melden</legend>

          <input type="hidden" {...register('source', { value: 'online' })} />

          <AddNote
            error={
              errors.description?.type === 'required' && 'Dit veld is verplicht'
            }
            isStandalone={false}
            label="Waar gaat het om?"
            value={description}
            {...register('description', {
              required: true,
              onBlur,
              value: description,
            })}
          />
        </fieldset>

        <FormNavigation />
      </form>
    </>
  )
}

export default Step1
