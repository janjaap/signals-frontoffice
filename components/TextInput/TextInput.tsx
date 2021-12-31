import styled from 'styled-components'
import { Input as AscInput, themeColor } from '@amsterdam/asc-ui'
import { forwardRef } from 'react'

import type { ForwardedRef } from 'react'
import type { InputProps as AscInputProps } from '@amsterdam/asc-ui/es/components/Input/Input'
import type { InputErrorProps } from '../InputError'

import InputError from '../InputError'

const StyledInput = styled(AscInput)`
  padding: 10px; /* needed to style the textboxes as according to the design system */
  box-shadow: initial;
  font-family: Avenir Next;

  &[disabled] {
    border: 1px solid ${themeColor('tint', 'level4')};
    color: ${themeColor('tint', 'level4')};
  }
`

type TextInputProps = InputErrorProps & Omit<AscInputProps, 'error'>

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { hint, label, id, error, ...rest },
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <InputError error={error} hint={hint} id={id} label={label}>
      <StyledInput id={id} ref={ref} {...rest} />
    </InputError>
  )
)

TextInput.displayName = 'TextInput'

export default TextInput
