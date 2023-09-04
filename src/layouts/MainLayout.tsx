import { Breadcrumbs, Link } from '@mui/material'
import { Container } from '@mui/system'
import { Outlet } from 'react-router-dom'

export const MainLayout = (): JSX.Element => {
  return (
    <Container maxWidth="xl">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '12px', marginTop: '20px', ml: 3 }}>
        <Link underline="hover" href="/">
          Home
        </Link>
        <Link underline="hover" href="/catalogue">
          Catalog
        </Link>
      </Breadcrumbs>
      <Outlet />
    </Container>
  )
}
