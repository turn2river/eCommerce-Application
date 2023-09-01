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
import { convertPrice } from '../../utils/convertPrice'

export const ProductCard = ({ imageSource, title, variants, description }: ProductCardPropsInterface): JSX.Element => {
  const [volume, setVolume] = useState(variants instanceof Array ? variants[0].prices[0].key : variants.prices[0].key)

  const [price, setPrice] = useState(() => {
    let result
    if (variants instanceof Array) {
      variants.map((variant) => {
        if (variant.prices[0].key === volume) {
          result = convertPrice(variant.prices[0].value.centAmount)
        }
        return null
      })
    } else {
      result = convertPrice(variants.prices[0].value.centAmount)
    }
    return result
  })

  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: string): void => {
    setVolume(newVolume)
    setPrice(() => {
      let result
      if (variants instanceof Array) {
        variants.map((variant) => {
          if (variant.prices[0].key === newVolume) {
            result = convertPrice(variant.prices[0].value.centAmount)
          }
          return null
        })
      }
      return result
    })
  }

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardMedia
        component={'div'}
        sx={{ width: '220px', height: '220px', backgroundColor: 'white', margin: '0 auto', borderRadius: '5px' }}
        image={imageSource}
      />
      <CardContent sx={{ margin: '0', padding: '0' }}>
        <Typography variant="body1" component={'div'} sx={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ minHeight: '80px', textAlign: 'justify' }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="span">
            Volume (ml)
          </Typography>
          <ToggleButtonGroup
            value={volume}
            sx={{ display: 'flex', justifyContent: 'center' }}
            exclusive
            onChange={handleVolumeClick}
            size="small"
            color="standard">
            {variants instanceof Array ? (
              variants.map((variant) => {
                return (
                  <ToggleButton key={variant?.prices[0].key} value={variant?.prices[0].key}>
                    {VolumeVariants[variant?.prices[0].key.toUpperCase() as keyof typeof VolumeVariants]}
                  </ToggleButton>
                )
              })
            ) : (
              <ToggleButton value={variants.prices[0].key} disabled>
                {VolumeVariants[variants.prices[0].key.toUpperCase() as keyof typeof VolumeVariants]}
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
          <Typography variant="h6">Price:</Typography>
          <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ ${price}`}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <CustomGradientButton>Add to cart</CustomGradientButton>
      </CardActions>
    </Card>
  )
}
