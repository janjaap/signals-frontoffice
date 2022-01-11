import styled from 'styled-components'
import { themeColor, themeSpacing } from '@amsterdam/asc-ui'

import CheckboxInput from '../CheckboxInput'

const Emphasis = styled.div`
  background-color: ${themeColor('tint', 'level3')};
  padding: ${themeSpacing(4, 4, 5, 3)};

  label {
    display: flex;
    align-items: flex-start;

    & > * {
      margin: 0;
    }
  }
`

const EmphasisCheckboxInput = (props) => (
  <Emphasis>
    <CheckboxInput {...props} />
  </Emphasis>
)

export default EmphasisCheckboxInput
