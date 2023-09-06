import { Breadcrumbs, Link } from '@mui/material'
import { useLocation } from 'react-router-dom'

export const AppBreadcrumbs = (): JSX.Element => {
  const location = useLocation()

  let currentLocation = ''
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLocation += `/${crumb}`

      return (
        <Link underline="hover" href={currentLocation}>
          {crumb.toUpperCase()}
        </Link>
      )
    })
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '12px', marginTop: '20px', ml: 3 }}>
      <Link underline="hover" href="/">
        HOME
      </Link>
      {crumbs}
    </Breadcrumbs>
  )
}
