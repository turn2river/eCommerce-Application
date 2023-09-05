import { Grid, Skeleton, TextField, Typography } from '@mui/material'
import { useState, useEffect, Fragment } from 'react'
import { Box } from '@mui/system'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { GetProductByIdService } from '../../services/GetProductByIdService'
import { SelectionProductsQueryService } from '../../services/SelectionProductsQueryService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { gridContainerProps, gridItemProps, skeletonProps } from '../Main/style'
import { CustomPaginationBar } from '../../components/CustomPaginationBar/CustomPaginationBar.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { Product } from '../../models/ProductType'

export const Catalog = (): JSX.Element => {
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
        const result = await selectionsID.getSectionProductsIDs(anonUserAuthToken, 'catalogue')
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
    return (): void => {
      loading = false
    }
  }, [])

  return (
    <Fragment>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <DropdownButton />
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
          : productsData.map(({ id, key, masterData }) => {
              return (
                <Grid {...gridItemProps}>
                  <ProductCard
                    key={id}
                    productKey={key}
                    imageSource={masterData.current.masterVariant.images[0].url}
                    title={masterData.current.name['en-US']}
                    description={masterData.current.metaDescription['en-US']}
                    variants={masterData.current.variants}
                  />
                </Grid>
              )
            })}
      </Grid>
      <CustomPaginationBar count={10} />
    </Fragment>
  )
}
