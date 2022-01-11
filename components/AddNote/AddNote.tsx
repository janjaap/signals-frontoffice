import { forwardRef, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { themeSpacing } from '@amsterdam/asc-ui'

import type { SyntheticEvent, ForwardedRef, ChangeEvent, ReactNode } from 'react'
import type { FieldWrapperProps } from 'components/FieldWrapper'

import Button from '../Button'
import TextArea from '../TextArea'
import Label from '../Label'

interface AddNoteProps extends FieldWrapperProps {
  className?: string
  error?: string
  isStandalone?: boolean
  label?: ReactNode
  maxContentLength?: number
  name?: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>, value?: string) => void
  onSubmit?: (event: SyntheticEvent<HTMLInputElement>, value?: string | null) => boolean
  rows?: number
  value?: string
}

const Section = styled.section`
  margin: ${themeSpacing(2, 2, 2, 0)};
`

const NoteButton = styled(Button)`
  margin: ${themeSpacing(8, 2, 4, 0)};
`

export const getAddNoteError = (config: {
  fieldName?: string
  maxContentLength: number
  shouldContainAtLeastOneChar?: boolean
  text: string
}) => {
  const defaults = {
    fieldName: 'notitie',
    shouldContainAtLeastOneChar: true,
  }

  const { fieldName, maxContentLength, shouldContainAtLeastOneChar, text } = {
    ...defaults,
    ...config,
  }

  if (shouldContainAtLeastOneChar && text.trim() === '') {
    return `De ${fieldName} mag niet leeg zijn`
  }

  if (text.length > maxContentLength) {
    return `Je hebt meer dan de maximale ${maxContentLength} tekens ingevoerd.`
  }

  return ''
}

const AddNote = forwardRef<HTMLTextAreaElement, AddNoteProps>(
  (
    { className, error, isStandalone, label, maxContentLength, name, onChange, onSubmit, rows, value, ...rest },
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [showForm, setShowForm] = useState(!isStandalone)
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault()

        if (typeof onSubmit === 'function') {
          const successfulSubmit = onSubmit(event, ref?.current?.value)

          if (successfulSubmit) {
            setShowForm(false)
          }
        }
      },
      [onSubmit, ref]
    )

    useEffect(() => {
      if (!showForm || !ref?.current || !isStandalone) return

      ref.current.focus()
    }, [isStandalone, ref, showForm, name])

    if (!showForm) {
      return (
        <Section data-testid="addNote">
          <Button
            type="button"
            variant="application"
            data-testid="addNoteNewNoteButton"
            onClick={() => setShowForm(true)}
          >
            Notitie toevoegen
          </Button>
        </Section>
      )
    }

    return (
      <Section className={className} data-testid="addNote">
        <Label htmlFor="addNoteText">{label}</Label>
        <TextArea
          data-testid="addNoteText"
          errorMessage={error}
          id="addNoteText"
          maxContentLength={maxContentLength}
          name={name}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            onChange && onChange(event, event.target.value)
          }}
          ref={ref}
          rows={rows}
          value={value}
          {...rest}
        />

        {isStandalone && (
          <>
            <NoteButton data-testid="addNoteSaveNoteButton" onClick={handleSubmit} type="submit" variant="secondary">
              Opslaan
            </NoteButton>

            <NoteButton
              data-testid="addNoteCancelNoteButton"
              variant="tertiary"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Annuleer
            </NoteButton>
          </>
        )}
      </Section>
    )
  }
)

AddNote.displayName = 'AddNote'

AddNote.defaultProps = {
  className: '',
  isStandalone: true,
  label: 'Notitie toevoegen',
  rows: 10,
}

export default AddNote
