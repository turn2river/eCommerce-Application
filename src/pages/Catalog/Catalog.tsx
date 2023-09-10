import { Button, Grid, Skeleton, TextField, Typography } from '@mui/material'
import { useState, useEffect, Fragment, MouseEvent } from 'react'
import { Box } from '@mui/system'
import { toast } from 'react-toastify'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { gridContainerProps, gridItemProps, skeletonProps } from '../Main/style'
import { CustomPaginationBar } from '../../components/CustomPaginationBar/CustomPaginationBar.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { GetProductsByCategoryIdService, ProductResult } from '../../services/GetProductsByCategoryIdService'
import { DiscountIds, GetProductsWithDiscountService } from '../../services/GetProductsWithDiscountService'
import { GetProductByIdService } from '../../services/GetProductByIdService'
import { Product } from '../../models/ProductType'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'
import { SortingMenu } from '../../components/SortingMenu/SortingMenu.tsx'
import { SearchProductsService } from '../../services/SearchProductsService'
import { RangeSlider } from '../../components/RangeSlider/Range.slider.tsx'
import { GetFilteredProductsService } from '../../services/GetFilteredProductsService'

export const Catalog = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const searchProductSrvice = new SearchProductsService()
  const filteredProducts = new GetFilteredProductsService()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [productsData, setProductsData] = useState<(ProductResult | Product)[]>(new Array(1))
  const [loadingStatus, setLoadingstatus] = useState(false)
  const [catalogueTitle, setCatalogueTitle] = useState('')
  const [serchValue, setSearchValue] = useState('')
  const page = useCataloguePage()
  const { setCurrentPage, currentPage, categoriesID, setCategoriesID } = page as CataloguePageContextType
  const [filterParam, setFilterParam] = useState<{
    categoriesList: string[]
    priceList: { min: number; max: number }
  }>({ categoriesList: [categoriesID], priceList: { min: 1, max: 350 } })

  useEffect(() => {
    let loading = true
    setSearchValue('')
    if (currentPage === 'catalogue') {
      if (anonUserAuthToken && typeof categoriesID === 'string') {
        const newProductData = new GetProductsByCategoryIdService()
        newProductData.getProductsByCategoryId(anonUserAuthToken, categoriesID).then((data) => {
          if (loading) {
            setCatalogueTitle('Catalogue')
            setProductsData(data.results)
            setLoadingstatus(false)
          }
        })
      }
    }
    return () => {
      loading = false
    }
  }, [categoriesID, currentPage])

  async function getDiscountedProducts(event: MouseEvent<HTMLElement>): Promise<void> {
    const { id } = event.currentTarget
    const getProductsWithDiscountService = new GetProductsWithDiscountService()
    const newProductData = new GetProductByIdService()
    if (anonUserAuthToken) {
      setProductsData(new Array(1))
      try {
        setCurrentPage('sale')
        const discountedProducts = await getProductsWithDiscountService.getProductsWithDiscount(anonUserAuthToken, id)
        setCatalogueTitle(discountedProducts.name['en-US'])
        const productKeys = discountedProducts.predicate.split('or').map((el) => el.trim().slice(15, 19))
        Promise.all(
          productKeys.map((key) => {
            return newProductData.getProductByKey(anonUserAuthToken, key)
          }),
        ).then((response) => {
          setProductsData([...response])
        })
      } catch (error) {
        console.error(error)
        toast.error('something went wrong')
      }
    }
  }
  async function priceRangeSelect(): Promise<void> {
    if (anonUserAuthToken) {
      if (filterParam) {
        const data = await filteredProducts.getFilteredProducts(anonUserAuthToken, filterParam, 26, 0)
        console.log(1, data)
        setProductsData(data)
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
        <DropdownButton categoryIdSetter={setCategoriesID} />
        <TextField
          sx={{ marginLeft: '10px' }}
          fullWidth
          variant="outlined"
          label="search parfume"
          type="search"
          value={serchValue}
          onChange={(event): void => {
            setSearchValue(event.currentTarget.value)
          }}></TextField>
        <Button
          variant="contained"
          onClick={async (): Promise<void> => {
            if (anonUserAuthToken) {
              const data = await searchProductSrvice.searchProducts(anonUserAuthToken, serchValue)
              setCurrentPage('search')
              setProductsData(data.results)
            }
          }}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0 10px 0', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ margin: 'auto 0' }}>
          {catalogueTitle}
        </Typography>
        <RangeSlider filterParamsSetter={setFilterParam} />
        <Button variant="contained" onClick={priceRangeSelect.bind(this)}>
          Submit
        </Button>
        <SortingMenu
          setProductsData={setProductsData}
          token={anonUserAuthToken}
          page={currentPage}
          categoryID={categoriesID}
          filterParams={filterParam}></SortingMenu>
      </Box>
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
                      variants={product.variants}
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
        {productsData.length === 0 ? (
          <Typography variant="h1" component={'p'}>
            Products not found
          </Typography>
        ) : null}
      </Grid>
      <CustomPaginationBar count={4} />
    </Fragment>
  )
}

Catalog.defaultProps = {
  initialCategory: '95f20a5a-77e8-4469-a7af-0167888d5ef5',
}
