import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import { cardStyle, titleStyle } from './style'
import { VolumeVariants } from '../../models/VolumeVariants'
import { ProductCardPropsInterface } from '../../models/ProductCardPropsInterface'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'

export const ProductCard = ({ imageSource, title, price }: ProductCardPropsInterface): JSX.Element => {
  const [volume, setVolume] = useState<string | null>('')

  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: string | null): void => {
    setVolume(newVolume)
  }

  const volumeValues = Object.values(VolumeVariants)

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardMedia component={'image'} sx={{ width: '100%', height: '220px' }} image={imageSource} />
      <CardContent sx={{ margin: '0', padding: '0' }}>
        <Typography component={'div'} sx={titleStyle}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="span" sx={{ fontSize: '16px', fontFamily: 'Open Sans, sanserif' }}>
            Volume (ml)
          </Typography>
          <ToggleButtonGroup
            value={volume}
            sx={{ display: 'flex', justifyContent: 'center' }}
            exclusive
            onChange={handleVolumeClick}
            size="small"
            color="standard">
            {volumeValues.map((volumeValue) => {
              return typeof volumeValue === 'number' ? (
                <ToggleButton key={volumeValue} value={volumeValue}>
                  {volumeValue}
                </ToggleButton>
              ) : null
            })}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
          <Typography sx={{ fontSize: '18px' }}>Price:</Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>{`$${price}`}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <CustomGradientButton>Add to cart</CustomGradientButton>
      </CardActions>
    </Card>
  )
}
