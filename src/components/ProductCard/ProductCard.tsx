import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { cardStyle, commonPriceStyle, discountedPriceStyle, modalWindowStyle, priceStyle } from './style'
import { ProductCardPropsInterface } from '../../models/ProductCardPropsInterface'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { convertPrice } from '../../utils/convertPrice'
import { Variants } from '../../models/ProductType'

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
  const [modal, setModal] = useState(false)
  const [volume, setVolume] = useState(variants[variants.length - 1].attributes[1].value[0])
  const [price, setPrice] = useState(variants[variants.length - 1].prices[0].value.centAmount)
  const [discountedPrice, setDiscountedPrice] = useState(
    variants[variants.length - 1].prices[0].discounted?.value.centAmount,
  )

  function modalWindowController(): void {
    setModal((prevValue) => !prevValue)
  }
  function clickOnVolumeButton(variant: Variants): void {
    setVolume(variant.attributes[1].value[0])
    setPrice(variant.prices[0].value.centAmount)
    setDiscountedPrice(variant.prices[0].discounted?.value.centAmount)
  }
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
              <Typography variant="h6" sx={priceStyle}>{`€ ${convertPrice(minDiscountPrice || 0)} - ${convertPrice(
                maxDiscountPrice || 0,
              )}`}</Typography>
              <Typography variant="h6" sx={discountedPriceStyle}>{`€ ${convertPrice(minPrice)} - ${convertPrice(
                maxPrice,
              )}`}</Typography>
            </Box>
          ) : (
            <Typography variant="h6" sx={commonPriceStyle}>{`€ ${convertPrice(minPrice)} - ${convertPrice(
              maxPrice,
            )}`}</Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <CustomGradientButton onClick={modalWindowController}>Add to cart</CustomGradientButton>
      </CardActions>
      <Link href={`${productKey}`} sx={{ display: 'block', width: '100%', textAlign: 'center', margin: '20px 0 0 0' }}>
        View details
      </Link>
      <Modal open={modal} onClose={modalWindowController}>
        <Box sx={modalWindowStyle}>
          <Typography display={'block'} margin={'10px 0'} textAlign={'center'} noWrap={true}>
            {title}
          </Typography>
          <ToggleButtonGroup sx={{ margin: '20px' }} value={volume}>
            {variants.map((variant) => {
              return (
                <ToggleButton
                  key={variant.id}
                  value={variant.attributes[1].value[0]}
                  onClick={(): void =>
                    clickOnVolumeButton(variant)
                  }>{`${variant.attributes[1].value[0]} ml`}</ToggleButton>
              )
            })}
          </ToggleButtonGroup>
          {discountedPrice ? (
            <>
              <Typography variant="h6" sx={priceStyle}>{`€ ${convertPrice(discountedPrice)}`}</Typography>
              <Typography variant="h6" sx={discountedPriceStyle} mb={'20px'}>{`€ ${convertPrice(price)}`}</Typography>
            </>
          ) : (
            <Typography variant="h6" sx={commonPriceStyle} mb={'20px'}>{`€ ${convertPrice(price)}`}</Typography>
          )}
          <CustomGradientButton>Continue</CustomGradientButton>
        </Box>
      </Modal>
    </Card>
  )
}
