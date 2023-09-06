import { Pagination } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const CustomPaginationBar = ({ count, page, setPage }: CustomPaginationBarInterface): JSX.Element => {
  const handleChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }

  return (
    <Pagination
      size="large"
      count={count}
      variant="outlined"
      shape="rounded"
      sx={{ '& > ul': { justifyContent: 'center' }, 'margin': '20px 0' }}
      page={page}
      onChange={handleChange}
    />
  )
}

interface CustomPaginationBarInterface {
  count: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}
