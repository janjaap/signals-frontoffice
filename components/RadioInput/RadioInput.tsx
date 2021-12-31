import { RadioGroup, Label, Radio } from '@amsterdam/asc-ui'

import type { FC } from 'react'
import type { InputErrorProps } from '../InputError'

import InputError from '../InputError'

interface RadioInputProps {
  className?: string
  options: Array<{
    id: string
    label: string
  }>
}

const RadioInput: FC<InputErrorProps & RadioInputProps> = ({
  className = '',
  error,
  hint,
  id,
  label,
  options,
}) => (
  <InputError id={id} error={error} label={label} hint={hint}>
    <RadioGroup className={className} name={id}>
      {options.map(({ id, label }) => (
        <>
          <Label key={id} htmlFor={id} label={label}>
            <Radio id={id} />
          </Label>
        </>
      ))}
    </RadioGroup>
  </InputError>
)

export default RadioInput
