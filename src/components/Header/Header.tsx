import { AppBar, Box, Toolbar, Button } from '@mui/material'
import { Container } from '@mui/system'
import { Logo } from '../Logo/Logo.tsx'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'

export const Header = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth, setIsAuth } = auth as AuthContextType

  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        py: 2,
      }}>
      <Toolbar
        sx={{
          margin: '0 auto',
          maxWidth: '1488px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Logo />
        <Box>
          <Button href="/" color="inherit">
            Home
          </Button>
          <Button href="/catalog" color="inherit">
            Catalog
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
            <Button href="/registration" color="inherit">
              Sign up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
