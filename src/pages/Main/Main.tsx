import { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { GetProductByIdService, Product } from '../../services/GetProductByIdService'
import { SelectionProductsQueryService } from '../../services/SelectionProductsQueryService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx'

export const Main = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const selectionsID = new SelectionProductsQueryService()
  const [productsData, setProductsData] = useState<Product[]>([])
  // const [price, setPrice] = useState()

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
    <Box sx={{ display: 'flex', maxWidth: '995px', flexWrap: 'wrap', margin: '10px', justifyContent: 'center' }}>
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
  )
}
