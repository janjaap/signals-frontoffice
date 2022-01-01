import { Input } from '@amsterdam/asc-ui'
import { Controller } from 'react-hook-form'

import type { FC } from 'react'
import type { InputProps as AscInputProps } from '@amsterdam/asc-ui/es/components/Input/Input'
import type { FieldWrapperProps } from '../FieldWrapper'

import FieldWrapper from '../FieldWrapper'

type TextInputProps = FieldWrapperProps & Omit<AscInputProps, 'error'>

const TextInput: FC<TextInputProps> = ({ control, required, hint, label, id, error, ...rest }) => (
  <FieldWrapper error={error} hint={hint} id={id} label={label}>
    <Controller
      name={id}
      control={control}
      rules={{ required }}
      render={({ field: { ref, ...field } }) => (
        <Input id={id} {...field} {...rest} />
      )}
    />
  </FieldWrapper>
)

export default TextInput
