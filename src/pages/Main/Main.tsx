import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/system'
import { Grid, Skeleton, TextField, Typography } from '@mui/material'
import { GetProductByIdService, Product } from '../../services/GetProductByIdService'
import { SelectionProductsQueryService } from '../../services/SelectionProductsQueryService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { gridContainerProps, gridItemProps, skeletonProps } from './style'
import { CustomPaginationBar } from '../../components/CustomPaginationBar/CustomPaginationBar.tsx'
import { ImageAndCaption } from '../../components/ImageAndCaption/ImageAndCaption.tsx'
import MainImage from '../../assets/image/jpg/luxurious-perfume-bottle-adds-elegance-domestic-decor-generative-ai.jpg'
import MansCategoryImage from '../../assets/image/jpg/groom-meeting-details-jacket-shoes-watches-buttons-wedding-day.jpg'
import WomensCategoryImage from '../../assets/image/jpg/attractive-seductive-sensual-stylish-woman-boho-dress-sitting-vintage-retro-cafe-holding-perfume.jpg'
import AllCategoryImage from '../../assets/image/jpg/still-life-cosmetic-products.jpg'

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
      <Box sx={{ display: 'flex', margin: '20px 0' }}>
        <DropdownButton />
        <TextField fullWidth variant="outlined" label="search parfume" type="search"></TextField>
      </Box>
      <ImageAndCaption width={'100%'} height={'500px'} verticalPosition={'60%'} image={MainImage}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </ImageAndCaption>
      <Typography variant="h3" margin={'20px'}>
        Categories
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          border: '1px solid',
          borderRadius: '5px',
          padding: '20px',
        }}>
        <ImageAndCaption
          width={'300px'}
          height={'300px'}
          verticalPosition={'center'}
          image={MansCategoryImage}
          scale="1.05">
          For him
        </ImageAndCaption>
        <ImageAndCaption
          width={'300px'}
          height={'300px'}
          verticalPosition={'center'}
          image={WomensCategoryImage}
          scale="1.05">
          For her
        </ImageAndCaption>
        <ImageAndCaption
          width={'300px'}
          height={'300px'}
          verticalPosition={'center'}
          image={AllCategoryImage}
          scale="1.05">
          All products
        </ImageAndCaption>
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
                <Grid key={id} {...gridItemProps}>
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
      </Grid>
      <CustomPaginationBar count={10} />
    </Container>
  )
}
