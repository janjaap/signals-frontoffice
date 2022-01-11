import styled from 'styled-components'
import Link from 'next/link'

import { Link as AscLink, Heading } from '@amsterdam/asc-ui'

import type { FC } from 'react'

const EditLink = styled(AscLink)`
  position: absolute;
  right: 0;
  text-decoration: underline;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
`

interface SummarySectionProps {
  href: string
  link: string
  heading: string
}

const SummarySection: FC<SummarySectionProps> = ({ href, link, heading }) => (
  <>
    <Link href={href} passHref>
      <EditLink variant="inline">{link}</EditLink>
    </Link>
    <Heading as="h2" styleAs="h3">
      {heading}
    </Heading>
  </>
)
export default SummarySection
