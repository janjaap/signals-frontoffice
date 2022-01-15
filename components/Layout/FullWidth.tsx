import styled from 'styled-components'

import { themeSpacing } from '@amsterdam/asc-ui'

import type { FC } from 'react'

import CommonLayout from './Common'

const Main = styled.main`
  display: grid;
  grid-template-columns: 8fr 4fr;
  row-gap: 32px;
  grid-column-gap: ${themeSpacing(5)};
`

const FullWidthLayout: FC = ({ children }) => (
  <CommonLayout>
    <Main>{children}</Main>
  </CommonLayout>
)

export default FullWidthLayout
