import { Box } from '@mui/system'
import { Outlet } from 'react-router-dom'
import { AppBreadcrumbs } from '../components/AppBreadcrumbs/AppBreadcrumbs.tsx'

export const CatalogLayout = (): JSX.Element => {
  return (
    <Box>
      <AppBreadcrumbs />
      <Outlet />
    </Box>
  )
}
