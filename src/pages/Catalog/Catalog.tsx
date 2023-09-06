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
import { GetProductByIdService } from '../../services/GetProductByIdService'
import { Product } from '../../models/ProductType'

export const Catalog = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<(ProductResult | Product)[]>([])
  const [loadingStatus, setLoadingstatus] = useState(false)
  const [catalogueTitle, setCatalogueTitle] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // const [url, setUrl] = useState('')

  const allProdcuts = '0e007442-ed84-4e4f-ab3b-3c14191462c7'
  const [categoryId, setCategoryId] = useState(allProdcuts)

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken && typeof categoryId === 'string') {
      const newProductData = new GetProductsByCategoryIdService()
      newProductData.getProductsByCategoryId(anonUserAuthToken, categoryId).then((data) => {
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
  }, [categoryId])

  async function getDiscountedProducts(event: MouseEvent<HTMLElement>): Promise<void> {
    const { id } = event.currentTarget
    const getProductsWithDiscountService = new GetProductsWithDiscountService()
    const newProductData = new GetProductByIdService()
    if (anonUserAuthToken) {
      setProductsData([])
      try {
        setPageNumber(1)
        const discountedProducts = await getProductsWithDiscountService.getProductsWithDiscount(anonUserAuthToken, id)
        setCatalogueTitle(discountedProducts.name['en-US'])
        const productKeys = discountedProducts.predicate.split('or').map((el) => el.trim().slice(15, 19))
        Promise.all(
          productKeys.map((key) => {
            return newProductData.getProductByKey(anonUserAuthToken, key)
          }),
        ).then((response) => setProductsData((prevData) => [...prevData, ...response]))
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
          : productsData.map((product): JSX.Element => {
              if (!('masterData' in product)) {
                return (
                  <Grid key={product.id} {...gridItemProps}>
                    <ProductCard
                      key={product.id}
                      productKey={product.key}
                      imageSource={product.masterVariant.images[0].url}
                      title={product.name['en-US']}
                      description={product.metaDescription['en-US']}
                      // @ts-expect-error why
                      variants={product.variants.length ? product.variants : product.masterVariant}
                    />
                  </Grid>
                )
              }
              return (
                <Grid key={product.id} {...gridItemProps}>
                  <ProductCard
                    key={product.id}
                    productKey={product.key}
                    imageSource={product.masterData.current.masterVariant.images[0].url}
                    title={product.masterData.current.name['en-US']}
                    description={product.masterData.current.metaDescription['en-US']}
                    // @ts-expect-error why
                    variants={
                      product.masterData.current.variants.length
                        ? product.masterData.current.variants
                        : product.masterData.current.masterVariant
                    }
                  />
                </Grid>
              )
            })}
      </Grid>
      <CustomPaginationBar count={totalPages} page={pageNumber} setPage={setPageNumber} />
    </Fragment>
  )
}

Catalog.defaultProps = {
  initialCategory: '95f20a5a-77e8-4469-a7af-0167888d5ef5',
}
