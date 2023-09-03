import { Box } from '@mui/system'
import { TextField, Typography } from '@mui/material'
import { DropdownButton } from '../../components/CatalogButton/CatalogButtonNEW.tsx'
import { ImageAndCaption } from '../../components/ImageAndCaption/ImageAndCaption.tsx'
import MainImage from '../../assets/image/jpg/luxurious-perfume-bottle-adds-elegance-domestic-decor-generative-ai.jpg'
import MansCategoryImage from '../../assets/image/jpg/groom-meeting-details-jacket-shoes-watches-buttons-wedding-day.jpg'
import WomensCategoryImage from '../../assets/image/jpg/attractive-seductive-sensual-stylish-woman-boho-dress-sitting-vintage-retro-cafe-holding-perfume.jpg'
import AllCategoryImage from '../../assets/image/jpg/still-life-cosmetic-products.jpg'

export const Main = (): JSX.Element => {
  return (
    <Box>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <DropdownButton />
        <TextField fullWidth variant="outlined" label="search parfume" type="search"></TextField>
      </Box>
      <ImageAndCaption width={'100%'} height={'500px'} verticalPosition={'60%'} image={MainImage}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
    </Box>
  )
}
