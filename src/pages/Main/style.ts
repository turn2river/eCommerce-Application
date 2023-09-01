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

export const paginationProps = {
  count: '10',
  sx: { '& > ul': { justifyContent: 'center' } },
}
