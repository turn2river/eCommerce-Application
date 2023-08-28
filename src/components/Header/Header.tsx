import { AppBar, Box, Toolbar, Button } from '@mui/material'
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
        p: 2,
      }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}>
        <Logo />
        <Box>
          <Button href="/" color="inherit">
            Home
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
