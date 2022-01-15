import { Label, Checkbox } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { useController } from 'react-hook-form'
import { useState } from 'react'

import type { Control } from 'react-hook-form'
import type { ChangeEvent, FC } from 'react'
import type { FieldWrapperProps } from '../FieldWrapper'

import FieldWrapper from '../FieldWrapper'

const StyledLabel = styled(Label)`
  align-self: baseline;
`

interface CheckboxInputProps extends FieldWrapperProps {
  control: Control
  value?: Array<string>
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    value: Array<string>
  ) => void
}

const CheckboxInput: FC<CheckboxInputProps> = ({
  control,
  error,
  id,
  label,
  onChange,
  options,
  required,
  value = [],
}) => {
  const [checked, setChecked] = useState<Set<string>>(new Set(value as Array<string>))
  const { field } = useController({ control, name: id, rules: { required } })

  return (
    <FieldWrapper id={id} label={label} error={error} required={required}>
      {options.map((option) => (
        <StyledLabel key={option.id} htmlFor={option.id} label={option.label} noActiveState>
          <Checkbox
            id={option.id}
            checked={checked.has(option.id)}
            defaultValue={option.id}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const boxChecked = event.currentTarget.checked

              if (boxChecked) checked.add(option.id)
              else checked.delete(option.id)

              const checkedList = Array.from(checked)

              setChecked(checked)
              field.onChange(checkedList)
              onChange && onChange(event, checkedList)
            }}
          />
        </StyledLabel>
      ))}
    </FieldWrapper>
  )
}

export default CheckboxInput
