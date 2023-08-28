import React from 'react'
import { createTheme } from '@mui/material'
import { LinkProps } from '@mui/material/Link'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props
    return <RouterLink ref={ref} to={href} {...other} />
  },
)

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e2ac5d',
    },
    secondary: {
      main: '#e05b49',
    },
    text: {
      primary: '#beae97',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})
