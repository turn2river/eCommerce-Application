import { AppBar, Toolbar, Typography } from '@mui/material'

export const Footer = (): JSX.Element => {
  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        py: 2,
        mt: '20px',
      }}>
      <Toolbar
        sx={{
          margin: '0 auto',
          maxWidth: '1488px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Typography>&copy;CoffeeCode 2023</Typography>
        <Typography>RollingScopes School</Typography>
      </Toolbar>
    </AppBar>
  )
}
