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
  const [volume, setVolume] = useState(variants?.[variants.length - 1]?.attributes?.[1]?.value[0])

  const [price, setPrice] = useState(convertPrice(variants?.[variants.length - 1].prices[0].value.centAmount))
  const [discountPrice, setDiscountPrice] = useState(
    convertPrice(variants?.[variants.length - 1].prices[0].discounted?.value.centAmount || 0),
  )
  // @ts-expect-error event is used under the hood
  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: number): void => {
    setVolume(newVolume)
  }

  const handleVolumeSelect = (selectedPrice: number, discountCentPrice: number): void => {
    const priceInEuro = convertPrice(selectedPrice)
    const discountPriceInEuro = convertPrice(discountCentPrice)
    setPrice(priceInEuro)
    setDiscountPrice(discountPriceInEuro)
  }

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardMedia
        component={'div'}
        sx={{ width: '220px', height: '220px', backgroundColor: 'white', margin: '0 auto', borderRadius: '5px' }}
        image={imageSource}
      />
      <CardContent sx={{ margin: '0', padding: '0' }}>
        <Typography display={'block'} margin={'10px 0'} textAlign={'center'} variant="h6" height={60}>
          {title}
        </Typography>
        <Typography
          noWrap={true}
          variant="body2"
          sx={{ height: '40px', textAlign: 'justify', display: 'block', marginTop: '40px' }}>
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
            {variants.map((variant) => {
              return (
                <ToggleButton
                  onClick={(): void => {
                    const centPrice = variant.prices[0].value.centAmount
                    const discountCentPrice = variant.prices[0].discounted?.value.centAmount || 0
                    handleVolumeSelect(centPrice, discountCentPrice)
                  }}
                  key={variant?.prices[0].key}
                  value={variant?.attributes && variant?.attributes[1]?.value[0]}>
                  {variant?.attributes?.[1]?.value?.[0]}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
          <Typography variant="h6">Price:</Typography>
          {discountPrice !== '0.00' ? (
            <>
              <Typography
                variant="h6"
                sx={{ fontWeight: '400', textDecoration: 'line-through' }}>{`€ ${price}`}</Typography>
              <Typography variant="h6" sx={{ fontWeight: '700', color: '#ffc107' }}>{`€ ${discountPrice}`}</Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ ${price}`}</Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <CustomGradientButton>Add to cart</CustomGradientButton>
      </CardActions>
      <Link href={`${productKey}`} display={'block'} margin={'10px 0'} textAlign={'center'} noWrap={true} fontSize={12}>
        view details
      </Link>
    </Card>
  )
}
