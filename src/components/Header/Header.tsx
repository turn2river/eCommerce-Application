import { AppBar, Box, Toolbar, Button } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Logo } from '../Logo/Logo.tsx'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'

export const Header = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth, setIsAuth } = auth as AuthContextType

  const page = useCataloguePage()
  const { setCurrentPage, setCategoriesID } = page as CataloguePageContextType

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
              setCategoriesID('0e007442-ed84-4e4f-ab3b-3c14191462c7')
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
        <Button href="/cart">
          <ShoppingBasketIcon />
        </Button>
      </Toolbar>
    </AppBar>
  )
}
