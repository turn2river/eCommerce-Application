import { Box, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material'
// import { useState } from 'react'
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
  const minPrice = variants[0].prices[0].value.centAmount
  const maxPrice = variants[variants.length - 1].prices[0].value.centAmount
  const minDiscountPrice = variants[0].prices[0].discounted?.value.centAmount
  const maxDiscountPrice = variants[variants.length - 1].prices[0].discounted?.value.centAmount
  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardMedia
        component={'div'}
        sx={{ width: '220px', height: '220px', backgroundColor: 'white', margin: '0 auto', borderRadius: '5px' }}
        image={imageSource}
      />
      <CardContent sx={{ margin: '0', padding: '0' }}>
        <Typography display={'block'} margin={'10px 0'} textAlign={'center'} noWrap={true}>
          {title}
        </Typography>
        <Typography noWrap={true} variant="body2" sx={{ textAlign: 'justify', display: 'block' }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', minHeight: '64px' }}>
          <Typography variant="h6">Price:</Typography>
          {minDiscountPrice || maxDiscountPrice ? (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: '700', color: '#ffc107' }}>{`€ ${convertPrice(
                minDiscountPrice || 0,
              )} - ${convertPrice(maxDiscountPrice || 0)}`}</Typography>
              <Typography variant="h6" sx={{ fontWeight: '400', textDecoration: 'line-through' }}>{`€ ${convertPrice(
                minPrice,
              )} - ${convertPrice(maxPrice)}`}</Typography>
            </Box>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ ${convertPrice(minPrice)} - ${convertPrice(
              maxPrice,
            )}`}</Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link href={`${productKey}`}>
          <CustomGradientButton>View details</CustomGradientButton>
        </Link>
      </CardActions>
    </Card>
  )
}
