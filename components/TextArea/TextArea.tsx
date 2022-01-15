import { forwardRef, useState, useCallback, useEffect } from 'react'

import type { ChangeEvent, ReactNode, ForwardedRef } from 'react'
import type { TextAreaProps as AscTextAreaProps } from '@amsterdam/asc-ui/es/components/TextArea'

import { StyledArea, InfoText } from './styled'

import FieldWrapper from 'components/FieldWrapper'

interface TextAreaProps extends AscTextAreaProps {
  className?: string
  defaultValue?: string
  errorMessage?: string
  id?: string
  infoText?: ReactNode
  label?: ReactNode
  maxContentLength?: number
  maxRows?: number
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  value?: string | number
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className = '', defaultValue, errorMessage, id, infoText, label, maxContentLength, onChange, value, ...props },
    ref?: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [contents, setContents] = useState('')

    // prefer defaultValue over value if both are present
    const contentProps: { defaultValue?: string; value?: string } = {
      [defaultValue ? 'defaultValue' : 'value']: contents,
    }

    const onChangeContent = useCallback(
      (event) => {
        const value = event.target.value

        setContents(value)

        if (onChange !== undefined) {
          onChange(event)
        }
      },
      [setContents, onChange]
    )

    const textareaInfoText =
      maxContentLength && maxContentLength > 0 ? `${contents.length} / ${maxContentLength} tekens` : infoText

    useEffect(() => {
      setContents((defaultValue || value || '').toString())
    }, [defaultValue, value])

    return (
      <FieldWrapper
        caption={textareaInfoText && <InfoText id="textareaInfoText">{textareaInfoText}</InfoText>}
        error={errorMessage}
        label={label}
        id={id}
      >
        <StyledArea
          aria-describedby="textareaInfoText textareaErrorMessage"
          className={className}
          id={id}
          onChange={onChangeContent}
          ref={ref}
          {...props}
          {...contentProps}
        />
      </FieldWrapper>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
