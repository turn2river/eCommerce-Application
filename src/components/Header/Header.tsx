import { AppBar, Box, Toolbar, Button } from '@mui/material'
import { Logo } from '../Logo/Logo.tsx'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'

export const Header = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth, setIsAuth } = auth as AuthContextType

  const page = useCataloguePage()
  const { setCurrentPage } = page as CataloguePageContextType

  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        py: 2,
      }}>
      <Toolbar
        variant="regular"
        sx={{
          margin: '0 auto',
          maxWidth: '1536px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Logo />
        <Box>
          <Button href="/" color="inherit">
            Home
          </Button>
          <Button
            variant="outlined"
            href="/catalogue"
            color="inherit"
            onClick={(): void => {
              setCurrentPage('catalogue')
            }}>
            Catalogue
          </Button>
          <Button href="/about" color="inherit">
            About us
          </Button>
          {isAuth ? (
            <Button href="/profile" color="inherit">
              Profile
            </Button>
          ) : (
            <Button href="/login" color="inherit">
              Sign in
            </Button>
          )}
          {isAuth ? (
            <Button component="button" href="/" color="inherit" onClick={(): void => setIsAuth(false)}>
              logout
            </Button>
          ) : (
            <Button
              href="/registration"
              color="inherit"
              onClick={(): void => {
                setCurrentPage('signup')
              }}>
              Sign up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
