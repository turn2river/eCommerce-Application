import { Box } from '@mui/system'
import { Link, Typography } from '@mui/material'
import { ImageAndCaption } from '../../components/ImageAndCaption/ImageAndCaption.tsx'
import MainImage from '../../assets/image/jpg/luxurious-perfume-bottle-adds-elegance-domestic-decor-generative-ai.jpg'
import MansCategoryImage from '../../assets/image/jpg/groom-meeting-details-jacket-shoes-watches-buttons-wedding-day.jpg'
import WomensCategoryImage from '../../assets/image/jpg/attractive-seductive-sensual-stylish-woman-boho-dress-sitting-vintage-retro-cafe-holding-perfume.jpg'
import AllCategoryImage from '../../assets/image/jpg/still-life-cosmetic-products.jpg'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'

export const Main = (): JSX.Element => {
  const page = useCataloguePage()
  const { setCategoriesID, setCurrentPageName } = page as CataloguePageContextType
  return (
    <Box>
      <ImageAndCaption width={'100%'} height={'500px'} verticalPosition={'60%'} image={MainImage}>
        To get a discount, use one of ours promocodes: RSS || sept23
      </ImageAndCaption>
      <Typography variant="h4" component="h3" margin={'20px'} textAlign={'center'}>
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
          <Link
            href="/catalogue"
            onClick={(): void => {
              setCurrentPageName('catalogue')
              setCategoriesID('810c0293-5704-4033-bb92-5d237fe5983d')
            }}>
            For him
          </Link>
        </ImageAndCaption>
        <ImageAndCaption
          width={'300px'}
          height={'300px'}
          verticalPosition={'center'}
          image={WomensCategoryImage}
          scale="1.05">
          <Link
            href="/catalogue"
            onClick={(): void => {
              setCurrentPageName('catalogue')
              setCategoriesID('95f20a5a-77e8-4469-a7af-0167888d5ef5')
            }}>
            For her
          </Link>
        </ImageAndCaption>
        <ImageAndCaption
          width={'300px'}
          height={'300px'}
          verticalPosition={'center'}
          image={AllCategoryImage}
          scale="1.05">
          <Link
            href="/catalogue"
            onClick={(): void => {
              setCurrentPageName('catalogue')
              setCategoriesID('0e007442-ed84-4e4f-ab3b-3c14191462c7')
            }}>
            All Products
          </Link>
        </ImageAndCaption>
      </Box>
    </Box>
  )
}
