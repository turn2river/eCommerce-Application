import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { ImageAndCaptionPropsInterface } from '../../models/ImageAndCaptionPropsInterface'

export const ImageAndCaption = ({
  width,
  height,
  image,
  children,
  verticalPosition,
  scale = '1',
}: ImageAndCaptionPropsInterface): JSX.Element => {
  const mainImage = {
    'backgroundImage': `url(${image})`,
    'backgroundSize': 'cover',
    height,
    width,
    'backgroundPositionX': 'center',
    'backgroundPositionY': verticalPosition,
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'transition': '0.3s linear',
    '&:hover': { transform: `scale(${scale})` },
  }

  const mainImageCaption = {
    width: '100%',
    backgroundColor: 'rgb(0 0 0 / 54%)',
    lineHeight: '100px',
    textAlign: 'center',
  }

  return (
    <Box m={'20px 0'} sx={mainImage}>
      <Typography variant="h4" sx={mainImageCaption}>
        {children}
      </Typography>
    </Box>
  )
}
