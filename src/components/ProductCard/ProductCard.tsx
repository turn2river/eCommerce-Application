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
import { useState, MouseEvent } from 'react'
import { cardStyle, commonPriceStyle, discountedPriceStyle, modalWindowStyle, priceStyle } from './style'
import { ProductCardPropsInterface } from '../../models/ProductCardPropsInterface'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { convertPrice } from '../../utils/convertPrice'
import { Variants } from '../../models/ProductType'
import { CartService } from '../../services/CartService'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'
import { CustomerTokensStorage } from '../../store/customerTokensStorage'
import { AnonTokensStorage } from '../../store/anonTokensStorage'

export const ProductCard = ({
  productKey,
  imageSource,
  title,
  variants,
  description,
  id,
}: ProductCardPropsInterface): JSX.Element => {
  const minPrice = variants[0].prices[0].value.centAmount
  const maxPrice = variants[variants.length - 1].prices[0].value.centAmount
  const minDiscountPrice = variants[0].prices[0].discounted?.value.centAmount
  const maxDiscountPrice = variants[variants.length - 1].prices[0].discounted?.value.centAmount
  const [modal, setModal] = useState(false)
  const [volume, setVolume] = useState(variants[variants.length - 1].attributes[1].value[0])
  const [price, setPrice] = useState(variants[variants.length - 1].prices[0].value.centAmount)
  const [productsID, setProductsID] = useState<string>(`${id}___${variants[variants.length - 1].id}`)
  const [discountedPrice, setDiscountedPrice] = useState(
    variants[variants.length - 1].prices[0].discounted?.value.centAmount,
  )
  const myCart = new CartService()
  const page = useCataloguePage()
  const { setCartListTRigger } = page as CataloguePageContextType
  const customerToken = new CustomerTokensStorage().getLocalStorageCustomerAuthToken()
  const anonUserAuthToken = AnonTokensStorage.getInstance().getLocalStorageAnonAuthToken()

  async function addItemToCart(event: MouseEvent<HTMLButtonElement>, currentId: string): Promise<void> {
    if (customerToken && id) {
      const lastCart = await myCart.createCart()
      const cartUpdate = {
        version: lastCart?.version,
        actions: [
          {
            action: 'addLineItem',
            productId: currentId.split('___')[0],
            variantId: Number.parseFloat(currentId.split('___')[1]),
            quantity: 1,
          },
        ],
      }
      console.log(cartUpdate)
      try {
        await myCart.handleCartItemInUserCart(customerToken, lastCart?.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
      } catch (error) {
        console.error(error)
      }
    } else if (anonUserAuthToken && id) {
      const lastCart = await myCart.createCart()
      const cartUpdate = {
        version: lastCart?.version,
        actions: [
          {
            action: 'addLineItem',
            productId: currentId.split('___')[0],
            variantId: Number.parseFloat(currentId.split('___')[1]),
            quantity: 1,
          },
        ],
      }
      console.log(cartUpdate)
      try {
        await myCart.handleCartItemInUserCart(anonUserAuthToken, lastCart?.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
      } catch (error) {
        console.error(error)
      }
    }
  }

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
                  id={`${id}____${variant.id}`}
                  value={variant.attributes[1].value[0]}
                  onClick={(event): void => {
                    clickOnVolumeButton(variant)
                    setProductsID(event.currentTarget.id)
                  }}>{`${variant.attributes[1].value[0]} ml`}</ToggleButton>
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
          <CustomGradientButton
            onClick={(event): void => {
              addItemToCart(event, productsID)
              setModal(false)
            }}>
            Continue
          </CustomGradientButton>
        </Box>
      </Modal>
    </Card>
  )
}
