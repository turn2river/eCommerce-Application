import { Button, Chip, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

export const ProductPage = (): JSX.Element => {
  const { id } = useParams()

  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'start' }} mt={'20px'}>
        <Box
          maxHeight={300}
          component={'img'}
          src={
            'https://eco-beauty.dior.com/dw/image/v2/BDGF_PRD/on/demandware.static/-/Sites-master_dior/default/dw7a79271b/assets/Y0066001/Y0066001_F006624009_E01_ZHC_2.jpg?sw=870&sh=580&sm=fit&imwidth=870'
          }
          title={id}></Box>
        <Box
          px={4}
          minWidth={500}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            height: 300,
          }}>
          <Chip label="In stock" color="success" size="small" />
          <Box>
            <Typography variant="h3" component="h2" mt={'20px'}>
              {id}
            </Typography>
            <Box maxWidth={300}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Typography variant="h5">Volume(ml):</Typography>
                <ToggleButtonGroup
                  value={300}
                  sx={{ display: 'flex', justifyContent: 'center', ml: '40px' }}
                  exclusive
                  // onChange={handleVolumeClick}
                  size="small"
                  color="standard">
                  <ToggleButton value={30}>30</ToggleButton>
                  <ToggleButton value={50}>50</ToggleButton>
                  <ToggleButton value={100}>100</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                <Typography variant="h6">Price:</Typography>
                <Typography variant="h6" sx={{ fontWeight: '700' }}>{`€ 100`}</Typography>
              </Box>
            </Box>
            <Button size="small" variant="outlined" sx={{ marginTop: '20px' }}>
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography variant="h5" mt={'20px'}>
        Discription
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={'20px'}>
        FARENHEIT Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nemo dolore pariatur quis cum
        consectetur. Adipisci aperiam officiis, hic mollitia delectus eius cumque doloremque in reiciendis, expedita
        animi necessitatibus omnis. Veniam magnam accusamus voluptates nemo hic repellendus consequatur dolorem animi
        assumenda est vero quisquam earum, blanditiis sunt voluptatibus. Maiores earum quae, maxime facere eos
        laboriosam aliquid ex deleniti accusantium rem natus assumenda odio, amet suscipit modi dolor? Minima natus
        quisquam obcaecati quaerat nostrum beatae adipisci non porro alias nulla maiores a reiciendis velit fugiat iste
        commodi officiis iusto voluptates, nihil, distinctio at consectetur, ex quis in? Saepe excepturi placeat maxime.
      </Typography>
    </Fragment>
  )
}
