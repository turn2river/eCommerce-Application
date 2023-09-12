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
  fontFamily: 'Open Sans, sanserif',
  width: '100%',
  textAlign: 'center',
}

export const modalWindowStyle: SxProps<Theme> = {
  color: 'white',
  width: '300px',
  height: '300px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgb(0 0 0 / 80%)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}

export const priceStyle: SxProps<Theme> = { fontWeight: '700', color: '#ffc107' }

export const commonPriceStyle: SxProps<Theme> = { fontWeight: '700' }

export const discountedPriceStyle: SxProps<Theme> = { fontWeight: '400', textDecoration: 'line-through' }
