import { Button, Chip, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product, GetProductByIdService } from '../../services/GetProductByIdService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { convertPrice } from '../../utils/convertPrice'

export const ProductPage = (): JSX.Element => {
  const { id } = useParams()

  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<Product[]>([])

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken) {
      ;(async (): Promise<void> => {
        const productService = new GetProductByIdService()
        const data = await productService.getProductById(anonUserAuthToken, `key=${id}`)
        if (loading) {
          setProductsData((prevData: Product[]) => {
            return [...prevData, data]
          })
        }
      })()
    }
    return () => {
      loading = false
    }
  }, [])
  const productTitle = productsData?.[0]?.masterData?.current.name['en-US']
  const productImage = productsData?.[0]?.masterData.current.masterVariant.images[0].url
  const productDescription = productsData?.[0]?.masterData.current.description['en-US']
  const variants = productsData?.[0]?.masterData?.current.variants
  const [volume, setVolume] = useState(
    // @ts-expect-error why
    variants instanceof Array ? variants?.[0]?.attributes?.[1]?.value[0] : variants?.[0]?.attributes?.[1]?.value[0],
  )
  const [price, setPrice] = useState<string>(convertPrice(variants?.[0].prices[0].value.centAmount))
  // @ts-expect-error why
  const handleVolumeClick = (event: MouseEvent<HTMLElement>, newVolume: string): void => {
    setVolume(newVolume)
  }

  const handleVolumeSelect = (selectedPrice: number): void => {
    const priceInEuro = convertPrice(selectedPrice)
    setPrice(priceInEuro)
  }
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
                            {variant?.attributes?.[1]?.value?.[0]}
                          </ToggleButton>
                        )
                      })
                    : null}
                </ToggleButtonGroup>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                <Typography variant="h6">Price:</Typography>
                <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ ${price}`}</Typography>
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
