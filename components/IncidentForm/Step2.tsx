import Head from 'next/head'
import { useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import type { RootState } from '../../app/store/store'
import FormNavigation from '../FormNavigation'
import FormContext from '../../app/incident/context'

type FormData = {
  source: string
  description: string
}

const Step2 = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()
  const { category, subcategory, description } = useSelector(
    (state: RootState) => state.incident
  )
  // const { loading } = useSelector((state: RootState) => state.global)
  const { onSubmit } = useContext(FormContext)

  return (
    <>
      <Head>
        <title>Locatie en vragen</title>
      </Head>
      <h1>Locatie en vragen</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <fieldset>
          <legend>Geef een korte beschrijving van wat u wilt melden</legend>
          <input type="hidden" {...register('source', { value: 'online' })} />

          <AddNote
            error={
              errors.description?.type === 'required' && 'Dit veld is verplicht'
            }
            isStandalone={false}
            label="Waar gaat het om?"
            {...register('description', { required: true, onBlur, value: description })}
          />

          {loading && <span>Laden...</span>}
          {!loading && category && (
            <span>
              {category}, {subcategory}
            </span>
          )}
        </fieldset> */}
        <FormNavigation />
      </form>
    </>
  )
}

export default Step2
