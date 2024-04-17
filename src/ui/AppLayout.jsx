import { Outlet } from "react-router-dom"
import { styled } from 'styled-components'

import Header from './Header'
import Sidebar from './Sidebar'

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 24rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100svh;
`

const Section = styled.section`
    background-color: var(color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
`

const Container = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

function AppLayout() {
  return (
    <StyledAppLayout>
        <Sidebar />
        <Header />
        <Section>
          <Container>
            <Outlet />
          </Container>
        </Section>
    </StyledAppLayout>
  )
}

export default AppLayout