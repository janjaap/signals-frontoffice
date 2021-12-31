import styled, { css } from 'styled-components'
import { Label, themeColor, Typography, themeSpacing } from '@amsterdam/asc-ui'

import type { FC, PropsWithChildren, ReactNode } from 'react'

const Wrapper = styled.div<{ showError: boolean }>`
  ${({ showError }) =>
    showError &&
    css`
      border-left: 2px solid ${themeColor('secondary')};
      padding-left: ${themeSpacing(4)};
    `}

  [type=text], [type=email], [type=tel] {
    border: 2px solid ${themeColor('secondary')};
  }
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

export interface InputErrorProps {
  error?: string
  hint?: string
  id: string
  label?: ReactNode
}

const InputError: FC<PropsWithChildren<InputErrorProps>> = ({
  children,
  hint,
  id,
  label,
  error,
}) => (
  <Wrapper showError={Boolean(error)}>
    {label && (
      <StyledLabel hasHint={Boolean(hint)} htmlFor={id} label={label} />
    )}
    {hint && <Hint>{hint}</Hint>}
    {error && <Error>{error}</Error>}
    {children}
  </Wrapper>
)

export default InputError
