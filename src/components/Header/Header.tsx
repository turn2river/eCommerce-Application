import { AppBar, Box, Toolbar, Button, Badge, Link } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { useEffect } from 'react'
import { Logo } from '../Logo/Logo.tsx'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'
import { CartService } from '../../services/CartService'
import { CustomerTokensStorage } from '../../store/customerTokensStorage'

export const Header = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth, setIsAuth } = auth as AuthContextType

  const removeTokenOnLogut = new CustomerTokensStorage()

  const page = useCataloguePage()
  const { setCurrentPageName, setCategoriesID, cartListLength, setCartListLength, cartListTrigger } =
    page as CataloguePageContextType
  const myCart = new CartService()

  useEffect(() => {
    const loading = true
    if (loading) {
      myCart.createCart().then((response) => {
        if (response) {
          const cartsLength = response.lineItems.reduce((acc, lineItem) => acc + lineItem.quantity, 0)
          setCartListLength(cartsLength)
        }
      })
    }
  }, [cartListTrigger])

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
              setCurrentPageName('catalogue')
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
            <Button
              component="button"
              href="/"
              color="inherit"
              onClick={(): void => {
                setIsAuth(false)
                removeTokenOnLogut.clearLocalStorageCustomerTokens()
              }}>
              logout
            </Button>
          ) : (
            <Button
              href="/registration"
              color="inherit"
              onClick={(): void => {
                setCurrentPageName('signup')
              }}>
              Sign up
            </Button>
          )}
        </Box>
        <Badge component={Link} badgeContent={cartListLength || null} color="secondary" href="/cart">
          <ShoppingBasketIcon />
        </Badge>
      </Toolbar>
    </AppBar>
  )
}
