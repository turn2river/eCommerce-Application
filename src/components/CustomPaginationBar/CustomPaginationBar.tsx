import { Pagination } from '@mui/material'

export const CustomPaginationBar = ({
  pageQuantity,
  pageNumber,
  setPageNumber,
}: CustomPaginationBarInterface): JSX.Element => {
  const pageNumberHandler = (num: number): void => {
    setPageNumber(num)
  }
  return (
    <Pagination
      size="large"
      count={pageQuantity}
      page={pageNumber}
      onChange={(_, number): void => pageNumberHandler(number)}
      variant="outlined"
      shape="rounded"
      sx={{ '& > ul': { justifyContent: 'center' }, 'margin': '20px 0' }}
    />
  )
}

interface CustomPaginationBarInterface {
  pageQuantity: number | undefined
  pageNumber: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}
