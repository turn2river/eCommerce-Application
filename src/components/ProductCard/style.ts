import { SxProps, Theme } from '@mui/material'

export const cardStyle: SxProps<Theme> = {
  'padding': '30px',
  'maxWidth': '305px',
  'margin': '10px',
  'backgroundColor': '#36332E',
  'cursor': 'pointer',
  'transition': '0.3s linear',
  ':hover': {
    backgroundColor: '#211E1C',
    scale: '1.05',
  },
}

export const titleStyle: SxProps<Theme> = {
  margin: '20px 0',
  fontSize: '16px',
  fontFamily: 'Open Sans, sanserif',
  width: '100%',
  textAlign: 'center',
}
