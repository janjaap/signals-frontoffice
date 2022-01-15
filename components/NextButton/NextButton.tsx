import styled from 'styled-components'

import type { FC, MouseEventHandler } from 'react'

import Button from 'components/Button'

const StyledButton = styled(Button)`
  display: flex;
  align-self: center;
  height: 44px;
`

interface NextButtonProps {
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>
}

const NextButton: FC<NextButtonProps> = ({ className = '', children, disabled, onClick }) => (
  <StyledButton
    className={className}
    data-testid="nextButton"
    disabled={disabled}
    onClick={onClick}
    taskflow
    type="submit"
    variant="secondary"
  >
    {children}
  </StyledButton>
)

export default NextButton
