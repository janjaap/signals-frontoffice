import styled, { css } from 'styled-components'
import { Label, themeColor, Typography, themeSpacing } from '@amsterdam/asc-ui'

import type { Control } from 'react-hook-form'
import type { ChangeEvent, FC, PropsWithChildren, ReactNode } from 'react'

const Wrapper = styled.div<{ showError: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ showError }) =>
    showError &&
    css`
      border-left: 2px solid ${themeColor('secondary')};
      padding-left: ${themeSpacing(4)};
    `}
`

const Hint = styled.span`
  color: ${themeColor('tint', 'level5')};
  display: block;
  margin-bottom: ${themeSpacing(2)};
`

const Error = styled(Typography).attrs({
  forwardedAs: 'h6',
})`
  color: ${themeColor('secondary')};
  font-weight: 700;
  margin: ${themeSpacing(2)} 0;
`

const StyledLabel = styled(Label)<{ hasHint: boolean }>`
  display: block;
  font-weight: 700;
  ${({ hasHint }) =>
    !hasHint &&
    css`
      margin-bottom: ${themeSpacing(2)};
    `}
`

const NotRequired = styled.span`
  font-weight: 400;
`

export interface FieldWrapperProps {
  error?: string
  hint?: string
  id: string
  label?: ReactNode
  control?: Control
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string | Array<string>
  ) => void
  options?: Array<{
    id: string
    label: string
  }>
  required?: boolean
  value?: string | number | Array<string | number>
}

const FieldWrapper: FC<PropsWithChildren<FieldWrapperProps>> = ({
  children,
  hint,
  id,
  label,
  error,
  options,
  required,
}) => (
  <Wrapper showError={Boolean(error)}>
    {label && (
      <StyledLabel
        hasHint={Boolean(hint)}
        htmlFor={options ? '' : id}
        label={
          <>
            {label}
            {!required && <NotRequired> (niet verplicht)</NotRequired>}
          </>
        }
      />
    )}
    {hint && <Hint>{hint}</Hint>}
    {error && <Error>{error}</Error>}
    {children}
  </Wrapper>
)

export default FieldWrapper
