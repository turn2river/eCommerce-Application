import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import { cardStyle } from './style'
import { VolumeVariants } from '../../models/VolumeVariants'
import { ProductCardPropsInterface } from '../../models/ProductCardPropsInterface'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { convertPrice } from '../../utils/convertPrice'

export const ProductCard = ({
  productKey,
  imageSource,
  title,
  variants,
  description,
}: ProductCardPropsInterface): JSX.Element => {
  const [volume, setVolume] = useState(
    // @ts-expect-error why
    variants instanceof Array ? variants?.[0]?.attributes?.[1]?.value[0] : variants?.[0]?.attributes?.[1]?.value[0],
  )

  const [price, setPrice] = useState(convertPrice(variants?.[0].prices[0].value.centAmount))

  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: string): void => {
    setVolume(newVolume)
  }

  const handleVolumeSelect = (selectedPrice: number): void => {
    const priceInEuro = convertPrice(selectedPrice)
    setPrice(priceInEuro)
  }

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardMedia
        component={'div'}
        sx={{ width: '220px', height: '220px', backgroundColor: 'white', margin: '0 auto', borderRadius: '5px' }}
        image={imageSource}
      />
      <CardContent sx={{ margin: '0', padding: '0' }}>
        <Link href={`${productKey}`} display={'block'} margin={'10px 0'} textAlign={'center'} noWrap={true}>
          {title}
        </Link>
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
                  <ToggleButton
                    onClick={(): void => {
                      const centPrice = variant.prices[0].value.centAmount
                      handleVolumeSelect(centPrice)
                    }}
                    key={variant?.prices[0].key}
                    // @ts-expect-error why
                    value={variant?.attributes && variant?.attributes[1]?.value[0]}>
                    {variant?.attributes?.[1]?.value?.[0]}
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
