import styled from 'styled-components'

import type { FC, FormEventHandler } from 'react'

import FormNavigation from 'components/FormNavigation'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`

interface FormProps {
  action: string
  onSubmit: FormEventHandler<HTMLFormElement>
}

const Form: FC<FormProps> = ({ action, onSubmit, children }) => (
  <FormStyle action={action} onSubmit={onSubmit}>
    {children}

    <FormNavigation />
  </FormStyle>
)

export default Form
