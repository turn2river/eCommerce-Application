/* eslint-disable max-lines-per-function */
import { Button, Chip, Modal, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment, useEffect, useState, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import { GetProductByIdService } from '../../services/GetProductByIdService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { convertPrice } from '../../utils/convertPrice'
import { Product } from '../../models/ProductType'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { CartService } from '../../services/CartService'
import { CustomerTokensStorage } from '../../store/customerTokensStorage'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'

export const ProductPage = (): JSX.Element => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc((100vh + 100vw)*0.27)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const { id } = useParams()

  const myCart = new CartService()

  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<Product | null>(null)
  const [price, setPrice] = useState<string>('')
  const [discountedPrice, setDiscountedPrice] = useState<string>('')
  const [volume, setVolume] = useState<number>(0)
  const [productID, setProductID] = useState<string>('')
  const [variantID, setVariantID] = useState<number>(0)
  const [variantInCart, setVariantInCart] = useState<boolean>(false)
  const page = useCataloguePage()
  const { setCartListTRigger } = page as CataloguePageContextType

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken && id) {
      const productService = new GetProductByIdService()
      productService.getProductByKey(anonUserAuthToken, id).then((response) => {
        if (loading) {
          setProductsData(response)
          myCart.createCart().then((cartResponse) => {
            if (
              cartResponse?.lineItems.some(
                (lineItem) =>
                  lineItem.variant.id ===
                    response.masterData.current.variants[response.masterData.current.variants.length - 1].id &&
                  lineItem.productId === response.id,
              )
            ) {
              setVariantInCart(true)
            } else {
              setVariantInCart(false)
            }
          })
          setProductID(response.id)
          setVariantID(+response.masterData.current.variants[response.masterData.current.variants.length - 1].id)
          setPrice(
            convertPrice(
              response.masterData.current.variants[response.masterData.current.variants.length - 1].prices[0].value
                .centAmount,
            ),
          )
          setDiscountedPrice(
            convertPrice(
              response.masterData.current.variants[response.masterData.current.variants.length - 1].prices[0].discounted
                ?.value.centAmount || 0,
            ),
          )
          setVolume(
            response.masterData.current.variants[response.masterData.current.variants.length - 1].attributes[0]
              .value[0],
          )
        }
      })
    }
    return () => {
      loading = false
    }
  }, [])
  const productTitle = productsData?.masterData?.current.name['en-US']
  const productDescription = productsData?.masterData.current.description['en-US']
  const variants = productsData?.masterData?.current.variants || []
  // @ts-expect-error event is used under the hood
  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: string): void => {
    setVolume(Number.parseFloat(newVolume))
  }
  const handleVolumeSelect = (selectedPrice: number, discountCentPrice: number): void => {
    const priceInEuro = convertPrice(selectedPrice)
    const discountPriceInEuro = convertPrice(discountCentPrice)
    setPrice(priceInEuro)
    setDiscountedPrice(discountPriceInEuro)
  }

  const [open, setOpen] = useState(false)
  const handleOpenModal = (): void => setOpen(true)
  const handleModalClose = (): void => setOpen(false)
  const customerToken = new CustomerTokensStorage().getLocalStorageCustomerAuthToken()

  async function addToCart(): Promise<void> {
    if (customerToken) {
      const lastCart = await myCart.queryMyActiveCart(customerToken)

      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: productID,
            variantId: variantID,
            quantity: 1,
          },
        ],
      }
      try {
        await myCart.handleCartItemInUserCart(customerToken, lastCart.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
        setVariantInCart(true)
      } catch (error) {
        console.error(error)
      }
    } else if (anonUserAuthToken) {
      const lastCart = await myCart.queryMyActiveCart(anonUserAuthToken)

      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: productID,
            variantId: variantID,
            quantity: 1,
          },
        ],
      }
      try {
        await myCart.handleCartItemInUserCart(anonUserAuthToken, lastCart.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
        setVariantInCart(true)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function removeItemFromCart(lineId: string, productsQuantity: number): Promise<void> {
    if (customerToken && lineId) {
      const lastCart = await myCart.queryMyActiveCart(customerToken)
      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: lineId,
            quantity: productsQuantity,
          },
        ],
      }
      try {
        await myCart.removeLineItem(customerToken, lastCart.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
      } catch (error) {
        console.error(error)
      }
    } else if (anonUserAuthToken && lineId) {
      const lastCart = await myCart.queryMyActiveCart(anonUserAuthToken)
      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: lineId,
            quantity: productsQuantity,
          },
        ],
      }
      try {
        await myCart.removeLineItem(anonUserAuthToken, lastCart.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Fragment>
      <Box
        sx={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap-reverse', alignItems: 'flex-end' }}
        mt={'20px'}>
        <Box onClick={handleOpenModal} sx={{ maxWidth: '500px', cursor: 'pointer' }}>
          <Carousel useKeyboardArrows showArrows selectedItem={0}>
            {productsData?.masterData.current.masterVariant.images.map((image, index) => {
              return (
                <Box key={index} sx={{ backgroundColor: 'white' }}>
                  <img src={image.url} />
                </Box>
              )
            })}
          </Carousel>
        </Box>
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <Carousel useKeyboardArrows showArrows selectedItem={0}>
              {productsData?.masterData.current.masterVariant.images.map((image, index) => {
                return (
                  <Box key={index} sx={{ backgroundColor: 'white' }}>
                    <img src={image.url} />
                  </Box>
                )
              })}
            </Carousel>
          </Box>
        </Modal>
        <Box
          px={4}
          minWidth={500}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            height: 300,
          }}>
          <Chip label="In stock" color="success" size="small" />
          <Box>
            <Typography variant="h3" component="h2" mt={'20px'}>
              {productTitle}
            </Typography>
            <Box maxWidth={300}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Typography variant="h5">Volume(ml):</Typography>
                <ToggleButtonGroup
                  value={volume}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  exclusive
                  onChange={handleVolumeClick}
                  size="small"
                  color="standard">
                  {variants instanceof Array
                    ? variants.map((variant) => {
                        return (
                          <ToggleButton
                            onClick={async (): Promise<void> => {
                              const centPrice = variant.prices[0].value.centAmount
                              const discountCentPrice = variant.prices[0].discounted?.value.centAmount || 0
                              handleVolumeSelect(centPrice, discountCentPrice)
                              setVariantID(variant.id)
                              const cartData = await myCart.createCart()
                              if (cartData?.lineItems.some((lineItem) => lineItem.variant.id === variant.id)) {
                                setVariantInCart(true)
                              } else {
                                setVariantInCart(false)
                              }
                            }}
                            key={variant?.prices[0].key}
                            value={variant?.attributes[0]?.value[0]}
                            id={variant.id.toString()}>
                            {variant.attributes[0].value[0]}
                          </ToggleButton>
                        )
                      })
                    : null}
                </ToggleButtonGroup>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                <Typography variant="h6">Price:</Typography>
                {discountedPrice !== '0.00' ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: '400', textDecoration: 'line-through' }}>{`€ ${price}`}</Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: '700', color: '#ffc107' }}>{`€ ${discountedPrice}`}</Typography>
                  </>
                ) : (
                  <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ ${price}`}</Typography>
                )}
              </Box>
            </Box>
            {variantInCart ? (
              <Button
                size="small"
                variant="outlined"
                sx={{ marginTop: '20px' }}
                onClick={async (): Promise<void> => {
                  const cartDetails = await myCart.createCart()
                  const lineId = cartDetails?.lineItems.filter((lineItem) => lineItem.productId === productID)[0].id
                  const quantity = cartDetails?.lineItems.filter((lineItem) => lineItem.productId === productID)[0]
                    .quantity
                  if (lineId && quantity) {
                    removeItemFromCart(lineId, quantity)
                    setVariantInCart(false)
                  }
                }}>
                Remove from cart
              </Button>
            ) : (
              <Button size="small" variant="outlined" sx={{ marginTop: '20px' }} onClick={addToCart}>
                Add to cart
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Typography variant="h5" mt={'20px'}>
        Description
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={'20px'}>
        {productDescription}
      </Typography>
    </Fragment>
  )
}
