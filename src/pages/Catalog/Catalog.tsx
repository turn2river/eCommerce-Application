import { Button, Grid, Skeleton, TextField, Typography } from '@mui/material'
import { useState, useEffect, Fragment, MouseEvent } from 'react'
import { Box } from '@mui/system'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { gridContainerProps, gridItemProps, skeletonProps } from '../Main/style'
import { CustomPaginationBar } from '../../components/CustomPaginationBar/CustomPaginationBar.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { GetProductsByCategoryIdService, ProductResult } from '../../services/GetProductsByCategoryIdService'
import { DiscountIds, GetProductsWithDiscountService } from '../../services/GetProductsWithDiscountService'

export const Catalog = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<ProductResult[]>([])
  const [loadingStatus, setLoadingstatus] = useState(false)
  const [catalogueTitle, setCatalogueTitle] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // const [url, setUrl] = useState('')

  const allProdcuts = 'b8ccabd8-946a-41f7-a61f-0e55ff7ce741'
  const [categoryId, setCategoryId] = useState(allProdcuts)

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken && typeof categoryId === 'string') {
      const newProductData = new GetProductsByCategoryIdService()
      newProductData.getProductsByCategoryId(anonUserAuthToken, categoryId, pageNumber - 1).then((data) => {
        if (loading) {
          setCatalogueTitle('Catalogue')
          setTotalPages(Math.ceil(data.total / 8))
          setProductsData(data.results)
          setLoadingstatus(false)
        }
      })
    }
    return () => {
      loading = false
    }
  }, [categoryId, pageNumber])

  async function getDiscountedProducts(event: MouseEvent<HTMLElement>): Promise<void> {
    const { id } = event.currentTarget
    const getProductsWithDiscountService = new GetProductsWithDiscountService()
    if (anonUserAuthToken) {
      try {
        const discountedProducts = await getProductsWithDiscountService.getProductsWithDiscount(anonUserAuthToken, id)
        setCatalogueTitle(discountedProducts.name['en-US'])
        setPageNumber(1)
        console.log(discountedProducts)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          id={DiscountIds.SummerSale}
          size="large"
          color="secondary"
          variant="contained"
          sx={{ maxWidth: '740px', width: '100%', mt: '20px', p: '40px 0' }}
          onClick={getDiscountedProducts.bind(this)}>
          SUMMER SALES!
        </Button>
        <Button
          id={DiscountIds.LuxeSale}
          size="large"
          color="secondary"
          variant="contained"
          sx={{ maxWidth: '740px', width: '100%', mt: '20px', p: '40px 0' }}
          onClick={getDiscountedProducts.bind(this)}>
          LUXURY SALES!
        </Button>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <DropdownButton categoryIdSetter={setCategoryId} />
        <TextField
          sx={{ marginLeft: '10px' }}
          fullWidth
          variant="outlined"
          label="search parfume"
          type="search"></TextField>
      </Box>
      <Typography variant="h4" margin={'20px 0'}>
        {catalogueTitle}
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
      <CustomPaginationBar count={totalPages} page={pageNumber} setPage={setPageNumber} />
    </Fragment>
  )
}

// Catalog.defaultProps = {
//   initialCategory: '95f20a5a-77e8-4469-a7af-0167888d5ef5',
// }
