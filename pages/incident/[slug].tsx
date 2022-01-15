import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import type { ReactElement } from 'react'

import Beschrijf from 'components/IncidentForm/Step1'
import VulAan from 'components/IncidentForm/Step2'
import Contact from 'components/IncidentForm/Step3'
import Versturen from 'components/IncidentForm/Step4'

import FormContext from 'app/incident/context'
import { loadingSelector } from 'app/store/slices/global/selectors'

const steps: Record<string, ReactElement> = {
  beschrijf: <Beschrijf />,
  vulaan: <VulAan />,
  contact: <Contact />,
  versturen: <Versturen />,
}

const Page = () => {
  const loading = useSelector(loadingSelector)
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

  useEffect(() => {
    if (Step !== steps[slug]) {
      setStep(steps[slug])
    }
  }, [slug, Step])

  return (
    <FormContext.Provider
      value={{
        canGoNext,
        canGoPrevious,
        goNext,
        goPrevious,
        loading,
      }}
    >
      {Step}
    </FormContext.Provider>
  )
}

export default Page
