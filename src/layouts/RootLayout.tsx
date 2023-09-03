import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/system'
import { Header } from '../components'
import { Footer } from '../components/Footer/Footer.tsx'

export const RootLayout = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 214px)' }}>
        <Outlet />
      </Container>
      <Footer />
    </Fragment>
  )
}
