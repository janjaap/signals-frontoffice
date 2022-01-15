import Head from 'next/head'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import type { FC } from 'react'
import type { IncidentState } from 'app/store/slices/incident/reducer'

import AddNote from '../AddNote'
import FileInput from '../FileInput'

import { setFiles } from 'app/store/slices/incident/reducer'
import { fetchClassification } from 'app/store/slices/incident/thunks'
import FormContext from 'app/incident/context'
import { incidentSelector } from 'app/store/slices/incident/selectors'
import { loadingSelector } from 'app/store/slices/global/selectors'
import { useAppDispatch } from 'app/store/store'
import { showGlobalNotification } from 'app/store/slices/global/reducer'
import { TYPE_LOCAL, VARIANT_NOTICE } from 'components/Notification/constants'
import Form from 'components/Form'

export type FormData = Pick<IncidentState, 'source' | 'description'> & { files: File[] }

const Step1: FC = () => {
  const { source, description, files: attachments } = useSelector(incidentSelector)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm<FormData>({
    shouldUnregister: true,
    defaultValues: { source, description },
  })
  const dispatch = useAppDispatch()
  const { canGoNext, goNext } = useContext(FormContext)
  const loading = useSelector(loadingSelector)
  const activeElement = useRef<HTMLElement>(null)
  const maxLength = 1000

  const onSubmit = useCallback(
    async ({ description, files }: FormData) => {
      if (files?.length) {
        const objectURLs = files.map((file: File) => window.URL.createObjectURL(file))
        dispatch(setFiles(objectURLs))
      }

      const trimmed = description.trim()

      await dispatch(fetchClassification(trimmed)).unwrap()

      canGoNext && goNext()
    },
    [canGoNext, dispatch, goNext]
  )

  useEffect(() => {
    if (!activeElement.current || loading) return

    activeElement.current.focus()
  }, [loading])

  useEffect(() => {
    dispatch(showGlobalNotification({
      title: 'Loading...',
      variant: VARIANT_NOTICE,
      type: TYPE_LOCAL,
    }))
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Beschrijf uw melding</title>
      </Head>

      <h1>1. Beschrijf uw melding</h1>

      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Geef een korte beschrijving van wat u wilt melden</legend>

          <input type="hidden" {...register('source', { value: 'online' })} />

          <AddNote
            error={errors.description?.message}
            id="description"
            isStandalone={false}
            label="Waar gaat het om?"
            maxContentLength={maxLength}
            value={description}
            {...register('description', {
              required: 'Dit veld is verplicht',
              value: description,
              maxLength: {
                value: maxLength,
                message: `U heeft meer dan de maximale ${maxLength} tekens ingevoerd`,
              },
              validate: (value) => {
                if (value.trim().length === 0) return 'Vul een beschrijving in'
              },
            })}
          />
        </fieldset>

        <fieldset>
          <FileInput
            control={control}
            error={errors?.files?.map((message) => message).join(', ')}
            files={attachments}
            hint="Voeg een foto toe om de situatie te verduidelijken"
            id="files"
            label="Foto's toevoegen"
            name="files"
            trigger={trigger}
          />
        </fieldset>
      </Form>
    </>
  )
}

export default Step1
