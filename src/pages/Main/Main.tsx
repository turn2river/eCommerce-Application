import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/system'
import { Grid, Skeleton, TextField, Typography } from '@mui/material'
import { GetProductByIdService, Product } from '../../services/GetProductByIdService'
import { SelectionProductsQueryService } from '../../services/SelectionProductsQueryService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { gridContainerProps, gridItemProps, mainImage, mainImageCaption, skeletonProps } from './style'

export const Main = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const selectionsID = new SelectionProductsQueryService()
  const [productsData, setProductsData] = useState<Product[]>([])
  const [loadingStatus, setLoadingstatus] = useState(false)

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken) {
      const productIDs = async (): Promise<string[]> => {
        setLoadingstatus(true)
        const result = await selectionsID.getSectionProductsIDs(anonUserAuthToken, 'popular')
        return result
      }
      ;(async (): Promise<void> => {
        ;(await productIDs()).forEach(async (id) => {
          const productService = new GetProductByIdService()
          const data = await productService.getProductById(anonUserAuthToken, id)
          if (loading) {
            setProductsData((prevData: Product[]) => {
              return [...prevData, data]
            })
            setLoadingstatus(false)
          }
        })
      })()
    }
    return () => {
      loading = false
    }
  }, [])

  return (
    <Container maxWidth="xl">
      {loadingStatus ? <div>pending</div> : <div>complete</div>}
      <Box sx={{ display: 'flex', margin: '20px 0' }}>
        <DropdownButton />
        <TextField fullWidth variant="outlined" label="search parfume" type="search"></TextField>
      </Box>
      <Box sx={mainImage}>
        <Typography variant="h4" sx={mainImageCaption}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Box>
      <Typography variant="h3" margin={'20px'}>
        Popular Aromats
      </Typography>
      <Grid {...gridContainerProps}>
        {loadingStatus
          ? Array(8)
              .fill('')
              .map(() => (
                <Grid {...gridItemProps}>
                  <Skeleton variant="rectangular" {...skeletonProps}></Skeleton>
                </Grid>
              ))
          : productsData.map(({ id, masterData }) => {
              return (
                <Grid {...gridItemProps}>
                  <ProductCard
                    key={id}
                    imageSource={masterData.current.masterVariant.images[0].url}
                    title={masterData.current.name['en-US']}
                    description={masterData.current.metaDescription['en-US']}
                    variants={
                      masterData.current.variants.length
                        ? masterData.current.variants
                        : masterData.current.masterVariant
                    }
                  />
                </Grid>
              )
            })}
        {}
      </Grid>
    </Container>
  )
}
