import MainPicture from '../../assets/image/jpg/luxurious-perfume-bottle-adds-elegance-domestic-decor-generative-ai.jpg'

export const mainImage = {
  backgroundImage: `url(${MainPicture})`,
  backgroundSize: 'cover',
  height: '500px',
  backgroundPositionX: 'center',
  backgroundPositionY: '60%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const mainImageCaption = {
  width: '100%',
  backgroundColor: 'rgb(0 0 0 / 54%)',
  lineHeight: '100px',
  textAlign: 'center',
}

export const gridItemProps = {
  item: true,
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  sx: { display: 'flex', justifyContent: 'center' },
}

export const gridContainerProps = {
  container: true,
  sx: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: '20px',
    border: '1px solid',
    borderRadius: '5px',
    margin: '20px 0',
  },
}

export const skeletonProps = {
  sx: { margin: '10px', height: '600px', width: '305px' },
}
