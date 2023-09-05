import { Grid, Skeleton, TextField, Typography } from '@mui/material'
import { useState, useEffect, Fragment } from 'react'
import { Box } from '@mui/system'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { gridContainerProps, gridItemProps, skeletonProps } from '../Main/style'
import { CustomPaginationBar } from '../../components/CustomPaginationBar/CustomPaginationBar.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { GetProductsByCategoryIdService, ProductResult } from '../../services/GetProductsByCategoryIdService'

export const Catalog = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<ProductResult[]>([])
  const [loadingStatus, setLoadingstatus] = useState(false)

  const allProdcuts = 'b8ccabd8-946a-41f7-a61f-0e55ff7ce741'
  const [category, setCategory] = useState(allProdcuts)

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken) {
      const newProductData = new GetProductsByCategoryIdService()
      newProductData.getProductsByCategoryId(anonUserAuthToken, category).then((data) => {
        if (loading) {
          setProductsData(data.results)
          setLoadingstatus(false)
        }
      })
    }
    return () => {
      loading = false
    }
  }, [category])

  return (
    <Fragment>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <DropdownButton categoryIdSetter={setCategory} />
        <TextField
          sx={{ marginLeft: '10px' }}
          fullWidth
          variant="outlined"
          label="search parfume"
          type="search"></TextField>
      </Box>
      <Typography variant="h4" margin={'20px 0'}>
        Catalogue
      </Typography>
      <Grid {...gridContainerProps}>
        {loadingStatus
          ? productsData.map(({ id }) => (
              <Grid key={id} {...gridItemProps}>
                <Skeleton variant="rectangular" {...skeletonProps}></Skeleton>
              </Grid>
            ))
          : productsData.map(({ key, id, ...product }: ProductResult) => {
              return (
                <Grid key={id} {...gridItemProps}>
                  <ProductCard
                    key={id}
                    productKey={key}
                    imageSource={product.masterVariant.images[0].url}
                    title={product.name['en-US']}
                    description={product.metaDescription['en-US']}
                    // @ts-expect-error why
                    variants={product.variants.length ? product.variants : product.masterVariant}
                  />
                </Grid>
              )
            })}
      </Grid>
      <CustomPaginationBar count={3} />
    </Fragment>
  )
}

Catalog.defaultProps = {
  initialCategory: '95f20a5a-77e8-4469-a7af-0167888d5ef5',
}
