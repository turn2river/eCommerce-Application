import { Pagination } from '@mui/material'

export const CustomPaginationBar = ({ count }: CustomPaginationBarInterface): JSX.Element => {
  return (
    <Pagination
      size="large"
      count={count}
      variant="outlined"
      shape="rounded"
      sx={{ '& > ul': { justifyContent: 'center' }, 'margin': '20px 0' }}
    />
  )
}

interface CustomPaginationBarInterface {
  count: number
}
