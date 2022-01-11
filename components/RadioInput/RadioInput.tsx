import { RadioGroup, Label, Radio } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { Controller } from 'react-hook-form'

import type { ChangeEvent, FC } from 'react'
import type { FieldWrapperProps } from '../FieldWrapper'

import FieldWrapper from '../FieldWrapper'

const StyledLabel = styled(Label)`
  align-self: baseline;
`

const RadioInput: FC<FieldWrapperProps> = ({
  control,
  error,
  hint,
  id,
  label,
  onChange,
  options,
  required,
  value,
}) => (
  <FieldWrapper id={id} error={error} label={label} hint={hint} required={required}>
    <RadioGroup name={id}>
      {options.map((option) => (
        <StyledLabel
          key={`${id}.${option.id}`}
          htmlFor={`${id}.${option.id}`}
          label={option.label}
          noActiveState
        >
          <Controller
            key={`${id}.${option.id}`}
            name={id}
            control={control}
            rules={{ required }}
            render={({ field: { ref, ...field } }) => (
              <Radio
                checked={value === option.id}
                id={`${id}.${option.id}`}
                value={option.id}
                {...field}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(option.id)
                  onChange(event, option.id)
                }}
              />
            )}
          />
        </StyledLabel>
      ))}
    </RadioGroup>
  </FieldWrapper>
)

export default RadioInput
