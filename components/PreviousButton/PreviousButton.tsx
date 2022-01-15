import styled from 'styled-components'
import { ChevronLeft } from '@amsterdam/asc-assets'
import { themeColor } from '@amsterdam/asc-ui'

import type { MouseEventHandler } from 'react'
import type { FC } from 'react'

import Button from 'components/Button'

const StyledButton = styled(Button)`
  align-self: center;
  display: flex;
  height: 44px;
`

const Chevron = styled(ChevronLeft)`
  fill: ${themeColor('primary')};
`

interface PreviousButtonProps {
  className?: string
  onClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>
}

const PreviousButton: FC<PreviousButtonProps> = ({ className = '', children, onClick }) => (
  <StyledButton
    className={className}
    data-testid="previousButton"
    iconLeft={<Chevron aria-hidden="true" />}
    iconSize={14}
    onClick={onClick}
    type="button"
    variant="textButton"
  >
    {children}
  </StyledButton>
)

export default PreviousButton
