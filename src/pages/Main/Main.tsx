import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/system'
import { TextField, Typography } from '@mui/material'
import { GetProductByIdService, Product } from '../../services/GetProductByIdService'
import { SelectionProductsQueryService } from '../../services/SelectionProductsQueryService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import MainPicture from '../../assets/image/jpg/luxurious-perfume-bottle-adds-elegance-domestic-decor-generative-ai.jpg'

export const Main = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const selectionsID = new SelectionProductsQueryService()
  const [productsData, setProductsData] = useState<Product[]>([])

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken) {
      const productIDs = async (): Promise<string[]> => {
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
      <Box sx={{ display: 'flex', margin: '10px 0' }}>
        <DropdownButton />
        <TextField fullWidth variant="outlined" label="search parfume" type="search"></TextField>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${MainPicture})`,
          backgroundSize: 'cover',
          height: '500px',
          backgroundPositionX: 'center',
          backgroundPositionY: '60%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          variant="h4"
          sx={{ width: '100%', backgroundColor: 'rgb(0 0 0 / 54%)', lineHeight: '100px', textAlign: 'center' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          margin: '10px auto',
          justifyContent: 'space-evenly',
          border: '1px solid',
          padding: '20px',
        }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1300px' }}>
          {productsData.map(({ id, masterData }) => {
            return (
              <ProductCard
                key={id}
                imageSource={masterData.current.masterVariant.images[0].url}
                title={masterData.current.name['en-US']}
                description={masterData.current.metaDescription['en-US']}
                variants={
                  masterData.current.variants.length ? masterData.current.variants : masterData.current.masterVariant
                }
              />
            )
          })}
        </Box>
      </Box>
    </Container>
  )
}
