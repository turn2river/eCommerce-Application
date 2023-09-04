import { Breadcrumbs, Link } from '@mui/material'
import { Box } from '@mui/system'
import { Outlet } from 'react-router-dom'

export const CatalogLayout = (): JSX.Element => {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '12px', marginTop: '20px', ml: 3 }}>
        <Link underline="hover" href="/">
          Home
        </Link>
        <Link underline="hover" href="/catalogue">
          Catalog
        </Link>
      </Breadcrumbs>
      <Outlet />
    </Box>
  )
}
