import { Button, Chip, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetProductByIdService } from '../../services/GetProductByIdService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { convertPrice } from '../../utils/convertPrice'
import { Product } from '../../models/ProductType'

export const ProductPage = (): JSX.Element => {
  const { id } = useParams()

  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<Product | null>(null)
  const [price, setPrice] = useState<string>('')
  const [volume, setVolume] = useState<number>(0)

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken) {
      const productService = new GetProductByIdService()
      productService.getProductById(anonUserAuthToken, `key=${id}`).then((response) => {
        if (loading) {
          setProductsData(response)
          setPrice(convertPrice(response.masterData.current.variants[0].prices[0].value.centAmount))
          setVolume(response.masterData.current.variants[0].attributes[0].value[0])
        }
      })
    }
    return () => {
      loading = false
    }
  }, [])
  console.log(productsData)
  const productTitle = productsData?.masterData?.current.name['en-US']
  const productImage = productsData?.masterData.current.masterVariant.images[0].url
  const productDescription = productsData?.masterData.current.description['en-US']
  const variants = productsData?.masterData?.current.variants

  // @ts-expect-error why
  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: string): void => {
    setVolume(newVolume)
  }

  console.log(price)
  const handleVolumeSelect = (selectedPrice: number): void => {
    const priceInEuro = convertPrice(selectedPrice)
    setPrice(priceInEuro)
  }
  console.log(price)
  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'start' }} mt={'20px'}>
        <Box
          maxHeight={300}
          component={'img'}
          src={productImage}
          title={id}
          sx={{ backgroundColor: 'white', borderRadius: '5px' }}></Box>
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
                            onClick={(): void => {
                              const centPrice = variant.prices[0].value.centAmount
                              handleVolumeSelect(centPrice)
                            }}
                            key={variant?.prices[0].key}
                            // @ts-expect-error why
                            value={variant?.attributes[1]?.value[0]}>
                            {/* {variant?.attributes?.[1]?.value?.[0]} */}
                            {variant.attributes[0].value[0]}
                          </ToggleButton>
                        )
                      })
                    : null}
                </ToggleButtonGroup>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                <Typography variant="h6">Price:</Typography>
                <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ ${price || undefined}`}</Typography>
              </Box>
            </Box>
            <Button size="small" variant="outlined" sx={{ marginTop: '20px' }}>
              Add to cart
            </Button>
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
