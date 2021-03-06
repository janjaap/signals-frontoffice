import { List, themeSpacing, ListItem } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import type { FunctionComponent } from 'react'

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
`

const StyledImg = styled.img`
  margin-right: ${themeSpacing(2)};
  flex-shrink: 0;
`

interface IconListItemProps {
  iconUrl?: string
  id?: string
  className?: string
  iconSize?: number
}

export const IconListItem: FunctionComponent<IconListItemProps> = ({
  iconUrl,
  children,
  className,
  iconSize = 40,
  id,
}) => (
  <StyledListItem data-testid={id} className={className}>
    <StyledImg alt="" height={iconSize} src={iconUrl} width={iconSize} />
    {children}
  </StyledListItem>
)

export default List
