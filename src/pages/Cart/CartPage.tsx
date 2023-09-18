import { useEffect, useState, MouseEvent } from 'react'
import { Box, Button, ButtonGroup, Card, CardMedia, IconButton, Typography } from '@mui/material'
import { Add, DeleteForever, Remove } from '@mui/icons-material'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { Cart, CartService } from '../../services/CartService'
import { convertPrice } from '../../utils/convertPrice'
import { CataloguePageContextType, useCataloguePage } from '../../store/CataloguePageContext.tsx'
import { CustomerTokensStorage } from '../../store/customerTokensStorage'

export const CartPage = (): JSX.Element | JSX.Element[] => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [cartsData, setCartsData] = useState<Cart | undefined>(undefined)
  const myCart = new CartService()
  const page = useCataloguePage()
  const { cartListTrigger, setCartListTRigger } = page as CataloguePageContextType
  const customerToken = new CustomerTokensStorage().getLocalStorageCustomerAuthToken()

  useEffect(() => {
    let loading = true
    if (loading && anonUserAuthToken) {
      myCart.createCart().then((response) => {
        setCartsData(response)
      })
    }

    return () => {
      loading = false
    }
  }, [cartListTrigger])

  async function addItemToCart(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    const { id } = event.currentTarget
    if (customerToken && id) {
      const lastCart = await myCart.queryMyActiveCart(customerToken)
      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: id.split('___')[0],
            variantId: Number.parseFloat(id.split('___')[1]),
            quantity: 1,
          },
        ],
      }
      try {
        await myCart.handleCartItemInUserCart(customerToken, lastCart.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
      } catch (error) {
        console.error(error)
      }
    } else if (anonUserAuthToken && id) {
      const lastCart = await myCart.queryMyActiveCart(anonUserAuthToken)
      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: id.split('___')[0],
            variantId: Number.parseFloat(id.split('___')[1]),
            quantity: 1,
          },
        ],
      }
      try {
        await myCart.handleCartItemInUserCart(anonUserAuthToken, lastCart.id, cartUpdate)
        setCartListTRigger((prevValue) => prevValue + 1)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function removeItemFromCart(event: MouseEvent<HTMLButtonElement>, productsQuantity: number = 1): Promise<void> {
    const { id } = event.currentTarget
    if (customerToken && id) {
      const lastCart = await myCart.queryMyActiveCart(customerToken)
      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: id,
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
    } else if (anonUserAuthToken && id) {
      const lastCart = await myCart.queryMyActiveCart(anonUserAuthToken)
      const cartUpdate = {
        version: lastCart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: id,
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

  return cartsData?.lineItems.length ? (
    <Box>
      {cartsData.lineItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            margin: '20px 0',
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ display: 'flex' }}>
            <CardMedia
              component={'img'}
              image={item.variant.images[0]?.url}
              sx={{ width: '150px', margin: '0 20px' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
              <Typography variant={'h5'}>{`${item.name['en-US']}`}</Typography>
              <Typography variant={'caption'}>{`volume: ${item.variant.attributes[item.variant.attributes.length - 1]
                ?.value[0]} ml`}</Typography>
              {item.variant.prices[0].discounted ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={'caption'} sx={{ textDecoration: 'line-through' }}>{`price: € ${convertPrice(
                    item.variant.prices[0].value.centAmount,
                  )}`}</Typography>
                  <Typography variant={'caption'} sx={{ color: '#ffc107' }}>{`discounted price: € ${convertPrice(
                    item.variant.prices[0].discounted.value.centAmount,
                  )}`}</Typography>
                </Box>
              ) : (
                <Typography variant={'caption'}>{`price: € ${convertPrice(
                  item.variant.prices[0].value.centAmount,
                )}`}</Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">{item.quantity}</Typography>
            <ButtonGroup variant="text" aria-label="outlined button group">
              <IconButton id={`${item.productId}___${item.variant.id.toString()}`} onClick={addItemToCart.bind(this)}>
                <Add />
              </IconButton>
              <IconButton id={item.id} onClick={removeItemFromCart.bind(this)}>
                <Remove />
              </IconButton>
            </ButtonGroup>
          </Box>
          <IconButton
            id={item.id}
            size="large"
            sx={{ margin: '0 20px' }}
            onClick={(event): Promise<void> => removeItemFromCart(event, item.quantity)}>
            <DeleteForever sx={{ width: '50px', height: '50px' }} />
          </IconButton>
        </Card>
      ))}
      {cartsData.lineItems.some((lineItem) => lineItem.price.discounted) ? (
        <Box>
          <Typography sx={{ textDecoration: 'line-through', textAlign: 'end' }}>{`Total price: € ${convertPrice(
            cartsData.lineItems.reduce(
              (acc, lineItem) => acc + lineItem.variant.prices[0].value.centAmount * lineItem.quantity,
              0,
            ),
          )}`}</Typography>
          <Typography variant="h6" sx={{ textAlign: 'end', color: '#ffc107' }}>{`Discounted price: € ${convertPrice(
            cartsData.totalPrice.centAmount,
          )}`}</Typography>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'end' }}>{`Total price: € ${convertPrice(
          cartsData.totalPrice.centAmount,
        )}`}</Typography>
      )}
    </Box>
  ) : (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '30px 0', flexDirection: 'column' }}>
      <Typography variant="h3" textAlign={'center'}>
        Your cart is empty 🥺
      </Typography>
      <Button href="../catalogue">Let's go to catalogue 🛒</Button>
    </Box>
  )
}
