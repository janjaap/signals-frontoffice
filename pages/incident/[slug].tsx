import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { ReactElement } from 'react'
import type { RootState } from '../../app/store/store'

import Beschrijf from '../../components/IncidentForm/Step1'
import VulAan from '../../components/IncidentForm/Step2'
import Contact from '../../components/IncidentForm/Step3'
import Versturen from '../../components/IncidentForm/Step4'

import FormContext from '../../app/incident/context'

const steps: Record<string, ReactElement> = {
  beschrijf: <Beschrijf />,
  vulaan: <VulAan />,
  contact: <Contact />,
  versturen: <Versturen />,
  bedankt: <span>Bedankt!!!1!</span>,
}

const Page = () => {
  const { loading } = useSelector((state: RootState) => state.global)
  const [Step, setStep] = useState<ReactElement>(<Beschrijf />)
  const router = useRouter()

  const slug = router.query.slug as string
  const canGoNext = slug !== undefined && slug !== 'bedankt'
  const canGoPrevious = slug !== undefined && slug !== 'beschrijf'

  const pushNewEntry = useCallback(
    (index: number) => {
      const [key, element] = Object.entries(steps)[index]

      setStep(element)
      router.push(`/incident/${key}`)
    },
    [router]
  )

  const goNext = useCallback(() => {
    const index = Object.keys(steps).findIndex((key) => key === slug) + 1

    pushNewEntry(index)
  }, [pushNewEntry, slug])

  const goPrevious = useCallback(() => {
    const index = Object.keys(steps).findIndex((key) => key === slug) - 1 || 0

    pushNewEntry(index)
  }, [pushNewEntry, slug])

  const onSubmit = useCallback(() => {
    // 1. dispatch form data to state
    // 2. proceed to the next step

    canGoNext && goNext()
  }, [canGoNext, goNext])

  return (
    <FormContext.Provider
      value={{
        canGoNext,
        canGoPrevious,
        goPrevious,
        onSubmit,
        loading,
      }}
    >
      {Step}
    </FormContext.Provider>
  )
}

export default Page
